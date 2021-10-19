
import React, { Component,useState,useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Image,
  KeyboardAvoidingView,
  Alert,
  Pressable,
  
} from 'react-native';

import { Button,Title,Paragraph,TextInput,Text,Appbar,BottomNavigation,Searchbar,Card,Avatar, Subheading,Checkbox} from 'react-native-paper'; 
import { setUser } from '../actions';



const Signup =  (props)=> {
  
    

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [repassword,setRepassword] = useState("");
    const [email,setEmail] = useState("");
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [year,setYear] = useState("");
    const [month,setMonth] = useState("");
    const [day,setDay] = useState("");
    const [phonenumber,setPhonenumber] = useState("");
    const [token,setToken] = useState("");
    const [error,setError] = useState("");
    const [checked, setChecked] = useState(false);

    const ref_day = useRef();
    const ref_month = useRef();
    const ref_year = useRef();

    
    const Signuprquest = ()=>{

        var emailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i );
        
        var passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');


        if(firstname.length === 0){
            alert("Enter your Firstname");
            return;
        }
        else if(lastname.length === 0){
            alert("enter your Lastname");
            return;
        }
        else if(username.length === 0){
            alert("Enter your username!");
            return;
        }
        else if(password.length === 0 || repassword.length === 0 || !passwordRegex.test(password) || password !== repassword){
            alert('Check Password! \n\n Password must contains eight characters, at least one uppercase letter, one lowercase letter and one number \n\n And both passwords should match');
            return;
        }
        else if(email.length === 0 || !emailRegex.test(email.trim().toLowerCase())){
            alert("Enter a valid E-mail");
            return;
        }
        else if(phonenumber.length === 0 || !(/^\d+$/.test(phonenumber))){
            alert("Check your Phonenumber");
            return;
        }
        else if(day.length !== 2 || month.length !== 2 || year.length !== 4){
            alert("Enter valid date");
            return;
        }
        else if(!checked){
          alert("Kindly read and accept the privacy policy.");
          return;
        }
        else {

          
            fetch('https://booksapp2021.herokuapp.com/User/Signup', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              password : password,
              username : username.trim().toLowerCase(),
              email : email.trim().toLowerCase(),
              firstname : firstname,
              lastname : lastname,
              year : year,
              month : month,
              day : day,
              phonenumber : phonenumber
            })
          })
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              if(data.status){
                setError(data.message);
              }
              else{
                setError(data.message);
              }
          })
          .catch((error) => {
            console.log(error);
          })
        }   
    }

    const handleChangeDay = (value) => {
        if (/^\d+$/.test(value) || value == '') {
          setDay(value);
          if (value.length === 2) {
            ref_year.current.focus();
          }
        }
    
        
      };
    
      const handleChangeMonth = (value) => {
        if (/^\d+$/.test(value) || value == '') {
          setMonth(value);
          if (value.length === 2) {
            ref_day.current.focus();
          }
        }
      };
    
      const handleChangeYear = (value) => {
        if (/^\d+$/.test(value) || value == '') {
          setYear(value);
          if (value.length === 2) {
            ref_year.current.focus();
          }
        }
      };

      

  
    
  return (
          <SafeAreaView style={styles.loginlayout}>
           
 
            <Title style={styles.textbox}>
                Sign up
              </Title>

              
              <KeyboardAvoidingView behavior= {Platform.OS === "ios" ? 'padding' : "height"}  style={styles.layout} >
              <ScrollView>
             
              

              <View 
                style = {{flexDirection:'row',}}
              >
                  <TextInput
                    style = {styles.inputtextbox}
                    label="First name"
                    value = {firstname}
                    onChangeText = {(text) => setFirstname(text)}
                    autoCompleteType = 'name'
                    autoCorrect = {false}
                    maxLength = {20}
                    left = {<TextInput.Icon name="badge-account"/>}
                  />

                <TextInput
                    style = {styles.inputtextbox}
                    label="Last name"
                    value = {lastname}
                    onChangeText = {(text) => setLastname(text)}
                    autoCompleteType = 'name'
                    autoCorrect = {false}
                    maxLength = {20}
                    left = {<TextInput.Icon name="badge-account"/>}
                  />
              </View>

              
              <TextInput 
                style = {styles.inputtextbox}
                label="Username"
                value = {username}
                onChangeText = {(text) => setUsername(text)}
                autoCapitalize = 'none'
                autoCompleteType = 'username'
                autoCorrect = {false}
                maxLength = {20}
                left = {<TextInput.Icon name="account"/>}
              />
              
              <TextInput 
                style = {styles.inputtextbox}
                label="Password"
                value = {password}
                onChangeText = {(text) => setPassword(text)}
                autoCapitalize = 'none'
                autoCompleteType = 'password'
                autoCorrect = {false}
                left = {<TextInput.Icon name="eye"/>}
                maxLength = {20}
              />

              <TextInput 
                style = {styles.inputtextbox}
                label="Retype Password"
                value = {repassword}
                onChangeText = {(text) => setRepassword(text)}
                autoCapitalize = 'none'
                autoCompleteType = 'password'
                autoCorrect = {false}
                left = {<TextInput.Icon name="eye"/>}
                maxLength = {20}
              />

              <TextInput 
                style = {styles.inputtextbox}
                label="Email"
                value = {email}
                onChangeText = {(text) => setEmail(text)}
                autoCapitalize = 'none'
                autoCompleteType = 'email'
                autoCorrect = {false}
                maxLength = {30}
                left = {<TextInput.Icon name="email"/>}
                keyboardType='email-address'
              />


             <TextInput 
                style = {styles.inputtextbox}
                label="Phone number"
                value = {phonenumber}
                onChangeText = {(text) => setPhonenumber(text)}
                autoCapitalize = 'none'
                autoCompleteType = 'tel'
                autoCorrect = {false}
                maxLength = {20}
                left = {<TextInput.Icon name="cellphone"/>}
                keyboardType='number-pad'
              />


            <View 
                style = {{flexDirection:'row',}}
              >
                  <TextInput
                    style = {styles.inputtextbox}
                    label="MM"
                    value = {month}
                    onChangeText = {(text) => handleChangeMonth(text)}
                    autoCorrect = {false}
                    maxLength = {2}
                    left = {<TextInput.Icon name="calendar-month"/>}
                    ref={ref_month}
                    keyboardType='number-pad'
                  />

                <TextInput
                    style = {styles.inputtextbox}
                    label="DD"
                    value = {day}
                    onChangeText = {(text) => handleChangeDay(text)}
                    autoCorrect = {false}
                    maxLength = {2}
                    left = {<TextInput.Icon name="calendar-today"/>}
                    ref={ref_day}
                    keyboardType='number-pad'
                  />


                <TextInput
                    style = {styles.inputtextbox}
                    label="YYYY"
                    value = {year}
                    onChangeText = {(text) => handleChangeYear(text)}
                    autoCorrect = {false}
                    maxLength = {4}
                    left = {<TextInput.Icon name="calendar-blank"/>}
                    ref={ref_year}
                    keyboardType='number-pad'
                  />
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:10,marginTop:10}}>
                <Checkbox.Android
                 status={checked ? 'checked' : 'unchecked'}
                 onPress={() => {
                   setChecked(!checked);}}/>
                <Text>I agree to <Text onPress={()=>{props.navigation.navigate('PrivacyPolicy')}} style={{textDecorationLine:'underline'}}>Privacy policy</Text></Text>
              </View>

              <Button 
                mode = "contained"
                style = {styles.submitbutton}
                labelStyle = {styles.submitbutton}
                onPress = {Signuprquest}
              >
                Sign up
              </Button>
  
              <Text style={styles.error}>
                {error}
              </Text>
            
              </ScrollView>
            </KeyboardAvoidingView>
            

            <View>
              <Button 
                onPress = {() => props.navigation.navigate('Login')}
              >
                Log in
              </Button>
            </View>

            
              
              
            
          </SafeAreaView>
    );
}
  
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
      flex:1,
    },
  
    submitbutton: {
      margin : 10,
      fontSize : 20,
      color : "white"
    },
  
    loginlayout: {
      flex:1,
      
     
    },
  
    layout: {
      flex:1,
    },
  
    
  
    
  });


  export default Signup;