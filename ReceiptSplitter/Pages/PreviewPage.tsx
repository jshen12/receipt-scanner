import { useState, useRef, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Pressable,
  Platform,
  View,
  Image,
  Dimensions,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Routes } from "../Routes";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";

const dimensions = Dimensions.get("window");
const imgWidth = Math.round((dimensions.width * 4) / 5);
const imgHeight = Math.round((dimensions.width * 4) / 3);

type Props = NativeStackScreenProps<Routes, "PreviewPage">;
function PreviewPage({ route, navigation }: Props) {
  if (!route.params.imgsrc) {
    return;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.top}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={35} color={"white"} />
          </Pressable>
        </View>
        <Image
          source={{
            uri: route.params.imgsrc,
          }}
          style={styles.image}
        ></Image>
        <Button
          text="Analyze"
          onPress={() =>
            navigation.navigate("AnalysisPage", {
              imgsrc: route.params.imgsrc,
              participants: route.params.participants,
            })
          }
          color={"#198221"}
          selectedColor={"#105416"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "space-evenly",
    marginHorizontal: 25,
  },
  image: {
    width: 375,
    height: 500,
    resizeMode: "contain",
    alignSelf: "center",
  },
  top: {},
});

export default PreviewPage;
