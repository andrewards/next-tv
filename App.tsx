import React from 'react';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_700Bold, Poppins_900Black } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import AppRouter from './src/routes/index.routes';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    return (
      <>
        <AppLoading />
        <StatusBar style="light" />
      </>
    );
  }
  return (
    <>
      <AppRouter />
      <StatusBar style="light" />
    </>
  );
}