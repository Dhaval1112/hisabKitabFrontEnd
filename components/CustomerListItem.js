import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
// function to redirect
const navigateDataToCustomer = (navigation, item, setCurrentCustomer) => {
  console.log(item);
  setCurrentCustomer(item);
  navigation.navigate('CustomerPage', item);
};

// file component
export default function CustomerListItem({
  item,
  navigation,
  setCurrentCustomer,
}) {
  return (
    <TouchableOpacity
      style={styles.list}
      //   Alert.alert('Details', item.name + '\n' + item.num)
      onPress={() => {
        navigateDataToCustomer(navigation, item, setCurrentCustomer);
      }}>
      <View style={styles.avatar}>
        <UserAvatar size={32} name={item.customerName} />
      </View>
      <View
        style={{
          width: '100%',
          //   backgroundColor: 'red',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '67%',
            //   backgroundColor: 'gray'
            overflow: 'hidden',
          }}>
          <Text style={{color: 'black', fontWeight: '500'}}>
            {item.customerName}
          </Text>
          <Text>
            {item.entries.length == 0 ? 'Do transaction' : 'last transaction'}
          </Text>
        </View>

        <View style={{flexDirection: 'row', width: '22%'}}>
          <Text
            style={{
              fontSize: 15,
              width: '100%',
              fontWeight: 'bold',
              alignContent: 'center',
              textAlign: 'center',
              textAlignVertical: 'center',
              //   backgroundColor: 'yellow',
              color: 'green',
              overflow: 'hidden',
            }}>
            {item.grandTotal}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = new StyleSheet.create({
  list: {
    paddingVertical: 5,
    paddingHorizontal: 10,

    flexDirection: 'row',
    borderTopColor: 'gray',
    borderBottomColor: 'gray',
    borderWidth: 0.2,
  },
  avatar: {width: 32, height: 32, marginRight: 12},
});
