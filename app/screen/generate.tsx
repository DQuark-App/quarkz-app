import {Text, ToastAndroid, View} from 'react-native';
import {
  Button,
  HelperText,
  SegmentedButtons,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {Column, Row} from '../components/grid';
import {useState} from 'react';
import DQService from '../service';
import {NavigationProp} from '@react-navigation/native';
// @ts-ignore
import {IPFS_GATEWAY} from '@env';
import {AxiosError} from 'axios';

export default function Generate({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const theme = useTheme();
  const [mode, setMode] = useState('standard');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      if (hasErrorPrompt()) {
        return;
      }

      const response = await DQService.instance.createArt(prompt);
      const generatedResult = response.data as {cid: string};

      setPrompt('');
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

  return (
    <>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: theme.colors.background,
        }}>
        <Text
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
            <SegmentedButtons
              value={mode}
              style={{
                marginRight: 10,
                marginLeft: 10,
                marginTop: 10,
                width: 200,
              }}
              onValueChange={value => setMode(value)}
              buttons={[
                {
                  value: 'standard',
                  label: 'Standard',
                },
                {
                  value: 'hd',
                  label: 'HD',
                },
              ]}
            />
          </Row>
          <TextInput
            style={{marginRight: 10, marginLeft: 10, marginTop: 10}}
            onChangeText={text => setPrompt(text)}
            mode={'outlined'}
            label={'Prompt'}
            multiline={true}
            numberOfLines={4}
            placeholder={'eg. A cat in a hat'}
          />
          <HelperText
            type="error"
            visible={hasErrorPrompt()}
            style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
            * Prompt your AI with a sentence!
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
    </>
  );
}
