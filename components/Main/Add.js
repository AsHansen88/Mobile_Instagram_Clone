import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasCameraPermission, setHasCameraPermissions] = useState(null);

  useEffect(async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermissions(status === 'granted');

    const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync(); // Use requestMediaLibraryPermissionsAsync for image picker
    setHasPermissions(imagePickerStatus.status === 'granted');
  }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, 
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
  };

  if (!hasCameraPermission) {
    // Camera permissions are not granted yet
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
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <Button
          title="Pick Image from Gallery"
           onPress={() => PickImage()}
           style={styles.button} // Add this style prop
/>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: { 
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    width: 10,
    height: 10, // Adjust the height as needed
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});