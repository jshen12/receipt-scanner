import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Platform,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  Pressable,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Routes } from "../Routes";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";

const colors = ["#3BC481", "#3D3BC4", "#C43B7E", "#C2C43B", "#E7E393"];

type ocrEntry = {
  text: string;
  price: string;
  assignedPeople: Array<number>;
};

type Props = NativeStackScreenProps<Routes, "AnalysisPage">;
function AnalysisPage({ route, navigation }: Props) {
  const [isLoading, setLoading] = useState(true);
  const [ocrList, setOCRList] = useState<Array<ocrEntry>>([]);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [error, setError] = useState("");

  const participants = route.params.participants;

  const uploadPicture = async () => {
    const formdata = new FormData();

    const photodata = {
      uri:
        Platform.OS === "ios"
          ? route.params.imgsrc.replace("file://", "")
          : route.params.imgsrc,
      name: "test.txt",
      type: "image/jpeg",
    };

    console.log(JSON.stringify(photodata));
    formdata.append("photo", photodata);

    const res = await fetch(process.env.EXPO_PUBLIC_SERVER_URL + "/upload", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
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
    const ocrList = data["data"].map((e: { text: string; price: string }) => ({
      text: e.text,
      price: e.price,
      assignedPeople: [],
    }));
    setOCRList(ocrList);

    console.log("done");
    setLoading(false);
  };

  const getInitials = (name: string) => {
    return name.match(/\b(\w)/g)?.join("");
  };

  const filterOCR = () => {
    // reduct ocr list to dict of {person => price}
    const reducedOCR = ocrList.reduce((accumulator, entry) => {
      if (entry.assignedPeople.length > 0) {
        const assignedPrice = Number(entry.price) / entry.assignedPeople.length;
        for (const person of entry.assignedPeople) {
          if (accumulator.has(person))
            accumulator.set(person, accumulator.get(person) + assignedPrice);
          else accumulator.set(person, assignedPrice);
        }
      }
      return accumulator;
    }, new Map());
    console.log(reducedOCR);
    const reducedOCRList = Array.from(reducedOCR.keys(), (e) => ({
      name: participants[e].name,
      amount: reducedOCR.get(e),
    }));
    navigation.navigate("ResultPage", { resultArray: reducedOCRList });
  };

  useEffect(() => {
    console.log(route.params);
    uploadPicture();
  }, []);

  const onResultPress = (resultIdx: number) => {
    if (selectedIdx === -1) return;
    const updatedOcr = ocrList.map((e, i) => {
      if (i === resultIdx) {
        const newAssignedPeople = e.assignedPeople;
        if (!newAssignedPeople.includes(selectedIdx)) {
          newAssignedPeople.push(selectedIdx);
        } else {
          newAssignedPeople.splice(newAssignedPeople.indexOf(selectedIdx), 1);
        }
        return { ...e, assignedPeople: newAssignedPeople };
      } else return e;
    });
    setOCRList(updatedOcr);
  };

  const ocrResults = ({ item, index }: { item: ocrEntry; index: number }) => (
    <Pressable
      style={styles.priceItem}
      onPress={() => onResultPress(index)}
      key={index}
    >
      <Text style={styles.priceText}>{item.text}</Text>
      <View style={styles.personContainer}>
        {item.assignedPeople.map((e, i) => (
          <View style={styles.personIcon} key={i}>
            <Text>{getInitials(participants[e].name)}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );

  const peopleButtons = Array.from(participants, (e, i) => {
    if (i == selectedIdx) {
      return (
        <Pressable style={styles.personOutline}>
          <Pressable
            style={styles.personBackground}
            onPress={() => setSelectedIdx(i)}
            key={i}
          >
            <Text>{getInitials(e.name)}</Text>
          </Pressable>
        </Pressable>
      );
    }
    return (
      <Pressable
        style={styles.personBackground}
        onPress={() => setSelectedIdx(i)}
        key={i}
      >
        <Text>{getInitials(e.name)}</Text>
      </Pressable>
    );
  });

  if (error !== "") {
    return (
      <SafeAreaView style={styles.errorScreen}>
        <Text>{error}</Text>
        <Button
          onPress={() => navigation.goBack()}
          text={"Go Back"}
          color={"#18ab3f"}
          selectedColor={"#12732c"}
        />
      </SafeAreaView>
    );
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
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.personSelector}
          >
            {peopleButtons}
          </ScrollView>
          <FlatList
            data={ocrList}
            renderItem={ocrResults}
            extraData={selectedIdx}
            style={styles.priceList}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            )}
          />
          <Button
            onPress={filterOCR}
            text={"Calculate Prices"}
            color={"#18ab3f"}
            selectedColor={"#12732c"}
          />
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
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  pageView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  personSelector: {
    height: 75,
    alignItems: "center",
    gap: 5,
  },
  personBackground: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  personOutline: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    borderWidth: 5,
    borderColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  personIcon: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: "lightgray",
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  priceList: {
    marginBottom: 10,
    width: "100%",
    maxHeight: 550,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 15,
  },
  priceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 60,
    paddingHorizontal: 15,
  },
  priceText: {
    fontSize: 16,
  },
  personContainer: {
    flexDirection: "row",
  },
  errorScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
});

export default AnalysisPage;
