import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
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
import { TextInput, Text } from "react-native-paper";
import { ThemeContext } from "../Components/Theme";
import StaticText from "../Components/StaticText";
import { useDispatch } from "react-redux";
import Error from "../Components/Error";
import { setUser } from "../actions";
import StaticBooksApp from "../Components/StaticBooksApp";

const Login = (props) => {
  const { colors } = useTheme();
  const [bordercolor, setBordercolor] = useState("black");
  const { setTheme, Theme } = React.useContext(ThemeContext);
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
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop:
          Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
        backgroundColor: colors.background,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      >
        <View
          style={{
            flex: 4,
            flexDirection: "column",
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <StaticBooksApp />
        </View>
        <View
          style={{ flex: 18, flexDirection: "column", borderColor: "#ECEFEE" }}
        >
          <View style={{
        height: 59,
        overflow:'hidden',
        
        }}>
          <TextInput
            style={styles.inputtextbox}
            theme={{
              colors: {
                primary: colors.background,
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
          </View>
          <View style={{overflow:'hidden',height:59}} >
            <TextInput
              theme={{
                colors: {
                  primary: colors.background,
                  underlineColor:'transparent'
                  
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
              underlineColor="transparent"
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
                props.navigation.navigate("ForgotPassword");
              }}
            >
              <StaticText text="   Forgot Password?" />
            </Pressable>
          </View>

          <View style={{ alignSelf: "center" }}>
            {error !== "" && (
              <View style={{ marginTop: 30 }}>
                <Error text={error} />
              </View>
            )}
          </View>
        </View>

        <View
          behaviour="position"
          style={{
            flex: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RenderButton title="LogIn" Click={loginrequest} />
          <Pressable
            onPress={() => props.navigation.navigate("InitialSignup")}
            style={{ marginTop: 5 }}
          >
            <StaticText text="Don't have an account? SignUp" />
          </Pressable>
        </View>
        <View style={{ flex: 0.8 }}></View>
      </KeyboardAvoidingView>
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
    width: 270,
    backgroundColor: "#FFFFFF",
    borderRadius: 120,
    height: 50,
    overflow: 'hidden',
  },
});

export default React.memo(Login);
