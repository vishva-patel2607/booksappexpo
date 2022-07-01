import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Alert,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions";
import Backbutton from "../Components/Backbutton";
import { styles } from "../Styles/Editemail.js";
import ActionButton from "../Components/Actionbutton";
import { useTheme } from "@react-navigation/native";
import { TextInput, Text } from "react-native-paper";
import {emailRegex} from '../Components/Checks';
import { ThemeContext } from "../Components/Theme";

const EditEmail = (props) => {
  const { textcolor } = React.useContext(ThemeContext);
  const { colors } = useTheme();
  const user = useSelector((state) => state.user);
  const [newemail, setNewemail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

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
            color: textcolor,
            marginLeft: 22,
            fontFamily: "DMSansbold",
          }}
        >
          CHANGE EMAIL
        </Text>
      </View>
      <View style={{ marginLeft: 19, flex: 12 }}>
        <View style={{
          height:59,
          overflow:'hidden'
        }}>
        <TextInput
          style={styles.inputtextbox}
          theme={{
            colors: {
              primary: colors.background,
            },
            roundness: 120,
          }}
          placeholder="New Email"
          value={newemail}
          onChangeText={(text) => setNewemail(text)}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColor="transparent"
          maxLength={10}
        />
        </View>
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
