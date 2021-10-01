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
  
  import { Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Avatar, Subheading, Caption, Divider } from 'react-native-paper'; 
  import { Card, Button } from 'react-native-paper';
  
const Horizontalscrollview = (props) => {

        return (
          <ScrollView style={styles.cardscroll} horizontal={true}>
          {
          
          props.booklist.map((book,idx) => (
            <Pressable key={idx} onPress={() => props.navigation.navigate(props.pagename,{ book : book })} >
            <View style={{marginHorizontal: 10}}>
              <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                <View
                  style={{
                    backgroundColor: '#FDEDEC',
                    borderRadius: 10,
                    height: 200,
                    width: 150
                  }}>
                    <View style={{ height: 120, width: 150, overflow: 'hidden', paddingTop: 10}}>
                      <Image 
                        style={{resizeMode:'contain',height:'100%',width:'100%'}}
                        source={{uri : book.book_img}}
                      />
                    </View>
                    <Divider />
                      <View style={{ padding: 10, width: 155, alignItems: 'flex-start' }}>
                        <Text style={{fontSize: 11}}>{book.book_name}</Text>
                        <Text style={{ color: '#000000', paddingTop: 5, fontSize: 10}}>
                          {book.book_price}
                        </Text>
                        <Text style={{ color: '#000000', paddingTop: 5, fontSize: 10}}>
                          {book.book_status}
                        </Text>
                      </View>
                </View>
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
  },
  cardscroll :{
    
    height : '100%',
    marginHorizontal : 10,
  },
});
export default Horizontalscrollview;