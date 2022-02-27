import { ActivityIndicator, Colors } from "react-native-paper";
import { Avatar } from "react-native-paper";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Linking,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Title, Subheading } from "react-native-paper";
import { logoutUser } from "../actions";

const UserRoute = (props) => {
  const dispatch = useDispatch();
  const [LoadingData, setLoadingData] = useState(false);
  const [userobj, setUserobj] = useState(props.user);
  const user = useSelector((state) => state.user);

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
        <View
          style={{
            flex: 14,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Avatar.Text
            size={80}
            label={userobj.firstname[0] + userobj.lastname[0]}
            color="white"
          />
          <Title style={{ marginTop: 15 }}>
            {userobj.firstname + " " + userobj.lastname}
          </Title>
          <Subheading style={{ marginTop: 15 }}>{userobj.username}</Subheading>
          <Subheading style={{ marginTop: 15 }}>📧 {userobj.email}</Subheading>
          <View
            style={{ flexDirection: "row", marginTop: 15, alignSelf: "center" }}
          >
            <Subheading style={{ justifyContent: "center" }}>
              📞 {userobj.phonenumber}
            </Subheading>

            <View style={{ marginLeft: 20, justifyContent: "center" }}>
              <Avatar.Icon
                size={20}
                icon="pen"
                onPress={() => {
                  props.navigation.navigate("EditPhone");
                }}
              />
            </View>
          </View>
          <Subheading style={{ marginTop: 15 }}>
            🎂{" "}
            {userobj.dob.split(" ")[1] +
              " " +
              userobj.dob.split(" ")[2] +
              " " +
              userobj.dob.split(" ")[3]}
          </Subheading>
          <Button
            mode="contained"
            style={styles.submitbutton}
            labelStyle={styles.submitbutton}
            onPress={() => {
              props.navigation.navigate("Changepassword");
            }}
          >
            Change Password
          </Button>
          <Button
            mode="contained"
            style={styles.logoutbutton}
            labelStyle={styles.logoutbutton}
            onPress={() => dispatch(logoutUser())}
          >
            Log out
          </Button>
        </View>

        <View
          style={{ flex: 5, justifyContent: "flex-end", alignItems: "center" }}
        >
          <Button>© BooksAppExpo.</Button>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Button
            onPress={() => {
              Linking.openURL("https://google.com");
            }}
          >
            Privacy Policy
          </Button>
          <Button
            onPress={() => {
              Linking.openURL("https://google.com");
            }}
          >
            {" "}
            Contact Us
          </Button>
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
