
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
                source={{uri: book.book_i}}
                />
              <Button mode = "contained" style = {styles.submitbutton} labelStyle = {styles.submitbutton} >
                Add to Pickup
              </Button>
              </View>
              <View style={styles.container1}>
              <Text></Text>
              <Card.Title
              style={styles.c}
              title="Name of the book"
              subtitle={book.book_n}
              left={(props) => <Avatar.Icon {...props} icon="book" />}
              />
              <Text></Text>
              <Card.Title
              style={styles.c}
              title="Author"
              subtitle={book.book_a}
              fontSize='20'
              left={(props) => <Avatar.Icon {...props} icon="pen" />}
              />
              <Text></Text>
              <Card.Title
              style={styles.c}
              title="Price"
              subtitle={book.book_p}
              left={(props) => <Avatar.Icon {...props} icon={{ uri: 'https://cdn3.iconfinder.com/data/icons/inficons-currency-set/512/rupee-512.png' }} />}
              />
              <Text></Text>
              <Card.Title
              style={styles.c}
              title="Status"
              subtitle={book.book_s}
              left={(props) => <Avatar.Icon {...props} icon={{uri: 'https://cdn1.iconfinder.com/data/icons/flat-and-simple/512/1-1024.png'}} />}
              />
              
              </View>
      </SafeAreaView>
        );
    }



const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  tinyLogo: {
    width: 220,
    height: 220,
    resizeMode: 'contain'
  },
  container1:{
    paddingTop:20
  },
  c:{
    backgroundColor:'#d3d3d3',
    borderRadius:100
  },
  submitbutton: {
    marginRight: 20,
    
    fontSize : 20,
    height: 45,
    width: 200,
    alignSelf: 'flex-end',
    borderRadius: 10,
    color : "white",
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
});

    
    
export default Bookscreen;
