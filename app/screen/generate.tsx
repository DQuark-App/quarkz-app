import {ScrollView, Text, ToastAndroid, View} from 'react-native';
import {
  Button,
  HelperText,
  Modal,
  Portal,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {Column, Row} from '../components/grid';
import {useEffect, useState} from 'react';
import DQService, {ModelResponse} from '../service';
import {NavigationProp} from '@react-navigation/native';
// @ts-ignore
import {IPFS_GATEWAY} from '@env';
import {AxiosError} from 'axios';
import {useRealm} from '../providers';
import {Model} from '../schema';
import crashlytics from '@react-native-firebase/crashlytics';
import Styleselector from '../components/styleselector';

export default function Generate({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const theme = useTheme();
  const [mode, setMode] = useState('standard');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSelect, setSelected] = useState(false);
  const [init, setInit] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
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
    } catch (e: any) {
      crashlytics().log(e.message || 'Error syncing models');
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
    if (!init) {
      syncModels();
      setInit(true);
    }
  }, [init]);

  return (
    <>
      <Portal>
        <Modal
          style={{flex: 1}}
          onDismiss={() => setSelected(false)}
          theme={theme}
          visible={isSelect}
          dismissable={true}
          contentContainerStyle={{
            padding: 10,
            margin: 10,
            backgroundColor: theme.colors.background,
            borderRadius: 10,
            zIndex: 1000,
          }}
          dismissableBackButton={true}>
          <Column alignItems={'flex-start'} justifyContent={'center'}>
            <Text style={{color: theme.colors.primary, fontWeight: 'bold'}}>
              SELECT STYLE
            </Text>
            <Styleselector
              onSelect={item => {
                setSelectedModel(item.name);
                setSelected(false);
              }}
            />
          </Column>
        </Modal>
      </Portal>
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
                  color: theme.colors.onBackground,
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
                color: theme.colors.onBackground,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Write your NFT idea here
            </Text>
            <TextInput
              disabled={loading}
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
            <Row alignItems={'center'} justifyContent={'space-between'}>
              <Text
                style={{
                  marginRight: 10,
                  marginLeft: 10,
                  marginTop: 10,
                  color: theme.colors.onBackground,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Style
              </Text>
              <Button
                onPress={() => setSelected(true)}
                mode={'text'}
                style={{marginRight: 10, marginLeft: 10, marginTop: 10}}
                disabled={loading}>
                {selectedModel
                  ? selectedModel.replaceAll('-', ' ').toUpperCase()
                  : 'Select Style'}
              </Button>
            </Row>
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
              disabled={hasErrorPrompt() || hasErrorModel()}>
              <Text>Generate</Text>
            </Button>
          </Column>
        </View>
      </ScrollView>
    </>
  );
}
