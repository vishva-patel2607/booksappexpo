
import React, { Component,useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Card,Avatar, Subheading } from 'react-native-paper'; 
import SearchRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/Search.js';
import UploadRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/Upload.js';
import UserRoute from '/Users/vishvapatel/Desktop/booksapp/booksappexpo/Pages/User.js'

class HomeRoute extends Component{

  render(){
    return(
      <SafeAreaView>
          <Text>Home</Text>
      </SafeAreaView>
    )
  }

}










const Bottomnavcomponent = () => {
  const [index,setIndex] = React.useState(2);
  const [routes] = React.useState([
    { key: 'Home', title: 'Home', icon: 'home'  },
    { key: 'Search', title: 'Search', icon: 'magnify' },
    { key: 'Upload', title: 'Upload', icon: 'upload' },
    { key: 'User', title: 'User', icon: 'account' }, 
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: HomeRoute,
    Search: SearchRoute,
    Upload: UploadRoute,
    User: UserRoute
  });

  return (
    <BottomNavigation
      activeColor = {"white"}
      inactiveColor = {"white"}
      style = {{
        
      }}
      
      labeled = {true}
      sceneAnimationEnabled = {true}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );


};

class Loggedin extends Component{

  constructor(props){
    super(props);
    this.state = {
      token : this.props.token,
    }
  }
  render(){
    return(
      
      <Bottomnavcomponent />
      
    )
  }
}


class Main extends Component {
  
  constructor(props){
   super(props);
   this.state = {
     username : "",
     password : "",
     loggedin : false, 
     loginorsignup : "Sign up",
     token : "",
     error : null
    }

    this.loginrequest = this.loginrequest.bind(this);
  }
  
  loginrequest(){

    if(this.state.loginorsignup==="Login"){
      fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password : this.state.password,
          username : this.state.username,
        })
      })
      .then((response) => {
        for (var pair of response.headers.entries()) { 
          if (pair[0] === 'www-authenticate') { 
            this.setState({error: pair[1] })
          }
        }
        return response.json();})
      .then((data) => this.setState({token : data.token, loggedin : true}))
      .catch((error) => console.log(error));
    }
    else{
      fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password : this.state.password,
          username : this.state.username,
        })
      })
      .then((response) => {
        for (var pair of response.headers.entries()) { 
          if (pair[0] === 'www-authenticate') { 
            this.setState({error: pair[1] })
          }
        }
        return response.json();})
      .catch((error) => console.log(error));
    }
    

    
  }

  render(){
    if(this.state.loggedin){
      return(
        <Bottomnavcomponent />
      )
    }
    else{
    return (
        <SafeAreaView style={styles.loginlayout}>
          <View style={styles.layout}>
            
          <Title style={styles.textbox}>
              {this.state.loginorsignup}
            </Title>
            
            <TextInput 
              style = {styles.inputtextbox}
              label="Username"
              value = {this.state.username}
              onChangeText = {(text) => this.setState({username : text})}
            />
            
            <TextInput 
              style = {styles.inputtextbox}
              label="Password"
              value = {this.state.password}
              onChangeText = {(text) => this.setState({password : text})}
            />
            <Button 
              mode = "contained"
              style = {styles.submitbutton}
              labelStyle = {styles.submitbutton}
              onPress = {this.loginrequest}
            >
              Submit
            </Button>

            <Text style={styles.error}>
              {this.state.error}
            </Text>
          </View>

          <View>
            <Button 
              onPress = {() => {
                                  if(this.state.loginorsignup==="Login"){
                                    this.setState({loginorsignup : "Sign up"});
                                  }
                                  else{
                                    this.setState({loginorsignup : "Login"});
                                  }
                                }
                        }
            >
              login/signup
            </Button>
          </View>
            
            
          
        </SafeAreaView>
      );
    }
  }
};

const styles = StyleSheet.create({
  
  textbox: {
    textAlign: "center",
    padding :20,
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
    color : "white"
  },

  loginlayout: {
    flex:1,
    justifyContent : "center",
   
  },

  layout: {
    flex:1,
  },

  

  
});

export default Loggedin;



