import React, { Component, useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Alert,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import RenderButton from "../Components/Button";
import { Title, TextInput, Text } from "react-native-paper";
import StaticText from "../Components/StaticText";
import { useDispatch } from "react-redux";

import { setUser } from "../actions";

const InitialSignUp = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const ISignup = () => {
    if (username.length === 0) {
      alert("Enter your Username");
      return;
    } else if (password.length === 0) {
      alert("Enter your password");
      return;
    } else if (confirmPassword.length === 0) {
      alert("Confirm your password.");
      return;
    } else if (
      email.length === 0 ||
      !emailRegex.test(email.trim().toLowerCase())
    ) {
      alert("Enter a valid E-mail");
      return;
    } else {
      fetch(
        `https://booksapp2021.herokuapp.com/User/Signup/${username}/${email}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            console.log(data.message);
            props.navigation.navigate("Signup", {
              username: username,
              password: password,
              email: email,
            });
          } else {
            console.log(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <SafeAreaView style={styles.loginlayout}>
      <KeyboardAvoidingView behavior="padding">
        <View style={{ flex: 4, flexDirection: "column", marginTop: 30 }}>
          <Image
            source={require("../assets/BAheader.png")}
            style={{ alignSelf: "center" }}
          />
        </View>
        <View style={{ flex: 18, flexDirection: "column" }}>
          <TextInput
            style={styles.inputtextbox}
            theme={{
              colors: {
                primary: "#EEECEF",
                placeholder: "#8e8e8e",
              },
              roundness: 120,
            }}
            // theme={{ colors: { primary: "transparent" } }}

            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize="none"
            underlineColor="#ECEFEE"
            autoCompleteType="username"
            autoCorrect={false}
            // underlineColor="transparent"
            maxLength={20}
            left={
              <TextInput.Icon
                name={() => <Image source={require("../assets/user.png")} />}
              />
            }
          />

          <TextInput
            style={styles.inputtextbox}
            theme={{
              colors: {
                primary: "#EEECEF",
                placeholder: "#8e8e8e",
              },
              roundness: 120,
            }}
            // theme={{ colors: { primary: "transparent" } }}

            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            autoCompleteType="email"
            underlineColor="#ECEFEE"
            autoCorrect={false}
            maxLength={30}
            left={
              <TextInput.Icon
                name={() => <Image source={require("../assets/email.png")} />}
              />
            }
          />

          <TextInput
            theme={{
              colors: {
                primary: "#EEECEF",
                placeholder: "#8e8e8e",
              },
              roundness: 120,
            }}
            style={styles.inputtextbox}
            placeholder="Password"
            underlineColor="#ECEFEE"
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            secureTextEntry={true}
            left={
              <TextInput.Icon
                name={() => (
                  <Image source={require("../assets/password.png")} />
                )}
              />
            }
          />

          <TextInput
            theme={{
              colors: {
                primary: "#EEECEF",
                placeholder: "#8e8e8e",
              },
              roundness: 120,
            }}
            style={styles.inputtextbox}
            placeholder="Retype Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            underlineColor="#ECEFEE"
            secureTextEntry={true}
            left={
              <TextInput.Icon
                name={() => (
                  <Image source={require("../assets/password.png")} />
                )}
              />
            }
          />

          {/* <Text style={styles.error}>{error}</Text> */}
        </View>

        <View
          behaviour="position"
          style={{
            flex: 4,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <RenderButton title="Next" Click={ISignup} />
          <Pressable onPress={() => props.navigation.navigate("Login")}>
            <StaticText text="Already have an account! Login" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    marginTop: 11,
    width: 270,
    backgroundColor: "#FFFFFF",
    borderRadius: 120,
    height: 50,
  },

  submitbutton: {
    margin: 10,
    fontSize: 20,
    color: "white",
    width: 200,
    borderRadius: 20,
  },

  loginlayout: {
    flex: 1,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    
  },
});

export default React.memo(InitialSignUp);
