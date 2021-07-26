import React, { Component,useState,useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Alert,
  Pressable
} from 'react-native';

import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,RadioButton, Headline,IconButton,Provider,Portal,Modal, Surface,Subheading } from 'react-native-paper'; 
import DateTimePicker from '@react-native-community/datetimepicker';



import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';



const stores = [
    {
        shopId : 1,
        shopName : "ABC Shop",
        address : "XYZ street, Behind Zydus Hospital",
        area : "Thaltej",
        pincode : "38009",
        distance : 2,
    },
    {
        shopId : 2,
        shopName : "Shop Name",
        address : "XYZ street, Behind Zydus Hospital",
        area : "Thaltej",
        distance : 10,
    },
    {
        shopId : 3,
        shopName : "Shop Name",
        address : "XYZ street, Behind Zydus Hospital",
        area : "Thaltej",
        distance : 20,
    },

    {
        shopId : 4,
        shopName : "Shop Name",
        address : "XYZ street, Behind Zydus Hospital",
        area : "Thaltej",
        distance : 30,
    },

    {
        shopId : 5,
        shopName : "Shop Name",
        address : "XYZ street, Behind Zydus Hospital",
        area : "Thaltej",
        distance : 30,
    }
]

class Storemodal extends Component{

    constructor(props){
        super(props);
        this.state = {
            visible : false,
            location : "hi",
            selectedShop : null,
            shops : stores,
        }

        this.sendSelectedShop = this.sendSelectedShop.bind(this);
        
    };

    setLocation = async () => {
        this.setState({visible: true});
            

            
                (async () => {
                  let { status } = await Location.requestForegroundPermissionsAsync();
                  if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                  }
            
                  let loc = await Location.getCurrentPositionAsync({});
                  this.setState({location : loc.coords });
                })
              
    }


    sendSelectedShop(event){
        this.setState({visible: false});
        this.props.onSelectShop(this.state.selectedShop);
        event.preventDefault();
    }
  
    
    render(){
        return (
            <View>
                <Portal>
                <Modal visible={this.state.visible} dismissable={false} contentContainerStyle={styles.containerStyle} style={styles.modal}>
                    <Title>Select one of the shop</Title>
                    <ScrollView style={{width: "100%",padding:10,paddingTop:0}}>
                        {this.state.shops.map((props)=>{
                            if(this.state.selectedShop != null && this.state.selectedShop.shopId === props.shopId){
                                return(
                                    <View style={{borderColor:"#EF90A9" , borderWidth : 2 , borderTopRightRadius: 12, borderTopLeftRadius: 12, marginTop: 20,}}>
                                        <Storemodalcard 
                                            shopName={props.shopName}
                                            address={props.address}
                                            area={props.area}
                                            pincode={props.pincode}
                                            distance = {props.distance}
                                        />
                                    </View>
                                );
                            }
                            else{
                                return(
                                    <Pressable onPress={() => this.setState({selectedShop : props })} style={{marginTop : 20}}>
                                        <Storemodalcard 
                                            shopName={props.shopName}
                                            address={props.address}
                                            area={props.area}
                                            pincode={props.pincode}
                                            distance = {props.distance}
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
                            onPress = {() => this.setState({visible: false})}
                        >
                            Cancel
                        </Button>
                        <Button
                            mode = "contained"
                            style = {styles.submitbutton}
                            labelStyle = {styles.submitbutton}
                            onPress = {this.sendSelectedShop}
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
                            onPress = {this.setLocation}
                >
                Find a Shop
                </Button>

                
            </View>
        );
    }
};



class Storemodalcard extends Component{

    constructor(props){
        super(props);

        this.state = {
            showMap : false,
            shopName : props.shopName,
            address : "XYZ street, Behind Zydus Hospital",
            area : "Thaltej",
            pincode : "38009",
            distance : props.distance,
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
                        <Paragraph>{this.state.address}</Paragraph>
                        <Subheading>{this.state.area}-{this.state.pincode}</Subheading>
                        
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

class UploadRoute extends Component{ 

    constructor(props){
        super(props);

        this.state = {
            name : "",
            author : "",
            year : "",
            condition : "good",
            location : "hello",
            shop : null,
            photo : false ,
        };

        this.getShop = this.getShop.bind(this);
    }

    getShop = (shopClass) => {
        this.setState({shop : shopClass});
    }


    setLocation = async () => {
        console.log("at the function");
        
            console.log("in the async");
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
            console.log("finished if");
      
            let loc = await Location.getCurrentPositionAsync({});
            this.setState({location : loc.coords });
            console.log("finishedset");
        
    }

    
    


    render() {
        let selected;
        if(this.state.shop != null){
            selected =  
                        <View style={{margin: 10}}>
                            <Storemodalcard 
                                shopName={this.state.shop.shopName}
                                address={this.state.shop.address}
                                area={this.state.shop.area}
                                pincode={this.state.shop.pincode}
                                distance = {this.state.shop.distance}
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
            <SafeAreaView style = {styles.layout}>
                <ScrollView>
                <View style={styles.container1}>
                    <View style={styles.container11}>
                        { this.props.route.params?.photo
                            ? <Pressable style={{flex:1, height:'100%',width:'100%'}} onPress={() => this.props.navigation.navigate('Camerascreen')}><Image style={{flex:1,resizeMode:'cover',height:'100%',width:'100%'}} source={{uri : this.props.route.params?.photo.uri}}/></Pressable>
                            : <IconButton
                            icon="image-plus"
                            color = '#EF90A9'
                            size={50}
                            onPress={() => this.props.navigation.navigate('Camerascreen')}
                        />
                        }
                        
                    </View>
                    <View style={styles.container12}>
                        <TextInput 
                        style = {styles.inputtextbox}
                        label="Name"
                        value = {this.state.name}
                        onChangeText = {(text) => this.setState({name : text})}
                        />

                        <TextInput 
                        style = {styles.inputtextbox}
                        label="Author"
                        value = {this.state.author}
                        onChangeText = {(text) => this.setState({author : text})}
                        />
                    </View>
                </View>   

                <View style={styles.container2}>
                    <TextInput 
                    style = {styles.inputtextbox}
                    label="Year"
                    value = {this.state.year}
                    onChangeText = {(text) => this.setState({year : text.replace(/[^0-9]/g, '')})}
                    keyboardType = "number-pad"
                    maxLength = {4}
                    />
                </View> 
                    
                    
                <View style={styles.container3}>
                        
                        <Title style={styles.textbox}>Select the condition of your book:</Title>
                        <RadioButton.Group onValueChange={value => this.setState({condition : value})} value={this.state.condition}>
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

                

                
                <Storemodal onSelectShop={this.getShop} />

                {selected}

                <Button 
                    mode = "contained"
                    style = {styles.submitbutton}
                    labelStyle = {styles.submitbutton}
                    onPress = {this.setLocation}
                >
                Upload
                </Button>
                </ScrollView>
            
            </SafeAreaView>
        );
    }
  
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

