import { ActivityIndicator } from "react-native-paper";
import { Switch, Button } from "react-native-paper";
import { ProgressBar } from "react-native-paper";
import { ThemeContext } from "../Components/Theme";
import React, { useState, useEffect } from "react";
import ActionButton from "../Components/Actionbutton";
import StaticText from "../Components/StaticText";
import UserIcon from "../Svg/Useruser";
import PhoneIcon from "../Svg/Phoneuser";
import EmailIcon from "../Svg/Emailuser";
import Birthday from "../Svg/Birthday";
import Edit from "../Svg/Edit";
import UserProgress from "../Components/ProgressBar";
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import StaticBooksApp from "../Components/StaticBooksApp";
import BooksApp from "../Components/BooksApp";

import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../actions";

const UserRoute = (props) => {
  const { setTheme, Theme,textcolor,setTextColor } = React.useContext(ThemeContext);
  const dispatch = useDispatch();
  const [LoadingData, setLoadingData] = useState(false);
  const [userobj, setUserobj] = useState(props.user);
  const [switchon, setSwitchon] = useState(Theme === "Light" ? false : true);
  const user = useSelector((state) => state.user);

  const switchchanged = () => {
    setSwitchon(!switchon);
    setTheme(Theme === "Light" ? "Dark" : "Light");
    setTextColor(textcolor === "#0D1936"? "#ECEFEE" : "#0D1936")
  };
  useEffect(() => {
    
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
        
        if (data.status) {
          
          setUserobj(data.response.user);
          setLoadingData(true);
        } else {
          
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch((error) => {
        
      });
  }, []);

  if (LoadingData) {
    return (
      <SafeAreaView
        style={[
          styles.safeareaview,
          { backgroundColor: Theme === "Light" ? "#ECEFEE" : "#0D1936" },
        ]}
      >
        <View style={{ flex: 2, justifyContent: "flex-start" }}>
          <BooksApp />
        </View>
        <View style={{ flexDirection: "column", flex: 10, marginLeft: 5 }}>
          <View style={{ flexDirection: "column", flex: 5 }}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{ width: "75%", flexDirection: "row", marginLeft: 15 }}
              >
                <UserIcon />
                <View style={{ flexDirection: "column", marginLeft: 20 }}>
                  <StaticText
                    text={userobj.firstname + " " + userobj.lastname}
                  />
                  {/* <Text>{userobj.firstname + " " + userobj.lastname}</Text> */}
                  <View
                    style={{
                      borderBottomColor: "#6E7A7D",
                      borderBottomWidth: 1,
                    }}
                  />
                  <Image source={require("../assets/Line.png")} />
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "75%",
                  flexDirection: "row",
                  marginLeft: 15,
                  marginTop: 25,
                }}
              >
                <EmailIcon />
                <View style={{ flexDirection: "column", marginLeft: 20 }}>
                  <StaticText text={userobj.email} />
                  <View
                    style={{
                      borderBottomColor: "#6E7A7D",
                      borderBottomWidth: 1,
                    }}
                  />
                  <Image source={require("../assets/Line.png")} />
                </View>
              </View>
              <View style={{ alignSelf: "flex-end", marginLeft: 15 }}>
                <Pressable
                  onPress={() => {
                    props.navigation.navigate("EditEmail");
                  }}
                >
                  <Edit />
                </Pressable>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "75%",
                  flexDirection: "row",
                  marginLeft: 15,
                  marginTop: 25,
                }}
              >
                <PhoneIcon />
                <View style={{ flexDirection: "column", marginLeft: 20 }}>
                  <StaticText text={userobj.phonenumber} />
                  <View
                    style={{
                      borderBottomColor: "#6E7A7D",
                      borderBottomWidth: 1,
                    }}
                  />
                  <Image source={require("../assets/Line.png")} />
                </View>
              </View>
              <View style={{ alignSelf: "flex-end", marginLeft: 15 }}>
                <Pressable
                  onPress={() => {
                    props.navigation.navigate("EditPhone");
                  }}
                >
                  <Edit />
                </Pressable>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "75%",
                  flexDirection: "row",
                  marginLeft: 15,
                  marginTop: 25,
                }}
              >
                <Birthday />
                <View style={{ flexDirection: "column", marginLeft: 20 }}>
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
                    style={{
                      borderBottomColor: "#6E7A7D",
                      borderBottomWidth: 1,
                    }}
                  />
                  <Image source={require("../assets/Line.png")} />
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginHorizontal: 15,
              paddingHorizontal: 5,
            }}
          >
            <View style={{ justifyContent: "flex-start", marginTop: 10 }}>
              <StaticText text="DarkMode" />
            </View>
            <Switch
              trackColor={{ true: "white", false: "blue" }}
              value={switchon}
              onValueChange={switchchanged}
              style={{ marginRight: 10 }}
            />
          </View>
          <UserProgress  userscore={userobj.userscore/100}/>
        </View>

        <View
          style={{
            flex: 8,
            marginLeft: 15,
            justifyContent: "center",
          }}
        >
          <View style={{ marginBottom: 6 }}>
            <ActionButton
              title="Change Password"
              Click={() => props.navigation.navigate("Changepassword")}
              fontS="14"
              style={{ marginTop: 15 }}
            />
          </View>
          <View style={{ marginBottom: 6 }}>
            <ActionButton
              title="Logout"
              Click={() => dispatch(logoutUser())}
              fontS="14"
              style={{ marginTop: 15 }}
            />
          </View>
          {/* <View style={{ marginBottom: 6 }}>
            <ActionButton title="Deactivate account" fontS="14" />
          </View> */}
          <View style={{ marginLeft: 5, marginTop: 10 }}>
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
    // backgroundColor: "#ECEFEE",
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

export default React.memo(UserRoute);
