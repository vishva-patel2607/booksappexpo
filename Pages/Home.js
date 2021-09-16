import React,{Component} from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    StyleSheet,
    Pressable
  } from 'react-native';
  import {  Platform, StatusBar } from "react-native";
  
  import { Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Avatar, Subheading, Caption } from 'react-native-paper'; 
  import { Card, Button } from 'react-native-paper';

  import { Badge } from 'react-native-paper';
  var data = [
    {
        book_n : "Sapiens",
        book_a : "James Clear",
        book_y : "1992",
        book_d : 5.2,
        book_c : "great",
        book_i : "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
        book_p : "Rs 150",
    },
    {
        book_n : "Guns Germs and Steel",
        book_a : "James Clear",
        book_y : "2002",
        book_d : 10,
        book_c : "good",
        book_i : "https://images-na.ssl-images-amazon.com/images/I/81RdveuYXWL.jpg",    
        book_p : "Rs 200",
    },
    {
        book_n : "Sapiens",
        book_a : "James Clear",
        book_y : "1992",
        book_d : 11,
        book_c : "bad",
        book_i : "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
        book_p : "Rs 250",
      },
    {
        book_n : "Guns Germs and Steel",
        book_a : "James Clear",
        book_y : "1992",
        book_d : 5.2,
        book_c : "great",
        book_i : "https://images-na.ssl-images-amazon.com/images/I/81RdveuYXWL.jpg",
        book_p : "Rs 300",

      },
    {
        book_n : "Guns Germs and steel",
        book_a : "James Clear",
        book_y : "1992",
        book_d : 5.2,
        book_c : "great",
        book_i : "https://images-na.ssl-images-amazon.com/images/I/81RdveuYXWL.jpg",
        book_p : "Rs 350"
      },
];

class HomeRoute extends Component{
  constructor(props){
    super(props);
    this.state = {
      data : data,   
    }
  }
    render(){
      return(
        <SafeAreaView style={styles.AndroidSafeArea}>
          <Card>
          <Text></Text>
          <Text></Text>
              <Title>Total Books Lent:-</Title>
              <Text></Text>
              <Title>Total Books Borrowed:-</Title>
              <Text></Text>
              <Title>Total Exchanges:-  3  </Title>
              <Text></Text>
              <Title>Total Money Earned:-  </Title>
              <Text></Text>
              <Text></Text>
              <Button 
                    mode = "contained"
                    style = {styles.submitbutton}
                    labelStyle = {styles.submitbutton}
                    
                >
                Books to Pickup
                </Button>
                <Text></Text>
                <Button 
                    mode = "contained"
                    style = {styles.submitbutton}
                    labelStyle = {styles.submitbutton}
                    
                >
      
                Books to Submit 
                </Button>
                <Text></Text>
                </Card>
                <Text></Text>
                <Title style={styles.statistics}>Uploaded Books</Title>
                <Text></Text>
                <View style = {styles.cardview}>
            <ScrollView style={styles.cardscroll} horizontal={true}>
  
  
            {
            this.state.data.map((book,idx) => (
              <Pressable key={idx} onPress={() => this.props.navigation.navigate('UploadedBooks',{ book : book })} >
              <View style = {styles.cardcontainer}>
                <View style = {styles.cardcontent}>
                <Image 
                      style={{resizeMode:'contain',height:'110%',width:'100%'}}
                      source={{uri : book.book_i}}
                    />
                    
                  <Title>{book.book_n}</Title>
                  <Paragraph>{book.book_p}</Paragraph>
                </View>
                
              </View>
              </Pressable>
            ))
            }
  
              
            </ScrollView>
          </View>
                
        </SafeAreaView>

      )
    }
  
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