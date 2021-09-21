

import React, { Component,useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    StyleSheet,
    Pressable
  } from 'react-native';

import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Avatar, Subheading, Caption,IconButton,Card } from 'react-native-paper'; 
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
          <Text></Text>
          <Text></Text>
            <View style = {styles.cardcontainer}>
              <View style = {styles.cardcontent}>
                  <Text></Text>
                  <Card.Title
                      title="Name of the book"
                      subtitle={Bookdata.book_name}
                      left={(props) => <Avatar.Icon {...props} icon="book" />}
                    />
                  <Card.Title
                      title="Author"
                      subtitle={Bookdata.book_author}
                      fontSize='20'
                      left={(props) => <Avatar.Icon {...props} icon="pen" />}
                    />
                  <Card.Title
                      title="Price"
                      subtitle={Bookdata.book_price}
                      left={(props) => <Avatar.Icon {...props} icon={{ uri: 'https://cdn3.iconfinder.com/data/icons/inficons-currency-set/512/rupee-512.png' }} />}
                    />
                  <Card.Title
                      title="Status"
                      subtitle={Bookdata.book_status}
                      left={(props) => <Avatar.Icon {...props} icon={{uri: 'https://cdn1.iconfinder.com/data/icons/flat-and-simple/512/1-1024.png'}} />}
                    />
                    
                  <Text></Text>
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
      margin : 50,
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

