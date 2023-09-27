import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListFile from '../listfile';
import React from 'react';
import Generate from '../generate';
const Stack = createNativeStackNavigator();

export default function GenerateWrap() {
  return (
    <Stack.Navigator
      initialRouteName={'GenerateDetail'}
      screenOptions={{navigationBarHidden: true, headerShown: false}}>
      <Stack.Screen name="GenerateDetail" component={Generate} />
      <Stack.Screen name="File" component={ListFile} />
    </Stack.Navigator>
  );
}
