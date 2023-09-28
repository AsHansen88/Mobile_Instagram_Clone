import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../../firebase'; // Assuming you have Firebase initialized
import { useNavigation } from '@react-navigation/native';
import { getDownloadURL, ref } from 'firebase/storage'; // Import storage methods from Firebase storage
import { storage } from '../../firebase';

function Profile(props) {
  const navigation = useNavigation(); // Hook for navigation

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Use auth.signOut() to log out the user
      // Navigate to the Login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const [imagePath, setImagePath] = useState('');

  async function downloadImage() {
    try {
      const imageRef = ref(storage, 'Anders.jpg'); // Create a reference to your image in storage
      const url = await getDownloadURL(imageRef); // Get the download URL for the image
      setImagePath(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }

  const { currentUser, posts } = props; // Access currentUser via props

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>Profile</Text>
        {currentUser && currentUser.name && currentUser.email && (
          <View>
            <Text>User Name:</Text>
            <Text>{currentUser.name}</Text>
            <Text>User Email:</Text>
            <Text>{currentUser.email}</Text>
          </View>
        )}
      </View>

      {imagePath && <Image style={styles.Image} source={{ uri: imagePath }} />}

      <FlatList
        numColumns={3}
        horizontal={false}
        data={posts}
        renderItem={({ item }) => (
          <Image style={styles.Image} source={{ uri: item.downloadURL }} />
        )}
      />

      <Button title="Logout" onPress={handleLogout} />
      <Button title="Download Image" onPress={downloadImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
  Image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);
