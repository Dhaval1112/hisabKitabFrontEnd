import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

export default function DoEntryScreen({route}) {
  const isRecieve = route.params;
  const [amount, setAmount] = useState('');

  console.log('DO ENTRY SCREEN IS RECIEVE', isRecieve);

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
              fontSize: 35,
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
        </View>
        <View style={{position: 'absolute', bottom: 5, width: '100%'}}>
          <Button title="BUtton" color={isRecieve ? 'green' : 'red'}></Button>
        </View>
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
