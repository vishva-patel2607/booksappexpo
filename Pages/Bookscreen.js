
import React, { Component,useEffect,useState } from 'react';
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
import { set } from 'react-native-reanimated';


const Bookscreen = (props) => {
    const [book, setBook] = useState(props.route.params.book);
    const [textValue,setTextValue] = useState('Pick up the book');
    const [count, setCount] = useState(0);
    const addtopickup = (props) => {
      if (!count){
        setCount(1);
    }
    else{
      setCount(0);
    }
    }
    useEffect(()=>{
      if(!count){
        setTextValue('Add to Pickup')
      }
      else{
        setTextValue('Remove from Pickup')
      }
    },[count])
    
      
        return (
          <View style = {styles.cardimage}>
          <Image 
            style={{resizeMode:'contain',height:'30%',width:'100%'}}
            source={{uri : book.book_i}}
          />
            <View style = {styles.cardcontainer}>
              <View style = {styles.cardcontent}>
                  <Title style={styles.setFontSizeName}>Name of the Book :- {book.book_n}</Title>
                  <Text></Text>
                  <Subheading style={styles.setFontSizeAuthor}>Author :- {book.book_a}</Subheading>
                  <Text></Text>
                  <Subheading style={styles.setFontSizeAuthor}>{book.book_d} km away</Subheading>
                  <Text></Text>
                  <Subheading style={styles.setFontSizeAuthor}> Condition of Book:- In {book.book_c} condition</Subheading>
                  <Text></Text>
                  <Subheading style={styles.setFontSizeAuthor}>Price :- {book.book_p}</Subheading>
                  <Text></Text>
                  <Button 
                  mode = "contained"
                  style = {styles.pickupbook}
                  labelStyle = {styles.pickupbook}
                  onPress = {addtopickup}
                  Title = "Hi"
                >
                  {textValue}
                  </Button>
              
              </View>
              
              </View>
          </View>
        );
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

export default Bookscreen;
