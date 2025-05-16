import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { fontsToLoad } from './src/utils/fonts';
import { AppNavigator } from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts(fontsToLoad);

  if (!fontsLoaded) {
    return null; // or your loading screen
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
