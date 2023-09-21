/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/app';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

AppRegistry.registerComponent(appName, () => App);
