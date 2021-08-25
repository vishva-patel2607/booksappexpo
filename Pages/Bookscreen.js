
import React, { Component,useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    StyleSheet,
    Pressable
  } from 'react-native';

import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Avatar, Subheading } from 'react-native-paper'; 
import { TabRouter } from '@react-navigation/routers';


class Bookscreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            book : this.props.route.params.book,
        };
    }

    render(){
      console.log(this.state.book);
        return (

            <View style = {styles.cardcontainer}>
                <View style = {styles.cardcontent}>
                  <Title>{this.state.book.book_n}</Title>
                  <Subheading>{this.state.book.book_a}</Subheading>
                  <Paragraph>{this.state.book.book_y}</Paragraph>
                  <Paragraph>{this.state.book.book_d} km away</Paragraph>
                  <Paragraph>In {this.state.book.book_c} condition</Paragraph>
                </View>
                <View style = {styles.cardimage}>
                    <Image 
                      style={{resizeMode:'contain',height:'100%',width:'100%'}}
                      source={{uri : this.state.book.book_i}}
                    />
                </View>
              </View>
        );
    }
}


const styles = StyleSheet.create({
  
    
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
      backgroundColor:'#EDEDF0',
      flex: 1,
      flexDirection : 'row',
      justifyContent : 'center',
      alignContent: 'center',
      alignItems : 'center',
      marginBottom : 10,
      marginTop : 10,
      borderRadius : 5,
    },
  
    cardcontent : {
      flex : 4,
      height: 150,
      justifyContent: 'center',
      alignItems:'center', 
      margin : 10,
      
    },
  
    cardimage : {
      flex : 3,
      height: 150,
      justifyContent: 'center',
      alignItems:'center', 
      margin : 10,
      marginRight :5,
    }
    
  });

export default Bookscreen;