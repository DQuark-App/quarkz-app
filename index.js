/**
 * @format
 */
import 'react-native-url-polyfill/auto';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {Buffer} from 'buffer';
global.Buffer = Buffer;
import App from './app/app';
async function onMessageReceived(message) {
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
