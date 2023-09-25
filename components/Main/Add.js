import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Add(Navigation) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasCameraPermission, setHasCameraPermissions] = useState(null);
  const [image, setImage] = useState(null);


  useEffect(async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermissions(status === 'granted');

    const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasPermissions(imagePickerStatus.status === 'granted');
  }, []);

  const takePicture = async () => {
    if (camera){
      const data = await camera.takePictureAsync(null)
      console.log(data.uri)
    }
  }


  if (!permission) {
    return <View />;
  }

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (!hasCameraPermission) {
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
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Pick Image from Gallery"
          onPress={() => PickImage()}
          style={styles.pickImageButton}
        />
        <Button
          title="Take picture" onPress={() => takePicture() }/>
          {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
          <Button
          title="Save" onPress={() => Navigation.navigate('Save', { image })}/>

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
  pickImageButton: {
    margin: 16,
  },
});
