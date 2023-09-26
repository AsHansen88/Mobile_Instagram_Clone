import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { auth, firestore } from '../../firebase'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; 

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    
    };

    // Bind the function properly
    this.onSignUp = this.onSignUp.bind(this);
  }

  async onSignUp() {
    const { email, password,} = this.state;

    try {
      // Create a new user with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Access the user object
      const user = userCredential.user;

      // Add user data to Firestore
      const userRef = firestore.collection('users').doc(user.uid);
      await userRef.set({
        email: email,
        pasword: password
      });

      console.log('User login successfully:', user);
    } catch (error) {
      console.error('Error during Login:', error);
    }
  }

  render() {
    return (
      <View>
        
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        <Button
          onPress={() => {
            this.onSignUp();
          }}
          title="Login"
        />
      </View>
    );
  }
}

