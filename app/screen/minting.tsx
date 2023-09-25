import {Button, IconButton, TextInput, useTheme} from 'react-native-paper';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Alert, Image, Text, ToastAndroid, View} from 'react-native';
import {Column, Row} from '../components/grid';
import {useState} from 'react';
import DQService from '../service';
import {mintNFT} from '../utils/wallet';
import useStore from '../store';

export default function Minting({
  route,
  navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}) {
  const theme = useTheme();
  const store = useStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadMetadata = async () => {
    const metadata = {
      name: name,
      description: description,
      image: route.params?.uri,
    };

    const response = await DQService.instance.uploadMetadata(metadata);
    const metadataResponse = response.data as {cid: string};

    return metadataResponse.cid;
  };

  const onmintNFT = async () => {
    setLoading(true);
    await uploadMetadata();
    try {
      await mintNFT(
        route.params?.uri,
        name,
        store.walletToken,
        store.walletPubKey,
      );

      ToastAndroid.show('NFT Minted', ToastAndroid.SHORT);

      navigation.goBack();
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Failed to mint NFT');
    }
    setLoading(false);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: theme.colors.background,
          paddingTop: 15,
          paddingRight: 15,
        }}>
        <Row alignItems={'center'} justifyContent={'flex-start'}>
          <IconButton
            icon={'chevron-left'}
            onPress={() => {
              navigation.goBack();
            }}
            size={30}
          />
          <Text
            style={{
              color: theme.colors.onBackground,
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            Mint As NFT
          </Text>
        </Row>
        <View style={{flex: 1, padding: 15}}>
          <Image
            source={{uri: route.params?.uri}}
            style={{width: '100%', height: 200, resizeMode: 'contain'}}
          />
          <Column alignItems={'stretch'} justifyContent={'flex-start'}>
            <TextInput
              theme={theme}
              mode={'outlined'}
              style={{
                backgroundColor: theme.colors.surface,
                marginBottom: 8,
                marginTop: 8,
              }}
              onChangeText={setName}
              textColor={theme.colors.onSurface}
              label={'Name'}
            />
            <TextInput
              theme={theme}
              mode={'outlined'}
              contentStyle={{height: 100}}
              multiline={true}
              inputMode={'numeric'}
              style={{
                backgroundColor: theme.colors.surface,
                marginBottom: 8,
                marginTop: 8,
              }}
              onChangeText={setDescription}
              textColor={theme.colors.onSurface}
              label={'Description'}
            />
            <Button mode={'contained'} onPress={onmintNFT} loading={loading}>
              <Text>Mint NFT</Text>
            </Button>
          </Column>
        </View>
      </View>
    </>
  );
}
