import { useState, useRef, useEffect } from 'react';
import { Alert, StyleSheet, Text, Platform, View, Image, Dimensions, ActivityIndicator, Pressable, TextInput, SafeAreaView, ScrollView} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from '../Routes';
import Button from '../components/Button';


type Props = NativeStackScreenProps<Routes, 'ConfigurePage'>
function ConfigurePage({ route, navigation }: Props) {
  const [config, setConfig] = useState({
    numPeople: ''
  });
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmit = () => {
    if (config.numPeople == '') {
      setErrorMsg("Must enter a value");
      return;
    }
    var numPeople = Number(config.numPeople);
    if (numPeople > 10) {
      setErrorMsg("Too many people (max: 10)");
      return
    }
    navigation.navigate("CameraPage", {numPeople});
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView alwaysBounceVertical={false} style={styles.form} contentContainerStyle={styles.formItems}>
        <Text style={styles.label}>Number of People</Text>
        <TextInput 
          keyboardType="number-pad"
          style={styles.input}
          onChangeText={(number) => setConfig({ ...config, numPeople: number})}
        />
        {!!errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
        <Button onPress={onSubmit} text={"Continue"} color={"purple"} selectedColor={'#402a5c'}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    marginHorizontal: 20,
  },
  formItems: {
    gap: 5
  },
  label: {
    fontSize: 20
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 12
  },
  error: {
    color: 'red'
  }
});


export default ConfigurePage;