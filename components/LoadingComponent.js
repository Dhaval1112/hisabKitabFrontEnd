import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const LoadingComponent = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#00ff00" />
    <Text style={styles.textCenter}>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  textCenter: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 15,
  },
});

export default LoadingComponent;
