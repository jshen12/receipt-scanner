import { useState, useRef, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, Platform, View, Image, Dimensions, ActivityIndicator, Pressable} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from '../Routes';
import sharedstyles from '../sharedstyles';

//const url = "http://127.0.0.1:5000/upload";
const url = "https://296f-2603-8001-72f0-8260-8569-70aa-1bde-370b.ngrok-free.app/upload";

type Props = NativeStackScreenProps<Routes, 'AnalysisPage'>
function AnalysisPage({ route, navigation }: Props) {

  const [isLoading, setLoading] = useState(true);
  const [ocrList, setOCRList] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const uploadPicture = async() => {
    navigation.navigate("AnalysisPage", { imgsrc: route.params.imgsrc });

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
      console.log(data);
      setOCRList(data['data'])
    } catch (error) {
      console.error(error);
    } finally {
      console.log("done");
      setLoading(false);
    }
    
  };

  useEffect(() => {
    uploadPicture();
  }, []);

  const ocrResults = ocrList.map((ocrEntry, idx) => 
    <Text key={idx}>{ocrEntry[0]}</Text>
  );


  return (
    <View style={styles.screen}>
      {isLoading ? (
        <>
          <Text>Processing Image....</Text>
          <ActivityIndicator />
        </>
      ) : (
        <>
          {ocrResults}
          <Pressable style={sharedstyles.button} onPress={() => console.log("Pressed!")}>
            <Text style={sharedstyles.buttonText}>View Results</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default AnalysisPage;