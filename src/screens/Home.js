import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Footer from '../FooterComponent';
import Navbar from './NavbarComponent';
import TabNavigator from './TabNavigatorComponent';
import { useSelector } from 'react-redux';
const Home = ({navigation, route}) => {
	const name = route.params[0];
	const token = useSelector(state => state.userToken);
	const appUserId = route.params[2];
	return (
		<View style={styles.container}>
			<Navbar />
			<Text style={styles.text}>Hello {name}</Text>
			<TabNavigator navigation = {navigation}  appUserId = {appUserId}/> 
			<Footer />
		</View>
	);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	height: '100%',
	width: '100%'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});


export default Home;