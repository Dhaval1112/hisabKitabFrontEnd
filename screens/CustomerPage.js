import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {currentCustomerContext} from '../context/currentCustomerContext';
import EntriesCustomerElements from '../components/EntriesCustomerElements';

export default function CustomerPage({route, navigation}) {
  const [customer, setCustomer] = useState(route.params);

  // console.log('\n\nRoute.params', route.params.customerName);

  const {currentCustomer} = useContext(currentCustomerContext);
  // console.log('\n\nCurrent Customer', currentCustomer.customerName);
  useEffect(() => {
    return () => {
      customer, currentCustomer;
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      {currentCustomer.entries.length != 0 ? (
        <View style={{flex: 1}}>
          {/* entries */}
          <EntriesCustomerElements
            customer={currentCustomer}></EntriesCustomerElements>
        </View>
      ) : (
        <Text>Show them pic</Text>
      )}
      {/* do transaction */}
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
                  navigation.navigate('DoEntryScreen', {
                    isRecieve: true,
                    room: customer,
                  })
                }></Button>
            </View>
            <View style={{width: '45%'}}>
              <Button
                title="Given"
                color="red"
                onPress={() =>
                  navigation.navigate('DoEntryScreen', {
                    isRecieve: false,
                    room: customer,
                  })
                }></Button>
            </View>
          </View>
        </View>
        {/* view for buttons */}
      </View>
    </View>
  );
}

const styles = new StyleSheet.create({
  recieve: {
    fontSize: 20,
    color: 'green',
  },
  given: {
    fontSize: 20,
    color: 'red',
    textAlign: 'right',
  },
});
