import { Alert, StyleSheet, Button, TouchableOpacity, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './Pages/HomePage';


function HistoryPage() {
  return <View><Text>History</Text></View>
}
function ProfilePage() {
  return <View><Text>Profile</Text></View>
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HistoryPage" component={HistoryPage}/>
        <Tab.Screen name="NewReceipt" component={HomeStack} options={{
          tabBarStyle: {
            display: 'none'
          },
          headerShown: false
        }}/>
        <Tab.Screen name="ProfilePage" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});

export default App;