
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Pressable
} from 'react-native';
import {logoutUser, setUser} from '../actions'
import {  Platform, StatusBar } from "react-native";
import { Button,ActivityIndicator } from 'react-native-paper'; 
import Storemodalcard from './Storemodalcard';

import {useDispatch, useSelector} from 'react-redux';
import * as Location from 'expo-location';

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
                                            latitude={props.store_latitude}
                                            longitude={props.store_longitude}
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
                                            latitude={props.store_latitude}
                                            longitude={props.store_longitude}
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

    submitbutton: {
        flex : 1,
        margin : 10,
        fontSize : 20,
        color : "white",
    },
    
});

export default React.memo(Storemodal);