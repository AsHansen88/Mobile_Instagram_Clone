import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDfIuaaL4M3xmd7LUMJtfzi26fKSFDa_dc",
  authDomain: "instagram-clone-4ec82.firebaseapp.com",
  projectId: "instagram-clone-4ec82",
  storageBucket: "instagram-clone-4ec82.appspot.com",
  messagingSenderId: "94890513927",
  appId: "1:94890513927:web:957899253c5eb79d7cfca2",
  measurementId: "G-TXTNEPLR66"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing.js'
import RegisterScreen from './components/auth/Landing.js'

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name = "Landing" component = {LandingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name = "Register" component = {RegisterScreen}/>


      </Stack.Navigator>

    </NavigationContainer>
  );
}


