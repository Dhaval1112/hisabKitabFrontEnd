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

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text>HEllo from home</Text>
          <FAB iconValue="+" handler={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
