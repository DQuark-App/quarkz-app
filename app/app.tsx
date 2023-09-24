import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './screen/main';
import Providers from './providers';
import Login from './screen/login';
import useStore from './store';
import Register from './screen/register';

const Stack = createNativeStackNavigator();
//Use {navigation} : {navigation: NavigationProp} on pros to get navigation prop
function App() {
  const store = useStore();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={store.user != null ? 'Main' : 'Login'}
        screenOptions={{navigationBarHidden: true, headerShown: false}}>
        {store.user != null ? (
          <Stack.Screen name="Main" component={Main} />
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
