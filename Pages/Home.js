import React,{Component} from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    StyleSheet,
    Pressable
  } from 'react-native';
  import {  Platform, StatusBar } from "react-native";
  import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Avatar, Subheading } from 'react-native-paper'; 




class HomeRoute extends Component{

    render(){
      return(
        <SafeAreaView style={styles.AndroidSafeArea}>
            <Text>Home</Text>
        </SafeAreaView>

      )
    }
  
  }

  const styles = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
  });
  


  export default HomeRoute;