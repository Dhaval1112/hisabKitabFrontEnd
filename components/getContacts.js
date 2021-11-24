import {PermissionsAndroid} from 'react-native';

import Contacts from 'react-native-contacts';

const getContacts = (setContacts, navigation, setIsLoading) => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    title: 'Contacts',
    message: 'This app would like to view your contacts.',
    buttonPositive: 'Please accept bare mortal',
    buttonNegative: 'cancel',
  }).then(res => {
    if (res == 'denied') {
      // console.log('Denied');
      navigation.navigate('Home');
    } else if (res == 'granted') {
      // console.log('BEFORE START', new Date().getSeconds());
      Contacts.getAll().then(contacts => {
        if (contacts == undefined) {
          setContacts([]);
        } else {
          const requiredDetailedContacts = contacts.map(num => {
            //   console.log(num == undefined);
            //   console.log(num + '\n\n');
            if (
              num.phoneNumbers[0] != undefined &&
              num.displayName != undefined
            ) {
              const mobileNumberWithoutClear =
                num.phoneNumbers[0].number.replace(/\D/g, '');
              const user = {
                name: num.displayName,
                num:
                  mobileNumberWithoutClear.length > 10
                    ? mobileNumberWithoutClear.substr(
                        mobileNumberWithoutClear.length - 10,
                      )
                    : mobileNumberWithoutClear,
              };
              // console.log(user);

              return user;
            }
          });
          // console.log('AFTER END', new Date().getSeconds());
          // console.log(requiredDetailedContacts);
          requiredDetailedContacts.sort((a, b) => {
            return a.name.toLowerCase() > b.name.toLowerCase();
          });
          setContacts(requiredDetailedContacts);
          setIsLoading(false);
          // console.log(contacts);
          // console.log('LAST');
        }
      });
    }
  });
};

export default getContacts;
