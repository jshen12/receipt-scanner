import { Alert, StyleSheet, Button, TouchableOpacity, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import CameraPage from './CameraPage';
import PreviewPage from './PreviewPage';
import type { Routes } from './Routes';

const Stack = createNativeStackNavigator<Routes>();

type Props = NativeStackScreenProps<Routes, 'HomePage'>
function HomeScreen({ navigation }: Props) {
  const activateCamera = () => {
    navigation.navigate("CameraPage");
  }

  return (
    <View style={styles.container}>
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
        <Stack.Screen name="PreviewPage" component={PreviewPage} />
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
});

export default App;