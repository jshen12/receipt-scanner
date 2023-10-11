import { useState } from 'react';
import { Alert, Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';


function CameraPage() {

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cameraButton} onPress={() => Alert.alert("snap!")}>
            <Text>Take picture</Text>
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
  },
  buttonRow: {
    position: 'absolute',
    bottom: 0,
  },
  cameraButton: {
    justifyContent: 'center',
  }
});

export default CameraPage;