
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


class UploadedBooks extends Component{

    constructor(props){
        super(props);
        this.state = {
            book : this.props.route.params.book,
        };
    }
    
    render(){
      console.log(this.state.book);
        return (
          <View style = {styles.cardimage}>
          
          <Image 
            style={{resizeMode:'contain',height:'30%',width:'100%'}}
            source={{uri : this.state.book.book_i}}
          />
          
            <View style = {styles.cardcontainer}>
              <View style = {styles.cardcontent}>
                  <Title style={styles.setFontSizeName}>Name of the Book :- {this.state.book.book_n}</Title>
                  <Text></Text>
                  <Subheading style={styles.setFontSizeAuthor}>Author :- {this.state.book.book_a}</Subheading>
                  <Text></Text>
                  <Subheading style={styles.setFontSizeAuthor}>{this.state.book.book_d} km away</Subheading>
                  <Text></Text>
                  <Subheading style={styles.setFontSizeAuthor}> Condition of Book:- In {this.state.book.book_c} condition</Subheading>
                  <Text></Text>
                  <Subheading style={styles.setFontSizeAuthor}>Price :- {this.state.book.book_p}</Subheading>
                  <Text></Text>
              </View>
              
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
    setFontSizeName: {
      fontSize: 20,
      marginTop: 110,
    },
    setFontSizeAuthor: {
      fontSize: 20,
    },
    
  
    cardcontainer : {
      
      flex: 1,
      flexDirection : 'row',
      justifyContent : 'center',
      alignContent: 'center',
      alignItems : 'flex-start',
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
    },
    pickupbook:{
      alignSelf: 'center',
      width: 300,
      fontSize: 20,
      color: "white",
      borderRadius: 10,
    },
    
  });

export default UploadedBooks;
