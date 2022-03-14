import React, { Component, useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import RenderButton from "../Components/Button";
import { TextInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import { setUser } from "../actions";

const Signup = (props) => {
  const [username, setUsername] = useState(props.route.params.username);
  const [email, setEmail] = useState(props.route.params.email);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState(props.route.params.password);
  const [date, setDate] = useState("");
  const [trigger, setTrigger] = useState(false);

  const showDatePicker = () => {
    setTrigger(true);
    console.log(trigger);
  };

  const ref_day = useRef();
  const ref_month = useRef();
  const ref_year = useRef();

  const SignUpRequest = () => {
    var emailRegex = new RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    var passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
    );

    if (firstname.length === 0) {
      alert("Enter your Firstname");
      return;
    } else if (lastname.length === 0) {
      alert("enter your Lastname");
      return;
    } else if (username.length === 0) {
      alert("Enter your username!");
      return;
    } else if (
      email.length === 0 ||
      !emailRegex.test(email.trim().toLowerCase())
    ) {
      alert("Enter a valid E-mail");
      return;
    } else if (phoneNumber.length === 0 || !/^\d+$/.test(phoneNumber)) {
      alert("Check your Phonenumber");
      return;
    } else if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
      alert("Enter valid date");
      return;
    } else {
      fetch("https://booksapp2021.herokuapp.com/User/Signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          username: username.trim().toLowerCase(),
          email: email.trim().toLowerCase(),
          firstname: firstname,
          lastname: lastname,
          year: year,
          month: month,
          day: day,
          phonenumber: phoneNumber,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            console.log(data.message);
            // when data comes extract usernumber and phone number ad=nd redirect user to phonenumberVerification with props
            Alert.alert(
              "Verification email has been sent to your email",
              "Please Verify."[
                {
                  text: "OK",
                }
              ]
            );
          } else {
            console.log(data.message);
          }

          props.navigation.navigate("PhonenumberVerification", {
            // request will come then extract the data
            usernumber: data.response.user.usernumber,
            phonenumber: data.response.user.phonenumber,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleChangeDay = (value) => {
    if (/^\d+$/.test(value) || value == "") {
      setDay(value);
      if (value.length === 2) {
        ref_year.current.focus();
      }
    }
  };

  const handleChangeMonth = (value) => {
    if (/^\d+$/.test(value) || value == "") {
      setMonth(value);
      if (value.length === 2) {
        ref_day.current.focus();
      }
    }
  };

  const handleChangeYear = (value) => {
    if (/^\d+$/.test(value) || value == "") {
      setYear(value);
      if (value.length === 2) {
        ref_year.current.focus();
      }
    }
  };
  return (
    <SafeAreaView style={styles.loginlayout}>
      <KeyboardAvoidingView behavior="padding">
        <View style={{ flex: 1, alignSelf: "flex-start" }}>
          <Pressable onPress={() => props.navigation.navigate("InitialSignup")}>
            <Image
              source={require("../assets/Backbutton.png")}
              style={{ marginTop: 20 }}
            />
          </Pressable>
        </View>
        <View style={{ flex: 2, marginTop: 30 }}>
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
            placeholder="FirstName"
            value={firstname}
            onChangeText={(text) => setFirstname(text)}
            autoCapitalize="none"
            autoCompleteType="username"
            autoCorrect={false}
            underlineColor="#ECEFEE"
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
            placeholder="Lastname"
            value={lastname}
            onChangeText={(text) => setLastname(text)}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColor="#ECEFEE"
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
            placeholder="Phonenumber"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            autoCapitalize="none"
            autoCompleteType="username"
            autoCorrect={false}
            underlineColor="#ECEFEE"
            maxLength={20}
            left={
              <TextInput.Icon
                name={() => <Image source={require("../assets/Phone.png")} />}
              />
            }
          />

          <View style={{ flexDirection: "row", marginTop: 11 }}>
            <TextInput
              style={styles.datetextbox}
              theme={{
                colors: {
                  primary: "#EEECEF",
                  placeholder: "#8e8e8e",
                },
                roundness: 120,
              }}
              underlineColor="#ECEFEE"
              placeholder="MM"
              value={month}
              onChangeText={(text) => handleChangeMonth(text)}
              aHiutoCorrect={false}
              maxLength={2}
              // left={<TextInput.Icon name="calendar-month" />}
              ref={ref_month}
              keyboardType="number-pad"
            />

            <TextInput
              style={styles.datetextbox}
              theme={{
                colors: {
                  primary: "#EEECEF",
                  placeholder: "#8e8e8e",
                },
                roundness: 120,
              }}
              placeholder="DD"
              value={day}
              onChangeText={(text) => handleChangeDay(text)}
              autoCorrect={false}
              maxLength={2}
              underlineColor="#ECEFEE"
              // left={<TextInput.Icon name="calendar-today" />}
              ref={ref_day}
              keyboardType="number-pad"
            />

            <TextInput
              style={styles.yeartextbox}
              placeholder="YYYY"
              underlineColor="#ECEFEE"
              theme={{
                colors: {
                  primary: "#EEECEF",
                  placeholder: "#8e8e8e",
                },
                roundness: 120,
              }}
              value={year}
              onChangeText={(text) => handleChangeYear(text)}
              autoCorrect={false}
              maxLength={4}
              // left={<TextInput.Icon name="calendar-blank" />}
              ref={ref_year}
              keyboardType="number-pad"
            />
          </View>

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
          <RenderButton title="SignUp" Click={SignUpRequest} />
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

  datetextbox: {
    borderRadius: 120,
    flex: 4,
    height: 50,
    backgroundColor: "#FFFFFF",
    marginRight: 10,
  },

  yeartextbox: {
    borderRadius: 120,
    flex: 5,
    height: 50,
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#ECEFEE",
  },
});

export default React.memo(Signup);
