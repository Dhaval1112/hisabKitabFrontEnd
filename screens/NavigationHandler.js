import React from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './Home';
import {HomeHeaderStyle, LoginHeaderStyle} from '../styles/Headers';
import App from '../App';
import LoginScreen from './LoginScreen';

const Stack = createNativeStackNavigator();
// this is style for header

const stackCreator = (name, component) => {
  return (
    <Stack.Screen
      name={name}
      component={component}
      // options={HomeHeaderStyle}
    ></Stack.Screen>
  );
};

const NavigationHandeler = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home">
        {stackCreator('Home', Home)}
      </Stack.Navigator> */}
      <Stack.Navigator
        initialRouteName="App"
        screenOptions={{
          headerShown: false,
        }}>
        {stackCreator('App', App)}
        {stackCreator('Home', Home)}
        {stackCreator('LoginScreen', LoginScreen)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationHandeler;
