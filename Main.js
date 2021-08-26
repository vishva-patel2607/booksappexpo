
import React, { Component,useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Card,Avatar, Subheading } from 'react-native-paper'; 

import Bottomnavcomponent from './main pages/Navigation.js'

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();


import Bookscreen from './Pages/Bookscreen.js';
import SearchRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/Search.js';
import UploadRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/Upload.js';
import UserRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/User.js'
import HomeRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/Home.js';
import Camerascreen from './Pages/Camerascreen';









class Loggedin extends Component{

  constructor(props){
    super(props);
    this.state = {
      token : this.props.token,
    }
  }
  render(){
    console.log(this.state.token);
    return(
      <>

      <NavigationContainer theme={theme}>
            <Stack.Navigator >
            <Stack.Screen name="Mainpage" component={Bottomnavcomponent} options={{headerShown: false}}/>
            <Stack.Screen name='Bookscreen' component={Bookscreen}  />
            <Stack.Screen name="Camerascreen" component={Camerascreen} />
            </Stack.Navigator>
      </NavigationContainer>
      
      </>
      
    )
  }
}





const theme = {

  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
  primary : '#7CABF0',
  accent : "#EF90A9",
  background : '#000000',
  surface : "#EDEDF0",
  disabled : '#808080',
  backdrop : '#7CABF0',
  onSurface : '#EDEDF0',
  notification : '#EF90A9',
  
    
  },
};




export default Main;



