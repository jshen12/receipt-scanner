import { useState, useEffect } from 'react';
import { StyleSheet, Text, Platform, View, Image, Dimensions, ActivityIndicator, Pressable, FlatList, SafeAreaView, ScrollView} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from '../Routes';
import Button from '../components/Button';

//const url = "http://127.0.0.1:5000/upload";
const url = "https://7b1e-2603-8001-72f0-8260-f0ef-e1b6-16a9-9fe2.ngrok-free.app/upload";
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
  const [error, setError] = useState('');

  const uploadPicture = async() => {
    const formdata = new FormData();
    
    const photodata = {
      uri: Platform.OS === 'ios' ? route.params.imgsrc.replace('file://', '') : route.params.imgsrc,
      name: 'test.txt',
      type: 'image/jpeg'
    };
    
    console.log(JSON.stringify(photodata));
    formdata.append('photo', photodata);

    const res = await fetch(process.env.EXPO_PUBLIC_SERVER_URL + "/upload", {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    });
    if (!res.ok) {
      console.log(res);
      if (res.status == 500) {
        const data = await res.json();
        setError("Server Error: " + data["error"]);
      } else {
        setError("Could not find server");
      }
      console.log(error);
      return;
    }
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

    console.log("done");
    setLoading(false);
    
  };

  const filterOCR = () => {

    // reduct ocr list to dict of {person => price}
    const reducedOCR = ocrList.reduce(
      (accumulator, entry) => {
        if (entry.assignedPerson !== -1) {
          if (accumulator.has(entry.assignedPerson))
            accumulator.set(entry.assignedPerson, accumulator.get(entry.assignedPerson) + Number(entry.price));
          else
            accumulator.set(entry.assignedPerson, Number(entry.price));
        }
        return accumulator;
      },
      new Map()
    );
    console.log(reducedOCR);
    const reducedOCRList = Array.from(reducedOCR.keys(), ((e) => (
      {name: route.params.participants[e].name, amount: reducedOCR.get(e)}
    )))
    navigation.navigate("ResultPage", {resultArray: reducedOCRList});

  }

  useEffect(() => {
    console.log(route.params);
    uploadPicture();
  }, []);

  const onResultPress = (resultIdx: number) => {
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


  const ocrResults = ({item, index}: {item: ocrEntry, index: number}) => (
    <Pressable style={item.assignedPerson === -1 ? styles.priceItem : [styles.priceItem, {backgroundColor: colors[item.assignedPerson]}]} onPress={() => onResultPress(index)}>
      <Text style={styles.priceText}>{item.text}</Text>
    </Pressable>
  );

  const peopleButtons = Array.from(route.params.participants, (e, i) => {
    return (
      <Button onPress={() => setSelectedIdx(i)} text={e.name} color={colors[i]} selectedColor={'#402a5c'} key={i}/>
    );
  });

  
  if (error !== '') {
    return (
      <SafeAreaView style={styles.errorScreen}>
        <Text>{error}</Text>
        <Button onPress={() => navigation.goBack()} text={"Go Back"} color={"#18ab3f"} selectedColor={'#12732c'}/>
      </SafeAreaView>
    )
  }


  return (
    <SafeAreaView style={styles.screen}>
      {isLoading ? (
        <View style={styles.loadingView}>
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
          <Button onPress={filterOCR} text={"Calculate Prices"} color={"#18ab3f"} selectedColor={'#12732c'}/>
        </View>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  pageView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  personSelector: {
    marginVertical: 15,
    maxHeight: 55
  },
  priceList: {
    marginVertical: 15,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15
  },
  priceItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'gray',
  },
  priceText: {
    fontSize: 16
  },
  errorScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15
  }
});

export default AnalysisPage;