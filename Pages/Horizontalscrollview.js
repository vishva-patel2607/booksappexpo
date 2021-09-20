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
  
const Horizontalscrollview = (props) => {
        return (
          <ScrollView style={styles.cardscroll} horizontal={true}>
          {
          props.booklist.map((book,idx) => (
            <Pressable key={idx} onPress={() => props.navigation.navigate(props.pagename,{ book : book })} >
            <View style = {styles.cardcontainer}>
                <View style = {styles.cardcontent}>
                  
                    
                    <Image 
                      style={{resizeMode:'contain',height:'110%',width:'100%'}}
                      source={{uri : book.book_img}}
                    />
                  <Subheading>{book.book_name}</Subheading>
                  <Paragraph>Rs {book.book_price}</Paragraph>
                  <Caption>{book.book_status}</Caption>
                </View>
            </View>
            </Pressable>
          ))
          }
          </ScrollView>
          )
}
const styles = StyleSheet.create({
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
  }
});
export default Horizontalscrollview;