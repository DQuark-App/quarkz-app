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
function Login({navigation}: {navigation: NavigationProp<any>}) {
  const store = useStore();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loginUsingEmail = async () => {
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
  };

  const loginUsingWallet = async () => {
    setError('');
    try {
      const [DQToken, pubKey, walletAuth] = await signMessage();

      store.setWalletToken(walletAuth, pubKey);

      const response = await fetch(`${API_URL}/custom-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${DQToken}`,
          pragma: 'no-cache',
          cache: 'no-store',
        },
      });
      if (response.status !== 200) {
        console.log(await response.text());
        setError('Cannot get token from server');
        return;
      }
      const json = await response.json();
      console.log(json);
      const data = json as {token: string};
      console.log(data);
      await auth().signInWithCustomToken(data.token);
    } catch (e) {
      const error = e as Error;
      const errorMessage = error.message || 'Cannot connect to wallet';
      setError(errorMessage);
    }
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
        backgroundColor: theme.colors.onBackground,
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
                color: theme.colors.surface,
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
              backgroundColor: theme.colors.onSurface,
              marginBottom: 8,
            }}
            onChangeText={setEmail}
            textColor={theme.colors.surface}
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
              backgroundColor: theme.colors.onSurface,
              marginBottom: 8,
            }}
            onChangeText={setPassword}
            textColor={theme.colors.surface}
            label={'Password'}
          />
          <HelperText type="error" visible={errorPassword()}>
            * Password is Empty!
          </HelperText>
          <Button
            mode={'contained'}
            style={{marginBottom: 8}}
            onPress={loginUsingEmail}>
            <Text style={{color: theme.colors.surface}}>Login</Text>
          </Button>
          <Button
            mode={'outlined'}
            style={{marginBottom: 8}}
            onPress={loginUsingWallet}>
            <Text style={{color: theme.colors.surface}}>Connect Wallet</Text>
          </Button>
          <Text
            style={{
              color: theme.colors.surface,
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
            <Text style={{color: theme.colors.surface}}>New User ? </Text>
            <Text style={{color: theme.colors.surface, fontWeight: 'bold'}}>
              Register Here
            </Text>
          </Button>
        </Column>
      </View>
    </View>
  );
}

export default Login;
