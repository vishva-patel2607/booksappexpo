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

import Bookscreen from './Bookscreen';



var data = [
    {
        book_n : "Guns Germs and Steel",
        book_a : "ABC XYZ",
        book_y : "1992",
        book_d : 5.2,
        book_c : "great",
        book_i : "/Users/vishvapatel/Desktop/booksapp/booksappexpo/resources/book1.jpeg",
    },
    {
        book_n : "Sapiens",
        book_a : "WYX ASD",
        book_y : "2002",
        book_d : 10,
        book_c : "good",
        book_i : "/Users/vishvapatel/Desktop/booksapp/booksappexpo/resources/book1.jpeg",    
    },
    {
        book_n : "Guns Germs and Steel",
        book_a : "ABC XYZ",
        book_y : "1992",
        book_d : 11,
        book_c : "bad",
        book_i : "/Users/vishvapatel/Desktop/booksapp/booksappexpo/resources/book1.jpeg",
      },
    {
        book_n : "Sapiens",
        book_a : "ABC XYZ",
        book_y : "1992",
        book_d : 5.2,
        book_c : "great",
        book_i : "/Users/vishvapatel/Desktop/booksapp/booksappexpo/resources/book1.jpeg",
      },
    {
        book_n : "Sapiens",
        book_a : "ABC XYZ",
        book_y : "1992",
        book_d : 5.2,
        book_c : "great",
        book_i : "/Users/vishvapatel/Desktop/booksapp/booksappexpo/resources/book1.jpeg",
      },
];




class SearchRoute extends Component{

    constructor(props){
      super(props);
      this.state = {
        data : data,
        searchQuery : "", 
        testQuery : "",   
      }
  
      this.onChangeSearch = this.onChangeSearch.bind(this);
    }
  
    onChangeSearch(props){
      this.setState({searchQuery : props , testQuery : props})
    }


   
  
    render(){
      
      

      return(
        <SafeAreaView style={styles.layout}>
            <Searchbar
              placeholder="Search"
              onChangeText={(text) => this.onChangeSearch(text)}
              value={this.state.searchQuery}
            />
            
  
          <View style = {styles.cardview}>
            <ScrollView style={styles.cardscroll}>
  
  
            {
            this.state.data.map((book,idx) => (
              <Pressable key={idx} onPress={() => this.props.navigation.navigate('Bookscreen',{ book : book })} >
              <View style = {styles.cardcontainer}>
                <View style = {styles.cardcontent}>
                  <Title>{book.book_n}</Title>
                  <Subheading>{book.book_a}</Subheading>
                  <Paragraph>{book.book_y}</Paragraph>
                  <Paragraph>{book.book_d} km away</Paragraph>
                  <Paragraph>In {book.book_c} condition</Paragraph>
                </View>
                <View style = {styles.cardimage}>
                    <Image 
                      style={{resizeMode:'contain',height:'100%',width:'100%'}}
                      source={{uri : book.book_i}}
                    />
                </View>
              </View>
              </Pressable>
            ))
            }
  
              
            </ScrollView>
          </View>
          
  
          
        </SafeAreaView>
      )
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


  export default SearchRoute;