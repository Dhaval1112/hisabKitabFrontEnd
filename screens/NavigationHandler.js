import React, {useContext, useState} from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './Home';
import {HomeHeaderStyle, makeHeaderStyle} from '../styles/Headers';
import App from '../App';
import LoginScreen from './LoginScreen';
import ProfileSetScreen from './ProfileSetScreen';
import AddCustomer from './AddCustomer';
import {userContext} from '../context/userContext';
import {customersContext} from '../context/customersContext';
import CustomerPage from './CustomerPage';
import {currentCustomerContext} from '../context/currentCustomerContext';
import DoEntryScreen from './DoEntryScreen';
CustomerPage;

const Stack = createNativeStackNavigator();
// this is style for header

const stackCreatorWithoutHeader = (name, component) => {
  return (
    <Stack.Screen
      options={{headerShown: false}}
      name={name}
      component={component}></Stack.Screen>
  );
};

const stackCreator = (name, component, title) => {
  return (
    <Stack.Screen
      name={name}
      component={component}
      options={makeHeaderStyle(title)}></Stack.Screen>
  );
};

const NavigationHandeler = () => {
  const [user, setUser] = useState({name: 'jaydeep'});

  const [entryList, setEntryList] = useState([]);

  const [customers, setCustomers] = useState([]);

  const [currentCustomer, setCurrentCustomer] = useState(null);
  console.log('\n\n cc', currentCustomer);

  return (
    <customersContext.Provider value={{customers, setCustomers}}>
      <userContext.Provider value={{user, setUser, entryList, setEntryList}}>
        <currentCustomerContext.Provider
          value={{currentCustomer, setCurrentCustomer}}>
          <NavigationContainer>
            {/* <Stack.Navigator initialRouteName="Home">
        {stackCreator('Home', Home)}
      </Stack.Navigator> */}
            <Stack.Navigator initialRouteName="App">
              {stackCreator('App', App, 'App')}
              {stackCreator('Home', Home, 'HisabKitab')}
              {stackCreatorWithoutHeader('LoginScreen', LoginScreen)}
              {stackCreator('ProfileFill', ProfileSetScreen, 'Profile')}
              {stackCreator('AddCustomer', AddCustomer, 'Add Customer')}
              {stackCreator(
                'CustomerPage',
                CustomerPage,
                currentCustomer == null
                  ? 'Customer'
                  : currentCustomer.customerName,
              )}
              {stackCreator(
                'DoEntryScreen',
                DoEntryScreen,
                currentCustomer == null
                  ? 'Customer'
                  : currentCustomer.customerName,
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </currentCustomerContext.Provider>
      </userContext.Provider>
    </customersContext.Provider>
  );
};

export default NavigationHandeler;
