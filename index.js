/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import NavigationHandeler from './screens/NavigationHandler';
// import App from './App';
// NavigationHandeler

AppRegistry.registerComponent(appName, () => NavigationHandeler);
