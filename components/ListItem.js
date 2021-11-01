import React, {useContext} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import {currentCustomerContext} from '../context/currentCustomerContext';
import {customersContext} from '../context/customersContext';
import {userContext} from '../context/userContext';
import {addNewCustomer, createNewRoom} from '../Functions/addNewCustomer';

const callHelper = (
  item,
  userId,
  customers,
  setCustomers,
  navigation,
  setCurrentCustomer,
) => {
  addNewCustomer(item)
    .then(data => {
      // console.log('GOT USERS DATA', data);
      // TODO: process for creating room
      console.log('\n\n USER DATA IN LISTITEM', data);
      Alert.alert(
        'Create customer',
        data._id + '\n' + item.name + '\n' + item.num,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              console.log('BOth users id :: ', userId, '  ', data._id);
              createNewRoom(userId, data._id, item.name)
                .then(data => {
                  console.log('\n\nROOM DATA', data);
                  if (!data.isExists) {
                    setCustomers([...customers, data.room]);
                  }

                  setCurrentCustomer(data.room);

                  navigation.navigate('CustomerPage', data.room);
                  console.log('\n\nadded', customers);
                })
                .catch(err => {
                  console.log('Err', err);
                });
            },
          },
        ],
      );
    })
    .catch(err => {
      Alert.alert('Error message', err);
    });
};

const ListItem = ({item, userId, navigation}) => {
  const {customers, setCustomers} = useContext(customersContext);
  const {setCurrentCustomer} = useContext(currentCustomerContext);
  return (
    <TouchableOpacity
      style={styles.list}
      //   Alert.alert('Details', item.name + '\n' + item.num)
      onPress={async () => {
        // Alert.alert('Details', item.name + '\n' + item.num);
        const user = await callHelper(
          item,
          userId,
          customers,
          setCustomers,
          navigation,
          setCurrentCustomer,
        );
      }}>
      <View style={styles.avatar}>
        <UserAvatar size={32} name={item.name} />
      </View>
      <View>
        <Text style={{color: 'black'}}>{item.name}</Text>
        <Text>{item.num}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = new StyleSheet.create({
  list: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    // flex: 1,
    flexDirection: 'row',
    borderTopColor: 'gray',
    borderBottomColor: 'gray',
    borderWidth: 0.2,
  },
  avatar: {width: 32, height: 32, marginRight: 12},
});

export default ListItem;
