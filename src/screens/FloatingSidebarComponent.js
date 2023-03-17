import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const FloatingSidebar = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.container} onPress={onClose}>
        <View style={styles.popup}>
          <TouchableOpacity style={styles.button} onPress={() => onClose('Close')}>
            <Text style={styles.buttonText}>
              <Icon name="sign-out" size={20} color="white" />
              Logout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Button 2 clicked')}>
            <Text style={styles.buttonText}>
              <Icon name="retweet" size={20} color="white" />
              Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Button 3 clicked')}>
            <Text style={styles.buttonText}>
              <Icon name="home" size={20} color="white" />
              Our Community
            </Text>
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
  popup: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#8FBC8F',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FloatingSidebar;