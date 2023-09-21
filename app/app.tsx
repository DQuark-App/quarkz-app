import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screen/home';
import Providers from './providers';

const Stack = createNativeStackNavigator();
//Use {navigation} : {navigation: NavigationProp} on pros to get navigation prop
export default function App() {
  return (
    <Providers>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Home'}
          screenOptions={{navigationBarHidden: true, headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Providers>
  );
}
