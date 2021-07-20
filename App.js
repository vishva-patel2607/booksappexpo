import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Loggedin from './Main.js';

export default function App() {
  return (
    
      <PaperProvider theme={theme} >
        <Loggedin token={'hello'} />
      </PaperProvider>
    
  );
}

const theme = {

  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
  primary : '#7CABF0',
  accent : "#EF90A9",
  background : '#FFFFFF',
  surface : "#EDEDF0",
  disabled : '#808080',
  backdrop : '#7CABF0',
  onSurface : '#EDEDF0',
  notification : '#EF90A9',
  
    
  },
};


