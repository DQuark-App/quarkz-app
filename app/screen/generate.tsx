import {
  FlatList,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {
  Button,
  HelperText,
  SegmentedButtons,
  TextInput,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {Column, Row} from '../components/grid';
import {useEffect, useState} from 'react';
import DQService, {ModelResponse} from '../service';
import {NavigationProp} from '@react-navigation/native';
// @ts-ignore
import {IPFS_GATEWAY} from '@env';
import {AxiosError} from 'axios';
import {useQuery, useRealm} from '../providers';
import {Model} from '../schema';

export default function Generate({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const theme = useTheme();
  const [mode, setMode] = useState('standard');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const models = useQuery(Model);
  const realm = useRealm();

  const syncModels = async () => {
    try {
      const response = await DQService.instance.getModels();
      const models = response.data.data as ModelResponse[];
      realm.write(() => {
        for (const model of models) {
          // @ts-ignore
          realm.create(
            Model,
            {
              name: model.name,
              image: model.image,
            },
            'modified',
          );
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const generate = async () => {
    setLoading(true);
    try {
      if (hasErrorPrompt() || hasErrorModel()) {
        return;
      }

      const response = await DQService.instance.createArt(
        prompt.replace(/[\n\r]/g, ''),
        selectedModel,
        mode === 'hd',
      );
      const generatedResult = response.data as {cid: string};

      setPrompt('');
      setSelectedModel('');
      navigation.navigate('ImagePreview', {
        uri: IPFS_GATEWAY + generatedResult.cid,
      });
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
      const serverError = error.response?.data as {error: string};
      const errorMessage =
        serverError.error || error.message || 'Failed to generate Art';
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    }
    setLoading(false);
  };
  const hasErrorPrompt = () => {
    return prompt.length < 1;
  };

  const hasErrorModel = () => {
    return selectedModel === '';
  };

  useEffect(() => {
    syncModels();
  }, []);

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: theme.colors.background,
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
          }}>
          <Text
            disabled={loading}
            style={{
              color: theme.colors.onBackground,
              fontSize: 30,
              fontWeight: 'bold',
              padding: 15,
            }}>
            Create Art
          </Text>
          <Column alignItems={'stretch'} justifyContent={'flex-start'}>
            <Row alignItems={'center'} justifyContent={'flex-start'}>
              <Text
                style={{
                  marginRight: 10,
                  marginLeft: 10,
                  marginTop: 10,
                  color: theme.colors.primary,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Quality
              </Text>
              <View style={{flexGrow: 1}} />
              <Button
                mode={mode == 'standard' ? 'outlined' : 'text'}
                onPress={() => setMode('standard')}
                style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
                <Text style={{color: theme.colors.onBackground}}>Standard</Text>
              </Button>
              <Button
                onPress={() => setMode('hd')}
                mode={mode == 'hd' ? 'outlined' : 'text'}
                style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
                <Text style={{color: theme.colors.onBackground}}>HD</Text>
              </Button>
            </Row>
            <Text
              style={{
                marginRight: 10,
                marginLeft: 10,
                marginTop: 10,
                color: theme.colors.primary,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Write your NFT idea here
            </Text>
            <TextInput
              style={{
                marginRight: 10,
                marginLeft: 10,
                marginTop: 10,
                paddingTop: 10,
              }}
              onChangeText={text => setPrompt(text)}
              mode={'outlined'}
              maxLength={300}
              multiline={true}
              value={prompt}
              numberOfLines={4}
              placeholder={'eg. A cat in a hat'}
            />
            <HelperText
              type="error"
              visible={hasErrorPrompt()}
              style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
              * Prompt your AI with a sentence!
            </HelperText>
            <Text
              style={{
                marginRight: 10,
                marginLeft: 10,
                marginTop: 10,
                color: theme.colors.primary,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Style
            </Text>
            <FlatList
              style={{marginRight: 10, marginLeft: 10, marginTop: 10}}
              data={models}
              numColumns={3}
              scrollEnabled={false}
              keyExtractor={data => data.name}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      flex: 0.33,
                      padding: 5,
                      borderRadius: 10,
                      backgroundColor:
                        selectedModel === item.name
                          ? theme.colors.primary
                          : theme.colors.background,
                    }}>
                    <TouchableRipple
                      disabled={loading}
                      onPress={() => {
                        setSelectedModel(item.name);
                      }}>
                      <Image
                        style={{
                          borderRadius: 10,
                          width: '100%',
                          height: 100,
                        }}
                        source={{uri: item.image}}
                      />
                    </TouchableRipple>
                  </View>
                );
              }}
            />
            <HelperText
              type="error"
              visible={hasErrorModel()}
              style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
              * Please select a style!
            </HelperText>
            <Button
              onPress={generate}
              loading={loading}
              mode={'contained'}
              style={{margin: 10}}
              disabled={hasErrorPrompt()}>
              <Text>Generate</Text>
            </Button>
          </Column>
        </View>
      </ScrollView>
    </>
  );
}
