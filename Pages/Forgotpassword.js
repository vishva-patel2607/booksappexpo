import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  Pressable,
  Image,
  StatusBar,
} from "react-native";
import Error from "../Components/Error";
import { ThemeContext } from "../Components/Theme";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions";
import { useTheme } from "@react-navigation/native";
import Backbutton from "../Components/Backbutton";
import { Button, TextInput, Text } from "react-native-paper";

const Forgotpassword = (props) => {
  
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const user = useSelector((state) => state.user);
  const {Theme} = React.useContext(ThemeContext);

  useEffect(() => {
    let unmounted = false;

    setTimeout(() => {
      if (!unmounted) {
        setError("");
      }
    }, 3000);
    return () => {
      unmounted = true;
    };
  }, [error]);
  const forgotpassword = () => {
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
          setMessage(data.message);
          Alert.alert(message, "Kindly verify", [
            { text: "Ok", onPress: () => props.navigation.navigate("Login") },
          ]);
        } else {
          console.log(data.message);
          setError(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.layout}>
      <View style={{ justifyContent: "flex-start", flex: 1 }}>
        <Pressable onPress={() => props.navigation.navigate("Login")}>
          <Backbutton />
        </Pressable>
      </View>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: textColor,
            marginLeft: 22,
            fontFamily: "DMSansbold",
          }}
        >
          Forgot Password?
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
          placeholder="Enter Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColor="transparent"
          ll
        />

        <Button
          theme={{ roundness: 120 }}
          onPress={forgotpassword}
          style={{
            width: 215,
            height: 40,
            marginTop: 25,
            alignItems: "flex-start",
          }}
          labelStyle={{
            fontSize: 16,
            color: "white",
            flexDirection: "row",
            fontFamily: "DMSansbold",
            paddingLeft: 8,
          }}
          mode="contained"
        >
          SAVE
        </Button>
        <View style={{ alignSelf: "center" }}>
          {error !== "" && (
            <View style={{ marginTop: 30 }}>
              <Error text={error} />
            </View>
          )}
        </View>
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
    marginTop: 15,
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
export default React.memo(Forgotpassword);
