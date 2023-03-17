import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import GridComponent from './GridComponent';
import Table from './Table';
import axios from 'axios';
import { getFriendRequests } from '../apis/friendRequest';
import FriendRequests from './FriendRequests';
import { useSelector } from 'react-redux';

const TabNavigator = ({ navigation, appUserId}) => {
  var [users, setUsers] = useState([]);
  var [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const Tab = createMaterialTopTabNavigator();
  const userToken = useSelector(state => state.userToken);
  useEffect(() => {
		async function fetchData() {
			try {
				const result = await getUsers();
				setUsers(result.data);
        const requests = await getFriendRequests(userToken);
        if(requests.length)setFriendRequests(requests);
        setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		}
		fetchData();
	}, []);  
  async function getUsers() {
    return new Promise((resolve, reject) => {
      axios.get('http://192.168.0.11:3000/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      })
        .then(response => {
          if (response.error) {
            reject(new Error(response.error));
          } else {
            resolve(response.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }  
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBarOptions={{
          activeTintColor: '#000',
          inactiveTintColor: '#666',
          indicatorStyle: { backgroundColor: '#000' },
          labelStyle: { fontSize: 12 , color: 'black', fontWeight: 'bold'},
        }}>
        <Tab.Screen
          name='Toys'
          component={GridComponent}
          initialParams={{ }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="list" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name='Friend Requests' 
          component={FriendRequests}
          initialParams={{ userToken, friendRequests, appUserId }}
          options={{
            tabBarIcon: ({ color, size }) => (<Icon name="exchange" size={size} color={color}/>),
          }}
        />
        <Tab.Screen
          name="Users"
          component={Table}
          initialParams={{users, friendRequests, appUserId, navigation}}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="users" size={size} color={color} />
            ),
          }}
        >
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F5F5F5', // Use the same soothing background color as before
    borderTopWidth: 1, // Add a border on top
    borderTopColor: '#E0E0E0', // Use the same border color as before
  },
});


export default TabNavigator;
