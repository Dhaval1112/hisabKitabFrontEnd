import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import addNewCustomer from '../Functions/addNewCustomer';

const callHelper = item => {
  addNewCustomer(item)
    .then(data => {
      // console.log('GOT USERS DATA', data);
      // TODO: process for creating room
      Alert.alert(
        'Create customer',
        data._id + '\n' + item.name + '\n' + item.num,
      );
    })
    .catch(err => {
      Alert.alert('Error message', err);
    });
};

const ListItem = ({item}) => {
  return (
    <TouchableOpacity
      style={styles.list}
      //   Alert.alert('Details', item.name + '\n' + item.num)
      onPress={async () => {
        // Alert.alert('Details', item.name + '\n' + item.num);
        const user = await callHelper(item);
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
    flex: 1,
    flexDirection: 'row',
    borderTopColor: 'gray',
    borderBottomColor: 'gray',
    borderWidth: 0.2,
  },
  avatar: {width: 32, height: 32, marginRight: 12},
});

export default ListItem;
