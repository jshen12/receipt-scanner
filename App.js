import { Alert, Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraPage from './CameraPage';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const activateCamera = () => {
    navigation.navigate("CameraPage");
  }

  return (
    <View style={styles.container}>
      <Text>Open Camera</Text>
      <Button 
        title="Open Camera"
        color="#f194ff"
        onPress={activateCamera}
      />
    </View>
  )
}

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomeScreen} />
        <Stack.Screen name="CameraPage" component={CameraPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  camera: {
    flex: 1,
  },
  cameraButton: {
    justifyContent: 'center',
  }
});

export default App;