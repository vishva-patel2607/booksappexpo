import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


import Signup from './Pages/signup'
import Login from './Pages/login'
import {Provider} from 'react-redux';
import {createStore , applyMiddleware, compose} from 'redux';
import Navigation from './main pages/Navigation';
import Appreducer from './reducer';
import thunk from 'redux-thunk';

const initialState = {
  user : {
              accountUsername : "JhonnyAppleseed",
              accountNumber : "1234567890",
              token : "JhonnyAppleseed",
              isAuthenticated: false,
          },
  
}
const middleware = [thunk];
const store = createStore(Appreducer ,initialState, compose(applyMiddleware(...middleware)) );

//import Loggedin from './Main.js';

export default function App() {
  return (
    
    <Provider store={store}>
      <PaperProvider theme={theme} >
       <Navigation />
      </PaperProvider>
    </Provider>
    
  );
}


//  <Loggedin token={"hello"} theme={{theme}} />
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


