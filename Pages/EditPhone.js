
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  Pressable,
  Image
} from "react-native";
import { ThemeContext } from "../main pages/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions";

import {
  Button,
  TextInput,
  Text,
} from "react-native-paper";

const EditPhone = (props) => {
  const user = useSelector((state) => state.user);
  const [newphoneno, setNewphoneno] = useState("");
  const [error, setError] = useState("");
  const { setTheme, Theme } = React.useContext(ThemeContext);
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
    
  };
 
  return (
    <SafeAreaView style={styles.layout}>
      <View style={{ justifyContent: "flex-start", flex: 1 }}>
        <Pressable onPress={() => props.navigation.navigate("User")}>
        {Theme === "Light" ? (
            <Image
              source={require("../assets/Backbutton.png")}
              style={{ marginLeft: 20, marginTop: 18 }}
            />
          ) : (
            <Image
              source={require("../assets/Backbuttondark.png")}
              style={{ marginLeft: 20, marginTop: 18 }}
            />
          )}
        </Pressable>
      </View>
      <View style={{ justifyContent: "flex-start", flex: 1 }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "700",
            color: "#0D1936",
            marginLeft: 22,
          }}
          theme={{ fonts: { regular: "DM Sans" } }}
        >
          CHANGE PHONE
        </Text>
      </View>
      <View style={{ marginLeft: 19, flex: 12 }}>
         <TextInput
          style={styles.inputtextbox}
          theme={{
            colors: {
              primary: "#EEECEF",
              placeholder: "#8e8e8e",
            },
            roundness: 120,
          }}
          
             mode="flat"
             placeholder="New phone number"
             value={newphoneno}
            onChangeText={(text) => setNewphoneno(text)}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColor="#ECEFEE"
          maxLength={10}
        />

       

        <Text style={styles.error}>{error}</Text>
        <Button
          theme={{ roundness: 120 }}
          onPress={editphone}
          style={{
            width: 215,
            height: 40,
            alignItems: "flex-start",

            justifyContent: "center",
          }}
          labelStyle={{
            fontSize: 14,
            color: "white",
            flexDirection: "row",
            fontFamily: "DMSansbold",
          }}
          mode="contained"
        >
          SAVE
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  error: {
    textAlign: "center",
    fontSize: 20,
    color: "red",
    padding: 20,
  },

  inputtextbox: {
    marginTop: 11,
    width: 215,
    backgroundColor: "#FFFFFF",
    borderRadius: 120,
    height: 50,
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
export default React.memo(EditPhone);

