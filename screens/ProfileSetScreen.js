import axios from 'axios';
import {URL_LOCAL} from '@env';

import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text, TextInput, Button, Alert} from 'react-native';
import {commonViewStyle} from '../styles/commonView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileSetScreen = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setuserId] = useState('');

  const setData = async userData => {
    // const obj = {name: 'JAYDEEP', lname: 'VAGHELA'};
    console.log('HERE IN SET DATA');
    try {
      await AsyncStorage.setItem('@userData', JSON.stringify(userData));
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onProfileButtonClick = () => {
    let message = '';
    if (name == '' || name.length < 2) {
      message += 'Enter Your Name with at least 2 character\n\n';
    }
    if (lastName == '' || lastName.length < 2) {
      message += 'Enter your last name with at least 2 character \n\n';
    }
    if (email == '') {
      message += 'Enter your email Address \n EX\n example@gmail.com';
    }

    if (message == '') {
      // Alert.alert('You have provided all details', 'Congrats');
      axios
        .post(URL_LOCAL + 'updateProfile', {name, lastName, email, userId})
        .then(response => {
          console.log('User profile is updated', response.data);
          setData(response.data);
          Alert.alert('You have provided all details', 'Congrats');
        })
        .catch(err => {
          let message = '';
          err.response.data.errors.map(
            data => (message += data.message + '\n'),
          );
          Alert.alert('Required fields ', message);
        });
    } else {
      Alert.alert('Required fields ', message);
    }
  };

  // TODO: for setting already signup user's data
  useEffect(() => {
    let usersData = route.params;

    setuserId(usersData._id);

    console.log('USER ID ', userId);

    if (usersData.profile !== undefined) {
      console.log('Users data in PROFILE SCREEN in if ', route.params);
      setName(usersData.profile.name);
      setLastName(usersData.profile.lastName);
      setEmail(usersData.profile.email);
    } else {
      console.log('Users data in PROFILE SCREEN ', route.params);
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={{...commonViewStyle, marginTop: 24}}>
        <TextInput
          textContentType="name"
          placeholder="Enter your name"
          value={name}
          keyboardType="default"
          onChangeText={setName}
          style={{
            borderColor: 'gray',
            borderWidth: 2,
            marginVertical: 5,
            paddingLeft: 15,
          }}
        />

        <TextInput
          textContentType="name"
          placeholder="Enter your last name"
          value={lastName}
          keyboardType="default"
          onChangeText={setLastName}
          style={{
            borderColor: 'gray',
            borderWidth: 2,
            marginVertical: 5,
            paddingLeft: 15,
          }}
        />

        <TextInput
          textContentType="emailAddress"
          placeholder="Enter your email Address"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
          style={{
            borderColor: 'gray',
            borderWidth: 2,
            marginVertical: 5,
            paddingLeft: 15,
          }}
        />

        <Button
          title="Submit Profile Data"
          onPress={onProfileButtonClick}
          color="green"
          style={{}}></Button>
      </View>
    </SafeAreaView>
  );
};

export default ProfileSetScreen;
