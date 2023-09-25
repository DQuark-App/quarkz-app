import {Image, Text, View} from 'react-native';
import {Button, HelperText, TextInput, useTheme} from 'react-native-paper';
import {Column, Row} from '../components/grid';
// @ts-ignore
import Logo from '../img/logo-no-background.png';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import {signMessage} from '../utils/wallet';
// @ts-ignore
import {API_URL} from '@env';
import useStore from '../store';
import {NavigationProp} from '@react-navigation/native';
import axios, {AxiosError} from 'axios';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
function Login({navigation}: {navigation: NavigationProp<any>}) {
  const store = useStore();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const loginUsingEmail = async () => {
    setLoading(true);
    setError('');
    try {
      if (errorEmail() || errorPassword()) {
        return;
      }
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
      setError('Invalid Email or Password');
    }
    setLoading(false);
  };
  const loginWithGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log(e);
      setError('Failed to login');
    }
    setLoading(false);
  };
  const loginUsingWallet = async () => {
    setLoading(true);
    setError('');
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
      setError(errorMessage);
    }
    setLoading(false);
  };

  const errorEmail = () => {
    return email === '' || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const errorPassword = () => {
    return password === '';
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flex: 1, margin: 20}}>
        <Column alignItems={'stretch'} justifyContent={'flex-start'}>
          <Column alignItems={'center'} justifyContent={'flex-start'}>
            <Image
              source={Logo}
              style={{width: 200, height: 100, resizeMode: 'contain'}}
            />
          </Column>
          <Row alignItems={'center'} justifyContent={'center'}>
            <Text
              style={{
                color: theme.colors.onSurface,
                marginTop: 30,
                marginBottom: 30,
                fontSize: 30,
                fontWeight: 'bold',
              }}>
              Welcome to DQuark
            </Text>
          </Row>
          <HelperText type="error" visible={error !== ''}>
            {error}
          </HelperText>
          <TextInput
            theme={theme}
            mode={'outlined'}
            style={{
              backgroundColor: theme.colors.surface,
              marginBottom: 8,
            }}
            onChangeText={setEmail}
            textColor={theme.colors.onSurface}
            label={'Email'}
          />
          <HelperText type="error" visible={errorEmail()}>
            * Email address is not invalid!
          </HelperText>
          <TextInput
            theme={theme}
            mode={'outlined'}
            textContentType={'password'}
            secureTextEntry={true}
            style={{
              backgroundColor: theme.colors.surface,
              marginBottom: 8,
            }}
            onChangeText={setPassword}
            textColor={theme.colors.onSurface}
            label={'Password'}
          />
          <HelperText type="error" visible={errorPassword()}>
            * Password is Empty!
          </HelperText>
          <Button
            mode={'contained'}
            loading={loading}
            disabled={errorEmail() || errorPassword()}
            style={{marginBottom: 8}}
            onPress={loginUsingEmail}>
            <Text style={{color: theme.colors.surface}}>Login</Text>
          </Button>
          <Button
            mode={'outlined'}
            style={{marginBottom: 8, backgroundColor: theme.colors.surface}}
            onPress={loginWithGoogle}
            loading={loading}
            icon={'google'}>
            <Text style={{color: theme.colors.primary}}>Login With Google</Text>
          </Button>
          <Button
            style={{marginBottom: 8, backgroundColor: theme.colors.onSurface}}
            mode={'outlined'}
            loading={loading}
            onPress={loginUsingWallet}>
            <Text style={{color: theme.colors.surface}}>Connect Wallet</Text>
          </Button>
          <Text
            style={{
              color: theme.colors.onBackground,
              marginBottom: 8,
              textAlign: 'center',
            }}>
            OR
          </Text>
          <Button
            mode={'text'}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={{color: theme.colors.onBackground}}>New User ? </Text>
            <Text style={{color: theme.colors.onSurface, fontWeight: 'bold'}}>
              Register Here
            </Text>
          </Button>
        </Column>
      </View>
    </View>
  );
}

export default Login;
