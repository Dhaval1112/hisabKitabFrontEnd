import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Alert} from 'react-native';
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
import io from 'socket.io-client';
import {socketContext} from '../context/socketContext';

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
  // const userValue = useMemo(
  //   () => ({
  //     user,
  //     setUser,
  //     entryList,
  //     setEntryList,
  //   }),
  //   [user, entryList],
  // );

  const [customers, setCustomers] = useState([]);
  // const customersValue = useMemo(
  //   () => ({
  //     customers,
  //     setCustomers,
  //   }),
  //   [customers],
  // );

  const [socket, setSocket] = useState(null);

  const [currentCustomer, setCurrentCustomer] = useState(null);

  // const currentCustomerValue = useMemo(
  //   () => ({currentCustomer, setCurrentCustomer}),
  //   [currentCustomer, setCurrentCustomer],
  // );
  // console.log('\n\n cc', currentCustomer);

  useEffect(() => {
    const socket = io('http://192.168.43.64:5000', {query: 'id=9409301610'});

    socket.on('connect', () => {
      console.log('socket is now connected', socket.id);
      setSocket(socket);
      // socket.emit('chat', {say: 'BYE BYE'});
    });

    socket.emit('chat', {say: 'Hello', mobile: user.mobileNo});
    socket.on('chat', data => {
      console.log(data);
    });
    socket.on('private', data => {
      // setSocketname('PRIVATE  :', data);
      console.log('PRIVATE ', data);
    });
  }, [currentCustomer]);

  return (
    <NavigationContainer>
      <socketContext.Provider value={{socket, setSocket}}>
        <customersContext.Provider value={{customers, setCustomers}}>
          {/* <customersContext.Provider value={customersValue}> */}
          <userContext.Provider
            value={{user, setUser, entryList, setEntryList}}>
            {/* <userContext.Provider value={userValue}> */}
            <currentCustomerContext.Provider
              value={{currentCustomer, setCurrentCustomer}}>
              {/* <currentCustomerContext.Provider value={currentCustomerValue}> */}
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
            </currentCustomerContext.Provider>
          </userContext.Provider>
        </customersContext.Provider>
      </socketContext.Provider>
    </NavigationContainer>
  );
};

export default NavigationHandeler;
