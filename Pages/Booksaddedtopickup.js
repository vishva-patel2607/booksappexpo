
import React, { Component,useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    StyleSheet,
    Pressable,
    Dimensions,
    Alert,
    TouchableOpacity
  } from 'react-native';
import {logoutUser, setUser} from '../actions'
import {useDispatch, useSelector} from 'react-redux';
import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Avatar, Subheading, Caption,IconButton,Card } from 'react-native-paper'; 
import { TabRouter } from '@react-navigation/routers';
import WavyHeader from './WavyHeader';
import Storemodalcard from './Storemodalcard';

const Booksaddedtopickup =(props) => {
  const [Pickupdata,setPickupdata]=useState(props.route.params.book)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
  const removebook = () => {
    fetch('https://booksapp2021.herokuapp.com/Book/Pickedupbooks/Remove',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
        'x-access-token' : user.token,
      },
      body:JSON.stringify({
        book_id : Pickupdata.book_id
      })
    })
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      if(data.status){
        if(data.message==="Pickup removed"){
          console.log(data.message);
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
        else
          {
            console.log(data.message);
            Alert.alert(
              data.message,
              [
                {
                  text: "Ok", 
                }
              ]
            );
          }
      }
      else{
        if(data.message==='Could not verify'){
            dispatch(logoutUser());
        }
        } 
    })
  }  
  

        return (
          
          <SafeAreaView>
              <ScrollView>
          <Text></Text>
          <View style={styles.container}>
          <WavyHeader customStyles={styles.svgCurve}/>
            
              <Image
                style={{resizeMode:'contain',height:'100%',width:'100%',flex:4}}
              source={{uri: Pickupdata.book_img}}
              />
            
          <View style={{flex:2,flexDirection:'column',marginTop:10,marginBottom:75,marginRight:20,}}>
            <Button mode = "contained" style = {styles.submitbutton} labelStyle = {styles.submitbutton} onPress={removebook} >
              Remove
            </Button>
            <Button mode = "text" style = {styles.submitbutton} labelStyle = {styles.submitbutton}>
            </Button>
          </View>
          </View>
          <Text></Text>
          <Card.Title
          style={styles.c}
          subtitle="Code"
          title={Pickupdata.book_transaction_code}
          left={(props) => <Avatar.Icon {...props} icon={{uri: 'https://cdn-icons-png.flaticon.com/512/1166/1166773.png'}} />}
          />
          <Text></Text>
          <Card.Title
          style={styles.c}
          subtitle="Name of the book"
          title={Pickupdata.book_name}
          titleNumberOfLines={3}
          left={(props) => <Avatar.Icon {...props} icon="book" />}
          />
          <Text></Text>
          <Card.Title
          style={styles.c}
          subtitle="Author"
          title={Pickupdata.book_author}
          fontSize='20'
          titleNumberOfLines={3}
          left={(props) => <Avatar.Icon {...props} icon="pen" />}
          />
          <Text></Text>
          <Card.Title
          style={styles.c}
          subtitle="Price"
          title={Pickupdata.book_price}
          left={(props) => <Avatar.Icon {...props} icon={{ uri: 'https://cdn3.iconfinder.com/data/icons/inficons-currency-set/512/rupee-512.png' }} />}
          />
          <Text></Text>
          <Card.Title
          style={styles.c}
          subtitle="Condition"
          title={Pickupdata.book_condition}
          left={(props) => <Avatar.Icon {...props} icon={{ uri: 'https://static.thenounproject.com/png/729549-200.png' }} />}
          />
          <Text></Text>
          <View style={{margin: 10}}>
                            <Storemodalcard 
                                shopName={Pickupdata.store.store_name}
                                storeInchargeName={Pickupdata.store.store_incharge}
                                address={Pickupdata.store.store_address}
                                pincode={Pickupdata.store.store_pincode}
                                contactNo = {Pickupdata.store.store_number}
                                latitude = {Pickupdata.store.store_latitude}
                                longitude={Pickupdata.store.store_longitude}
                            />
                        </View>
          </ScrollView>
    </SafeAreaView>
  
    );
    }



    const styles = StyleSheet.create({
      cardview :{
        flex:1,
      },
      cardscroll :{
        flex : 1,
        height : '100%',
        margin : 10,
      },
    
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
      
      c:{
        backgroundColor:'#F0F8FF',
        borderRadius:10,
        
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
    

export default Booksaddedtopickup;

