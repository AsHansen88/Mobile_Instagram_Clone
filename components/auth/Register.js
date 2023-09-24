import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { auth } from '../../firebase'; 

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: ''
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  async onSignUp() {
    const { email, password } = this.state;

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('User registered:', user);
    } catch (error) {
      console.error('Error registering user:', error);
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





