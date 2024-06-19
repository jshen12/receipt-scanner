import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraPage from './CameraPage';
import PreviewPage from './PreviewPage';
import type { Routes } from '../Routes';
import AnalysisPage from './AnalysisPage';
import ConfigurePage from './ConfigurePage';
import ResultPage from './ResultPage';


const Stack = createNativeStackNavigator<Routes>();

function HomeStack() {

  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      initialRouteName="ConfigurePage">
      <Stack.Screen name="ConfigurePage" component={ConfigurePage} />
      <Stack.Screen name="CameraPage" component={CameraPage} />
      <Stack.Screen name="PreviewPage" component={PreviewPage} />
      <Stack.Screen name="AnalysisPage" component={AnalysisPage} />
      <Stack.Screen name="ResultPage" component={ResultPage} />
    </Stack.Navigator>
  )
}

export default HomeStack