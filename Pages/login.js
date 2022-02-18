import React, { Component, useState, useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, Alert } from "react-native";

import { Button, Title, TextInput, Text } from "react-native-paper";

import { useDispatch } from "react-redux";

import { setUser } from "../actions";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  //const selector = useSelector();

  forgotpassword = () => {
    if (username !== "") {
      fetch("https://booksapp2021.herokuapp.com/User/Forgotpassword", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            Alert.alert(
              "Password reset link to change you password has been sent to your registered email",
              "Please Check!"[
                {
                  text: "OK",
                }
              ]
            );
          } else {
            setError(data.message);
          }
        });
    }
  };
  loginrequest = () => {
    // let tokenvalue = "";
    // var truevalue = true;
    if (username !== "" && password !== "") {
      console.log("API");

      fetch("https://booksapp2021.herokuapp.com/User/Login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          username: username,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            setError(data.message);
            dispatch(
              setUser(
                data.response.username,
                data.response.usernumber,
                data.response.token,
                data.status
              )
            );
          } else {
            console.log(data);
            if (data.message === "User is not verified") {
              setToken(data.response.token);
              setEmail(data.response.email);
              console.log(
                data.response.email,
                data.response.token,
                "User is not verified"
              );
              Alert.alert(
                "Verification email has been sent to your email",
                "Please Check!"[
                  {
                    text: "OK",
                    // onPress : props.navigation.navigate('EmailVerification',{ token: token,email:email})
                  }
                ]
              );
              setError(
                data.message +
                  " Verification Email has been sent to " +
                  data.response.email
              );
            } else {
              setError(data.message);
              console.log(data.message);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.loginlayout}>
      <View style={{ flex: 1 }}>
        <Title style={styles.textbox}>Log in</Title>

        <TextInput
          style={styles.inputtextbox}
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          autoCompleteType="username"
          autoCorrect={false}
          maxLength={20}
        />

        <TextInput
          style={styles.inputtextbox}
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          maxLength={20}
          secureTextEntry={true}
        />
        <Button
          mode="contained"
          style={styles.submitbutton}
          labelStyle={styles.submitbutton}
          onPress={loginrequest}
        >
          Log in
        </Button>
        <Button onPress={forgotpassword}>Forgot Password</Button>
        <Text style={styles.error}>{error}</Text>
      </View>

      <View>
        <Button onPress={() => props.navigation.navigate("Signup")}>
          Sign Up
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

  loginlayout: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default React.memo(Login);
