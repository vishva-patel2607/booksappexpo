import React, { Component,useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

import SearchRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/Search.js';
import UploadRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/Upload.js';
import UserRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/User.js';
import HomeRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/Home.js';


const Bottomnavcomponent = () => {
    return (
      <Tab.Navigator
        initialRouteName="Search"
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


  export default Bottomnavcomponent;