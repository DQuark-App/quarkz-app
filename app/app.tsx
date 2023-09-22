import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './screen/main';
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
          <Stack.Screen name="Home" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </Providers>
  );
}
