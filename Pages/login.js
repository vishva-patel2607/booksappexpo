
import React, { Component,useState,useEffect } from 'react';
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

import {useSelector, useDispatch} from 'react-redux';

import { setUser } from '../actions';


const Login = (props) => {
  
    

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");
    const [token,setToken] = useState("");
    const dispatch = useDispatch();
    //const selector = useSelector();


    
    
    loginrequest = () => {

        let tokenvalue = "";
        var truevalue = true;
        if(username !== "" && password !== ""){
        console.log("API");
        
        fetch('https://booksapp2021.herokuapp.com/User/Login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password : password,
            username : username,
          })
        })
        .then((response) => {
          return response.json(); 
        })
        .then((data) => {
            if(data.status){
              setError(data.message);
              dispatch(setUser(data.response.username,data.response.usernumber,data.response.token,data.status));
            }
            else{
              setError(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
  }

  
      
      return (
          <SafeAreaView style={styles.loginlayout}>
            <View style={styles.layout}>
              
            <Title style={styles.textbox}>
                Log in
              </Title>
              
              <TextInput 
                style = {styles.inputtextbox}
                label="Username"
                value = {username}
                onChangeText = {(text) => setUsername(text)}
                autoCapitalize = 'none'
                autoCompleteType = 'username'
                autoCorrect = {false}
                maxLength = {20}
              />
              
              <TextInput 
                style = {styles.inputtextbox}
                label="Password"
                value = {password}
                onChangeText = {(text) => setPassword(text)}
                autoCapitalize = 'none'
                autoCompleteType = 'password'
                autoCorrect = {false}
                maxLength = {20}
                secureTextEntry = {true}
              />
              <Button 
                mode = "contained"
                style = {styles.submitbutton}
                labelStyle = {styles.submitbutton}
                onPress = {loginrequest}
              >
                Log in
              </Button>
  
              <Text style={styles.error}>
                {error}
              </Text>
            </View>
  
            <View>
              <Button 
                onPress = {() => props.navigation.navigate('Signup')}
              >
                Sign Up
              </Button>
            </View>
              
              
            
          </SafeAreaView>
        );
      
    
  };
  
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


  export default Login;