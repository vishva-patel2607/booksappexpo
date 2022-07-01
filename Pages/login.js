import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import {
  SafeAreaView,
  StatusBar,
  View,
  Alert,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import RenderButton from "../Components/Button";
import { TextInput } from "react-native-paper";
import StaticText from "../Components/StaticText";
import { useDispatch } from "react-redux";
import Error from "../Components/Error";
import { setUser } from "../actions";
import StaticBooksApp from "../Components/StaticBooksApp";
import UserIcon from "../Svg/User";
import PasswordIcon from "../Svg/Password";
import { styles } from "../Styles/Loginstyles";

const Login = (props) => {
  const { colors } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [loading,setloading] = useState("");
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  //const selector = useSelector();

  useEffect(() => {
    let unmounted = false;

    setTimeout(() => {
      if(!unmounted){
      setError("")
      }
    },3000)
    return () => {
      unmounted = true;
    }

  },[error])
  

  loginrequest = () => {
    setloading(true);
    if (username !== "" && password !== "") {
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
          setloading(false);
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

            
            if (data.message === "User is not verified") {
              setToken(data.response.token);
              setEmail(data.response.email);
              
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
              setloading(false);
              setError(data.message);
              
            }
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
    else
    {
      alert("Please fill all the fields");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop:
        Platform.OS === "android" ? StatusBar.currentHeight  : 0,
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
               
              },
              roundness: 120,
            }}
            
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
                    <UserIcon />
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
                      <PasswordIcon />
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
            justifyContent: "flex-end",
          }}
        >
          <RenderButton title="LogIn" Click={loginrequest} />
          <Pressable
            onPress={() => props.navigation.navigate("InitialSignup")}
            style={{ marginTop: 10 }}
          >
            <StaticText text="Don't have an account? SignUp" />
          </Pressable>
        </View>
        <View style={{ marginTop:10}}></View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default React.memo(Login);
