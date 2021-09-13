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
  import { Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Avatar, Subheading } from 'react-native-paper'; 
  import { Card, Button } from 'react-native-paper';



class HomeRoute extends Component{

    render(){
      return(
        <SafeAreaView style={styles.AndroidSafeArea}>
          <Text></Text>
          <Text></Text>
            <Card>
            <Card.Content>
              <Title>Books Lent</Title>
              <Text></Text>
              <Title>Books Borrowed</Title>
              <Text></Text>
              <Title>Total Exchanges:-</Title>
            </Card.Content>
          </Card>
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