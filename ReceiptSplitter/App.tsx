import { Alert, StyleSheet, Button, TouchableOpacity, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './Pages/HomePage';
import HistoryPage from './Pages/HistoryPage';
import Header from './components/Header';
import { Ionicons } from '@expo/vector-icons';


function ProfilePage() {
  return <View><Text>Profile</Text></View>
}

const Tab = createBottomTabNavigator();

function App() {
  StatusBar.setBarStyle('dark-content');
  
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="History" component={HistoryPage} options={{
          header: () => <Header />,
          tabBarIcon: ({focused, color, size}) => <Ionicons name={focused ? "receipt" : "receipt-outline"} size={size} color={color}/>,
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        }}/>
        <Tab.Screen name="New Receipt" component={HomeStack} options={{
          tabBarStyle: {
            display: 'none'
          },
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => <Ionicons name="camera-outline" size={size} color={color}/>,
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        }}/>
        <Tab.Screen name="Profile" component={ProfilePage} options={{
          tabBarIcon: ({focused, color, size}) => <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={size} color={color}/>,
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        }}/>
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