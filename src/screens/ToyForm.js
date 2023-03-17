import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from 'react-native';

const ToyForm = ({ visible, onClose }) => {
  const [toyName, setToyName] = useState('');
  const [toyStatus, setToyStatus] = useState('');

  const handleSubmit = () => {
    // Pass the toyName and toyStatus values to the onClose function
    onClose(toyName, toyStatus);
  };

  const handleModalPress = (event) => {
    // Stop the propagation of the onPress event
    event.stopPropagation();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.container} onPress={handleModalPress}>
        <View style={styles.popup} onPress={handleModalPress}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Toy Name"
            onChangeText={setToyName}
            value={toyName}
            onPress={handleModalPress}
          />
          <TextInput
            style={styles.input}
            placeholder="Toy Status"
            onChangeText={setToyStatus}
            value={toyStatus}
            onPress={handleModalPress}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    width: '100%',
  },
  button: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ToyForm;
