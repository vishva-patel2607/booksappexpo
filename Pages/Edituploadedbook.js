import React, { Component,useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    StyleSheet,
    Alert,
    Pressable
} from 'react-native';

import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,RadioButton, Subheading,IconButton } from 'react-native-paper';
class Edituploadedbook extends Component{
    constructor(props){
        super(props);
        this.state={
            book: this.props.route.params.book,
        };
    }
    render(){
        return(
            <SafeAreaView style={styles.layout}>
            <View style={styles.layout}>
            <Text></Text>
            <TextInput 
                style = {styles.inputtextbox}
                placeholder={this.state.book.book_n}
                label="Name"
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Text></Text>
            <TextInput 
                style = {styles.inputtextbox}
                placeholder={this.state.book.book_a}
                label="Author"
                autoCapitalize = 'none'
                autoCorrect = {false}
                
            />
            <Text></Text>
            <TextInput 
                style = {styles.inputtextbox}
                placeholder={this.state.book.book_p}
                label="Price(Enter numbers only)"
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Text></Text>
            <Title style={styles.textbox}>Select the condition of your book:</Title>
                        <RadioButton.Group>
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
            <Text></Text>
            <TextInput 
                style = {styles.inputtextbox}
                placeholder={this.state.book.book_y}
                label="Year"
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Text></Text>
            <Text></Text>
            <Button 
                  mode = "contained"
                  style = {styles.logoutbutton}
                  labelStyle = {styles.logoutbutton}
                  
                >
                  Save
              </Button>
            </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
  
    
    layout: {
      flex:1,
    },
  
  
    cardview :{
      flex:1,
    },
    logoutbutton:{
        alignSelf: 'center',
        width: 300,
        fontSize: 20,
        color: "white",
        borderRadius: 10,
    },
    textbox: {
        textAlign: "center",
        padding :10,
        fontSize: 20,
    },
    cardscroll :{
      flex : 1,
      height : '100%',
      margin : 10,
    },
    setFontSizeName: {
      fontSize: 20,
      marginTop: 110,
    },
    setFontSizeAuthor: {
      fontSize: 20,
      
    },
    
  
    cardcontainer : {
      
      flex: 1,
      flexDirection : 'row',
      justifyContent : 'center',
      alignContent: 'center',
      alignItems : 'flex-start',
      marginBottom : 10,
      marginTop : 10,
      borderRadius : 5,
      
    },
    submitbutton: {
        margin : 10,
        fontSize : 20,
        color : "white",
    },
    layout: {
        flex:1,
      },
    editbook:{
        alignSelf:'flex-end',
        marginTop: -10,
        
    },
  
    cardcontent : {
      flex : 4,
      height: 150,
      justifyContent: 'center',
      alignItems:'center', 
      margin : 10,
    },
  
    cardimage : {
      flex : 3,
      height: 150,
      justifyContent: 'center',
      alignItems:'center', 
    },
    pickupbook:{
      alignSelf: 'center',
      width: 300,
      fontSize: 20,
      color: "white",
      borderRadius: 10,
    },
    
  });
export default Edituploadedbook;