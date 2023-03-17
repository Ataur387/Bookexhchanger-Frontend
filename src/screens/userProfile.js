import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from './NavbarComponent';
import Footer from '../FooterComponent';

const UserProfile = ({navigation, route}) => {
  const user = route.params.user;
  const recentExchanges = [
    {id: 1, name: 'John', date: '10/03/2023'},
    {id: 2, name: 'Mary', date: '09/03/2023'},
    {id: 3, name: 'Tom', date: '08/03/2023'},
  ];
  
  // Dummy data for My Friends section
  const myFriends = [
    {id: 1, name: 'Alice'},
    {id: 2, name: 'Bob'},
    {id: 3, name: 'Charlie'},
    {id: 4, name: 'David'},
    {id: 5, name: 'Emma'},
  ];
  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.userInfo}>
        <View style={styles.textInfo}>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.bio}>BIO</Text>
        </View>
        <View style={styles.photoSection}>
          <Text style={styles.photoPlaceholder}>Profile Photo</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
  <View style={{ flex: 1 }}>
    {/* Recent Exchanges Section */}
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Recent Exchanges</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.cellHeader]}>Name</Text>
          <Text style={[styles.cell, styles.cellHeader]}>Date</Text>
        </View>
        {recentExchanges.map(exchange => (
          <View key={exchange.id} style={styles.row}>
            <Text style={styles.cell}>{exchange.name}</Text>
            <Text style={styles.cell}>{exchange.date}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
  <View style={{ flex: 1 }}>
    {/* My Friends Section */}
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>My Friends</Text>
      <View style={styles.table}>
        {myFriends.map(friend => (
          <View key={friend.id} style={styles.row}>
            <Text style={styles.cell}>{friend.name}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
</View>


      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  textInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
  },
  photoSection: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholder: {
    fontSize: 12,
    color: '#666',
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  cellHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  },
});

export default UserProfile;
