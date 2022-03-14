import React, { Component, useState, useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Platform, StatusBar, RefreshControl } from "react-native";
import { logoutUser, setUser } from "../actions";
import { Title, Text, Headline, Card, Button } from "react-native-paper";
import Actions from "../Components/Actions";
import Horizontalscrollview from "./Horizontalscrollview";
import { useDispatch, useSelector } from "react-redux";
import BookConditions from "./BookConditions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BAheader from "../Components/BAheader";
import Constants from "expo-constants";
import Newbooks from "../Components/Newbooks";
import * as Notifications from "expo-notifications";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};


const HomeRoute = (props) => {
  const [devicePushToken, setDevicePushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  const [lentbooks, setLentbooks] = useState([]);
  const [borrowedbooks, setBorrowedbooks] = useState([]);
  const [boughtbooks, setBoughtbooks] = useState([]);
  const [pickupbooks, setPickupbooks] = useState([]);
  const [dropoffbooks, setDropoffbooks] = useState([]);
  const [previoustransactions, setPrevioustransactions] = useState([]);
  const [soldbooks, setSoldbooks] = useState([]);
  const [count, setCount] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setCount(count + 1);
  };
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  async function requestPermissionsAsync() {
    return await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
  }


  let lent =
    lentbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={lentbooks}
        pagename="B"
        navigation={props.navigation}
      />
    ) : (
      <Newbooks text="Some dummy text" />
    );

  let borrowed =
    borrowedbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={borrowedbooks}
        pagename="B"
        navigation={props.navigation}
      />
    ) : (
      <Newbooks text="Some dummy text" />
    );

  let dropoff =
    dropoffbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={dropoffbooks}
        pagename="B"
        navigation={props.navigation}
      />
    ) : (
      <Newbooks text="Some dummy text" />
    );

  let pickup =
    pickupbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={pickupbooks}
        pagename="B"
        navigation={props.navigation}
      />
    ) : (
      <Newbooks text="Some dummy text" />
    );

  let sold =
    soldbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={soldbooks}
        pagename="B"
        navigation={props.navigation}
      />
    ) : (
      <Newbooks text="Some dummy text" />
    );

  let pt =
    previoustransactions.length !== 0 ? (
      <Horizontalscrollview
        booklist={previoustransactions}
        pagename="B"
        navigation={props.navigation}
      />
    ) : (
      <Newbooks text="Some dummy text" />
    );

  let bought =
    boughtbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={boughtbooks}
        pagename="B"
        navigation={props.navigation}
      />
    ) : (
      <Newbooks text="Some dummy text" />
    );

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => checkToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const checkToken = async (token) => {
    setDevicePushToken(token);
    try {
      const phonetoken = await AsyncStorage.getItem("@storage_token");
      if (phonetoken !== null) {
        console.log("token exists", phonetoken);
      } else {
        console.log(phonetoken);
        if (token !== undefined && devicePushToken.length !== 0) {
          await AsyncStorage.setItem("@storage_token", token);
          console.log(user.accountNumber, devicePushToken, Platform.OS);
          fetch("https://booksapp2021.herokuapp.com/Notification/Subscribe", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-access-token": user.token,
            },
            body: JSON.stringify({
              usernumber: user.accountNumber,
              devicepushtoken: devicePushToken,
              platform: Platform.OS,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              if (data.status) {
                setMessage(data.message);
              } else {
                console.log(data);
                setMessage(data.message);
              }
            });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getDevicePushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Pickups", {
      method: "GET",
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
          setPickupbooks(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setPickupbooks([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Borrowed", {
      method: "GET",
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
          setBorrowedbooks(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setBorrowedbooks([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Sold", {
      method: "GET",
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
          setSoldbooks(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });


    setSoldbooks([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Bought", {
      method: "GET",
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
          setBoughtbooks(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setBoughtbooks([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Lent", {
      method: "GET",
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
          setLentbooks(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLentbooks([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Previoustransactions", {
      method: "GET",
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
          setPrevioustransactions(data.response.books);
          console.log("Pr", data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          } else {
            console.log(data.message);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setPrevioustransactions([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Dropoffs", {
      method: "GET",
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
          setDropoffbooks(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          } else {
            console.log(data.message);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setDropoffbooks([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    console.log("refreshing from edit book");
    setRefreshing(props.route.params?.refreshing);
    setCount(count + 1);
  }, [props.route.params?.refreshing]);
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

        <BAheader />
        <BookConditions />
        <Actions text="DROPOFFS" length={dropoffbooks.length} />
        <View style={styles.cardview}>{dropoff}</View>
        <Actions text="PICKUPS" length={pickupbooks.length} />
        <View style={styles.cardview}>{pickup}</View>
        <Actions text="LENT" length={lentbooks.length} />
        <View style={styles.cardview}>{lent}</View>
        <Actions text="BORROWED" length={borrowedbooks.length} />
        <View style={styles.cardview}>{borrowed}</View>
        <Actions text="SOLD" length={soldbooks.length} />
        <View style={styles.cardview}>{sold}</View>
        <Actions
          text="PREVIOUS TRANSACTIONS"
          length={previoustransactions.length}
        />
        <View style={styles.cardview}>{pt}</View>
        <Actions text="BOUGHT" length={boughtbooks.length} />
        <View style={styles.cardview}>{bought}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#ECEFEE",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  submitbutton: {
    fontSize: 18,
    height: 40,
    width: 300,
    alignSelf: "center",
    borderRadius: 10,
    color: "white",
  },
  statistics: {
    textAlign: "left",
    marginTop: 20,
  },
  cardview: {
    flex: 1,
  },
  cardscroll: {
    flex: 1,
    height: "100%",
    margin: 10,
  },
  cardcontainer: {
    backgroundColor: "#FFFFFF",
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  cardcontent: {
    flex: 4,
    height: 100,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  cardimage: {
    flex: 1,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginRight: 5,
  },
});

export default React.memo(HomeRoute);
