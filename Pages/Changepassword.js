import React, { Component,useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    StyleSheet,
    Alert,
    Pressable
} from 'react-native';
  
import {useDispatch, useSelector} from 'react-redux';
  
import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,RadioButton, Subheading,IconButton } from 'react-native-paper'; 

import {logoutUser} from '../actions'
import { set } from 'react-native-reanimated';

const tempoobj = {
    username : "hello",
    email : "hello",
    firstname : "hello",
    lastname : "hello",
    year : "hello",
    month : "hello",
    day : "hello",
    phonenumber : "hello"
  };

const Changepassword = (props) => {


    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [oldpassword,setOldpassword] = useState("");
    const [newpassword1,setNewpassword1] = useState("");
    const [newpassword2,setNewpassword2] = useState("");
    const [error,setError] = useState("");

    const changepassword  = () => {
        var passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');

        if(oldpassword.length === 0 || !passwordRegex.test(oldpassword)){
            alert("Check your old Password!");
            return;
        }
        else if(newpassword1.length === 0){
            alert("Enter your new password");
            return;
        }
        else if(newpassword2.length === 0){
            alert("Re-type your new password");
            return;
        }
        else if(newpassword1 !== newpassword2 || !passwordRegex.test(newpassword1) || !passwordRegex.test(newpassword2) ) {
            alert('Check Password! \n\n Password must contains eight characters, at least one uppercase letter, one lowercase letter and one number \n\n And both passwords should match');
            return;
        }
        else{

            fetch('https://booksapp2021.herokuapp.com/User/Changepassword', {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-access-token' : user.token,
            },
            body: JSON.stringify({
              oldpassword : oldpassword,
              newpassword : newpassword1,
            })
          })
          .then((response)=>{
            return response.json();
          })
          .then((data)=>{
            console.log('Going in ');
            if(data.status){
              setError(data.message);
              Alert.alert(
                error,
                "Please log in again with your new password",
                [
                  {text: "Login", onPress: () => dispatch(logoutUser())}
                ]
              );
            }
            else{
              if(data.message === 'Could not verify'){
                dispatch(logoutUser());
              }
              else{
                setError(data.message);
              }
            }
          })
          .catch((error)=>{
            console.log(error);
          })
        }
  }


    return(
        <SafeAreaView style={styles.layout}>
            <View style={styles.layout}>
              
            
            <TextInput 
                style = {styles.inputtextbox}
                label="Old Password"
                value = {oldpassword}
                onChangeText = {(text) => setOldpassword(text)}
                autoCapitalize = 'none'
                autoCorrect = {false}
                maxLength = {20}
                secureTextEntry = {true}
            />

            <TextInput 
                style = {styles.inputtextbox}
                label="New Password"
                value = {newpassword1}
                onChangeText = {(text) => setNewpassword1(text)}
                autoCapitalize = 'none'
                autoCorrect = {false}
                maxLength = {20}
            />

            <TextInput 
                style = {styles.inputtextbox}
                label="Re-type New Password"
                value = {newpassword2}
                onChangeText = {(text) => setNewpassword2(text)}
                autoCapitalize = 'none'
                autoCorrect = {false}
                maxLength = {20}
            />

            <Text style={styles.error}>
                {error}
            </Text>


            <Button 
                mode = "contained"
                style = {styles.submitbutton}
                labelStyle = {styles.submitbutton}
                onPress = {changepassword}
            >
                Change Password
            </Button>
              
              
            </View>
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
  
    layout: {
      flex:1,
      
     
    },
  
  
    
  
    
  });


export default Changepassword;