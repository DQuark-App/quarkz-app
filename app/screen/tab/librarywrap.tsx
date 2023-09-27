import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListFile from '../listfile';
import React from 'react';
import Library from '../library';
const Stack = createNativeStackNavigator();

export default function LibraryWrap() {
  return (
    <Stack.Navigator
      initialRouteName={'LibraryDetail'}
      screenOptions={{navigationBarHidden: true, headerShown: false}}>
      <Stack.Screen name="LibraryDetail" component={Library} />
      <Stack.Screen name="File" component={ListFile} />
    </Stack.Navigator>
  );
}
