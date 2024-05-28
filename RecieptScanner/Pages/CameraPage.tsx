import { useState, useRef } from 'react';
import { Alert, Button, StyleSheet, TouchableOpacity, Text, View, Dimensions } from 'react-native';
import { CameraView } from 'expo-camera';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from '../Routes';


const dimensions = Dimensions.get('window');
const verticalPadding = dimensions.height - Math.round(dimensions.width * 4 / 3);

type Props = NativeStackScreenProps<Routes, 'CameraPage'>
function CameraPage({ route, navigation }: Props) {

  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef<CameraView | null>();
  const takePicture = async () => {
    
    if (cameraRef && cameraReady) {
      var i = await cameraRef.current?.getAvailablePictureSizesAsync();
      const photo = await cameraRef.current?.takePictureAsync();
      console.log(photo);
      if (photo?.uri) {
        navigation.navigate("PreviewPage", { imgsrc: photo?.uri, numPeople: route.params.numPeople });
      }
    }
    
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onCameraReady={() => setCameraReady(true)}
        pictureSize='Photo'  // ["3840x2160", "1920x1080", "1280x720", "640x480", "352x288", "Photo", "High", "Medium", "Low"]
        ref={(camera) => {
          cameraRef.current = camera;
        }}
        >
        
      </CameraView>
      <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cameraButton}>
            <TouchableOpacity style={styles.cameraInnerButton} onPress={takePicture}/>
          </TouchableOpacity>
        </View>
    </View>
  );
}

// photos are 4:3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    marginTop: verticalPadding / 2 ,
    marginBottom: verticalPadding / 2 - 125
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