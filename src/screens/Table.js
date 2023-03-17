import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { getFriendRequests } from '../apis/friendRequest';
import { useSelector } from 'react-redux';
const Table = ({ navigation, route }) => {
	const users = route.params.users;
  const userToken = useSelector(state => state.userToken);
  const [friendRequests, setFriendRequests] = useState(route.params.friendRequests);
  const appUserId = route.params.appUserId;
  function viewProfile(user){
    navigation.navigate('UserProfile', {user});
  }
  function isPending(userId) {
    return friendRequests.some(request => request.friend_id === userId);
  }
  async function createFriendRequestApi(to, status){
    return new Promise((resolve, reject) => {
      axios.post('http://192.168.0.11:3000/friends/request', { to,  status},
        {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
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
  async function createFriendRequest (friendId){
    const status = "PENDING";
    try{
      var result = await createFriendRequestApi(friendId, status);
      if(result == "Request Created Successfuly") updateFriendRequests();
    }catch(error){
      throw error;
    }
  }
  async function updateFriendRequests(userId) {
    setFriendRequests(await getFriendRequests(userToken));
  }
  return (
    <View style={styles.table}>
      {users && users.map((user) => (
        <View key={user.id} style={styles.row}>
          <Text style={styles.cell}>{user.name}</Text>
          <Text style={styles.cell}>{user.email}</Text>
          {
            isPending(user.id) && <TouchableOpacity style={styles.pendingFriendButton} disabled={true}>
                                    <Icon name="check" size={20} color="white" />
                                  </TouchableOpacity>
          }
          {
            !isPending(user.id) && <TouchableOpacity style={styles.makeFriendButton} onPress={() => createFriendRequest(user.id)}>
                            <Icon name="plus" size={20} color="white" />
                          </TouchableOpacity>
          }
          <TouchableOpacity style={styles.viewProfileButton} onPress={() => viewProfile(user)}>
            <Icon name="eye" size={20} color="white" />
          </TouchableOpacity>

        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    flex: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 10
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    alignItems: 'left',
    justifyContent: 'left',
  },   
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  viewProfileButton: {
    backgroundColor: '#0074D9',
    padding: 5,
    borderRadius: 4,
    marginLeft: 5,
  },
  makeFriendButton: {
    backgroundColor: '#8FBC8F',
    padding: 5,
    borderRadius: 4,
    marginLeft: 5,
  },
  pendingFriendButton: {
    backgroundColor: '#FA8072',
    padding: 5,
    borderRadius: 4,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


export default Table;
