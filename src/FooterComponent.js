import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
	const handleIconClick = (val) => {
		if(val == 'facebook')Linking.openURL('https://www.facebook.com/Ataur387');
		else if(val == 'instagram')Linking.openURL('https://www.instagram.com/Ataur387');
		else if(val == 'linkedin')Linking.openURL('https://www.linkedin.com/in/ataur-rahaman-3551001a6/');
	};	
	return (
		<View style={styles.footer}>
			<Text style={styles.text.bigText}>
				Follow Us
				<Text style={styles.text.smallText}>
					Toy Exchanger
				</Text>
			</Text>
			<TouchableOpacity onPress={() => handleIconClick('facebook')}>
				<Icon name="facebook" size={20} color="#666" style={styles.icon} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleIconClick('instagram')}>
				<Icon name="instagram" size={20} color="#666" style={styles.icon} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleIconClick('linkedin')}>
				<Icon name="linkedin" size={20} color="#666" style={styles.icon} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	footer: {
	  backgroundColor: '#f2f2f2',
	  width: '100%',
	  position: 'absolute',
	  bottom: 0,
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'space-around',
	},
	icon: {
	  marginRight: 10,
	},
	text: {
		bigText: {
			fontSize: 21,
			fontWeight: 'bold',
			color: '#333',
			textAlign: 'center',
		},
		smallText: {
			fontSize: 7,
			color: 'red'
		}
  	},
  });

export default Footer;
