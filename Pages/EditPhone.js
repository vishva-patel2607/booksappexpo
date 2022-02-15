import React, { Component, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions";

import {
  Button,
  Title,
  Paragraph,
  TextInput,
  Text,
  Appbar,
  BottomNavigation,
  Searchbar,
  RadioButton,
  Subheading,
  IconButton,
} from "react-native-paper";
const EditPhone = (props) => {
  const user = useSelector((state) => state.user);
  const [newphoneno, setNewphoneno] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const editphone = () => {
    if (newphoneno.length === 0 || !/^\d+$/.test(newphoneno)) {
      alert("Check your Phonenumber");
      return;
    } else {
      fetch("https://booksapp2021.herokuapp.com/User/Changenumber", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify({
          newnumber: newphoneno,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            console.log("Status true");
            setError(data.message);
            Alert.alert(error, "Please log in again with your new Phone No.", [
              { text: "Login", onPress: () => dispatch(logoutUser()) },
            ]);
          } else {
            if (data.message == "Could not verify") {
              dispatch(logoutUser());
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    /*
          .then((response) => {
            for (var pair of response.headers.entries()) { 
              if (pair[0] === 'www-authenticate') { 
                dispatch(logoutUser());
                return;
              }
              else if(pair[0] === 'www-changephonenumber'){
                
                if (pair[1] === 'Phone number Changed!') {
                    setError(pair[1])
                    Alert.alert(
                        error,
                        "Please Login again to continue",
                        [
                          { text: "Login", onPress: () => dispatch(logoutUser()) }
                        ]
                    );
                }
                else {
                    setError(pair[1])
                    return;
                }
              }
            }
            })  
          .catch((error) => console.log(error));
    }
    */
  };
  return (
    <SafeAreaView style={styles.layout}>
      <View style={styles.layout}>
        <TextInput
          style={styles.inputtextbox}
          label="New Phone no"
          value={newphoneno}
          onChangeText={(text) => setNewphoneno(text)}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={20}
          secureTextEntry={true}
        />
        <Text style={styles.error}>{error}</Text>
        <Button
          mode="contained"
          style={styles.submitbutton}
          labelStyle={styles.submitbutton}
          onPress={editphone}
        >
          SAVE
        </Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textbox: {
    textAlign: "center",
    padding: 20,
  },

  error: {
    textAlign: "center",
    fontSize: 20,
    color: "red",
    padding: 20,
  },

  inputtextbox: {
    margin: 10,
  },

  submitbutton: {
    margin: 10,
    fontSize: 20,
    color: "white",
  },

  layout: {
    flex: 1,
  },
});
export default EditPhone;
