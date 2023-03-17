import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const FriendRequests = ({ route }) => {
	const allRequests = route.params.friendRequests;
	const appUserId = route.params.appUserId;
	const requestedFriendships = [];
	for(var i = 0; i < allRequests.length; i++){
		if(allRequests[i].friend_id == appUserId)requestedFriendships.push(allRequests[i]);
	}
  const renderItem = ({ item }) => (
    <View style={styles.item}>
		<View style={styles.photoSection}>
          <Text style={styles.photoPlaceholder}>Profile Photo</Text>
    </View>
        <Text style={styles.itemText}>{item.requester_name} sent you a friend request.</Text>
		<View style={styles.buttonsContainer}>
			<TouchableOpacity style={styles.button}>
			<Text style={styles.acceptButton}>Accept</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button}>
			<Text style={styles.rejectButton}>Reject</Text>
			</TouchableOpacity>
		</View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={requestedFriendships}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No friend requests to show.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
	marginBottom: 10
  },
  rejectButton: {
    backgroundColor: '#FA8072',
    padding: 5,
    borderRadius: 4,
    marginLeft: 5,
  },
  acceptButton: {
    backgroundColor: '#8FBC8F',
    padding: 5,
    borderRadius: 4,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  photoSection: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholder: {
    fontSize: 12,
    color: '#666',
  },
});

export default FriendRequests;
