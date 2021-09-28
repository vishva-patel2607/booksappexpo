
import React, { Component,useEffect,useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    StyleSheet,
    Pressable,
    Dimensions
  } from 'react-native';
import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Avatar, Subheading,Card } from 'react-native-paper'; 
import { TabRouter } from '@react-navigation/routers';
import { set } from 'react-native-reanimated';
import WavyHeader from './WavyHeader';

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
        <SafeAreaView>
              <Text></Text>
              <View style={styles.container}>
              <WavyHeader customStyles={styles.svgCurve}/>
                <Image
                  style={styles.tinyLogo}
                source={{uri: book.book_img}}
                />
              <Button mode = "contained" style = {styles.submitbutton} labelStyle = {styles.submitbutton} onPress={addtopickup} >
                {textValue}
              </Button>
              </View>
              <ScrollView style={styles.container1}>
              <Text></Text>
              <Card.Title
              style={styles.c}
              subtitle="Name of the book"
              title={book.book_name}
              left={(props) => <Avatar.Icon {...props} icon="book" />}
              />
              <Text></Text>
              <Card.Title
              style={styles.c}
              subtitle="Author"
              title={book.book_author}
              fontSize='20'
              left={(props) => <Avatar.Icon {...props} icon="pen" />}
              />
              <Text></Text>
              <Card.Title
              style={styles.c}
              subtitle="Price"
              title={book.book_price}
              left={(props) => <Avatar.Icon {...props} icon={{ uri: 'https://cdn3.iconfinder.com/data/icons/inficons-currency-set/512/rupee-512.png' }} />}
              />
              <Card.Title
              style={styles.c}
              subtitle="Condition"
              title={book.book_condition}
              left={(props) => <Avatar.Icon {...props} icon={{ uri: 'https://static.thenounproject.com/png/729549-200.png' }} />}
              />
              <Text></Text>
              <Card.Title
              style={styles.c}
              subtitle="Status"
              title={book.book_status}
              left={(props) => <Avatar.Icon {...props} icon={{uri: 'https://cdn1.iconfinder.com/data/icons/flat-and-simple/512/1-1024.png'}} />}
              />
              <Text></Text>
              <Card.Title
              style={styles.c}
              subtitle=" Transaction Code"
              title={book.book_transaction_code}
              left={(props) => <Avatar.Icon {...props} icon={{uri: 'https://cdn-icons-png.flaticon.com/512/1166/1166773.png'}} />}
              />

              </ScrollView>
      </SafeAreaView>
        );
    }



const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection : 'row',
  },
  tinyLogo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    flex : 4,
    
  },
  container1:{
    paddingTop:20
  },
  c:{
    backgroundColor:'#F0F8FF',
    borderRadius:100,
    marginBottom : 10,
    marginHorizontal : 20,
  },
  submitbutton: {
    flex: 2,
    fontSize : 15,
    marginTop : 20,
    marginRight : 15,
    marginLeft : 10,
    marginBottom : 20,
    alignSelf: 'flex-start',
    borderRadius: 10,
    color : "white",
  },
  svgCurve: {
    position: 'absolute',
    flex: 1,
    width : '100%',
    marginTop : 0,
  },
});

    
    
export default Bookscreen;
