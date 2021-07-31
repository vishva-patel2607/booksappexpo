
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




class Signup extends Component {
  
    constructor(props){
     super(props);
     this.state = {
       username : "",
       password : "",
       email : "",
       firstname : "",
       lastname: "",
       dob: "",
       token : "",
       error : null
      }
  
      this.loginrequest = this.Signuprquest.bind(this);
    }
    
    Signuprquest(){
  
        fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              password : this.state.password,
              username : this.state.username,
            })
          })
          .then((response) => {
            for (var pair of response.headers.entries()) { 
              if (pair[0] === 'www-authenticate') { 
                this.setState({error: pair[1] })
              }
            }
            return response.json();})
          .catch((error) => console.log(error));
    }

  
    render(){
      return (
          <SafeAreaView style={styles.loginlayout}>
            <View style={styles.layout}>
              
            <Title style={styles.textbox}>
                Sign up
              </Title>
              
              <TextInput 
                style = {styles.inputtextbox}
                label="Username"
                value = {this.state.username}
                onChangeText = {(text) => this.setState({username : text})}
                autoCapitalize = 'none'
                autoCompleteType = 'username'
                autoCorrect = {false}
                maxLength = {20}
              />
              
              <TextInput 
                style = {styles.inputtextbox}
                label="Password"
                value = {this.state.password}
                onChangeText = {(text) => this.setState({password : text})}
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
                onPress = {this.loginrequest}
              >
                Sign up
              </Button>
  
              <Text style={styles.error}>
                {this.state.error}
              </Text>
            </View>
  
            <View>
              <Button 
                onPress = {() => this.props.navigation.navigate('Login')}
              >
                Log in
              </Button>
            </View>
              
              
            
          </SafeAreaView>
        );
      }
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


  export default Signup;