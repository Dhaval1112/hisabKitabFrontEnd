import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

const FAB = ({iconValue, handler}) => {
  return (
    <TouchableOpacity
      onPress={handler}
      style={{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 60,
        backgroundColor: '#000',
        borderRadius: 50,
      }}>
      <Text style={{color: 'white', fontSize: 30}}>{iconValue}</Text>
    </TouchableOpacity>
  );
};

export default FAB;
