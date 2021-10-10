import axios from 'axios';
import {URL_LOCAL} from '@env';
import {Alert} from 'react-native';

const addNewCustomer = item => {
  return new Promise((resolve, reject) => {
    const url = URL_LOCAL + 'signup';
    axios
      .post(url, {mobileNo: item.num})
      .then(response => {
        // console.log('res', response.data);
        if (response.data) {
          // console.log('FROM LOGIN SCREEN', response.data);

          // navigation.navigate('ProfileFill', response.data);
          resolve(response.data);
        }
      })
      .catch(err => {
        // console.log('error', err);
        let errorMessage = '';
        console.log(err.response.data);
        err.response.data.errors.map(error => {
          console.log(error.message);
          errorMessage += error.message + '\n';
        });
        // console.log(errorMessage);
        // TODO: this message comes from server

        reject(errorMessage);
      });
  });
  // .finally(() => {
  //   setIsLoading(false);
  // });
};

export default addNewCustomer;
