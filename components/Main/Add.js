import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import  firebase from '../../firebase/storage'; 
import { storage } from '../../firebase'; 
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { getUnixTime } from 'date-fns'; // Import date-fns function for timestamp


export default function Add({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermissions] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imagePath, setImagepath] = useState(null)



  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status === 'granted');

      const GalleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(GalleryStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    console.log("Taking picture...");
    if (camera) {
      const photo = await camera.takePictureAsync();
      uploadImage(photo.uri); // Pass the image URI to uploadImage function
    }
  };
  
  async function uploadImage(imageUri) { // Receive the image URI as a parameter
    if (imageUri) { // Check if imageUri is provided
      const res = await fetch(imageUri);
      const blob = await res.blob();
      
      // Generate a unique file name using a timestamp
      const timestamp = getUnixTime(new Date()); // Get current Unix timestamp
      const fileName = `${timestamp}.jpg`; // Create a unique file name
      
      const storageRef = ref(storage, fileName);
      
      uploadBytes(storageRef, blob).then((snapshot) => {
        alert("Image Uploaded");
      });
    } else {
      alert("No image selected");
    }
  }
  
 
  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }

  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={type} ratio={'1:1'} ref={(ref) => setCamera(ref)}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>

      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Take Picture" onPress={takePicture} />

        <Button
          title="Pick Image from Gallery"
          onPress={() => PickImage()}
          style={styles.pickImageButton}
        />
         <Button
  title="Save"
  onPress={() => uploadImage('Save', {image})} 
/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  button: {
    backgroundColor: 'transparent',
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});