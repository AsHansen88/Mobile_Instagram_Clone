import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { auth } from '../../firebase';
import firebase from '../../firebase';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: ''
    };

    // Bind the function properly
    this.onSignUp = this.onSignUp.bind(this);
  }

  async onSignUp() {
    const { email, password, name } = this.state; 

    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password); // Corrected the function call
      await firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid) 
        .set({
          name,
          email
        });
      console.log(result);
    } catch (error) {
      console.error(error);
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
          title="Sign Up"
        />
      </View>
    );
  }
}

  



