import React,{useState,useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    StyleSheet,
    
  } from 'react-native';
  import {  Platform, StatusBar,RefreshControl } from "react-native";
  import {logoutUser, setUser} from '../actions'
  import { Title,Text,Headline,Card,Button} from 'react-native-paper'; 
  
  import Horizontalscrollview from './Horizontalscrollview';
  import {useDispatch, useSelector} from 'react-redux';

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const HomeRoute = (props) =>{
  const [Bookdata,setBookData] = useState([]);
  const [Pickedupbooks,setPickedupbooks] = useState([]);
  const [Removedbooks,setRemovedbooks] = useState([]);
  const [Pickupdata,setPickupdata] = useState([]);
  const [count,setCount] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setCount(count+1);
  }
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  
  let removedbooks = Removedbooks.length!==0 ? <Horizontalscrollview booklist={Removedbooks} pagename = "RemovedBookScreen" navigation={props.navigation}/>:
  <View style={{height:90 ,margin: 10, backgroundColor : "#EDEDF0" , borderRadius : 10, justifyContent:'center',alignItems:'center'}}>
  <Headline>No books currently removed.</Headline>
  </View>
  let booksaddedtopickup = Pickupdata.length!==0 ? <Horizontalscrollview booklist={Pickupdata} pagename = "Booksaddedtopickup" navigation={props.navigation}/>:
  <View style={{height:90 ,margin: 10, backgroundColor : "#EDEDF0" , borderRadius : 10, justifyContent:'center',alignItems:'center'}}>
  <Headline>No books added to pickedup.</Headline>
  </View>
  let bookspickedup = Pickedupbooks.length!==0 ? <Horizontalscrollview booklist={Pickedupbooks} pagename="Booksaddedtopickup" navigation={props.navigation}/>:
   <View style={{height:100 ,margin: 10, backgroundColor : "#EDEDF0" , borderRadius : 10, justifyContent:'center',alignItems:'center'}}>
  <Headline>No books picked up.</Headline>
  </View>
  let uploadedbook = Bookdata.length!==0 ? <Horizontalscrollview booklist={Bookdata} pagename="UploadedBooks" navigation={props.navigation} /> : 
  <View style={{height:90 ,margin: 10, backgroundColor : "#EDEDF0" , borderRadius : 10, justifyContent:'center',alignItems:'center'}}>
  <Headline>No books uploaded.</Headline>
  <Button mode='contained' style={{marginTop:15}} onPress = {() => {props.navigation.navigate("Upload");}}>Upload one</Button>
  </View>
  useEffect(() => {
      
    fetch('https://booksapp2021.herokuapp.com/Book/Pickedupbooks/Added',{
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
        setPickupdata(data.response.books)
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
    
    setPickupdata([]);
    setRefreshing(false);
    
  },[count])
  useEffect(() => {
      
    fetch('https://booksapp2021.herokuapp.com/Book/Pickedupbooks',{
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
        setPickedupbooks(data.response.books)
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
    
    setPickedupbooks([]);
    setRefreshing(false);
    
  },[count])
  
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
    
    useEffect(() => {
      fetch('https://booksapp2021.herokuapp.com/Book/Pickedupbooks/Removed',{
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
          setRemovedbooks(data.response.books)
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
      
      setRemovedbooks([]);
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
                <Card style={{marginTop:20,borderRadius:35}}>
                  <Card.Content>
                    <Title>Books Uploaded:- {Bookdata.length}</Title>
                    <Title style={{paddingTop:10}}>Books added to Pickup:- {Pickupdata.length}</Title>
                    <Title style={{paddingTop:10}}>Books Pickedup:- {Pickedupbooks.length}</Title>
                    <Title style={{paddingTop:10}}>Books removed from Pickup:- {Removedbooks.length}</Title>
                  </Card.Content>
                </Card>
                <Title style={styles.statistics}>Uploaded Books</Title>
                <Text></Text>
                <View style = {styles.cardview}>
                {uploadedbook}
                </View> 
                
                <Title style={styles.statistics}>Books added to Pickup</Title>  
                <Text></Text>
                
                <View style = {styles.cardview}>
                {booksaddedtopickup}
                </View> 
                  
                  <Title style={styles.statistics}>Books Picked up by the user</Title>  
                  <Text></Text>
                  <View style = {styles.cardview}>
                  {bookspickedup}
                  </View> 
                  
                  <Title style={styles.statistics}>Books Removed from pickup</Title>  
                  <Text></Text>
                  <View style = {styles.cardview}>
                  {removedbooks}
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

    statistics: {
      textAlign: 'left',
      marginTop:20
    },

    cardview :{
      flex:1,
    },

  });
  


  export default React.memo(HomeRoute);