
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  Pressable,
  Image
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions";

import {
  Button,
  TextInput,
  Text,
} from "react-native-paper";

const EditEmail = (props) => {
  const user = useSelector((state) => state.user);
  const [newemail, setNewemail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const editemail = () => {
    if (newphoneno.length === 0 || !/^\d+$/.test(newphoneno)) {
      alert("Check your Phonenumber");
      return;
    } else {
      fetch("https://booksapp2021.herokuapp.com/User/Changeemail", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify({
          newemail: newemail,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            console.log("Status true");
            setError(data.message);
            Alert.alert(error, "Email Changed and a verification mail is sent.", [
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
          <Image
            source={require("../assets/Backbutton.png")}
            style={{ marginLeft: 19, marginTop: 18 }}
          />
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
          CHANGE EMAIL
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
             placeholder="New Email"
             value={newemail}
            onChangeText={(text) => setNewemail(text)}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColor="#ECEFEE"
          maxLength={10}
        />

       

        <Text style={styles.error}>{error}</Text>
        <Button
          theme={{ roundness: 120 }}
          onPress={editemail}
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
export default React.memo(EditEmail);

