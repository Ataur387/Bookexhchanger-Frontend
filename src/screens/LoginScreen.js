import React, { useEffect, useState } from 'react';
import { StyleSheet, View , Text} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loginRequest = async () => { 
    return new Promise((resolve, reject) => {
      axios.post('http://192.168.0.11:3000/login', {email, password}, 
        {
          headers : {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.error) {
            throw error;
          } else {
            resolve(response.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  async function handleLogin () {
    try {
      const response = await loginRequest();
      if(response.name && response.token){
        dispatch({ type: 'SET_USER_TOKEN', payload: response.token });
        dispatch({ type: 'SET_APP_USER_ID', payload: response.appUserId})
        navigation.navigate('Home', [response.name, response.appUserId]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  function openSignUp(){
    navigation.navigate('SignUp', navigation);
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}> Login </Text>
      </Button>
      <View>
        <Text>Not an user?</Text>
        <Button mode="contained" onPress={openSignUp} style={styles.button}>
          <Text style={styles.buttonText}> Sign Up </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
