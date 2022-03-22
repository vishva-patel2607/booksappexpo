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
import Textinput from "../Components/Textinput";
import { setUser } from "../actions";

const Login = (props) => {
  const [bordercolor, setBordercolor] = useState("black");
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
      <KeyboardAvoidingView behavior="padding">
        <View style={{ flex: 4, flexDirection: "column", marginTop: 30 }}>
          <Image
            source={require("../assets/BAheader.png")}
            style={{ alignSelf: "center" }}
          />
        </View>
        <View style={{ flex: 18, flexDirection: "column", borderRadius: 120 }}>
          <TextInput
            style={styles.inputtextbox}
            theme={{
              colors: {
                primary: "#EEECEF",
                placeholder: "#8e8e8e",
              },
              roundness: 120,
            }}
            // theme={{ roundness: 20 }}
            // label="Username"
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize="none"
            autoCompleteType="username"
            underlineColor="transparent"
            maxLength={20}
            left={
              <TextInput.Icon
                name={() => (
                  <View style={{ justifyContent: "center" }}>
                    <Image source={require("../assets/user.png")} />
                  </View>
                )}
              />
            }
          />
          <View style={{ borderRadius: 120 }}>
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
              value={password}
              onChangeText={(text) => setPassword(text)}
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              maxLength={20}
              underlineColor="#ECEFEE"
              secureTextEntry={true}
              left={
                <TextInput.Icon
                  name={() => (
                    <View style={{ justifyContent: "center" }}>
                      <Image source={require("../assets/password.png")} />
                    </View>
                  )}
                />
              }
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Pressable
              onPress={() => {
                forgotpassword;
              }}
            >
              <StaticText text="   Forgot Password?" />
            </Pressable>
          </View>

          <Text style={styles.error}>{error}</Text>
        </View>

        <View
          behaviour="position"
          style={{
            flex: 4,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <RenderButton title="LogIn" Click={loginrequest} />
          {/* <Button onPress={forgotpassword}>Forgot Password</Button> */}
          {/* </View> */}

          {/* <View
          behavior="position"
          style={{
            flex: 3,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        > */}
          <Pressable onPress={() => props.navigation.navigate("InitialSignup")}>
            <StaticText text="Don't have an account? SignUp" />
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

  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,

    height: 50,
    borderRadius: 120,
    margin: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
});

export default React.memo(Login);
