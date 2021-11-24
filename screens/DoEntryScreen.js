import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {socketContext} from '../context/socketContext';
import {userContext} from '../context/userContext';
import {currentCustomerContext} from '../context/currentCustomerContext';
import {customersContext} from '../context/customersContext';
import LoadingComponent from '../components/LoadingComponent';

const DoEntryScreen = ({route, navigation}) => {
  const {isRecieve, room} = route.params;

  // extra all customers
  const {customers, setCustomers} = useContext(customersContext);

  // console.log('Recieve ', isRecieve);

  const [amount, setAmount] = useState('');

  const [showCalender, setShowCalender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const {currentCustomer, setCurrentCustomer} = useContext(
    currentCustomerContext,
  );

  // user data from global object
  const {user} = useContext(userContext);
  // console.log('DO ENTRY SCREEN IS RECIEVE', isRecieve);

  useEffect(() => {
    socket.on('EntryStatus', data => {
      // setCount(++count);

      // count++;
      // console.log('SOCKET DATA IN HANDLER', data);
      if (data.status) {
        // console.log('\n\nCustomers \n', customers);
        setCustomers(
          customers.map(customerItem => {
            if (customerItem._id == currentCustomer._id) {
              console.log('MATCH ');
              customerItem.grandTotal = data.entry.isRecieve
                ? customerItem.grandTotal + data.entry.amount
                : customerItem.grandTotal - data.entry.amount;
              // customerItem.grandTotal += amount;
              customerItem.entries.push(data.entry);

              // console.log('CUSTOMER ENTRY ', customerItem);
            }
            return customerItem;
          }),
        );

        // currentCustomer.entries.push(data.entry);
        // setCurrentCustomer(currentCustomer);
        Alert.alert(
          'Success',
          '₹ ' +
            data.entry.amount +
            '' +
            (data.entry.isRecieve ? ' Recieved ' : ' Given'),
        );
        setIsLoading(false);
        navigation.navigate('CustomerPage', currentCustomer);
      } else {
        Alert.alert('Failed', 'SOMETHING ELSE');
      }
      setIsLoading(false);
    });
    return () => {
      socket.off('EntryStatus');
    };
  }, []);

  const setSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalender(false);

    setDate(currentDate);
  };

  const {socket} = useContext(socketContext);

  const doEntry = () => {
    console.log('ENTRY CALLED', socket.id);
    setIsLoading(true);
    socket.emit('doEntry', {
      roomId: room._id,
      entry: {
        date,
        amount: parseFloat(amount),
        description,
        remainAmount: currentCustomer.grandTotal,
        isRecieve,
        byWhome: user._id,
      },
    });
  };

  return (
    <>
      <View style={{marginHorizontal: '5%', flex: 1}}>
        {/* <Text>{amount}</Text> */}
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '32%',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                }}>
                ₹
              </Text>
              <TextInput
                keyboardType="number-pad"
                style={{
                  fontSize: 40,
                  fontWeight: 'bold',
                  color: isRecieve ? 'green' : 'red',
                }}
                value={amount}
                onChangeText={text => {
                  if (amount > 1000000) {
                    setAmount(amount.substr(0, amount.length - 1));
                  } else {
                    setAmount(text);
                  }
                  // console.log(text);
                }}
                autoFocus={true}
                placeholder="Amount"></TextInput>
            </View>
            <View style={{display: amount < 1000000 ? 'none' : 'flex'}}>
              <Text style={{textAlign: 'center', color: 'red'}}>
                Invalid amount
              </Text>
            </View>
            <View style={{display: amount > 0 ? 'flex' : 'none'}}>
              <TextInput
                placeholder=" Description "
                keyboardType="default"
                style={{...styles.textInput, paddingLeft: 12}}
                value={description}
                onChangeText={setDescription}
              />

              {/* <View>
            <Text
              onPress={() => {
                console.log('Pressed');
              }}>
              {moment(new Date()).format('DD-MM-YYYY')}
            </Text>
          </View> */}

              {showCalender ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  // value=""
                  mode="date"
                  maximumDate={new Date()}
                  // is24Hour={true}
                  display="default"
                  onChange={setSelectedDate}></DateTimePicker>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    // backgroundColor: 'red',
                    borderWidth: 2,
                    borderColor: 'green',
                    alignItems: 'center',
                    padding: 5,
                    paddingHorizontal: 10,

                    marginTop: 20,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={require('../icons/calenderIcon.png')}
                    style={{
                      width: 30,
                      height: 40,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      padding: 8,
                      textAlign: 'center',
                      borderRadius: 5,
                      fontWeight: 'bold',
                      // backgroundColor: 'red',
                    }}
                    onPress={() => {
                      // console.log('Pressed');
                      setShowCalender(true);
                    }}>
                    {moment(date).format('DD-MM-YYYY')}
                  </Text>
                </View>
              )}
            </View>
            {amount > 0 ? (
              <View style={{position: 'absolute', bottom: 5, width: '100%'}}>
                <Button
                  title={isRecieve ? 'RECIEVE' : 'GIVEN'}
                  onPress={doEntry}
                  color={isRecieve ? 'green' : 'red'}></Button>
              </View>
            ) : (
              <Text> </Text>
            )}
          </>
        )}
      </View>
    </>
  );
};

const styles = new StyleSheet.create({
  textInput: {
    borderColor: 'gray',
    borderWidth: 2,
    paddingLeft: 15,
    marginVertical: 5,
  },
});

export default DoEntryScreen;
