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
import Storemodalcard from './Storemodalcard';


import {useDispatch, useSelector} from 'react-redux';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';









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
    

    useEffect(()=>{
        setShop(props.route.params?.shop);
    },[props.route.params?.shop])

    const uploaddetails = () => {
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
                    formData.append('store_id', shop.store_id);
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
        if( shop != null){
            
            selected =  
                        <View style={{margin: 10}}>
                            <Storemodalcard 
                                shopName={shop.store_name}
                                storeInchargeName={shop.store_incharge}
                                address={shop.store_address}
                                pincode={shop.store_pincode}
                                distance = {shop.store_distance}
                                contactNo = {shop.store_number}
                                latitude = {shop.store_latitude}
                                longitude={shop.store_longitude}
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

                

                
                <Button
                    mode = "contained"
                    style = {styles.submitbutton}
                    labelStyle = {styles.submitbutton}
                    onPress = {() => props.navigation.navigate("Storemodal")}
                >
                    Find a Shop
                </Button>

                {selected}

                
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

