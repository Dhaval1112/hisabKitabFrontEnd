// require('dotenv').config();
import {URL_LOCAL} from '@env';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, TextInput, View, Text, Button, Alert} from 'react-native';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      mobileNumber;
    };
  }, []);

  const onNumberSubmit = () => {
    setIsLoading(true);
    const url = URL_LOCAL + 'signup';
    console.log(mobileNumber);
    console.log(url);
    axios
      .post(url, {mobileNo: mobileNumber})
      .then(response => {
        // console.log(response.data);
        if (response.data) {
          
          console.log('FROM LOGIN SCREEN', response.data);
          navigation.navigate('ProfileFill', response.data);
        }
      })
      .catch(err => {
        let errorMessage = '';
        console.log(err.response.data);
        err.response.data.errors.map(error => {
          console.log(error.message);
          errorMessage += error.message + '\n';
        });
        console.log(errorMessage);
        // TODO: this message comes from server
        Alert.alert('Error message', errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return isLoading ? (
    <Text>Loading</Text>
  ) : (
    <>
      <SafeAreaView>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            height: '100%',
            justifyContent: 'flex-end',
            paddingBottom: 22,
          }}>
          <TextInput
            placeholder="Enter your mobile number"
            value={mobileNumber}
            keyboardType="numeric"
            onChangeText={setMobileNumber}
            style={{
              borderColor: 'gray',
              borderWidth: 2,
              marginVertical: 5,
              paddingLeft: 15,
            }}
          />
          <Button
            title="Submit"
            color="green"
            onPress={onNumberSubmit}
            style={{}}></Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
