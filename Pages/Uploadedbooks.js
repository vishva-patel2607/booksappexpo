
import React, { Component,useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    StyleSheet,
    Pressable,
    Dimensions,
    Alert
  } from 'react-native';
import {logoutUser, setUser} from '../actions'
import {useDispatch, useSelector} from 'react-redux';
import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Avatar, Subheading, Caption,IconButton,Card } from 'react-native-paper'; 
import { TabRouter } from '@react-navigation/routers';
import WavyHeader from './WavyHeader';

const UploadedBooks =(props) => {
  const [Bookdata,setBookData]=useState(props.route.params.book)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const removebook = () => {
    fetch('https://booksapp2021.herokuapp.com/Book/Uploadedbooks/Remove',{
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
        'x-access-token' : user.token,
      },
      body:JSON.stringify({
        book_id : Bookdata.book_id
      })
    })
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      if(data.status){
        Alert.alert(
          "Success",
          data.message,
          [
            {
              text: "Ok", 
              onPress : () => props.navigation.navigate("Mainpage" , { screen: "Home", params: {refreshing : true}})
            }
          ]
        );
      }
      else{
        if(data.message==='Could not verify'){
            dispatch(logoutUser());
        }
        else{
          Alert.alert(
            "Sorry but the book is being borrowed by someone and so can't be removed"
            [
              {
                text: 'Ok'
              }
            ]
          );
        }
        } 
    })
  }  

        return (
          <SafeAreaView>
            <ScrollView style={styles.container1}>
          <Text></Text>
          <View style={styles.container}>
          <WavyHeader customStyles={styles.svgCurve}/>
            <Image
              style={styles.tinyLogo}
            source={{uri: Bookdata.book_img}}
            />
          <View style={{flex:2,flexDirection:'column',marginTop:10,marginBottom:75,marginRight:20,}}>
            <Button mode = "contained" style = {styles.submitbutton} labelStyle = {styles.submitbutton} onPress={removebook} >
              Remove 
            </Button>
            <Button mode = "contained" style = {styles.submitbutton} labelStyle = {styles.submitbutton} onPress={()=>props.navigation.navigate('Edituploadedbook',{book:Bookdata})}>
              Edit 
            </Button>
          </View>
          </View>
          <Text></Text>
          <Card.Title
          style={styles.c}
          subtitle="Name of the book"
          title={Bookdata.book_name}
          left={(props) => <Avatar.Icon {...props} icon="book" />}
          />
          <Text></Text>
          <Card.Title
          style={styles.c}
          subtitle="Author"
          title={Bookdata.book_author}
          fontSize='20'
          left={(props) => <Avatar.Icon {...props} icon="pen" />}
          />
          <Text></Text>
          <Card.Title
          style={styles.c}
          subtitle="Price"
          title={Bookdata.book_price}
          left={(props) => <Avatar.Icon {...props} icon={{ uri: 'https://cdn3.iconfinder.com/data/icons/inficons-currency-set/512/rupee-512.png' }} />}
          />
          <Card.Title
          style={styles.c}
          subtitle="Condition"
          title={Bookdata.book_condition}
          left={(props) => <Avatar.Icon {...props} icon={{ uri: 'https://static.thenounproject.com/png/729549-200.png' }} />}
          />
          <Text></Text>
          <Card.Title
          style={styles.c}
          subtitle="Status"
          title={Bookdata.book_status}
          left={(props) => <Avatar.Icon {...props} icon={{uri: 'https://cdn1.iconfinder.com/data/icons/flat-and-simple/512/1-1024.png'}} />}
          />
          <Text></Text>
          <Card.Title
          style={styles.c}
          subtitle="Code"
          title={Bookdata.book_transaction_code}
          left={(props) => <Avatar.Icon {...props} icon={{uri: 'https://cdn-icons-png.flaticon.com/512/1166/1166773.png'}} />}
          />
          <Card.Title
          style={styles.c}
          subtitle="Code"
          title={Bookdata.book_transaction_code}
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
        fontSize : 20,
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:10,
        color : "white",
        paddingTop: 5,
        height: 40,
      },
      svgCurve: {
        position: 'absolute',
        flex: 1,
        width : '100%',
        marginTop : 0,
      },
    });
    

export default UploadedBooks;

