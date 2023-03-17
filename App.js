
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Stack } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import { Provider } from 'react-redux';
import store from './src/store/store';
import Home from './src/screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from './src/screens/SignUpComponent';
import UserProfile from './src/screens/userProfile';
import MessengerComponent from './src/screens/MessengerComponent';
import ChatComponent from './src/screens/ChatComponent';
export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerStyle: { backgroundColor: '#f00' } }} component={LoginScreen} />
          <Stack.Screen name="Home" options={{ headerStyle: { backgroundColor: '#f11' } }} component={Home} />
          <Stack.Screen name="SignUp" options={{ headerStyle: { backgroundColor: '#f22' } }} component={SignUp} />
          <Stack.Screen name="MessengerComponent" options={{ headerStyle: { backgroundColor: '#f22' } }} component={MessengerComponent} />
          <Stack.Screen name="ChatComponent" options={{ headerStyle: { backgroundColor: '#f22' } }} component={ChatComponent} />
          <Stack.Screen name="UserProfile" options={{ headerStyle: { backgroundColor: '#f22' } }} component={UserProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
