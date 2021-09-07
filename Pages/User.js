
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
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
import { color, set } from 'react-native-reanimated';




const tempoobj = {
                  username : "Hitz2001",
                  email : "hitanshushah5@gmail.com",
                  firstname : "Hitanshu",
                  lastname : "Shah",
                  year : "2001",
                  month : "January",
                  day : "10",
                  phonenumber : "+91 7227950335",
                  dob: "Mon, 01 Oct 2001 00:00:00 GMT"
                };

const Usercard = (props) =>{
  

  const dispatch = useDispatch();
  
  const [userobj,setUserobj] = useState(props.user);

  const dateofbirth=userobj.dob.split(" ");

  return(
    
    <View style={styles.textStyle}>
        
        <Text></Text>
        <Avatar.Text size={80} label={userobj.firstname[0]+userobj.lastname[0]} color='white' />
        <Text></Text>
        <Title>{userobj.firstname + " " + userobj.lastname}</Title>
        <Subheading>{userobj.username}</Subheading>
        <Text></Text>
        <Subheading>📧 {userobj.email}</Subheading>
        <Text>  </Text>
        <Subheading>
        📞 {userobj.phonenumber}</Subheading>
        <Text></Text>
        <Subheading>
        🎂 {dateofbirth[1]+ " " + dateofbirth[2] + " " + dateofbirth[3]}</Subheading>
        <Text></Text>
    </View>

  )
  

}



const UserRoute = (props) =>{

  
  const dispatch = useDispatch();
  const [LoadingData,setLoadingData] = useState(false);
  const [userobj,setUserobj] = useState(tempoobj);
  const user = useSelector((state) => state.user);

      useEffect(() => {
          setLoadingData(false);
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
          .then((data) => {console.log(data); setUserobj(data); setLoadingData(true);})
          .catch((error) => {console.log(error); setUserobj(tempoobj);})
      },[])

      if(LoadingData){
        return(
          <SafeAreaView>
              <Usercard user={userobj} />
              <Button 
                  mode = "contained"
                  style = {styles.submitbutton}
                  labelStyle = {styles.submitbutton}
                  onPress = {() => {props.navigation.navigate("Changepassword");}}
      
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
              <Button
          style={styles.editprofile}
          onPress = {() => {props.navigation.navigate("EditPhone");}}
          >
            <Avatar.Icon size={20} icon="pen" />
            
          </Button>
          </SafeAreaView>
          
        )
      }
      else{
        return(
          <SafeAreaView>
              <View style={styles.activityindicator} >
                <ActivityIndicator animating={true} size={100} />
              </View>
          </SafeAreaView>
          
        )
      }
  
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
  activityindicator:{
    padding: 100,
    alignSelf: 'center',
  },
  inputtextbox: {
    margin : 10,
  },
  editprofile: {
    fontSize : 20,
    marginBottom : 10,
    marginTop: -242,
    height: 35,
    width: 150,
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginRight: -10,
    

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


  

