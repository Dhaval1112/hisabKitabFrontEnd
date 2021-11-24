import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomerListItem from '../components/CustomerListItem';
import FAB from '../components/FAB';
import {customersContext} from '../context/customersContext';
import {userContext} from '../context/userContext';
import {URL_LOCAL} from '@env';
import {currentCustomerContext} from '../context/currentCustomerContext';
import {socketContext} from '../context/socketContext';
import LoadingComponent from '../components/LoadingComponent';

const Home = ({navigation}) => {
  const {user, setUser} = useContext(userContext);

  const {customers, setCustomers} = useContext(customersContext);

  const [isLoading, setIsLoading] = useState(false);
  // console.log('CUSTO', customers);

  const {setCurrentCustomer} = useContext(currentCustomerContext);

  const {socket} = useContext(socketContext);

  useEffect(() => {
    const url = URL_LOCAL + 'getCustomers';

    // console.log('\n\n\nURL AND SUPPLIER ID IN HOME', url, {
    //   supplierId: user._id,
    // });

    setIsLoading(true);
    axios.post(url, {supplierId: user._id}).then(response => {
      // console.log(response.data);
      if (response.data) {
        // console.log('FROM LOGIN SCREEN', response.data);
        setCustomers(response.data.rooms);
        // console.log('\n\n\nCustomers', customers);
        // navigation.navigate('ProfileFill', response.data);
      }
      setIsLoading(false);
    });

    /*
      .catch(err => {
        let errorMessage = '';
        console.log(err.response.data);
        err.response.data.errors.map(error => {
          console.log(error.message);
          errorMessage += error.message + '\n';
        });
        console.log(errorMessage);
        // TODO: this message comes from server
        Alert.alert('Error message', errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
      */
  }, []);

  const renderItem = useCallback(({item}) => {
    if (item != undefined) {
      return (
        <CustomerListItem
          item={item}
          navigation={navigation}
          setCurrentCustomer={setCurrentCustomer}
        />
      );
    }
  }, []);
  console.log('HOME SCREEN CHECKING');

  const [state, setState] = useState('');
  // return <LoadingComponent />;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}} style={{flex: 1}}>
        {/* <Text>{`${user.profile.name} ${user.profile.lastName} ${user.profile.email}`}</Text>
         */}
        {isLoading ? (
          <LoadingComponent />
        ) : customers.length != 0 ? (
          <FlatList
            data={customers}
            initialNumToRender={100}
            renderItem={renderItem}
          />
        ) : (
          <Text
            style={{
              fontSize: 24,
              textAlign: 'center',
              flex: 1,
              alignContent: 'center',
              marginTop: '60%',
            }}>
            No Customer available add new Customer by pressing + icon
          </Text>
        )}
        <FAB
          iconValue="+"
          handler={() => {
            navigation.navigate('AddCustomer');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
