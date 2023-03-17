import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import ToyForm from './ToyForm';
const GridComponent = ({route}) => {
	const [toys, setToys] = useState([]);
	const [toyName, setToyName] = useState([]);
	const [toyStatus, setToyStatus] = useState([]);
	const [toyId, setToyId] = useState([]);
	const [showTextInput, setShowTextInput] = useState(false);
	const [showToyForm, setShowToyForm] = useState(false);
	const userToken = useSelector(state => state.userToken);
	useEffect(() => {
		async function fetchData() {
			try {
				const result = await getToys();
				setToys(result);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData();
	}, []);
	async function deleteToy(id){
		return new Promise((resolve, reject) => {
			axios.delete('http://192.168.0.11:3000/toys', {
				data: { id },
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
	async function createToy(name, status){
		return new Promise((resolve, reject) => {
			axios.post('http://192.168.0.11:3000/toys', {name, status},
			{
				headers : {
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
	async function editToy(id, name, status){
		return new Promise((resolve, reject) => {
			axios.put('http://192.168.0.11:3000/toys', {id, name, status},
			{
				headers : {
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
	async function getToys(){ 
		return new Promise((resolve, reject) => {
			axios.get('http://192.168.0.11:3000/toys',
			{
				headers : {
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
	const toggleInput = () => {
		setShowTextInput(!showTextInput);
	};
	const handleCreateToy = async () => {
		await createToy(toyName, toyStatus);
		toggleInput();
		setToys(await getToys());
	};
	const handleEditToy = (id) => {
		// code to edit the toy with the given id
		toggleToyForm();
		setToyId(id);
	};
	async function toggleToyForm (toyName, toyStatus) {
		if(toyName && toyStatus){
			await editToy(toyId, toyName, toyStatus);
			setToys(await getToys());
		}
		setShowToyForm(!showToyForm);
	}
	async function handleDeleteToy(id){
		await deleteToy(id);
		setToys(await getToys());
	};
	return (
		<View style={{flex: 1}}>
			<View style={styles.header}>
				<Button title="Create Toy" onPress={toggleInput} color="#FA8072" />
				{showTextInput && (
				<TextInput
					style={styles.input}
					placeholder="Toy Name"
					onChangeText={setToyName}
					value={toyName}
					placeholderTextColor="#A9A9A9"
				/>
				)}
				{showTextInput && (
				<TextInput
					style={styles.input}
					placeholder="Toy Status"
					onChangeText={setToyStatus}
					value={toyStatus}
					placeholderTextColor="#A9A9A9"
				/>
				)}
				{showTextInput && <Button title="Submit" onPress={handleCreateToy} color="#FA8072" style={{ marginVertical: 10 }} />}
			</View>
			<ScrollView contentContainerStyle={styles.container}>
				{
					toys.map((toy, index) => (
						<View style={styles.toyContainer} key={index}>
							<Text style={styles.text}>
								{toy.name}
							</Text>
							<Text style={styles.text}>
								{toy.status}
							</Text>
							<View style={styles.buttonsContainer}>
								<TouchableOpacity style={styles.editButton} onPress={() => handleEditToy(toy.id)}>
									<Icon name="pencil" size={20} color="white" />
								</TouchableOpacity>
								<ToyForm visible={showToyForm} onClose={toggleToyForm}/>
								<TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteToy(toy.id)}>
									<Icon name="trash" size={20} color="white" />
								</TouchableOpacity>
							</View>
						</View>
					))
				}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
	  padding: 10,
	  alignItems: 'center',
	},
	header: {
		padding: 10,
		alignItems: 'center',
	},
	input: {
		flex: 1,
		height: 40,
		marginHorizontal: 10,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: '#E0E0E0', // Use the same border color as in the toyContainer styling
		borderRadius: 4, // Use the same border radius as in the toyContainer styling
		margin: 5,
		backgroundColor: '#F5F5F5',
		fontSize: 16,
		color: '#333',
	},	  
	text: {
		fontSize: 20,
		margin: 7,
		borderWidth: 1,
		width: '80%',
		backgroundColor: '#F5F5DC',
		color: '#000',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 4,
	},
	toyContainer: {
		flexDirection: 'row',
		alignItems: 'stretch', // Make all items stretch to the container's height
		justifyContent: 'space-between',
		width: '100%',
		marginBottom: 10,
		backgroundColor: '#F5F5F5',
		borderWidth: 1,
		borderColor: '#E0E0E0'
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	editButton: {
		backgroundColor: '#8FBC8F',
		padding: 7,
		margin:7,
		borderRadius: 5,
	},
	deleteButton: {
		backgroundColor: '#FA8072',
		padding: 7,
		margin:7,
		borderRadius: 5,
	}
});


export default GridComponent;
