import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState('');

  const  SignUpRequest = async () => {
    const user = {
      name : name,
      email: email,
      password: password
    };
    console.log(user);
    return new Promise((resolve, reject) => {
      axios.post('http://192.168.0.11:3000/signup', user)
        .then(response => {
          if (response.data.error) {
            console.log(response.error.message);
            reject(new Error(response.data.message));
          } else {
            resolve(response.data.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
    
  };
  async function handleSignUp() {
    // handle sign up logic here
    console.log(`Logging in with email: ${email} and password: ${password}`);
    // send a POST request
    try {
      const response = await SignUpRequest();
      if(response){
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
    navigation.navigate('Login')
  };
  const openSignUp = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
	  <TextInput
        label="Name"
        value={name}
		    placeholder="Name"
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="none"
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <TextInput
        label="Email"
        value={email}
		    placeholder="Email"
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
		    placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
	  <TextInput
        label="Password"
		    placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />
		<Button title="Sign Up"mode="contained" onPress={handleSignUp} style={styles.button}/>
		<Text style={styles.buttonText}>Already have an account?</Text>
		<Button title="Login" mode="contained" onPress={openSignUp} style={styles.button} />
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
	  	height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		paddingLeft: 10,
		paddingRight: 10,
		marginBottom: 10,
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginTop: 20,
		height: 10
	  },
	  buttonText: {
		color: 'blue',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	  },
  });
  
export default SignUp;