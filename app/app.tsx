import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './screen/main';
import Providers from './providers';
import Login from './screen/login';
import useStore from './store';
import Register from './screen/register';
import {PermissionsAndroid, Platform} from 'react-native';
import ImagePreview from './screen/imagepreview';
import Minting from './screen/minting';

const Stack = createNativeStackNavigator();
//Use {navigation} : {navigation: NavigationProp} on pros to get navigation prop
function App() {
  const store = useStore();

  useEffect(() => {
    try {
      if ((Platform.Version as number) >= 33) {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ]);

        if (Platform.Version > 33) {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        }
      } else {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={store.user != null ? 'Main' : 'Login'}
        screenOptions={{navigationBarHidden: true, headerShown: false}}>
        {store.user != null ? (
          <>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="ImagePreview" component={ImagePreview} />
            <Stack.Screen name="Minting" component={Minting} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppWithProviders() {
  return (
    <Providers>
      <App />
    </Providers>
  );
}
