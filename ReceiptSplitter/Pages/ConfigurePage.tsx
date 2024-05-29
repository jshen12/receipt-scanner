import { useState, useRef, useEffect } from 'react';
import { Alert, StyleSheet, Text, Platform, View, Image, Dimensions, ActivityIndicator, Pressable, TextInput, SafeAreaView, ScrollView} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from '../Routes';
import Button from '../components/Button';
import Svg, {Path} from 'react-native-svg';



type Props = NativeStackScreenProps<Routes, 'ConfigurePage'>
function ConfigurePage({ route, navigation }: Props) {
  const [config, setConfig] = useState({
    numPeople: 1
  });
  const [errorMsg, setErrorMsg] = useState('')

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Add Participants</Text>
      <View style={styles.formEntry}>
        <Text style={styles.label}>Number of People</Text>
        <View style={styles.counter}>
          <Pressable style={styles.counterButtonLeft} onPress={() => setConfig({ ...config, numPeople: Math.max(config.numPeople - 1, 1)})}>
            <Svg color='black' width='16' height='16' viewBox="0 0 18 2">
              <Path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
            </Svg>
          </Pressable>
          <View style={styles.counterNumber}>
            <Text>{config.numPeople}</Text>
          </View>
          <Pressable style={styles.counterButtonRight} onPress={() => setConfig({ ...config, numPeople: Math.min(config.numPeople + 1, 8)})}>
            <Svg color='black' width='16' height='16' viewBox="0 0 18 18">
              <Path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </Svg>
          </Pressable>
        </View>
      </View>
      {!!errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      <ScrollView style={styles.peopleList} contentContainerStyle={styles.formItems}>
        
      </ScrollView>
      <Button onPress={() => navigation.navigate("CameraPage", {numPeople: config.numPeople})} text={"Continue"} color={"#18ab3f"} selectedColor={'#12732c'}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 25
  },
  formEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  peopleList: {
    flex: 1,
  },
  formItems: {
    gap: 5
  },
  label: {
    fontSize: 20
  },
  counter: {
    flexDirection: 'row',
    position: 'relative',
    right: 75,
    alignItems: 'center',
    maxWidth: 45,
  },
  counterButtonLeft: {
    backgroundColor: 'lightgray',
    borderColor: 'black',
    borderStartStartRadius: 8,
    borderEndStartRadius: 8,
    borderWidth: 1,
    padding: 12,
    height: 44,
    alignItems: 'center'
  },
  counterButtonRight: {
    backgroundColor: 'lightgray',
    borderColor: 'black',
    borderStartEndRadius: 8,
    borderEndEndRadius: 8,
    borderWidth: 1,
    padding: 12,
    height: 44,
  },
  counterNumber: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: 44,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    color: 'red'
  }
});


export default ConfigurePage;