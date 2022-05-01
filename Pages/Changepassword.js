import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  Text,
  Image,
  Pressable,
  StatusBar,
} from "react-native";
import { ThemeContext } from "../Components/Theme";
import { useDispatch, useSelector } from "react-redux";
import Backbutton from "../Components/Backbutton";
import { Button, TextInput } from "react-native-paper";
import { logoutUser } from "../actions";
import ActionButton from "../Components/Actionbutton";

const Changepassword = (props) => {
  
  const dispatch = useDispatch();

  const [oldpassword, setOldpassword] = useState("");
  const [newpassword1, setNewpassword1] = useState("");
  const [newpassword2, setNewpassword2] = useState("");
  const { Theme } = React.useContext(ThemeContext);
  const [error, setError] = useState("");
  const { colors } = useTheme();
  const user = useSelector((state) => state.user);
  let textColor = Theme === 'Light' ? '#0D1936' : '#ECEFEE';

  const changepassword = () => {
    var passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
    );

    if (oldpassword.length === 0 || newpassword1.length === 0 || newpassword2.length === 0 ) {
      alert("Please fill all the fields!");
      return;
    }  else if (
      newpassword1 !== newpassword2 ||
      !passwordRegex.test(newpassword1) ||
      !passwordRegex.test(newpassword2)
    ) {
      alert(
        "Check Password! \n\n Password must contains eight characters, at least one uppercase letter, one lowercase letter and one number \n\n And both passwords should match"
      );
      return;
    } else {
      fetch("https://booksapp2021.herokuapp.com/User/Changepassword", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify({
          oldpassword: oldpassword,
          newpassword: newpassword1,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Going in ");
          if (data.status) {
            setError(data.message);
            Alert.alert(error, "Please log in again with your new password", [
              { text: "Login", onPress: () => dispatch(logoutUser()) },
            ]);
          } else {
            if (data.message === "Could not verify") {
              dispatch(logoutUser());
            } else {
              setError(data.message);
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
            fontSize: 25,
            fontWeight: "700",
            color: textColor,
            marginLeft: 22,
          }}
          theme={{ fonts: { regular: "DM Sans" } }}
        >
          CHANGE PASSWORD
        </Text>
      </View>
      <View style={{ marginLeft: 19, flex: 12 }}>
        <View style={{ height: 59, overflow: "hidden" }}>
          <TextInput
            style={styles.inputtextbox}
            theme={{
              colors: {
                primary: colors.background,
                placeholder: "#8e8e8e",
              },
              roundness: 120,
            }}
            // theme={{ colors: { primary: "transparent" } }}
            placeholder="Old Password"
            secureTextEntry={true}
            value={oldpassword}
            onChangeText={(text) => setOldpassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColor="transparent"
            maxLength={20}
          />
        </View>
        <View style={{ height: 59, overflow: "hidden" }}>
          <TextInput
            style={styles.inputtextbox}
            theme={{
              colors: {
                primary: colors.background,
                placeholder: "#8e8e8e",
              },
              roundness: 120,
            }}
            placeholder="New password"
            value={newpassword1}
            onChangeText={(text) => setNewpassword1(text)}
            autoCapitalize="none"
            underlineColor="transparent"
            autoCorrect={false}
            secureTextEntry={true}
            maxLength={20}
          />
        </View>

        <View style={{ height: 59, overflow: "hidden" }}>
          <TextInput
            style={styles.inputtextbox}
            theme={{
              colors: {
                primary: colors.background,
                placeholder: "#8e8e8e",
              },
              roundness: 120,
            }}
            placeholder="Retype New Password"
            value={newpassword2}
            onChangeText={(text) => setNewpassword2(text)}
            autoCapitalize="none"
            underlineColor="transparent"
            autoCorrect={false}
            secureTextEntry={true}
            maxLength={20}
          />
        </View>
        <Text style={styles.error}>{error}</Text>

        <ActionButton
              title="SAVE"
              Click={changepassword}
              fontS="14"
              style={{ marginTop: 15 }}
            />
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
    paddingLeft: 10,
  },

  submitbutton: {
    margin: 10,
    fontSize: 20,
    color: "white",
  },

  layout: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight  : 0,
  },
});

export default React.memo(Changepassword);
