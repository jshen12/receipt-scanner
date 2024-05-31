import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, Platform, View, Image, Dimensions, ActivityIndicator, Pressable, TextInput, SafeAreaView, ScrollView} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Routes } from '../Routes';
import Button from '../components/Button';
import Svg, {Path, Rect} from 'react-native-svg';



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
      <Svg style={styles.editIcon} width="45" height="45" viewBox="0 0 24 24" id="_24x24_On_Light_Edit" data-name="24x24/On Light/Edit">
        <Rect id="view-box" width="24" height="24" fill="none"/>
        <Path id="Shape" d="M.75,17.5A.751.751,0,0,1,0,16.75V12.569a.755.755,0,0,1,.22-.53L11.461.8a2.72,2.72,0,0,1,3.848,0L16.7,2.191a2.72,2.72,0,0,1,0,3.848L5.462,17.28a.747.747,0,0,1-.531.22ZM1.5,12.879V16h3.12l7.91-7.91L9.41,4.97ZM13.591,7.03l2.051-2.051a1.223,1.223,0,0,0,0-1.727L14.249,1.858a1.222,1.222,0,0,0-1.727,0L10.47,3.91Z" transform="translate(3.25 3.25)" fill="#141124"/>
      </Svg>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Add Participants</Text>
      <View style={styles.formEntry}>
        <Text style={styles.label}>Number of People</Text>
        <View style={styles.counter}>
          <Pressable style={styles.counterButtonLeft} onPress={removeParticipant}>
            <Svg color='black' width='16' height='16' viewBox="0 0 18 2">
              <Path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
            </Svg>
          </Pressable>
          <View style={styles.counterNumber}>
            <Text>{participants.length}</Text>
          </View>
          <Pressable style={styles.counterButtonRight} onPress={addParticipant}>
            <Svg color='black' width='16' height='16' viewBox="0 0 18 18">
              <Path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </Svg>
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
    right: 50
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