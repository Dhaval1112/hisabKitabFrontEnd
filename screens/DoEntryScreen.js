import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function DoEntryScreen({route}) {
  const isRecieve = route.params;
  const [amount, setAmount] = useState('');

  const [showCalender, setShowCalender] = useState(false);

  const [date, setDate] = useState(new Date());
  console.log('DO ENTRY SCREEN IS RECIEVE', isRecieve);

  const setSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    console.log('current date is :: ', currentDate);
    setShowCalender(false);

    setDate(currentDate);
  };

  return (
    <>
      <View style={{marginHorizontal: '5%', flex: 1}}>
        {/* <Text>{amount}</Text> */}
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
              console.log(text);
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
            placeholder="Description "
            // value={mobileNumber}
            keyboardType="numeric"
            // onChangeText={setMobileNumber}
            style={styles.textInput}
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
                  console.log('Pressed');
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
              color={isRecieve ? 'green' : 'red'}></Button>
          </View>
        ) : (
          <Text> </Text>
        )}
      </View>
    </>
  );
}

const styles = new StyleSheet.create({
  textInput: {
    borderColor: 'gray',
    borderWidth: 2,
    paddingLeft: 15,
    marginVertical: 5,
  },
});
