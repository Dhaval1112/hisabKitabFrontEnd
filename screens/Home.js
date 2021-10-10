import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FAB from '../components/FAB';
import {userContext} from '../context/userContext';

const Home = ({navigation}) => {
  const {user, setUser} = useContext(userContext);
  // console.log(user.name);
  useEffect(() => {
    setUser({...user, name: 'dhaval'});
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text>{user.name}</Text>
          <FAB
            iconValue="+"
            handler={() => {
              navigation.navigate('AddCustomer');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
