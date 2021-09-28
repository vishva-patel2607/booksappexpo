import React,{Component,useState,useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    StyleSheet,
    Pressable
  } from 'react-native';
  import {  Platform, StatusBar,RefreshControl } from "react-native";
  import {logoutUser, setUser} from '../actions'
  import { Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Avatar, Subheading, Caption , Divider} from 'react-native-paper'; 
  import { Card, Button } from 'react-native-paper';
  import Horizontalscrollview from './Horizontalscrollview';
  import {useDispatch, useSelector} from 'react-redux';
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  var data = [
    {
        book_name : "Sapiens",
        book_author : "James Clear",
        book_year : "1992",
        book_distance : 5.2,
        book_condition : "great",
        book_img : "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
        book_price : "Rs 150",
        book_status : "Uploaded!, Please submit to shop",
        book_transaction_code: "01"
    },
    {
        book_name : "Guns Germs and Steel",
        book_author : "James Clear",
        book_year : "2002",
        book_distance : 10,
        book_condition : "good",
        book_img : "https://images-na.ssl-images-amazon.com/images/I/81RdveuYXWL.jpg",    
        book_price : "Rs 200",
        book_status : "Book In Shop",
        book_transaction_code: "02"
    },
    {
        book_name : "Sapiens",
        book_author : "James Clear",
        book_year : "1992",
        book_distance : 11,
        book_condition : "bad",
        book_img : "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
        book_price : "Rs 250",
        book_status : "Book In Shop",
        book_transaction_code: "03"
      },
    {
        book_name : "Guns Germs and Steel",
        book_author : "James Clear",
        book_year : "1992",
        book_distance : 5.2,
        book_condition : "great",
        book_img : "https://images-na.ssl-images-amazon.com/images/I/81RdveuYXWL.jpg",
        book_price : "Rs 300",
        book_status : "Uploaded!, Please submit to shop",
        book_transaction_code: "04"

      },
    {
        book_name : "Guns Germs and steel",
        book_author : "James Clear",
        book_year : "1992",
        book_distance : 5.2,
        book_condition : "great",
        book_img : "https://images-na.ssl-images-amazon.com/images/I/81RdveuYXWL.jpg",
        book_price : "Rs 350",
        book_status : "Book In Shop",
        book_transaction_code: "05"

      },
];

  const HomeRoute = (props) =>{
  const [Bookdata,setBookData] = useState([]);
  const [count,setCount] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setCount(count+1);
  }
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  let uploadedbook = Bookdata.length!==0 ? <Horizontalscrollview booklist={Bookdata} pagename="UploadedBooks" navigation={props.navigation} /> : <Horizontalscrollview booklist={data} pagename="UploadedBooks" navigation={props.navigation} />
  
  
  useEffect(() => {
    
      fetch('https://booksapp2021.herokuapp.com/Book/Uploadedbooks',{
        method: 'POST',
        headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : user.token,
                },
        body : null
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data.status){
          console.log(data.response.books);
          setBookData(data.response.books)
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
      
      setBookData([]);
      setRefreshing(false);
      
    },[count])
    useEffect(()=>{
        console.log("refreshing from edit book");
        setRefreshing(props.route.params?.refreshing);
        setCount(count+1);
    },[props.route.params?.refreshing])
      return(
        
        <SafeAreaView style={styles.AndroidSafeArea}>
          <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          <Card style={{borderRadius: 30,marginLeft:20,marginRight:20,marginTop:20}}>
            <Card.Content>
                  <Title>Total Books Uploaded :-  {Bookdata.length}</Title>
                  <Text></Text>
                  <Title>Total Books Pickedup :- 10</Title>
                  <Text></Text>
                  <Title>Total Books Exchanged :- 20</Title>
            </Card.Content>
            <Text></Text>

          </Card>
                <Text></Text>
                <Text></Text>
                <Title style={styles.statistics}>Uploaded Books</Title>
                <Text></Text>
                <View style = {styles.cardview}>
                {uploadedbook}
                </View> 
                <View style={{
                  alignSelf: 'stretch',
                  borderBottomWidth: 1,
                  borderBottomColor: '#000',
                  marginTop: 10,
                  marginBottom: 10
                }} />
                <Title style={styles.statistics}>Books to Pickup</Title>  
                <Text></Text>
                
                <View style = {styles.cardview}>
                {uploadedbook}
                </View> 
                </ScrollView> 
        </SafeAreaView>
        
      )
}
  


  const styles = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    submitbutton: {
      
      fontSize : 18,
      height: 40,
      width: 300,
      alignSelf: 'center',
      borderRadius: 10,
      color : "white"
    },
    statistics: {
      textAlign: 'center',
    },
    cardview :{
      flex:1,
    },
    cardscroll :{
      flex : 1,
      height : '100%',
      margin : 10,
    },
    cardcontainer : {
      backgroundColor:'#FFFFFF',
      flex: 0.5,
      flexDirection : 'row',
      justifyContent : 'center',
      marginBottom : 10,
      marginTop : 20,
      borderRadius : 5,
    },
    cardcontent : {
      flex : 4,
      height: 100,
      padding: 5,
      justifyContent: 'center',
      alignItems:'center', 
      margin : 10,
    },
    cardimage : {
      flex : 1,
      height: 100,
      justifyContent: 'center',
      alignItems:'center', 
      margin : 10,
      marginRight :5,
    }
  });
  


  export default HomeRoute;