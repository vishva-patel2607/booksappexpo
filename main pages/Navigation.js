import React, { Component, useState, useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Image } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import Bookdetail from "../Pages/Bookdetail.js";
import { ThemeContext } from "../Components/Theme.js";
import EmailVerification from "../Pages/EmailVerification.js";
import SearchRoute from "../Pages/Search.js";
import PrivacyPolicy from "../Pages/Privacypolicy.js";
import Forgotpassword from "../Pages/Forgotpassword.js";
import EditEmail from "../Pages/Editemail.js";
import HomeIconFilled from "../Svg/Homefilled.js";
import SearchIconFilled from "../Svg/Searchfilled.js";
import UploadIconFilled from "../Svg/Uploadfilled.js";
import UserInfoFilled from "../Svg/Userinfofilled.js";
import UploadRoute from "../Pages/Upload.js";
import UserRoute from "../Pages/User.js";
import HomeRoute from "../Pages/Home.js";
import Bookscreen from "../Pages/Bookscreen";
import Camerascreen from "../Pages/Camerascreen";
import Changepassword from "../Pages/Changepassword";
import UserInfo from "../Svg/UserInfo.js";
import SearchIcon from "../Svg/Search.js";
import UploadIcon from "../Svg/Upload.js";
import PhonenumberVerification from "../Pages/PhonenumberVerification";
import HomeIcon from "../Svg/Home.js";
// import BookCondition from "../Pages/BookConditions"

import InitialSignup from "../Pages/Initialsignup.js";
import { CommonActions } from "@react-navigation/routers";
import Login from "../Pages/login";
import Signup from "../Pages/signup";
import EditPhone from "../Pages/EditPhone.js";
import Storemodal from "../Pages/Storemodal.js";
import { useSelector, useDispatch } from "react-redux";
import { getUser, logoutUser, setUser } from "../actions";

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
    mapcolor: "#0036F4",
    disabled: "#808080",
    backdrop: "#7CABF0",
    onSurface: "#EDEDF0",
    notification: "#EF90A9",
    text: "#000000",
    button: "#E96A59",
    desctext: "#0D1936",
    background: "#ECEFEE",
    seperator:'#6E7A7D',
    divider:'#70768B'
  },
};
const Dtheme = {
  colors: {
    ...DarkTheme,
    primary: "#0D1936",
    background: "#0D1936",
    card: "#0D1936",
    text: "#ECEFEE",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
    mapcolor: "#ffffff",
    seperator:'#ECEFEE',
    divider:'#70768B'
  },
};

const Bottomnavcomponent = () => {
  const { setTheme, Theme } = React.useContext(ThemeContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationEnabled={false}
      activeColor={Theme==='Light'?'black':'white'}
      inactiveColor={Theme==='Light'?'black':'white'}
      screenOptions={{
        tabBarColor: Theme==='Light'?'#ECEFEE':'#0D1936',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeRoute}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <HomeIconFilled /> : <HomeIcon/>,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchRoute}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <SearchIconFilled /> : <SearchIcon />,
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadRoute}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <UploadIconFilled /> : <UploadIcon />,
        }}
      />
      <Tab.Screen
        name="User"
        component={UserRoute}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <UserInfoFilled /> : <UserInfo />,
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const dispatch = useDispatch();

  dispatch(getUser());
  const [response, setResponse] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [Theme, setTheme] = useState("Light");

  const themeData = { Theme, setTheme };

  const user = useSelector((state) => state.user);

  if (user.isAuthenticated && user !== null) {
    return (
      <ThemeContext.Provider value={themeData}>
        <NavigationContainer theme={Theme == "Light" ? theme : Dtheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Mainpage"
              component={Bottomnavcomponent}
              options={{ headerShown: false, title: "" }}
            />
            <Stack.Screen
              name="Bookscreen"
              component={Bookscreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Camerascreen"
              component={Camerascreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Changepassword"
              component={Changepassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditPhone"
              component={EditPhone}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditEmail"
              component={EditEmail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Storemodal"
              component={Storemodal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Edituploadedbook"
              component={Edituploadedbook}
              options={{ headerShown: false }}
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
        <NavigationContainer theme={Theme == "Light" ? theme : Dtheme}>
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
              component={Forgotpassword}
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
