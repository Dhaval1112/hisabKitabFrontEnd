import {Button, ScrollView, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

export default function CustomerPage({route, navigation}) {
  const [customer, setCustomer] = useState(route.params);
  //   console.log('\n\n ROUTE PARAMS', route.params);
  //   TODO: if customer is not have any antry then show them pic
  return customer.entries.length == 0 ? (
    <View
      style={{
        position: 'absolute',
        bottom: 9,
        width: '100%',
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          {customer.grandTotal}
        </Text>
      </View>
      {/* view for ammount */}
      <View
        style={{
          paddingVertical: 3,
          width: '96%',
          borderColor: 'gray',
          borderWidth: 1,
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 5,
          }}>
          <View style={{width: '45%'}}>
            <Button
              title="Recieve"
              color="green"
              onPress={() =>
                navigation.navigate('DoEntryScreen', true)
              }></Button>
          </View>
          <View style={{width: '45%'}}>
            <Button
              title="Given"
              color="red"
              onPress={() =>
                navigation.navigate('DoEntryScreen', false)
              }></Button>
          </View>
        </View>
      </View>
      {/* view for buttons */}
    </View>
  ) : (
    <Text>Show them pic</Text>
  );
}
