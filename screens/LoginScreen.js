// require('dotenv').config();
import {URL_LOCAL} from '@env';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, TextInput, View, Text, Button} from 'react-native';
import axios from 'axios';

const LoginScreen = ({dataSetMethod}) => {
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
        console.log(response.data);
        if (response.data) {
          dataSetMethod(true);
        }
      })
      .catch(err => {
        // err.response.data.errors.map(error => {
        //   console.log(error.message);
        // });
        console.log(err.response.data);
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
