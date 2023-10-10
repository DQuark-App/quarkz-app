import {Image, Text, View} from 'react-native';
import {Button, HelperText, TextInput, useTheme} from 'react-native-paper';
import {Column, Row} from '../components/grid';
// @ts-ignore
import Logo from '../img/logo-no-background.png';
import {useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
function Forgot({navigation}: {navigation: NavigationProp<any>}) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const registerUsingEmail = async () => {
    try {
      if (errorEmail()) {
        return;
      }
      await auth().sendPasswordResetEmail(email);

      navigation.goBack();
    } catch (e: any) {
      crashlytics().log(e.message || 'Error registering with email');
      console.log(e);
      setError('Failed to register');
    }
  };

  const errorEmail = () => {
    return email === '' || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
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
              Forgot Password
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
            textColor={theme.colors.onBackground}
            label={'Email'}
          />
          <HelperText type="error" visible={errorEmail()}>
            * Email address is not invalid!
          </HelperText>
          <Button
            disabled={errorEmail()}
            mode={'contained'}
            style={{marginBottom: 8}}
            onPress={registerUsingEmail}>
            <Text style={{color: theme.colors.surface}}>Register</Text>
          </Button>
          <Button
            mode={'text'}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{color: theme.colors.onSurface, fontWeight: 'bold'}}>
              Back to Login
            </Text>
          </Button>
        </Column>
      </View>
    </View>
  );
}

export default Forgot;
