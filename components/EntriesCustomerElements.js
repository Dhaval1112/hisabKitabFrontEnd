import React, {useRef} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function EntriesCustomerElements({customer}) {
  const flatList = React.useRef(null);
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          ...(item.isRecieve ? styles.leftComponent : styles.rightComponent),
          ...styles.commonComponent,
        }}>
        <Text
          key={item._id}
          style={item.isRecieve ? styles.recieve : styles.given}>
          {item.amount}
        </Text>
        {item.description != '' && (
          <Text style={styles.descriptionStyle}>{item.description}</Text>
        )}
        {item.remainAmount && (
          <Text style={styles.remainAmountStyle}>
            ₹ {Math.abs(item.remainAmount)}
            {item.remainAmount > 0 ? ' ADVANCE' : ' DUE'}
          </Text>
        )}
      </View>
    );
  };

  //   console.log('\n\n\nCustomer ::', customer.entries);
  return (
    <SafeAreaView style={{marginBottom: 85, marginHorizontal: 8, marginTop: 5}}>
      <FlatList
        ref={flatList}
        onContentSizeChange={() => {
          flatList.current.scrollToEnd();
        }}
        data={customer.entries}
        renderItem={renderItem}
      />
    </SafeAreaView>

    // <View>

    //   <Text
    //   // key={entry._id}
    //   // style={entry.isRecieve ? styles.recieve : styles.given}>
    //   // {entry.amount}
    //   >
    //     Amount
    //   </Text>
    // </View>
  );
}

export default EntriesCustomerElements;

const styles = new StyleSheet.create({
  recieve: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
    width: '60%',
  },
  given: {
    fontSize: 25,
    fontWeight: 'bold',

    color: 'red',
    width: '60%',
  },
  leftComponent: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    width: '60%',
  },
  rightComponent: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    width: '60%',
    alignSelf: 'flex-end',
  },
  commonComponent: {
    borderRadius: 10,
    marginVertical: 5,
  },
  descriptionStyle: {
    backgroundColor: 'gray',
    color: 'white',
    padding: 2,
    borderRadius: 5,
  },
  remainAmountStyle: {
    marginTop: 3,
    fontSize: 12,
  },
});
