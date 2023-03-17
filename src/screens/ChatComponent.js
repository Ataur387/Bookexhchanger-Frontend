import React, { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {FontAwesome, FontAwesomeIcon} from 'react-native-vector-icons';
const ChatComponent = ({ route }) => {
  const { userId } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, content: 'Hey, how are you?', sender: 'me' },
    { id: 2, content: 'I\'m good, thanks for asking. You?', sender: 'other' },
    { id: 3, content: 'Doing well, thanks!', sender: 'me' },
  ]);

  const renderItem = ({ item }) => (
    <View style={[styles.bubble, item.sender === 'me' ? styles.bubbleMe : styles.bubbleOther]}>
      <Text style={styles.bubbleContent}>{item.content}</Text>
    </View>
  );

  const handleSend = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { id: messages.length + 1, content: message, sender: 'me' }]);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={80}>
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: 'https://randomuser.me/api/portraits/men/7.jpg' }}
          />
          <Text style={styles.profileName}>John Doe</Text>
        </View>
      </View>
	  <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.sendButton}>
			<FontAwesome name="file" size={20} color='black' />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
		<TouchableOpacity style={styles.sendButton} onPress={handleSend}>
			<FontAwesome name="send" size={20} color='black' />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  bubble: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  bubbleMe: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  bubbleOther: {
    backgroundColor: '#FA8072',
    alignSelf: 'flex-start',
  },
  bubbleContent: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
	padding: 5
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 10,
  },
  sendButton: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
	padding: 5,
  },
});
export default ChatComponent;