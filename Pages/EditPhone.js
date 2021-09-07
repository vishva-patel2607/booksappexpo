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
const EditPhone = (props) => {
    const [newphoneno,setNewphoneno] = useState("");
    

    const editphone = () => {
        if (newphoneno.length === 0 || !(/^\d+$/.test(newphoneno))){
            alert("Check your Phonenumber");
            return;
        }
        else{

            fetch('https://booksapp2021.herokuapp.com/changepassword', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-access-token' : user.token,
            },
            body: JSON.stringify({
              newphoneno : newphoneno,
            })
          })
    }
}
    return (
        <SafeAreaView style={styles.layout}>
            <View style={styles.layout}>
            <TextInput 
                style = {styles.inputtextbox}
                label="New Phone no"
                value = {newphoneno}
                onChangeText = {(text) => setNewphoneno(text)}
                autoCapitalize = 'none'
                autoCorrect = {false}
                maxLength = {20}
                secureTextEntry = {true}
            />
            <Button 
                mode = "contained"
                style = {styles.submitbutton}
                labelStyle = {styles.submitbutton}
                onPress = {editphone}
            >
                SAVE
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
export default EditPhone;
