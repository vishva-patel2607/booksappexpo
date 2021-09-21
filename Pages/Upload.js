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
import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,RadioButton, Headline,IconButton,Provider,Portal,Modal, Surface,Subheading } from 'react-native-paper'; 
import DateTimePicker from '@react-native-community/datetimepicker';


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
]
const Storemodal = (props) => {
    const [visible,setVisible]=useState(false);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [selectedShop, setSelectedShop] = useState(null);
    const [shops, setShops] = useState(stores);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const setLocation = async() => {
        
        (async()=>{
            let { status } = await Location.requestForegroundPermissionsAsync();
                  if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                let loc = await Location.getCurrentPositionAsync({});
                console.log(loc.coords);
                setLongitude(loc.coords.longitude);
                setLatitude(loc.coords.latitude);
        })
        getStores();
        setVisible(true);
    }
    const getStores = () => {
        fetch('https://booksapp2021.herokuapp.com/Store/Getstore',{
        method: 'POST',
        headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : user.token,
                },
        body : JSON.stringify({
            longitude: parseFloat(longitude),
            latitude: parseFloat(latitude),
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
    }
    const sendSelectedShop = (event) => {
        setVisible(false);
        props.onSelectShop(selectedShop);
        event.preventDefault();
    }
        return (
            <View>
                <Portal>
                <Modal visible={visible} dismissable={false} contentContainerStyle={styles.containerStyle} style={styles.modal}>
                    <Title>Select one of the shop</Title>
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
                                            distance = {(props.store_distance[0]/1000).toFixed(1)}
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
                                            distance = {(props.store_distance[0]/1000).toFixed(1)}
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
                            onPress = {() => setVisible(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            mode = "contained"
                            style = {styles.submitbutton}
                            labelStyle = {styles.submitbutton}
                            onPress = {sendSelectedShop}
                        >
                            Select
                        </Button>
                    </View>
                    
                </Modal>
                </Portal>
                <Button 
                            mode = "contained"
                            style = {styles.submitbutton}
                            labelStyle = {styles.submitbutton}
                            onPress = {setLocation}
                >
                Find a Shop
                </Button>
                
                
            </View>
        );
    }




class Storemodalcard extends Component{

    constructor(props){
        super(props);

        this.state = {
            showMap : false,
            storeInchargeName: props.storeInchargeName,
            shopName : props.shopName,
            address : props.address,
            pincode : props.pincode,
            distance : props.distance,
            contactNo : props.contactNo,
        }
    };


    render(){
        let map;
        if (this.state.showMap) {
            map = <View style={{backgroundColor:'#EDEDF0',justifyContent:'center',alignItems:'center',height:200}}><Text>maps coming soon</Text></View>;
        } else {
            map = null;
        }
        return(
            <>
                <View style={{flexDirection:'row',marginBottom:0 , borderRadius : 10,}}>
                    <View style={styles.storemodalcardaddress}>
                        <Title>{this.state.shopName}</Title>
                        <Paragraph>{this.state.storeInchargeName}</Paragraph>
                        <Paragraph>{this.state.address}-{this.state.pincode}</Paragraph>
                        <Paragraph>{this.state.contactNo}</Paragraph>
                    </View>
                    <View style={styles.storemodalcarddistance}> 
                        <Title style={{paddingTop:0}}>{this.state.distance} Km</Title>
                        <IconButton
                            style={{margin:0}}
                            icon="chevron-down"
                            color= '#EF90A9'
                            size={40}
                            onPress={() => {
                                                if(this.state.showMap===true){
                                                    this.setState({showMap : false});
                                                }
                                                else{
                                                    this.setState({showMap : true});
                                                }
                                                    
                                            }
                                    }
                        />
                    </View>
                </View>
                {map}
            </>
        );
    }

}

const UploadRoute = (props) => { 

    

    const [name,setName] = useState("");
    const [error,setError] = useState("");
    const [author,setAuthor] = useState("");
    const [year,setYear] = useState("");
    const [condition,setCondition] = useState("good");
    const [shop,setShop] = useState(null);
    const [price,setPrice] = useState("");
    const dispatch = useDispatch();
    const user = useSelector( (state) => state.user)

    getShop = (shopClass) => {
        setShop(shopClass);
    }

    uploaddetails = () => {
                if(props.route.params?.photo !== null && props.route.params?.photo !== undefined){
                    console.log('Inside upload details');
                    var photouri = props.route.params?.photo.uri;
                    console.log(props.route.params?.photo);
                    var imagedata = {
                        uri:  photouri,
                        type: "image/jpeg",
                        name: "photo.jpg"
                        };
                    let formData = new FormData();
                    formData.append('book_name',name );
                    formData.append('book_author', author);
                    formData.append('book_year', year);
                    formData.append('book_condition', condition);
                    formData.append('store_id', 1);
                    formData.append('book_price',price);
                    formData.append('book_img', imagedata)
                        fetch('https://booksapp2021.herokuapp.com/Book/Upload', {
                            method: 'POST',
                            headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            'x-access-token' : user.token,
                            },
                            
                            body: formData
                        })
                        .then((response)=>{
                            return response.json()
                        })
                        .then((data)=>{
                            if(data.status){
                                alert("Book Uploaded Succesfully");
                                setAuthor("");
                                setCondition("good");
                                setName("");
                                setPrice("");
                                setShop(null);
                                setYear("");
                                console.log(data.response.book);
                                console.log(data.response.transaction);
                            }
                            else{
                            if(data.message==='Could not verify'){
                                dispatch(logoutUser());
                            }
                            }  
                        })
                        .catch((error)=>{
                            console.log(error);
                        })
                    }
                    else{
                        Alert.alert(
                            "No Photo",
                            "Please click a photo and then upload",
                            [
                              {text: "Ok!"}
                            ]
                          );
                    }
               
    }
        let selected;
        if(shop != null){
            selected =  
                        <View style={{margin: 10}}>
                            <Storemodalcard 
                                shopName={shop.shopName}
                                address={shop.address}
                                area={shop.area}
                                pincode={shop.pincode}
                                distance = {shop.distance}
                            />
                        </View>
                        
        }
        else{
            selected = 
                        <View style={{height:100 ,margin: 10, backgroundColor : "#EDEDF0" , borderRadius : 10, justifyContent:'center',alignItems:'center'}}>
                            <Headline>Select a drop off shop</Headline>
                        </View>
        }

        return(
            <SafeAreaView style = {styles.uploadimage}>
                <ScrollView>
                <View style={styles.container1}>
                    <View style={styles.container11}>
                        { props.route.params?.photo
                            ? <Pressable style={{flex:1, height:'100%',width:'100%'}} onPress={() => props.navigation.navigate('Camerascreen')}><Image style={{flex:1,resizeMode:'cover',height:'100%',width:'100%'}} source={{uri : props.route.params?.photo.uri}}/></Pressable>
                            : <IconButton
                            icon="image-plus"
                            color = '#EF90A9'
                            size={50}
                            onPress={() => props.navigation.navigate('Camerascreen')}
                        />
                        }
                        
                    </View>
                    <View style={styles.container12}>
                        <TextInput 
                        style = {styles.inputtextbox}
                        label="Name"
                        value = {name}
                        onChangeText = {(text) => setName(text)}
                        />

                        <TextInput 
                        style = {styles.inputtextbox}
                        label="Author"
                        value = {author}
                        onChangeText = {(text) => setAuthor(text)}
                        />
                    </View>
                </View>   

                <View style={styles.container2}>
                    <TextInput 
                    style = {styles.inputtextbox}
                    label="Year"
                    value = {year}
                    onChangeText = {(text) => setYear(text.replace(/[^0-9]/g, ''))}
                    keyboardType = "number-pad"
                    maxLength = {4}
                    />
                </View> 
                
                    
                    
                <View style={styles.container3}>
                        
                        <Title style={styles.textbox}>Select the condition of your book:</Title>
                        <RadioButton.Group onValueChange={(value) => setCondition(value)} value={condition}>
                            <View style={{flexDirection:'column'}}>
                            <View style={{flexDirection:'row'}}> 
                            <View style={{flex:1}}>
                            <RadioButton.Item label="Bad" value="Bad" mode='android'/>
                            </View>
                            <View style={{flex:1}}>
                            <RadioButton.Item label="Fair" value="Fair" mode='android'/>
                            </View>
                            </View>  
                            <View style={{flexDirection:'row'}}> 
                            <View style={{flex:1}}>
                            <RadioButton.Item label="Good" value="Good" mode='android'/>
                            </View>
                            <View style={{flex:1}}>
                            <RadioButton.Item label="Great" value="Great" mode='android'/>
                            </View>
                            </View>
                            

                            </View>
                        </RadioButton.Group>
                    
                        
                </View>

                

                
                <Storemodal onSelectShop={getShop} />

                {selected}
                <View style={styles.container2}>
                    <TextInput 
                    style = {styles.inputtextbox}
                    label="Price"
                    value = {price}
                    onChangeText = {(text) => setPrice(text.replace(/[^0-9]/g, ''))}
                    keyboardType = "number-pad"
                    maxLength = {4}
                    />
                </View>
                <Button 
                    mode = "contained"
                    style = {styles.submitbutton}
                    labelStyle = {styles.submitbutton}
                    onPress = {uploaddetails}
                >
                Upload
                </Button>
                <Text style={styles.error}>
                {error}
                </Text>
                </ScrollView>
            
            </SafeAreaView>
        );
    
  
}; 



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

export default UploadRoute;


/*



 
*/

