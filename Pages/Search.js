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

import Bookscreen from './Bookscreen';



var data = [
  {
      book_name : "Sapiens",
      book_author : "James Clear",
      book_year : "1992",
      book_distance : 5.2,
      book_condition : "great",
      book_img : "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
      book_price : "Rs 150",
      book_status : "In Shop",
      book_transaction_code: "05"
  },
  {
      book_name : "Guns Germs and Steel",
      book_author : "James Clear",
      book_year : "2002",
      book_distance : 10,
      book_condition : "good",
      book_img : "https://images-na.ssl-images-amazon.com/images/I/81RdveuYXWL.jpg",    
      book_price : "Rs 200",
      book_status : "In Shop",
      book_transaction_code: "05"
  },
  {
      book_name : "Sapiens",
      book_author : "James Clear",
      book_year : "1992",
      book_distance : 11,
      book_condition : "bad",
      book_img : "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
      book_price : "Rs 250",
      book_status : "In Shop",
      book_transaction_code: "05"
    },
  {
      book_name : "Guns Germs and Steel",
      book_author : "James Clear",
      book_year : "1992",
      book_distance : 5.2,
      book_condition : "great",
      book_img : "https://images-na.ssl-images-amazon.com/images/I/81RdveuYXWL.jpg",
      book_price : "Rs 300",
      book_status : "In Shop",
      book_transaction_code: "05"

    },
  {
      book_name : "Guns Germs and steel",
      book_author : "James Clear",
      book_year : "1992",
      book_distance : 5.2,
      book_condition : "great",
      book_img : "https://images-na.ssl-images-amazon.com/images/I/81RdveuYXWL.jpg",
      book_price : "Rs 350",
      book_status : "In Shop",
      book_transaction_code: "05"
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
                  <Title>{book.book_name}</Title>
                  <Subheading>{book.book_author}</Subheading>
                  <Paragraph>{book.book_year}</Paragraph>
                  <Paragraph>{book.book_distance} km away</Paragraph>
                  <Paragraph>In {book.book_condition} condition</Paragraph>
                  <Paragraph>{book.book_price}</Paragraph>
                  <Paragraph>{book.book_status}</Paragraph>
                </View>
                <View style = {styles.cardimage}>
                    <Image 
                      style={{resizeMode:'contain',height:'100%',width:'100%'}}
                      source={{uri : book.book_img}}
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
      backgroundColor:'#F0F8FF',
      flex: 1,
      flexDirection : 'row',
      justifyContent : 'center',
      alignContent: 'center',
      alignItems : 'center',
      marginBottom : 10,
      marginTop : 10,
      borderRadius : 20,
    },
  
    cardcontent : {
      flex : 4,
      height: 160,
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