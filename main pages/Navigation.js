import React, { Component, useState, useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Image } from "react-native";
import { NavigationContainer,DefaultTheme,DarkTheme } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import Bookdetail from "../Pages/Bookdetail.js";
import { ThemeContext } from "../Components/Theme.js";
import EmailVerification from "../Pages/EmailVerification.js";
import SearchRoute from "../Pages/Search.js";
import PrivacyPolicy from "../Pages/Privacypolicy.js";

import EditEmail from "../Pages/Editemail.js";
import UploadRoute from "../Pages/Upload.js";
import UserRoute from "../Pages/User.js";
import HomeRoute from "../Pages/Home.js";
import Bookscreen from "../Pages/Bookscreen";
import Camerascreen from "../Pages/Camerascreen";
import Changepassword from "../Pages/Changepassword";
import PhonenumberVerification from "../Pages/PhonenumberVerification";
// import BookCondition from "../Pages/BookConditions"

import InitialSignup from "../Pages/Initialsignup.js";
import { CommonActions } from "@react-navigation/routers";
import Login from "../Pages/login";
import Signup from "../Pages/signup";
import EditPhone from "../Pages/EditPhone.js";
import Storemodal from "../Pages/Storemodal.js";
import { useSelector, useDispatch } from "react-redux";
import { getUser, logoutUser, setUser } from "../actions";
import ForgotPassword from "../Pages/Forgotpassword.js";

import Edituploadedbook from "../Pages/Edituploadedbook.js";
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const theme = {
  roundness: 5,
  colors: {
    ...DefaultTheme,
    primary: "#FFFFFF",
    accent: "#EF90A9",
    surface: "#EDEDF0",
    mapcolor:'#0036F4',
    disabled: "#808080",
    backdrop: "#7CABF0",
    onSurface: "#EDEDF0",
    notification: "#EF90A9",
    text:"#000000",
    button:"#E96A59",
    desctext:'#0D1936',
    background:'#ECEFEE'
  },
};
const Dtheme = {
  colors:{
    ...DarkTheme,
    primary: '#0D1936',
    background: '#0D1936',
    card: '#0D1936',
    text: '#ECEFEE',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
    mapcolor:'#ffffff'
  }
};

const Bottomnavcomponent = () => {
  const { setTheme, Theme } = React.useContext(ThemeContext);
  if(Theme==='Light'){
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationEnabled={false}
      activeColor={"black"}
      inactiveColor={"black"}
    >
      <Tab.Screen
        name="Home"
        component={HomeRoute}
       
        options={{
          
          tabBarIcon: ({ color, focused }) => (
            <Image
              color={color}
              size={26}
              source={
                focused
                  ? require("../assets/Vector.png")
                  : require("../assets/Home.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchRoute}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              color={color}
              size={26}
              source={
                focused
                  ? require("../assets/Groupfilled.png")
                  : require("../assets/Group.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadRoute}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              color={color}
              size={26}
              source={
                focused
                  ? require("../assets/uploadfilled.png")
                  : require("../assets/upload.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserRoute}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              color={color}
              size={26}
              source={
                focused
                  ? require("../assets/userfill.png")
                  : require("../assets/user.png")
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
      }
      else{
        return (
          <Tab.Navigator
          initialRouteName="Home"
          shifting={true}
          sceneAnimationEnabled={false}
          activeColor={"white"}
          inactiveColor={"white"}
        >
          <Tab.Screen
            name="Home"
            component={HomeRoute}
           
            options={{
              
              tabBarIcon: ({ color, focused }) => (
                <Image
                  color={color}
                  size={26}
                  source={
                    focused
                      ? require("../assets/homefilleddark.png")
                      : require("../assets/hometabdark.png")
                  }
                />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchRoute}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Image
                  color={color}
                  size={26}
                  source={
                    focused
                      ? require("../assets/searchtabdarkfilled.png")
                      : require("../assets/searchtabdark.png")
                  }
                />
              ),
            }}
          />
          <Tab.Screen
            name="Upload"
            component={UploadRoute}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Image
                  color={color}
                  size={26}
                  source={
                    focused
                      ? require("../assets/uploaddarkfilled.png")
                      : require("../assets/uploaddark.png")
                  }
                />
              ),
            }}
          />
          <Tab.Screen
            name="User"
            component={UserRoute}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Image
                  color={color}
                  size={26}
                  source={
                    focused
                      ? require("../assets/usertabfilleddark.png")
                      : require("../assets/usertab.png")
                  }
                />
              ),
            }}
          />
        </Tab.Navigator>
        )
      }
};


const Navigation = () => {
  const dispatch = useDispatch();

  dispatch(getUser());
  const [response, setResponse] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [Theme,setTheme] = useState('Light');

  const themeData = { Theme, setTheme };

  const user = useSelector((state) => state.user);
  
 
  if (user.isAuthenticated && user !== null) {
    return (
      <ThemeContext.Provider value={themeData}>
      <NavigationContainer theme={Theme == 'Light'? theme : Dtheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Mainpage"
            component={Bottomnavcomponent}
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="Bookscreen"
            component={Bookscreen}
            options={{ headerShown : false}}
          />
          <Stack.Screen
            name="Camerascreen"
            component={Camerascreen}
            options={{ title: "" }}
          />
          
          
          
          <Stack.Screen
            name="Changepassword"
            component={Changepassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditPhone"
            component={EditPhone}
            options={{ headerShown:false }}
          />
           <Stack.Screen
            name="EditEmail"
            component={EditEmail}
            options={{ headerShown:false }}
          />
          <Stack.Screen
            name="Storemodal"
            component={Storemodal}
            options={{ headerShown:false }}
          />
          <Stack.Screen
            name="Edituploadedbook"
            component={Edituploadedbook}
            options={{ headerShown:false }}
          />
          <Stack.Screen
            name="Bookdetail"
            component={Bookdetail}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ThemeContext.Provider>
    );
  } else {
    return (
      <ThemeContext.Provider value={themeData}>
      <NavigationContainer theme={Theme == 'Light'? theme : Dtheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="InitialSignup"
            component={InitialSignup}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerification}
            options={{ headerShown: true }}
          />

          <Stack.Screen
            name="PhonenumberVerification"
            component={PhonenumberVerification}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ThemeContext.Provider>
    );
  }
};

export default Navigation;
