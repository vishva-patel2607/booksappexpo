import React, { useState,useEffect } from "react";
import {
  SafeAreaView,
  View,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import Error from "../Components/Error";
import StaticText from "../Components/StaticText";
import StaticBooksApp from "../Components/StaticBooksApp";
import RenderButton from "../Components/Button";
import { useTheme } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import UserIcon from "../Svg/User";
import PasswordIcon from "../Svg/Password";
import EmailIcon from "../Svg/Email";
import { styles } from "../Styles/Initialsignup";
import { emailRegex,passwordRegex } from "../Components/Checks";


const InitialSignUp = (props) => {
  const { colors } = useTheme();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,setloading] = useState("");

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
  
  const ISignup = () => {
    if (
      username.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0 ||
      email.length === 0
    ) {
      alert("Please fill all the fields");
    } else if (!passwordRegex.test(password)) {
      alert(
        "Password must be length of 8 characters consisting of lowercase,uppercase and numbers "
      );
    } else if (!emailRegex.test(email.trim().toLowerCase())) {
      alert("Enter a valid E-mail");
      return;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      setloading(true);
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
          setloading(false);
          if (data.status) {
            
            props.navigation.navigate("Signup", {
              username: username,
              password: password,
              email: email,
            });
          } else {
            setError(data.message);
          }
        })
        .catch((error) => {
          
        });
    }
  };
  return (
    <SafeAreaView style={styles.loginlayout}>
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
        <View style={{ flex: 18, flexDirection: "column" }}>
          <View
            style={styles.containerstyle}
          >
            <TextInput
              style={styles.inputtextbox}
              theme={{
                colors: {
                  primary: colors.background,
                  placeholder: "#8e8e8e",
                },
                roundness: 120,
              }}
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              autoCapitalize="none"
              underlineColor="transparent"
              autoCompleteType="username"
              autoCorrect={false}
              maxLength={20}
              left={
                <TextInput.Icon
                  name={() =><UserIcon />}
                />
              }
            />
          </View>

          <View
            style={styles.containerstyle}
          >
            <TextInput
              style={styles.inputtextbox}
              theme={{
                colors: {
                  primary: colors.background,
                  placeholder: "#8e8e8e",
                },
                roundness: 120,
              }}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              autoCompleteType="email"
              underlineColor="transparent"
              autoCorrect={false}
              maxLength={30}
              left={
                <TextInput.Icon
                  name={() => <EmailIcon />}
                />
              }
            />
          </View>
          <View
            style={styles.containerstyle}
          >
            <TextInput
              theme={{
                colors: {
                  primary: colors.background,
                  placeholder: "#8e8e8e",
                },
                roundness: 120,
              }}
              style={styles.inputtextbox}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColor="transparent"
              maxLength={20}
              secureTextEntry={true}
              left={
                <TextInput.Icon
                  name={() => (
                   <PasswordIcon />
                  )}
                />
              }
            />
          </View>
          <View
            style={styles.containerstyle}
          >
            <TextInput
              theme={{
                colors: {
                  primary: colors.background,
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
              underlineColor="transparent"
              secureTextEntry={true}
              left={
                <TextInput.Icon
                  name={() => (
                    <PasswordIcon />
                  )}
                />
              }
            />
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
          <RenderButton title="Next" Click={ISignup} />
          <Pressable
            onPress={() => props.navigation.navigate("Login")}
            style={{ marginTop: 10 }}
          >
            <StaticText text="Already have an account! Login" />
          </Pressable>
        </View>
        <View style={{ marginTop:10 }}></View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default React.memo(InitialSignUp);
