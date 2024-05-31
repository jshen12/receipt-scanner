import { useState, useRef, useEffect } from 'react';
import { Alert, StyleSheet, TouchableOpacity, Platform, View, Image, Dimensions} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from '../Routes';
import Button from '../components/Button';

const dimensions = Dimensions.get('window');
const imgWidth = Math.round(dimensions.width * 4 / 5);
const imgHeight = Math.round(dimensions.width * 4 / 3);

type Props = NativeStackScreenProps<Routes, 'PreviewPage'>
function PreviewPage({ route, navigation }: Props) {
  if (!route.params.imgsrc) {
    return;
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
          text="Retake Photo"
          onPress={() => navigation.goBack()}
          color={"#18ab3f"}
          selectedColor={'#12732c'}
        />
        <Button
          text="Analyze"
          onPress={() => navigation.navigate("AnalysisPage", { imgsrc: route.params.imgsrc, participants: route.params.participants })}
          color={"#18ab3f"}
          selectedColor={'#12732c'}
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
    backgroundColor: 'lightgray',
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
    height: "5%"
  }
});

export default PreviewPage;