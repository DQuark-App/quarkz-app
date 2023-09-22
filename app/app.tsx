import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './screen/main';
import Providers from './providers';
import Login from './screen/login';
import useStore from './store';

const Stack = createNativeStackNavigator();
//Use {navigation} : {navigation: NavigationProp} on pros to get navigation prop
function App() {
  const store = useStore();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{navigationBarHidden: true, headerShown: false}}>
        {store.user != null ? (
          <Stack.Screen name="Home" component={Main} />
        ) : (
          <Stack.Screen name="Home" component={Login} />
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
