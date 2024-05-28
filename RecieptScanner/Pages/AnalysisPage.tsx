import { useState, useRef, useEffect } from 'react';
import { Alert, StyleSheet, Text, Platform, View, Image, Dimensions, ActivityIndicator, Pressable, FlatList, SafeAreaView, ScrollView} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from '../Routes';
import Button from '../components/Button';

//const url = "http://127.0.0.1:5000/upload";
const url = "https://dab0-2603-8001-72f0-8260-8569-70aa-1bde-370b.ngrok-free.app/upload";
const colors = ["#3BC481", "#3D3BC4", "#C43B7E", "#C2C43B", "#E7E393"];

type ocrEntry = {
  text: string,
  price: string,
  assignedPerson: number
}

type Props = NativeStackScreenProps<Routes, 'AnalysisPage'>
function AnalysisPage({ route, navigation }: Props) {

  const [isLoading, setLoading] = useState(true);
  const [ocrList, setOCRList] = useState<Array<ocrEntry>>([]);
  const [selectedIdx, setSelectedIdx] = useState(-1);

  const uploadPicture = async() => {
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
      const ocrList = data['data'].map((e: {text: string, price: string}) => (
        {
          text: e.text,
          price: e.price,
          assignedPerson: -1
        }
      ));
      setOCRList(ocrList);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("done");
      setLoading(false);
    }
    
  };

  useEffect(() => {
    console.log(route.params);
    uploadPicture();
  }, []);

  const onResultPress = (resultIdx) => {
    if (selectedIdx === -1)
      return;
    const updatedOcr = ocrList.map((e, i) => {
      if (i === resultIdx)
        return {...e, assignedPerson: selectedIdx};
      else
        return e;
    });
    setOCRList(updatedOcr);
  }


  const ocrResults = ({item, index}) => (
    <Pressable style={item.assignedPerson === -1 ? styles.priceItem : [styles.priceItem, {backgroundColor: colors[item.assignedPerson]}]} onPress={() => onResultPress(index)}>
      <Text style={styles.priceText}>{item.text}</Text>
    </Pressable>
  );

  const peopleButtons = Array.from(Array(route.params.numPeople), (e, i) => {
    return (
      <Button onPress={() => setSelectedIdx(i)} text={"Person " + (i + 1)} color={colors[i]} selectedColor={'#402a5c'} key={i}/>
    );
  });

  

  return (
    <SafeAreaView style={styles.screen}>
      {isLoading ? (
        <View style={styles.pageView}>
          <Text>Processing Image....</Text>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={styles.pageView}>
          <Text style={styles.titleText}>Assign Prices</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.personSelector}>
            {peopleButtons}
          </ScrollView>
          <FlatList
            data={ocrList}
            renderItem={ocrResults}
            extraData={selectedIdx}
            style={styles.priceList}
          />
          <Button onPress={() => console.log("Pressed!")} text={"view_"} color={"purple"} selectedColor={'#402a5c'}/>
        </View>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  pageView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  personSelector: {
    marginVertical: 15,
    height: 50
  },
  priceList: {
    marginVertical: 15,
  },
  titleText: {
    fontSize: 24,
  },
  priceItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'gray',
  },
  priceText: {
    fontSize: 16
  }
});

export default AnalysisPage;