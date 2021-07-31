
import React, { Component,useState,useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Alert,
  Pressable
} from 'react-native';

import {useDispatch} from 'react-redux';

import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,RadioButton, Subheading,IconButton } from 'react-native-paper'; 
import DateTimePicker from '@react-native-community/datetimepicker';

import {logoutUser} from '../actions'




const UserRoute = () =>{

    
  const dispatch = useDispatch();

      return(
        <SafeAreaView>
            <Button 
                mode = "contained"
                style = {styles.submitbutton}
                labelStyle = {styles.submitbutton}
                onPress = {() => dispatch(logoutUser())}
              >
                Log out
              </Button>
        </SafeAreaView>
      )
    
  
}

const styles = StyleSheet.create({
    
  textbox: {
    textAlign: "center",
    padding :20,
  },

  error: {
    textAlign: "center",
    fontSize: 20,
    color: "red",
    padding :20,
  },

  inputtextbox: {
    margin : 10,
    
  },

  submitbutton: {
    margin : 10,
    fontSize : 20,
    color : "white"
  },

  loginlayout: {
    flex:1,
    justifyContent : "center",
   
  },

  layout: {
    flex:1,
  },

  

  
});

export default UserRoute;