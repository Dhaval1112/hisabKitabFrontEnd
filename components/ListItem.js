import React from 'react';
import {Alert, LogBox, Pressable, StyleSheet, Text, View} from 'react-native';
import UserAvatar from 'react-native-user-avatar';

const ListItem = ({item}) => {
  return (
    <Pressable
      style={styles.list}
      //   Alert.alert('Details', item.name + '\n' + item.num)
      onPress={() => {
        Alert.alert('Details', item.name + '\n' + item.num);
      }}>
      <View style={styles.avatar}>
        <UserAvatar size={32} name={item.name} />
      </View>
      <View>
        <Text style={{color: 'black'}}>{item.name}</Text>
        <Text>{item.num}</Text>
      </View>
    </Pressable>
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
