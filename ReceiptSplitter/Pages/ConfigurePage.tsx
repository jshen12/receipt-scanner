import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, Platform, View, Image, Dimensions, ActivityIndicator, Pressable, TextInput, SafeAreaView, ScrollView} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from '../Routes';
import Button from '../components/Button';
import { Ionicons } from '@expo/vector-icons';


type Props = NativeStackScreenProps<Routes, 'ConfigurePage'>
function ConfigurePage({ route, navigation }: Props) {
  const [participants, setParticipants] = useState([{name: 'Person 1'}]);
  const [errorMsg, setErrorMsg] = useState('');

  const addParticipant = () => {
    if (participants.length < 8) {
      setParticipants(
        [
          ...participants,
          {name: 'Person ' + (participants.length + 1)}
        ]
    );
    }
  }

  const removeParticipant = () => {
    if (participants.length > 1)
      setParticipants(participants.slice(0, -1));
  }

  const editParticipantName = (name: string, index: number) => {
    // TODO: check duplicate names
    const newParticipants = participants.map((e, i) => {
      if (i == index)
        return {name: name};
      else
        return e;
    });
    setParticipants(newParticipants);
  }

  const participantList = Array.from(participants, (e, i) => 
    <View style={{flexDirection: 'row'}} key={i}>
      <TextInput 
        value={e.name}
        onChangeText={(text) => editParticipantName(text, i)}
        key={i} 
        style={styles.participant}
        />
      <Ionicons name={"pencil"} size={24} color={"green"} style={styles.editIcon}/>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Add Participants</Text>
      <View style={styles.formEntry}>
        <Text style={styles.label}>Number of People</Text>
        <View style={styles.counter}>
          <Pressable style={styles.counterButtonLeft} onPress={removeParticipant}>
            <Ionicons name={"remove"} size={30} color={"black"}/>
          </Pressable>
          <View style={styles.counterNumber}>
            <Text>{participants.length}</Text>
          </View>
          <Pressable style={styles.counterButtonRight} onPress={addParticipant}>
            <Ionicons name={"add"} size={30} color={"black"}/>
          </Pressable>
        </View>
      </View>
      {!!errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      <ScrollView style={styles.peopleList} contentContainerStyle={styles.formItems}>
        {participantList}
      </ScrollView>
      <Button onPress={() => navigation.navigate("CameraPage", {participants: participants})} text={"Continue"} color={"#18ab3f"} selectedColor={'#12732c'}/>
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
    marginTop: 25,
    marginBottom: 10,
  },
  formEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  peopleList: {
    flex: 1,
    marginVertical: 15
  },
  formItems: {
    gap: 5
  },
  participant: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
    borderColor: 'gray',
    backgroundColor: 'lightgray'
  },
  editIcon: {
    position: 'relative',
    right: 50,
    top: 10,
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
    padding: 5,
    height: 44,
    alignItems: 'center'
  },
  counterButtonRight: {
    backgroundColor: 'lightgray',
    borderColor: 'black',
    borderStartEndRadius: 8,
    borderEndEndRadius: 8,
    borderWidth: 1,
    padding: 5,
    height: 44,
    alignItems: 'center'
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