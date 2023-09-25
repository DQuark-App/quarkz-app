import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListFile from '../listfile';
import React from 'react';
import Home from './home';
import ImagePreview from '../imagepreview';
import Minting from '../minting';

const Stack = createNativeStackNavigator();

export default function HomeWrap() {
  return (
    <Stack.Navigator
      initialRouteName={'HomeDetail'}
      screenOptions={{navigationBarHidden: true, headerShown: false}}>
      <Stack.Screen name="HomeDetail" component={Home} />
      <Stack.Screen name="File" component={ListFile} />
      <Stack.Screen name="ImagePreview" component={ImagePreview} />
      <Stack.Screen name="Minting" component={Minting} />
    </Stack.Navigator>
  );
}
