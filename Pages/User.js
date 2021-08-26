


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
                  username : "Hitz2001",
                  email : "hitanshushah5@gmail.com",
                  firstname : "Hitanshu",
                  lastname : "Shah",
                  year : "2001",
                  month : "January",
                  day : "10",
                  phonenumber : "+91 7227950335"
                };

const Usercard = () =>{

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userobj,setUserobj] = useState(tempoobj);

  

  useEffect(() => {
    fetch('https://booksapp2021.herokuapp.com/User',{
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
    
    <View style={styles.textStyle}>
        
        <Text></Text>
        <Image
          source={{
            uri:
              'https://media-exp1.licdn.com/dms/image/C5103AQE3hk73-PCrzg/profile-displayphoto-shrink_800_800/0/1548737319263?e=1635379200&v=beta&t=nHHMCygkgluSbKI5p37bryXATv5FIm2Slufqe8MkO3M',
          }}
          style={{ width: 100, height: 100, borderRadius: 200 / 2 }}
        />
        <Text></Text>
        <Title>{userobj.firstname + " " + userobj.lastname}</Title>
        <Subheading>{userobj.username}</Subheading>
        <Text></Text>
        <Subheading><Image
          source={{
            uri:
              'https://www.iconfinder.com/icons/211660/download/png/512',
          }}
          style={{ width: 20, height: 20, borderRadius: 200 / 2}}/> {userobj.email}</Subheading>
        <Text>  </Text>
        <Subheading>
        <Image
          source={{
            uri:
              'https://www.iconfinder.com/icons/1608790/download/png/512',
          }}
          style={{ width: 20, height: 20, borderRadius: 200 / 2}}/>  {userobj.phonenumber}</Subheading>
        <Text></Text>
        <Subheading>
        <Image
          source={{
            uri:
              'https://cdn3.iconfinder.com/data/icons/object-emoji/50/Celebration-1024.png',
          }}
          style={{ width: 20, height: 20, borderRadius: 200 / 2}}/> {userobj.day +" "+ userobj.month + " " +userobj.year}</Subheading>
        <Text></Text>
        <Text></Text>
        <Button
        
        style={styles.editprofile}>
        Edit Profile</Button>
        <Text></Text>
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
                style = {styles.logoutbutton}
                labelStyle = {styles.logoutbutton}
                onPress = {() => dispatch(logoutUser())}
                
              >
                Log out
            </Button>
        </SafeAreaView>
        
      )
    
  
}

const styles = StyleSheet.create({
  userdetails: {
    textDecorationLine: 'underline',
  },
  textbox: {
    textAlign: "center",
    padding :20,
  },
  textStyle:{
    marginTop: 40,
    alignItems: "center",
    
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
  editprofile: {
    margin : 50,
    fontSize : 20,
    marginBottom : 10,
    marginTop: 20,
    height: 35,
    width: 150,
    alignSelf: 'center',
    borderRadius: 10,
    

  },
  submitbutton: {
    margin : 50,
    fontSize : 20,
    marginBottom : 20,
    height: 45,
    width: 300,
    alignSelf: 'center',
    borderRadius: 10,
    color : "white"
  },
  logoutbutton:{
    alignSelf: 'center',
    width: 300,
    fontSize: 20,
    color: "white",
    borderRadius: 10,
  },

  loginlayout: {
    flex:1,
    justifyContent : "center",
  },

  layout: {
    flex:1,
  },
  cardview :{
    flex:1,
  },

  cardscroll :{
    flex : 1,
    height : '100%',
    margin : 10,
  },


  cardcontainer : {
    flex: 1,
    flexDirection : 'row',
    justifyContent : 'center',
    alignContent: 'center',
    alignItems : 'center',
    marginBottom : 10,
    marginTop : 80,
    borderRadius : 5,
  },

  cardcontent : {
    flex : 4,
    height: 150,
    justifyContent: 'center',
    alignItems:'center', 
    margin : 20,
    
  },

  cardimage : {
    flex : 3,
    height: 150,
    justifyContent: 'center',
    alignItems:'center', 
    margin : 10,
    marginRight :5,
  },

  bg : {
    backgroundColor : '#EDEDF0',
  }
  

  
});

export default UserRoute;


  

