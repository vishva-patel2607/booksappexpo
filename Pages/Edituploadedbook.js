import React, { Component,useEffect,useState } from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,RadioButton, Subheading,IconButton } from 'react-native-paper';
const Edituploadedbook = (props) => {
  const [Bookdata, setBookdata] = useState(props.route.params?.book);
  const [Newname, setNewname] = useState(props.route.params?.book.book_name);
  const [Newauthor, setNewauthor] = useState(props.route.params?.book.book_author);
  const [Newprice, setNewprice] = useState(props.route.params?.book.book_price);
  const [Newyear, setNewyear] = useState(props.route.params?.book.book_year);
  const [NewCondition,setNewCondition] = useState(props.route.params?.book.book_condition);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(()=>{
    setBookdata(props.route.params?.book)
    setNewname(props.route.params?.book.book_name),
    setNewauthor(props.route.params?.book.book_author),
    setNewprice(props.route.params?.book.book_price),
    setNewCondition(props.route.params?.book.book_condition),
    setNewyear(props.route.params?.book.book_year)
  },[props.route.params?.book])
  const editbooks = () => {
    fetch('https://booksapp2021.herokuapp.com/Book/Uploadedbooks/Edit',{
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
        'x-access-token' : user.token,
      },
      body: JSON.stringify({
        book_id : Bookdata.book_id,
        book_name : Newname,
        book_author : Newauthor,
        book_price : Newprice,
        book_year : Newyear,
        book_condition : NewCondition
      })
    })
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      if(data.status){
        Alert.alert(
          "Success",
          "Book Details Updated",
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
        } 
    })
    .catch((error)=>{
      console.log(error);
    })
  }
        return(
            <SafeAreaView style={styles.layout}>
            <View style={styles.layout}>
            <Text></Text>
            <TextInput 
                style = {styles.inputtextbox}
                placeholder={Bookdata.book_name}
                value={Newname}
                onChangeText = {(text) => setNewname(text)}
                label="Name"
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Text></Text>
            <TextInput 
                style = {styles.inputtextbox}
                placeholder={Bookdata.book_author}
                value={Newauthor}
                onChangeText = {(text) => setNewauthor(text)}
                label="Author"
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Text></Text>
            <TextInput 
                    style = {styles.inputtextbox}
                    label="Price"
                    value={String(Newprice)}
                    placeholder={String(Bookdata.book_price)}
                    onChangeText = {(text) => setNewprice(text.replace(/[^0-9]/g, ''))}
                    keyboardType = "number-pad"
                    maxLength = {4}
            />
            <Text></Text>
            <Title style={styles.textbox}>Select the condition of your book:</Title>
              <RadioButton.Group onValueChange={(value) => setNewCondition(value)} value={NewCondition}>
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
                    label="Year"
                    value = {String(Newyear)}
                    onChangeText = {(text) => setNewyear(text.replace(/[^0-9]/g, ''))}
                    keyboardType = "number-pad"
                    maxLength = {4}
            />
            <Text></Text>
            <Text></Text>
            <Button 
                  mode = "contained"
                  style = {styles.logoutbutton}
                  labelStyle = {styles.logoutbutton}
                  onPress={editbooks}
                >
                  Save
              </Button>
            </View>
            </SafeAreaView>
        )
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