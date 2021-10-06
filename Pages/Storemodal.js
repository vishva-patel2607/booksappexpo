
import React, { Component,useState,useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Alert,
  Pressable
} from 'react-native';
import {logoutUser, setUser} from '../actions'
import {  Platform, StatusBar } from "react-native";
import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,RadioButton, Headline,IconButton,Provider,Portal,Modal, Surface,Subheading,ActivityIndicator } from 'react-native-paper'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import Storemodalcard from './Storemodalcard';

import {useDispatch, useSelector} from 'react-redux';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';


const stores = [
    {
        "store_address": "Ahmedabad one, vastrapur",
        "store_distance": [
          2356.27861643
        ],
        "store_id": 4,
        "store_incharge": "Akash  Shah",
        "store_latitude": 72.53122465057005,
        "store_longitude": 23.040272710494378,
        "store_name": "ahmedabad one",
        "store_number": "9825040159",
        "store_pincode": "380006",
        "usernumber": 7
    },
    {
        "store_address": "Ahmedabad one, vastrapur",
        "store_distance": [
          2356.27861643
        ],
        "store_id": 5,
        "store_incharge": "Hitanshu  Shah",
        "store_latitude": 72.53122465057005,
        "store_longitude": 23.040272710494378,
        "store_name": "ahmedabad one",
        "store_number": "9825040159",
        "store_pincode": "380006",
        "usernumber": 7
    },
]









const Storemodal = (props) => {
    const [loading,setLoading]=useState(false);
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [selectedShop, setSelectedShop] = useState(null);
    const [shops, setShops] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);


    const setLocation = async() => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
                
        let loc = await Location.getCurrentPositionAsync({});
        
        setLongitude(loc.coords.longitude);
        setLatitude(loc.coords.latitude);
        
        
    }


    useEffect(()=>{
        setLoading(false)
        setLocation();

        
        if(typeof(longitude) != 'undefined' && typeof(latitude) != 'undefined'){
            
        fetch('https://booksapp2021.herokuapp.com/Store/Getstore',{
        method: 'POST',
        headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : user.token,
                },
        body : JSON.stringify({
            longitude: longitude,
            latitude: latitude
        })
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data.status){
          console.log(data.response.stores);
          setShops(data.response.stores);
        }
        else{
          if(data.message==='Could not verify'){
            dispatch(logoutUser());
          }
        }
      })
      .catch((error) => {
          console.log(error);
      })
      setLoading(true);
        }
    },[longitude,latitude])
    
    if(loading && shops != null){
        return (
            <SafeAreaView>
               
                    <ScrollView style={{width: "100%",padding:10,paddingTop:0}}>
                        {shops.map((props,idx)=>{
                            if(selectedShop != null && selectedShop.store_id === props.store_id){
                                return(
                                    <View key={idx} style={{borderColor:"#EF90A9" , borderWidth : 2 , borderTopRightRadius: 12, borderTopLeftRadius: 12, marginTop: 20,}}>
                                        <Storemodalcard 
                                            shopName={props.store_name}
                                            storeInchargeName={props.store_incharge}
                                            address={props.store_address}
                                            pincode={props.store_pincode}
                                            distance = {props.store_distance}
                                            contactNo = {props.store_number}

                                        />
                                    </View>
                                );
                            }
                            else{
                                return(
                                    <Pressable key={idx} onPress={() => setSelectedShop(props)} style={{marginTop : 20}}>
                                        <Storemodalcard 
                                            shopName={props.store_name}
                                            storeInchargeName={props.store_incharge}
                                            address={props.store_address}
                                            pincode={props.store_pincode}
                                            distance = {props.store_distance}
                                            contactNo = {props.store_number}
                                        />
                                    </Pressable>
                                )
                            }
                            
                        })}
                    </ScrollView>
                    <View style={{flexDirection : 'row'}}>
                        <Button
                            mode = "contained"
                            style = {styles.submitbutton}
                            labelStyle = {styles.submitbutton}
                            onPress = {() => props.navigation.navigate("Mainpage" , { screen: "Upload", params: {shop : null}})}
                        >
                            Cancel
                        </Button>
                        <Button
                            mode = "contained"
                            style = {styles.submitbutton}
                            labelStyle = {styles.submitbutton}
                            onPress = {() => props.navigation.navigate("Mainpage" , { screen: "Upload", params: {shop : selectedShop}})}
                        >
                            Select
                        </Button>
                    </View>
                    
                
                
                
                
            </SafeAreaView>
        );

    }
    else{
        return (
        <SafeAreaView>
              <View style={styles.activityindicator} >
                <ActivityIndicator animating={true} size={100} />
              </View>
          </SafeAreaView>
        );
          
    }
}

const styles = StyleSheet.create({
  
    textbox: {
      textAlign: "center",
      padding :10,
      fontSize: 20,
    },
  
    error: {
      textAlign: "center",
      fontSize: 20,
      color: "red",
      padding :20,
    },
  
    inputtextbox: {
      margin : 10,
      
    },
  
    submitbutton: {
        flex : 1,
        margin : 10,
        fontSize : 20,
        color : "white",
    },
  
    uploadimage: {
        flex:1,
        justifyContent: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    },
    layout: {
      flex:1,
      justifyContent: 'center',
    },

    container1:{
        flexDirection: 'row',
    },

    container11:{
        flex: 2,
        marginLeft : 10,
        marginBottom : 10,
        marginTop : 10,
        justifyContent: 'center',
        alignItems : 'center',
        borderRadius: 5,
        borderWidth : 1,
        borderColor : '#EF90A9'
    },

    container12:{
        flex: 5,
        
    },
  
    container2:{
        justifyContent: 'center',
    },

    container3: {
        flexDirection: 'column',
    },

    containerStyle : {
        
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: 'white', 
        padding: 10,
        width : "80%",
        height : "90%",
        borderRadius : 20,
    },

    modal : {
        justifyContent : 'center',
        alignItems : 'center',
    },

    storemodalcardaddress:{
        flex:3,
        backgroundColor:"#EDEDF0",
        padding: 10,
        borderTopLeftRadius:10,
    },

    storemodalcarddistance:{
        flex:1,
        backgroundColor: '#7CABF0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderTopRightRadius:10,
    
    },

    
    
});

export default Storemodal;