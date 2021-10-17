import React, {useContext, useEffect, useState} from 'react';
import {Button, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userContext} from './context/userContext';

const App = ({navigation}) => {
  // states
  const [dataIsAvailable, setDataIsAvailable] = useState(false);

  // const [userData, setUserData] = useState({});
  const {user, setUser} = useContext(userContext);

  // mothods

  const checkData = async () => {
    const data = await AsyncStorage.getItem('@userData');
    // console.log(data);
    if (data !== null) {
      // setDataIsAvailable(true);
      const jdata = await JSON.parse(data);
      setUser(jdata);

      console.log('HOME', jdata);
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } else {
      // console.log('LOGIn');
      // setDataIsAvailable(false);
      navigation.reset({
        index: 0,
        // TODO: here i have to change it again to login when profile fill completes
        routes: [{name: 'LoginScreen'}],
        // routes: [{name: 'ProfileFill'}],
      });
      // navigation.navigate('LoginScreen');
    }
  };

  const clearData = async () => {
    await AsyncStorage.removeItem('@userData');
    setDataIsAvailable(false);
    setUserData({});
  };

  //   effects
  useEffect(() => {
    checkData();
  }, []);

  //    render things accordingly
  return user != null ? (
    <>
      <Text>Redirect to home page</Text>
    </>
  ) : (
    <>
      <Text>Redirect to login screen</Text>
    </>
  );
};

export default App;
