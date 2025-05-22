import { StyleSheet, Text, Pressable, View, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Past Receipts</Text>
      <Ionicons name="search-outline" size={35} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 100,
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingBottom: 10,
    shadowOpacity: 0.85,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default Header;
