import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListFile from '../listfile';
import React from 'react';
import Library from '../library';
import ImagePreview from '../imagepreview';
import Minting from '../minting';

const Stack = createNativeStackNavigator();

export default function LibraryWrap() {
  return (
    <Stack.Navigator
      initialRouteName={'Library'}
      screenOptions={{navigationBarHidden: true, headerShown: false}}>
      <Stack.Screen name="Library" component={Library} />
      <Stack.Screen name="File" component={ListFile} />
      <Stack.Screen name="ImagePreview" component={ImagePreview} />
      <Stack.Screen name="Minting" component={Minting} />
    </Stack.Navigator>
  );
}
