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

GoogleSignin.configure({
  webClientId:
    '842529856758-dqoju2nd9bsa837ao3sk0ppnlhlbopsa.apps.googleusercontent.com',
});
AppRegistry.registerComponent(appName, () => App);
