import { ActivityIndicator, Colors } from "react-native-paper";
import { Switch, Button } from "react-native-paper";

import React, { Component, useState, useCallback, useEffect } from "react";
import ActionButton from "../Components/Actionbutton";
import StaticText from "../Components/StaticText";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Linking,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import BAheader from "../Components/BAheader";
import StaticBooksApp from "../Components/StaticBooksApp";

import { useDispatch, useSelector } from "react-redux";

import {
  Title,
  Paragraph,
  TextInput,
  Text,
  Appbar,
  BottomNavigation,
  Searchbar,
  RadioButton,
  Subheading,
  IconButton,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import { logoutUser, setUser } from "../actions";
import { color, set } from "react-native-reanimated";

const UserRoute = (props) => {
  const dispatch = useDispatch();
  const [LoadingData, setLoadingData] = useState(false);
  const [userobj, setUserobj] = useState(props.user);
  const [switchon, setSwitchon] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const user = useSelector((state) => state.user);

  let dummyuri = { uri: "dummy" };
  useEffect(() => {
    console.log(user.token);
    setLoadingData(false);
    fetch("https://booksapp2021.herokuapp.com/User", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status) {
          console.log("True");
          setUserobj(data.response.user);
          setLoadingData(true);
        } else {
          console.log(data.status);
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (LoadingData) {
    return (
      <SafeAreaView style={styles.safeareaview}>
        <View style={{ flex: 2, justifyContent: "centers" }}>
          <StaticBooksApp />
        </View>
        <View style={{ flexDirection: "column", flex: 10, marginLeft: 15 }}>
          <View style={{ flexDirection: "column", flex: 6 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Image source={require("../assets/user.png")} />
              <View style={{ flexDirection: "column", marginLeft: -20 }}>
                <StaticText text={userobj.firstname + " " + userobj.lastname} />
                {/* <Text>{userobj.firstname + " " + userobj.lastname}</Text> */}
                <View
                  style={{ borderBottomColor: "#6E7A7D", borderBottomWidth: 1 }}
                />
                <Image source={require("../assets/Line.png")} />
              </View>
              <Image
                source={require("../assets/Editdisabled.png")}
                style={{ marginRight: 25 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25,
                justifyContent: "space-around",
              }}
            >
              <Image source={require("../assets/email.png")} />
              <View style={{ flexDirection: "column", marginLeft: -20 }}>
                <StaticText text={userobj.email} />
                <View
                  style={{ borderBottomColor: "#6E7A7D", borderBottomWidth: 1 }}
                />
                <Image source={require("../assets/Line.png")} />
              </View>
              <Image
                source={require("../assets/Edit.png")}
                style={{ marginRight: 25 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25,
                justifyContent: "space-around",
              }}
            >
              <Image source={require("../assets/Phone.png")} />
              <View style={{ flexDirection: "column", marginLeft: -20 }}>
                <StaticText text={userobj.phonenumber} />
                <View
                  style={{ borderBottomColor: "#6E7A7D", borderBottomWidth: 1 }}
                />
                <Image
                  source={require("../assets/Line.png")}
                  style={{ height: 5 }}
                />
              </View>
              <Image
                source={require("../assets/Edit.png")}
                style={{ marginRight: 25 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25,
                justifyContent: "space-around",
              }}
            >
              <Image source={require("../assets/Birthday.png")} />
              <View style={{ flexDirection: "column", marginLeft: -20 }}>
                <StaticText
                  text={
                    userobj.dob.split(" ")[1] +
                    "/ " +
                    userobj.dob.split(" ")[2] +
                    "/ " +
                    userobj.dob.split(" ")[3]
                  }
                />
                <View
                  style={{ borderBottomColor: "#6E7A7D", borderBottomWidth: 1 }}
                />
                <Image
                  source={require("../assets/Line.png")}
                  style={{ height: 5 }}
                />
              </View>
              <Image
                source={require("../assets/Editdisabled.png")}
                style={{ marginRight: 25 }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 4,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginLeft: 15,
            }}
          >
            <View style={{ justifyContent: "flex-start" }}>
              <StaticText text="DarkMode" />
            </View>
            <Switch
              trackColor={{ true: "white", false: "blue" }}
              value={switchon}
              onValueChange={setSwitchon}
              style={{ marginRight: 25 }}
            />
          </View>
        </View>

        <View
          style={{
            flex: 8,
            marginLeft: 15,
            justifyContent: "center",
          }}
        >
          <View style={{ marginBottom: 6 }}>
            <Pressable
              onPress={() => props.navigation.navigate("Changepassword")}
            >
              <Button
                theme={{ roundness: 50 }}
                style={{
                  width: 215,
                  height: 40,
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
                labelStyle={{
                  fontSize: 14,
                  color: "white",
                  flexDirection: "row",
                  fontFamily: "DMSansbold",
                }}
                mode="contained"
              >
                Change Password
              </Button>
            </Pressable>
          </View>
          <View style={{ marginBottom: 6 }}>
            <ActionButton
              title="Logout"
              Click={() => dispatch(logoutUser())}
              fontS="14"
              style={{ marginTop: 15 }}
            />
          </View>
          <View style={{ marginBottom: 6 }}>
            <ActionButton title="Deactivate account" fontS="14" />
          </View>
          <View style={{ marginLeft: 2 }}>
            <StaticText text="Contact us" />
            <View style={{ marginTop: 5 }}>
              <StaticText text="Privacy policy" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={styles.activityindicator}>
          <ActivityIndicator animating={true} size={100} />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#ECEFEE",
    flexDirection: "column",
  },

  activityindicator: {
    padding: 100,
    alignSelf: "center",
  },

  submitbutton: {
    margin: 30,
    fontSize: 20,
    marginBottom: 20,
    height: 45,
    width: 250,
    alignSelf: "center",
    borderRadius: 10,
    color: "white",
  },

  logoutbutton: {
    alignSelf: "center",
    width: 250,
    fontSize: 20,
    color: "white",
    borderRadius: 12,
  },
});

export default UserRoute;
