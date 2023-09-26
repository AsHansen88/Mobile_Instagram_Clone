import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing.js'
import RegisterScreen from './components/auth/Register.js'
import LoginScreen from './components/auth/Login.js'
import { auth } from './firebase'; 
import { initializeApp } from './firebase';
import { Provider } from 'react-redux'
import { applyMiddleware, configureStore} from '@reduxjs/toolkit';
import  rootReducer  from './components/Redux/reducers/index'
import thunk from 'redux-thunk'
import MainScreen from './components/Main.js'
import AddScreen  from './components/Main/Add'
import SaveScreen  from './components/Main/Save'


const store = configureStore({
  reducer: rootReducer,
  middleware: (applyMiddleware) => {
    return applyMiddleware().concat(thunk);
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
          <Stack.Screen name="Login" component={LoginScreen} />
       </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <Provider store= {store}>
      <NavigationContainer>
    <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
          <Stack.Screen name="Save" component={SaveScreen}  />
    </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  )

}
} 

export default App;
