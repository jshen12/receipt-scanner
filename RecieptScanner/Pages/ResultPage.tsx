import { useState, useRef, useEffect } from 'react';
import { Alert, StyleSheet, Text, Platform, View, Image, Dimensions, ActivityIndicator, Pressable, FlatList, SafeAreaView, ScrollView} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from '../Routes';
import Button from '../components/Button';

type Props = NativeStackScreenProps<Routes, 'ResultPage'>
function ResultPage({ route, navigation }: Props) {

  const personList = Array.from(route.params.resultMap, ([name, amount]) => {
    return (
      <Text>{name}: {amount}</Text>
    );
  });


  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Here's what everyone owes:</Text>
      {personList}
      <Button onPress={() => navigation.popToTop()} text={"Go to Home"} color={"purple"} selectedColor={'#402a5c'}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 75,
    marginHorizontal: 25
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default ResultPage;