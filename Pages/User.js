
import React, { Component,useState,useCallback,useEffect } from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';

import {logoutUser} from '../actions'


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

const Usercard = () =>{

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userobj,setUserobj] = useState(tempoobj);

  

  useEffect(() => {
    fetch('http://127.0.0.1:5000/User',{
      method: 'POST',
      headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-access-token' : user.token,
              },
      body : null
    })
    .then((response) => {
      for (var pair of response.headers.entries()) { 
        if (pair[0] === 'www-authenticate') { 
          console.log("token not found");
          dispatch(logoutUser());
          return (tempoobj);
        }
      }
      return response.json();
    })
    .then((data) => {console.log(data); setUserobj(data);})
    .catch((error) => {console.log(error); setUserobj(tempoobj);})
  },[])

  return(
    <View>
      <Title>{userobj.firstname + " " + userobj.lastname}</Title>
      <Text>{userobj.username}</Text>
      <Text>{userobj.email}</Text>
      <Text>{userobj.usernumber}</Text>
      <Text>{userobj.phonenumber}</Text>
      <Text>{userobj.dob}</Text>
    </View>
  )

}


const UserRoute = (props) =>{

    
  const dispatch = useDispatch();

  


      return(
        <SafeAreaView>
            <Usercard />
            <Button 
                mode = "contained"
                style = {styles.submitbutton}
                labelStyle = {styles.submitbutton}
                onPress = {() => props.navigation.navigate("Changepassword")}
              >
                Change Password
            </Button>
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