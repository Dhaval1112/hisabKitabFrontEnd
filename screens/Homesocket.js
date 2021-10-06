import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text, Button} from 'react-native';
import io from 'socket.io-client';

export default App = () => {
  const [socketname, setSocketname] = useState('');
  const [btnText, setBtnText] = useState('Click me');
  count = 0;

  useEffect(() => {
    const socket = io('http://192.168.43.64:5000', {query: 'id=9409301610'});

    console.log('socket is now connected');
    socket.emit('chat', {say: 'Hello', mobile: '9409301610'});
    socket.on('chat', data => {
      setSocketname(data);
      console.log(data);
    });
    socket.on('private', data => {
      // setSocketname('PRIVATE  :', data);
      console.log('PRIVATE ', data);
    });
  }, []);

  const callApi = () => {
    axios
      .post('http://192.168.43.64:5000/hello', {
        mobile: '9409301610',
        name: 'Jaydeep',
      })
      .then(res => {
        // const jsonData = JSON.parse(data);
        console.log('DATA IS ', res.data);
        setBtnText(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      <Text>Hello App start {socketname}</Text>
      <Button onPress={callApi} title={btnText}></Button>
    </>
  );
};
