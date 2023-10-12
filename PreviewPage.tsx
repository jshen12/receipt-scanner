import { useState, useRef, useEffect } from 'react';
import { Alert, Button, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from './Routes';

type Props = NativeStackScreenProps<Routes, 'PreviewPage'>
function PreviewPage({ route, navigation }: Props) {
  if (!route.params.imgsrc) {
    return;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: route.params.imgsrc
        }}
        style={styles.image}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
  },
});

export default PreviewPage;