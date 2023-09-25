import React, { useState } from 'react';
import { View, TextInput, Image, Button } from 'react-native';
import { auth, storage } from '../../firebase'; // Import auth and storage from your Firebase configuration

export default function Save(props) {
  const [caption, setCaption] = useState('');
  console.log(props.route.params.image);

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`;
    const response = await fetch(uri);
    const blob = await response.blob();
    const task = storage.ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log(downloadURL);
        // You can do something with the downloadURL here
      });
    };

    const taskError = (error) => {
      console.error('Error uploading image:', error);
    };

    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a Caption . . ."
        onChangeText={(text) => setCaption(text)} // Changed from onChangedText to onChangeText
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}
