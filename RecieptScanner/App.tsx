import { Alert, StyleSheet, Button, TouchableOpacity, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import CameraPage from './Pages/CameraPage';
import PreviewPage from './Pages/PreviewPage';
import type { Routes } from './Routes';
import AnalysisPage from './Pages/AnalysisPage';
import ConfigurePage from './Pages/ConfigurePage';
import ResultPage from './Pages/ResultPage';

const Stack = createNativeStackNavigator<Routes>();

type Props = NativeStackScreenProps<Routes, 'HomePage'>
function HomeScreen({ navigation }: Props) {
  const activateCamera = () => {
    navigation.navigate("ConfigurePage");
  }

  return (
    <View style={styles.container}>
      <Button 
        title="New Reciept"
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
        <Stack.Screen name="ConfigurePage" component={ConfigurePage} />
        <Stack.Screen name="CameraPage" component={CameraPage} />
        <Stack.Screen name="PreviewPage" component={PreviewPage} />
        <Stack.Screen name="AnalysisPage" component={AnalysisPage} />
        <Stack.Screen name="ResultPage" component={ResultPage} />
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