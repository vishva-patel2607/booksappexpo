import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  Pressable,
  Image,
  StatusBar,
} from "react-native";
import { ThemeContext } from "../Components/Theme";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions";
import Backbutton from "../Components/Backbutton";
import { styles } from "../Styles/Editemail.js";
import ActionButton from "../Components/Actionbutton";
import { Button, TextInput, Text } from "react-native-paper";

const EditEmail = (props) => {
  const user = useSelector((state) => state.user);
  const [newemail, setNewemail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { setTheme, Theme } = React.useContext(ThemeContext);
  let emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const editemail = () => {
    if (newemail.length === 0) {
      alert("Please enter Email");
      return;
    }else if(!emailRegex.test(newemail.trim().toLowerCase())){
      alert('Check your Email');
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
            Alert.alert(
              error,
              "Email Changed and a verification mail is sent.",
              [{ text: "Login", onPress: () => dispatch(logoutUser()) }]
            );
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
          <Backbutton />
        </Pressable>
      </View>
      <View style={{ justifyContent: "flex-start", flex: 1 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#0D1936",
            marginLeft: 22,
            fontFamily: "DMSansbold",
          }}
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
          underlineColor="transparent"
          maxLength={10}
        />
        <View style={{ marginTop: 25 }}>
          <ActionButton
            title="SAVE"
            Click={editemail}
            fontS="14"
            style={{ marginTop: 25 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(EditEmail);
