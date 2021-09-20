
import React, { Component,useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    StyleSheet,
    Pressable
  } from 'react-native';

import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Avatar, Subheading, Caption } from 'react-native-paper'; 
import { TabRouter } from '@react-navigation/routers';


const UploadedBooks =(props) => {
  const [Bookdata,setBookData]=useState(props.route.params.book)
  


        return (
          
          <View style = {styles.cardimage}>
            <Button style={styles.editbook}
            onPress={() => props.navigation.navigate('Edituploadedbook',{ book : Bookdata })}
            >Edit</Button>
          <Image 
            style={{resizeMode:'contain',height:'30%',width:'100%'}}
            source={{uri : Bookdata.book_img}}
          />
          
            <View style = {styles.cardcontainer}>
              <View style = {styles.cardcontent}>
                  <Text></Text>
                  <Title style={styles.setFontSizeName}>Name of the Book :- {Bookdata.book_name}</Title>
                  <Text></Text>
                  <Subheading style={styles.setFontSizeAuthor}>Author :- {Bookdata.book_author}</Subheading>
                  <Text></Text>
                  <Subheading style={styles.setFontSizeAuthor}>Year:- {Bookdata.book_year}</Subheading>
                  <Text></Text>
                  <Subheading style={styles.setFontSizeAuthor}>{Bookdata.book_distance} km away</Subheading>
                  <Text></Text>
                  <Subheading style={styles.setFontSizeAuthor}> Condition of Book:- In {Bookdata.book_condition} condition</Subheading>
                  <Text></Text>
                  <Subheading style={styles.setFontSizeAuthor}>Price :- {Bookdata.book_price}</Subheading>
                  <Text></Text>
                  <Caption>Status:- {Bookdata.book_status}</Caption>
                  <Text></Text>
                  <Button 
                    mode = "contained"
                    style = {styles.submitbutton}
                    labelStyle = {styles.submitbutton}
                    
                >
      
                Remove
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
      fontSize: 18,
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
      marginTop : 50,
      borderRadius : 5,
      
    },
    editbook:{
        alignSelf:'flex-end',
        marginTop: -10,
        
    },
    submitbutton: {
      
      fontSize : 18,
      height: 40,
      width: 300,
      alignSelf: 'center',
      borderRadius: 10,
      color : "white"
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
