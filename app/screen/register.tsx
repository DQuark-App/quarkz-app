import {Image, Text, View} from 'react-native';
import {Button, HelperText, TextInput, useTheme} from 'react-native-paper';
import {Column, Row} from '../components/grid';
// @ts-ignore
import Logo from '../img/logo-no-background.png';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
function Register({navigation}: {navigation: NavigationProp<any>}) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [error, setError] = useState('');
  const registerUsingEmail = async () => {
    try {
      if (errorEmail() || errorPassword() || errorCPassword()) {
        return;
      }
      await auth().createUserWithEmailAndPassword(email, password);

      navigation.navigate('Login');
    } catch (e) {
      console.log(e);
      setError('Failed to register');
    }
  };

  const errorEmail = () => {
    return email === '' || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const errorPassword = () => {
    return password === '' || password.length < 6;
  };

  const errorCPassword = () => {
    return cpassword === '';
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
              Register
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
            * Password is Empty! (min. 6 character)
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
            onChangeText={setCPassword}
            textColor={theme.colors.surface}
            label={'Password Confirmation'}
          />
          <HelperText type="error" visible={errorCPassword()}>
            * Password Confirmation is Empty!
          </HelperText>
          <Button
            mode={'contained'}
            style={{marginBottom: 8}}
            onPress={registerUsingEmail}>
            <Text style={{color: theme.colors.surface}}>Register</Text>
          </Button>
          <Button
            mode={'text'}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{color: theme.colors.surface}}>
              Already Has Account ?{' '}
            </Text>
            <Text style={{color: theme.colors.surface, fontWeight: 'bold'}}>
              Login Here
            </Text>
          </Button>
        </Column>
      </View>
    </View>
  );
}

export default Register;
