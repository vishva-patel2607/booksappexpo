import React, {useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {  Platform, StatusBar } from "react-native";
import { Title,Paragraph,IconButton} from 'react-native-paper'; 
import MapView, { Marker } from 'react-native-maps';

const Storemodalcard = (props)=> {

    const [showMap,setShowMap] = useState(false);
    const [storeInchargeName,setStoreInchargeName] = useState(props.storeInchargeName);
    const [shopName,setShopName] = useState(props.shopName);
    const [address,setAdress] = useState(props.address);
    const [pincode,setPincode] = useState(props.pincode);
    const [distance,setDistance] = useState(props.distance);
    const [contactNo, setContactNo] = useState(props.contactNo);
    const [Latitude, setLatitude] = useState(props.latitude);
    const [Longitude,setLongitude] = useState(props.longitude);
    const [mapRegion, setmapRegion] = useState({
        latitude: Latitude,
        longitude: Longitude,
        latitudeDelta: 0,
    longitudeDelta: 0,
        
    })

    useEffect(() => {
        setStoreInchargeName(props.storeInchargeName);
        setShopName(props.shopName);
        setAdress(props.address);
        setPincode(props.pincode);
        setDistance(props.distance);
        setContactNo(props.contactNo);
        setLongitude(props.longitude);
        setLatitude(props.latitude);
    }, [props.storeInchargeName,props.shopName,props.address,props.pincode,props.distance,props.contactNo,props.latitude,props.longitude])
   
        let map;
        if (showMap) {
            map = <View><MapView style={{ alignSelf: 'stretch', height: 200 }}
            region={mapRegion} showsUserLocation={true} minZoomLevel={10} maxZoomLevel={15} scrollEnabled={true} loadingEnabled={true}><Marker coordinate={mapRegion} title={shopName}/></MapView></View>;
        } else {
            map = null;
        }
        return(
            <>
                <View style={{flexDirection:'row',marginBottom:0 , borderRadius : 10,}}>
                    <View style={styles.storemodalcardaddress}>
                        <Title>{shopName}</Title>
                        <Paragraph>{storeInchargeName}</Paragraph>
                        <Paragraph>{address}-{pincode}</Paragraph>
                        <Paragraph>{contactNo}</Paragraph>
                    </View>
                    <View style={styles.storemodalcarddistance}> 
                        <Title style={{paddingTop:0}}>{distance} Km</Title>
                        <IconButton
                            style={{margin:0}}
                            icon="chevron-down"
                            color= '#EF90A9'
                            size={40}
                            onPress={() => {
                                            if(showMap===true){
                                                setShowMap(false);
                                            }
                                            else{
                                                setShowMap(true);
                                            }} }
                        />
                    </View>
                </View>
                {map}
                
            </>
        );
    

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


export default React.memo(Storemodalcard);