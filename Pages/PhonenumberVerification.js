import React, { Component, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { Platform, StatusBar, RefreshControl } from "react-native";
import { logoutUser, setUser } from "../actions";
import {
  Title,
  Text,
  Headline,
  Card,
  Button,
  TextInput,
} from "react-native-paper";

const URL = `https://booksapp2021.herokuapp.com/`;

const PhonenumberVerification = (props) => {
  const { usernumber, phonenumber } = props.route.params;

  const [otp, setOTP] = useState(null);
  const [newphonenumber, setNewPhonenumber] = useState(phonenumber);
  const [showOTPButton, setShowOTPButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    console.log("Send OTP", usernumber, newphonenumber);
    try {
      setLoading(true);
      const response = await fetch(
        `${URL}User/Verify/Phonenumber/${usernumber}/${newphonenumber}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      // response = {
      //     "status" : True,
      //     "message" : "Message with OTP sent!"
      // },
      let jsonData = await response.json();
      console.log(jsonData);

      setLoading(false);
      alert(jsonData.message);
    } catch (e) {
      console.log(e);
    }
  };

  const verifyOTP = async () => {
    console.log("Verify OTP", usernumber, newphonenumber, otp);
    try {
      const response = await fetch(
        `${URL}/User/Verify/Phonenumber/${usernumber}/${newphonenumber}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usernumber,
            phonenumber: newphonenumber,
            otp,
          }),
        }
      );

      // response = {
      //             "status" : True,
      //             "message" : "User phone number verified"
      //           },

      const jsonData = await response.json();
      setLoading(false);

      if (jsonData.status === true) {
        alert("Your phone number has been verified!");
        // redirect it to home page
        // props.navigation.navigate("Mainpage");
      } else {
        alert(jsonData.message);
        setShowOTPButton(!showOTPButton);
      }
    } catch (e) {
      console.log("Error encountered : ", e);
    }
  };

  return (
    <SafeAreaView>
      {loading && <Text style={styles.loading}>Loading...</Text>}

      {!showOTPButton && (
        <View>
          <Title style={styles.title}>SMS will be sent to below phone number</Title>
          <TextInput
            style={styles.inputtextbox}
            label="Mobile Number"
            value={phonenumber}
            onChangeText={(number) => setNewPhonenumber(parseInt(number))}
            maxLength={10}
            left={<TextInput.Icon name="phone" />}
            keyboardType="number-pad"
          />
          <Button
            disabled={loading}
            onPress={() => {
              sendOTP();
              setShowOTPButton(true);
            }}
          >
            Send OTP
          </Button>
        </View>
      )}

      {showOTPButton && (
        <View>
          <Title style={styles.otpTitle}>Enter the OTP you have received</Title>
          <TextInput
            style={styles.inputtextbox}
            label="OTP"
            onChangeText={(otp) => setOTP(otp)}
            maxLength={6}
            minLength={6}
            left={<TextInput.Icon name="email" />}
            keyboardType="number-pad"
          />
          <Button
            disabled={loading}
            onPress={() => {
              setLoading(true);
              verifyOTP();
            }}
          >
            Verify
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputtextbox: {
    margin: 10,
  },
  title: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  loading: {
    marginHorizontal: 10,
    fontSize: 15,
    textAlign: "center",
    color: "red",
  },
  otpTitle: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default PhonenumberVerification;
