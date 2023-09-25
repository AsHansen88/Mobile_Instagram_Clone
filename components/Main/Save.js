import React, { useState } from 'react';
import { View, TextInput, Image, Button, Alert } from 'react-native'; // Import Alert for error handling
import { auth, storage } from '../../firebase';

export default function Save(props) {
  const [caption, setCaption] = useState('');

  const uploadImage = async () => {
    try {
      const uri = props.route.params.image;
      const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`;
      const response = await fetch(uri);
      const blob = await response.blob();
      const task = storage.ref().child(childPath).put(blob);

      task.on(
        'state_changed',
        (snapshot) => {
          console.log(`transferred: ${snapshot.bytesTransferred}`);
        },
        (error) => {
          console.error('Error uploading image:', error);
          Alert.alert('Error', 'Failed to upload image. Please try again later.');
        },
        async () => {
          const downloadURL = await task.snapshot.ref.getDownloadURL();
          console.log(downloadURL);
          // You can do something with the downloadURL here
          Alert.alert('Success', 'Image uploaded successfully.');
        }
      );
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a Caption . . ."
        onChangeText={(text) => setCaption(text)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}
