import React, {useCallback, useContext, useEffect, useState} from 'react';
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
import LoadingComponent from '../components/LoadingComponent';
import {userContext} from '../context/userContext';

const AddCustomer = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  let {user} = useContext(userContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getContacts(setContacts, navigation, setIsLoading);
  }, []);

  const renderItem = useCallback(({item}) => {
    if (item != undefined) {
      return <ListItem item={item} userId={user._id} navigation={navigation} />;
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* <FlatList
        data={contacts}
        initialNumToRender={50}
        removeClippedSubviews={true}
        renderItem={renderItem}
        // keyExtractor={keyExtractor}
      ></FlatList> */}

      {/* TODO: last flatlist */}
      {isLoading ? (
        <LoadingComponent />
      ) : (
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
      )}
    </View>
  );
};

export default AddCustomer;
