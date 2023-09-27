import {Button, useTheme} from 'react-native-paper';
import {Text, ToastAndroid} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';

export default function LoginGoogle() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log(e);
      ToastAndroid.show('Failed to login', ToastAndroid.SHORT);
    }
    setLoading(false);
  };
  return (
    <Button
      mode={'outlined'}
      style={{marginBottom: 8, backgroundColor: theme.colors.surface}}
      onPress={loginWithGoogle}
      loading={loading}
      icon={'google'}>
      <Text style={{color: theme.colors.primary}}>Login With Google</Text>
    </Button>
  );
}
