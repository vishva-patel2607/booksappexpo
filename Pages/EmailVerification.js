import React,{Component,useState,useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    StyleSheet,
    Alert
  } from 'react-native';
  import {  Platform, StatusBar,RefreshControl } from "react-native";
  import {logoutUser, setUser} from '../actions'
  import { Title,Text,Headline,Card,Button,TextInput} from 'react-native-paper'; 
  
  import Horizontalscrollview from './Horizontalscrollview';
  import {useDispatch, useSelector} from 'react-redux';
import { set } from 'react-native-reanimated';

  const EmailVerification = (props) => {
    const [email,setEmail] = useState(props.route.params.email);
    const [token,setToken] = useState(props.route.params.token);
    const [error,setError] = useState("");
    const [newemail,setNewemail] = useState("");
    
    changeemail = () => {
      var emailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i );
       if(email.length === 0 || !emailRegex.test(email.trim().toLowerCase())){
        alert("Enter a valid E-mail");
        return;
        }
      else{
      fetch('https://booksapp2021.herokuapp.com/User/Changeemail',{
        method:'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token' : token,
        },
        body:JSON.stringify({
          email:email,
        })
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data.status){
          
          Alert.alert(
            "Email changed and a verification mail is sent",
            "Please Check!"
            [
              {
                text:"OK",
              }
            ]
          );
        }
        else{
          setError(data.message);
        }
      })
    }
  }
  
    return (
        <>
            <Text style={styles.error}>
            Mail has already been sent to 
              Check the spam folder.{email}
            </Text>
            <Title style={{textAlign:'center'}}>Change Email?</Title>
            <TextInput 
                style = {styles.inputtextbox}
                label="Email"
                onChangeText = {(text) => setEmail(text)}
                autoCapitalize = 'none'
                autoCompleteType = 'email'
                autoCorrect = {false}
                maxLength = {30}
                left = {<TextInput.Icon name="email"/>}
                keyboardType='email-address'
            />
            <Text style={styles.error}>
              {error}
            </Text>
            <Button onPress={changeemail}>Change Email</Button>
        </>
    )
  }
  
  const styles=StyleSheet.create({
    error: {
        textAlign: "center",
        fontSize: 20,
        color: "red",
        padding :20,
      },
      inputtextbox: {
        margin : 10,
        
      },
  });
  export default EmailVerification;
