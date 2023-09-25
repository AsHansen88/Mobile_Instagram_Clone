import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing.js'
import RegisterScreen from './components/auth/Register.js'
import { auth } from './firebase'; 
import { initializeApp } from './firebase';
import { Provider } from 'react-redux'
import { getDefaultMiddleware, configureStore} from '@reduxjs/toolkit';
import  rootReducer  from './components/Redux/reducers/index'
import thunk from 'redux-thunk'
import mainScreen from './components/main.js'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunk);
  },
});

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  } 

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text> 
            Loading     
          </Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <Provider store= {store}>
    <mainScreen />
    </Provider>
  )

}
} 

export default App;
