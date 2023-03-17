import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Footer from '../FooterComponent';

const users = [
  { id: 1, name: 'John Doe', lastMessage: 'Hey, what are you up to?', lastMessageTime: '10:30 AM' },
  { id: 2, name: 'Jane Smith', lastMessage: 'Can we meet tomorrow?', lastMessageTime: 'Yesterday' },
  { id: 3, name: 'Bob Johnson', lastMessage: '👍', lastMessageTime: '2 days ago' },
];

const MessengerComponent = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ChatComponent', { userId: item.id })}>
      <View style={styles.photoSection}>
        <Image style={styles.photo} />
      </View>
      <View style={styles.detailsSection}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
        </View>
        <View style={styles.subtitleSection}>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuBar}></View>
          <View style={styles.menuBar}></View>
          <View style={styles.menuBar}></View>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <FlatList
        data={users.filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuButton: {
    marginRight: 12,
  },
  menuBar: {
    width: 18,
    height: 3,
    backgroundColor: '#000',
    marginVertical: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  photoSection: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  detailsSection: {
    flex: 1,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessageTime: {
    fontSize: 14,
    color: '#666',
  },
  subtitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  badgeText: {
    fontSize: 12,
    color: '#fff',
  },
});

export default MessengerComponent;
