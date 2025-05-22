import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type receiptData = {
  name: string;
  address: string;
  date: string;
  type: string;
  price: string;
};

const pastReceipts = [
  {
    name: "Costco",
    address: "1234 Park St, Los Angeles, CA 90024",
    date: "Today",
    type: "Shopping",
    price: "$57.84",
  },
  {
    name: "Mogu mogu",
    address: "1234 Park St, Los Angeles, CA 90024",
    date: "3 days ago",
    type: "Food",
    price: "$37.97",
  },
  {
    name: "Din Tai Fung",
    address: "1234 Park St, Los Angeles, CA 90024",
    date: "4 days ago",
    type: "Food",
    price: "$104.25",
  },
  {
    name: "SUGARFISH",
    address: "1234 Park St, Los Angeles, CA 90024",
    date: "A week ago",
    type: "Food",
    price: "$75.55",
  },
  {
    name: "Killer Noodle Tsujita",
    address: "1234 Park St, Los Angeles, CA 90024",
    date: "A week ago",
    type: "Food",
    price: "$48.24",
  },
  {
    name: "Ralphs",
    address: "1234 Park St, Los Angeles, CA 90024",
    date: "June 8, 2024",
    type: "Shopping",
    price: "$43.02",
  },
  {
    name: "99 Ranch",
    address: "1234 Park St, Los Angeles, CA 90024",
    date: "June 6, 2024",
    type: "Shopping",
    price: "$25.33",
  },
];

const typeToIcon = {
  Shopping: "cart",
  Food: "restaurant",
};

function HistoryPage() {
  const mapReceipts = ({ item }: { item: receiptData }) => (
    <Pressable onPress={() => null} style={styles.receiptEntry}>
      <View style={styles.receiptLeft}>
        <Ionicons name={typeToIcon[item.type]} size={35} color={"green"} />
        <View>
          <Text style={styles.receiptName}>{item.name}</Text>
          <Text>{item.date}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.receiptName}>{item.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pastReceipts}
        renderItem={mapReceipts}
        ItemSeparatorComponent={() => <View style={styles.receiptDelimiter} />}
        style={styles.receiptList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  receiptList: {
    width: "100%",
  },
  receiptEntry: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  receiptLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  receiptName: {
    fontWeight: "bold",
    fontSize: 15,
  },
  receiptDelimiter: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default HistoryPage;
