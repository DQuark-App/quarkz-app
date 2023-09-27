import {Text, ToastAndroid} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {useState} from 'react';
import {signMessage} from '../utils/wallet';
import axios, {AxiosError} from 'axios';
import auth from '@react-native-firebase/auth';
import useStore from '../store';
// @ts-ignore
import {API_URL} from '@env';
export default function LoginWallet() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const store = useStore();
  const loginUsingWallet = async () => {
    setLoading(true);
    try {
      const [DQToken, pubKey, walletAuth] = await signMessage(store.network);
      store.setWalletToken(walletAuth, pubKey);

      const response = await axios.post(
        `${API_URL}/api/custom-token`,
        {},
        {
          headers: {
            'content-type': 'application/json',
            authorization: DQToken,
          },
        },
      );

      const json = await response.data;
      const data = json as {token: string};
      await auth().signInWithCustomToken(data.token);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
      const serverError = error.response?.data as {error: string};
      const errorMessage =
        serverError.error || error.message || 'Cannot connect to wallet';
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    }
    setLoading(false);
  };

  return (
    <Button
      style={{marginBottom: 8, backgroundColor: theme.colors.onSurface}}
      mode={'outlined'}
      loading={loading}
      onPress={loginUsingWallet}>
      <Text style={{color: theme.colors.surface}}>Connect Wallet</Text>
    </Button>
  );
}
