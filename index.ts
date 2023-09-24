/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/app';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import {Buffer} from 'buffer';
global.Buffer = Buffer;
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

async function onMessageReceived(
  message: FirebaseMessagingTypes.RemoteMessage,
) {
  console.log('onMessageReceived', message);
  notifee.displayNotification({
    title: message.notification?.title,
    body: message.notification?.body,
    android: {
      channelId: 'default',
    },
  });
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);
GoogleSignin.configure({
  webClientId:
    '842529856758-dqoju2nd9bsa837ao3sk0ppnlhlbopsa.apps.googleusercontent.com',
});
AppRegistry.registerComponent(appName, () => App);
