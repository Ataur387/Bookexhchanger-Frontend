import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import {FontAwesome, FontAwesomeIcon} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FloatingSidebar from './FloatingSidebarComponent';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import {getUserProfileById} from '../apis/usersApi'
const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const handleSearch = () => {
    // Handle search logic here
    onSearch(searchText);
  };

  return (
    <View style={styles.searchContainer}>
      <FontAwesome name="search" size={24} color="#333" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
    </View>
  );
};

const Navbar = () => {
  const navigation = useNavigation();
  const [showSideBar, setShowSideBar] = useState(false);
  const userId = useSelector(state => state.appUserId);
  const token = useSelector(state => state.userToken);
  const handleToggleSideBar = (status) => {
    setShowSideBar(!showSideBar);
    if(status == "Close"){
      navigation.navigate('Login', navigation);
    }
  };
  async function viewProfile(userId){
    try{
      const user = await getUserProfileById(userId, token);
      if(user) navigation.navigate('UserProfile', {user});
    }catch(err){
      console.log(err.message);
    }
  }
  const openMessanger = () => {
    navigation.navigate('MessengerComponent', navigation);
  }
  const handleSearch = searchText => {
    // Handle search logic here
    console.log(`Searching for: ${searchText}`);
  };

 return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleSideBar}>
        <Icon name="bars" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable} onPress={() => viewProfile(userId)}>
        <FontAwesome name="user-circle-o" size={18} color="#333" />
      </TouchableOpacity>
      <Search onSearch={handleSearch} />
      <TouchableOpacity onPress={() => openMessanger()}>
        <Button style={styles.logoutText}>
          <FontAwesome name="send" size={20} color='black' />
        </Button>
      </TouchableOpacity> 
      <FloatingSidebar visible={showSideBar} onClose={handleToggleSideBar} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    width: '100%',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
    marginLeft: 10
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    borderColor: ''
  },
  logoutText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
  },
  touchable:{
		padding: 7,
		margin:7,
		borderRadius: 5,
  }
});

export default Navbar;
