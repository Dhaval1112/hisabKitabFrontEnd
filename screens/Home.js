import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FAB from '../components/FAB';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text>HEllo from home</Text>
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
