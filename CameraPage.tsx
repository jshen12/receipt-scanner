import { useState, useRef } from 'react';
import { Alert, Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from './Routes';


type Props = NativeStackScreenProps<Routes, 'CameraPage'>
function CameraPage({ navigation }: Props) {

  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef<Camera | null>();
  const takePicture = async () => {
    if (cameraRef && cameraReady) {
      const photo = await cameraRef.current?.takePictureAsync();
      console.log(photo);
      if (photo?.uri) {
        navigation.navigate("PreviewPage", { imgsrc: photo?.uri });
      }
    }
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.back}
        onCameraReady={() => setCameraReady(true)}
        ref={(camera) => {
          cameraRef.current = camera;
        }}
      >
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cameraButton}>
            <TouchableOpacity style={styles.cameraInnerButton} onPress={takePicture}/>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonRow: {
    height: 125,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cameraButton: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraInnerButton: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    backgroundColor: 'white',
  }
});

export default CameraPage;