import { useState, useRef } from "react";
import {
  Linking,
  StyleSheet,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Routes } from "../Routes";
import Button from "../components/Button";

type Props = NativeStackScreenProps<Routes, "VenmoPage">;
export function VenmoPage() {
  const handleClick = () => {
    Linking.openURL('venmo://open');
  }


  return (
    <View style={styles.container}>
      <Button
        text="Send Venmo"
        onPress={handleClick}
        color="green"
        selectedColor="light green"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});

export default VenmoPage;
