import { useState, useRef, useEffect } from 'react';
import { Alert, Button, StyleSheet, TouchableOpacity, Platform, View, Image, Dimensions} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from './Routes';

const dimensions = Dimensions.get('window');
const imgWidth = Math.round(dimensions.width * 4 / 5);
const imgHeight = Math.round(dimensions.width * 4 / 3);

//const url = "http://127.0.0.1:5000/upload";
const url = "https://a2be-2603-8001-72f0-8260-b4c4-c341-df2e-7611.ngrok-free.app/upload"

type Props = NativeStackScreenProps<Routes, 'PreviewPage'>
function PreviewPage({ route, navigation }: Props) {
  if (!route.params.imgsrc) {
    return;
  }
  
  const uploadPicture = async() => {
    console.log(Platform.OS);
    const formdata = new FormData();

    
    const photodata = {
      uri: Platform.OS === 'ios' ? route.params.imgsrc.replace('file://', '') : route.params.imgsrc,
      name: 'test.txt',
      type: 'image/jpeg'
    };
    
    console.log(JSON.stringify(photodata));
    formdata.append('photo', photodata);

    
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      });
      const data = await res.json();
    } catch (error) {
      console.error(error);
    } finally {
      console.log("done");
    }
    
  }


  return (
    <View style={styles.container}>
      <View style={styles.top} />
      <Image
        source={{
          uri: route.params.imgsrc
        }}
        style={styles.image}
      ></Image>
      <View style={styles.bottom}>
        <Button
          title="Retake Photo"
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Analyze"
          color="white"
          onPress={uploadPicture}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: 'contain'
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: "15%",
    width: "100%"
  },
  top: {
    height: "20%"
  }
});

export default PreviewPage;