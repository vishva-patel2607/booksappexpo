import React, { Component,useState,useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme } from 'react-native-paper';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

import SearchRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/Search.js';
import UploadRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/Upload.js';
import UserRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/User.js';
import HomeRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/Home.js';
import Bookscreen from '../Pages/Bookscreen';
import Camerascreen from '../Pages/Camerascreen';
import Changepassword from '../Pages/Changepassword';

import { CommonActions } from '@react-navigation/routers';
import Login from '../Pages/login';
import Signup from '../Pages/signup';

import {useSelector, useDispatch} from 'react-redux';

import { getUser, logoutUser , setUser} from '../actions';

const theme = {

  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
  primary : '#7CABF0',
  accent : "#EF90A9",
  background : '#FFFFFF',
  surface : "#EDEDF0",
  disabled : '#808080',
  backdrop : '#7CABF0',
  onSurface : '#EDEDF0',
  notification : '#EF90A9',
  
    
  },
};

const Bottomnavcomponent = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        shifting={true}
        sceneAnimationEnabled={false}
        activeColor = {"white"}
        inactiveColor = {"white"}
        
      >
        <Tab.Screen
          name="Home"
          component={HomeRoute}
          options={{
            tabBarIcon: 'home',
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchRoute}
          options={{
            tabBarIcon: 'magnify',
          }}
        />
        <Tab.Screen
          name="Upload"
          component={UploadRoute}
          options={{
            tabBarIcon: 'upload',
          }}
        />
        <Tab.Screen
          name="User"
          component={UserRoute}
          options={{
            tabBarIcon: 'account',
          }}
        />

      </Tab.Navigator>
    );
  };


const Navigation = () => {
  const dispatch = useDispatch();

  
  dispatch(getUser());
  const [response,setResponse] = useState(false);
  const [isAuthenticated,setisAuthenticated] = useState(false);

  const user = useSelector((state) => state.user);

  /*useEffect(()=>{
    
    console.log(user);
    console.log(user.token);
      fetch('http://127.0.0.1:5000/Tokencheck', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token' : user.token,
          },
          body: null,
      })
      .then((response) => {
            for (var pair of response.headers.entries()) { 
              if (pair[0] === 'www-authenticate') { 
                console.log("token not found");
                dispatch(logoutUser());
                return (null);
              }
            }
            return response.json();
          })
      .then((data) => {if(data!== null){setisAuthenticated(data.response); dispatch(setUser(user.accountUsername,ussr.accountUsernumber,user.token,isAuthenticated))}})
 
      
  },[])*/

  
  if (user.isAuthenticated && user !== null){
   
    return(
      <NavigationContainer theme={theme}>
            <Stack.Navigator >
            <Stack.Screen name="Mainpage" component={Bottomnavcomponent} options={{headerShown: false, title: ''}} />
            <Stack.Screen name='Bookscreen' component={Bookscreen}  options={{ title: '' }} />
            <Stack.Screen name="Camerascreen" component={Camerascreen} options={{ title: '' }} />
            <Stack.Screen name="Changepassword" component={Changepassword} options={{ title: 'Change Password' }}/>
            </Stack.Navigator>
      </NavigationContainer>
    )
  }
  else {
    return(
      <NavigationContainer theme={theme}>
            <Stack.Navigator >
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name='Signup' component={Signup}  options={{headerShown: false}}/>
            </Stack.Navigator>
      </NavigationContainer>
    )
  }
}



export default Navigation;