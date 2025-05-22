import { useState, useRef, useEffect } from "react";
import {
  Alert,
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

type Props = NativeStackScreenProps<Routes, "ResultPage">;
function ResultPage({ route, navigation }: Props) {
  const personList = Array.from(route.params.resultArray, (e, i) => {
    return (
      <View key={i} style={styles.person}>
        <Text style={styles.nameText}>{e.name}</Text>
        <Text style={styles.moneyText}>${e.amount.toFixed(2)}</Text>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Here's what each person owes:</Text>
      <View>{personList}</View>
      <Button
        onPress={() => navigation.navigate("History")}
        text={"Go to Home"}
        color={"#18ab3f"}
        selectedColor={"#12732c"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 75,
    marginHorizontal: 25,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },
  person: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "gray",
    height: 45,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  moneyText: {
    fontSize: 24,
  },
  nameText: {
    fontSize: 18,
  },
});

export default ResultPage;
