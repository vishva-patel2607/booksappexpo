
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
  Pressable,
  Linking
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,RadioButton, Subheading,IconButton } from 'react-native-paper'; 
import DateTimePicker from '@react-native-community/datetimepicker';

import {logoutUser, setUser} from '../actions'
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
        🎂 {userobj.dob.split(" ")[1]+ " " +userobj.dob.split(" ")[2] + " " + userobj.dob.split(" ")[3]}</Subheading>
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
        console.log(user.token);
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
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if(data.status){
              console.log('True')
              setUserobj(data.response.user);
              setLoadingData(true);
            }
            else{
              console.log(data.status);
              if(data.message==='Could not verify'){
                dispatch(logoutUser());
              }
            }
          })
          .catch((error) => {
              console.log(error);
          })
        },[])
      if(LoadingData){
        return(
          <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
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
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Button 
              >
              © BooksAppExpo.
              </Button>
              <Button onPress={ ()=>{ Linking.openURL('https://google.com')}}>FAQ</Button>
              <Button onPress={ ()=>{ Linking.openURL('https://google.com')}}> Contact Us</Button>
              </View>
            
            
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
  textStyle:{
    marginTop: 10,
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
    margin : 30,
    fontSize : 20,
    marginBottom : 20,
    height: 45,
    width: 250,
    alignSelf: 'center',
    borderRadius: 10,
    color : "white"
  },
  logoutbutton:{
    alignSelf: 'center',
    width: 250,
    fontSize: 20,
    color: "white",
    borderRadius: 10,
  },


  bg : {
    backgroundColor : '#EDEDF0',
  }
  

  
});

export default UserRoute;


  

