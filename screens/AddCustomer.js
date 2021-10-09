import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  VirtualizedList,
  View,
} from 'react-native';
import getContacts from '../components/getContacts';

import ListItem from '../components/ListItem';

const AddCustomer = ({navigation}) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts(setContacts, navigation);
  }, []);

  const renderItem = useCallback(({item}) => {
    if (item != undefined) {
      return <ListItem item={item} />;
    }
  }, []);

  return (
    <View>
      {/* <FlatList
        data={contacts}
        initialNumToRender={50}
        removeClippedSubviews={true}
        renderItem={renderItem}
        // keyExtractor={keyExtractor}
      ></FlatList> */}

      {/* TODO: last flatlist */}

      <FlatList
        data={contacts}
        initialNumToRender={100}
        renderItem={renderItem}
        // maxToRenderPerBatch={150}
        // windowSize={30}
        // updateCellsBatchingPeriod={10}

        // renderItem={({item}) => {
        //   if (item != undefined) {
        //     return <ListItem item={item} />;
        //   }
        // }}
      />
    </View>
  );
};

export default AddCustomer;
