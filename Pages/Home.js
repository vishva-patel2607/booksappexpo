import React, { Component, useState, useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Platform, StatusBar, RefreshControl } from "react-native";
import { logoutUser, setUser } from "../actions";
import { Title, Text, Headline, Card, Button } from "react-native-paper";

import Horizontalscrollview from "./Horizontalscrollview";
import { useDispatch, useSelector } from "react-redux";
import BookConditions from "./BookConditions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
var data = [
  {
    book_name: "Sapiens",
    book_author: "James Clear",
    book_year: "1992",
    book_distance: 5.2,
    book_condition: "great",
    book_img:
      "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
    book_price: "Rs 150",
    book_status: "Uploaded!, Please submit to shop",
    book_transaction_code: "01",
  },
  {
    book_name: "Guns Germs and Steel written by james clear",
    book_author: "James Clear",
    book_year: "2002",
    book_distance: 10,
    book_condition: "good",
    book_img:
      "https://images-na.ssl-images-amazon.com/images/I/81RdveuYXWL.jpg",
    book_price: "Rs 200",
    book_status: "Book In Shop",
    book_transaction_code: "02",
  },
  {
    book_name: "Sapiens",
    book_author: "James Clear",
    book_year: "1992",
    book_distance: 11,
    book_condition: "bad",
    book_img:
      "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
    book_price: "Rs 250",
    book_status: "Book In Shop",
    book_transaction_code: "03",
  },
  {
    book_name: "Guns Germs and Steel",
    book_author: "James Clear",
    book_year: "1992",
    book_distance: 5.2,
    book_condition: "great",
    book_img:
      "https://images-na.ssl-images-amazon.com/images/I/81RdveuYXWL.jpg",
    book_price: "Rs 300",
    book_status: "Uploaded!, Please submit to shop",
    book_transaction_code: "04",
  },
  {
    book_name: "Guns Germs and steel",
    book_author: "James Clear",
    book_year: "1992",
    book_distance: 5.2,
    book_condition: "great",
    book_img:
      "https://images-na.ssl-images-amazon.com/images/I/81RdveuYXWL.jpg",
    book_price: "Rs 350",
    book_status: "Book In Shop",
    book_transaction_code: "05",
  },
];

const HomeRoute = (props) => {
  const [devicePushToken, setDevicePushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  const [Bookdata, setBookData] = useState([]);
  const [Pickedupbooks, setPickedupbooks] = useState([]);
  const [Removedbooks, setRemovedbooks] = useState([]);
  const [Pickupdata, setPickupdata] = useState([]);
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

  let removedbooks =
    Removedbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={Removedbooks}
        pagename="RemovedBookScreen"
        navigation={props.navigation}
      />
    ) : (
      <View
        style={{
          height: 90,
          margin: 10,
          backgroundColor: "#EDEDF0",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Headline>No books currently removed.</Headline>
      </View>
    );
  let booksaddedtopickup =
    Pickupdata.length !== 0 ? (
      <Horizontalscrollview
        booklist={Pickupdata}
        pagename="Booksaddedtopickup"
        navigation={props.navigation}
      />
    ) : (
      <View
        style={{
          height: 90,
          margin: 10,
          backgroundColor: "#EDEDF0",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Headline>No books added to pickedup.</Headline>
      </View>
    );
  let bookspickedup =
    Pickedupbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={Pickedupbooks}
        pagename="Booksaddedtopickup"
        navigation={props.navigation}
      />
    ) : (
      <View
        style={{
          height: 100,
          margin: 10,
          backgroundColor: "#EDEDF0",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Headline>No books picked up.</Headline>
      </View>
    );
  let uploadedbook =
    Bookdata.length !== 0 ? (
      <Horizontalscrollview
        booklist={Bookdata}
        pagename="UploadedBooks"
        navigation={props.navigation}
      />
    ) : (
      <View
        style={{
          height: 90,
          margin: 10,
          backgroundColor: "#EDEDF0",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Headline>No books uploaded.</Headline>
        <Button
          mode="contained"
          style={{ marginTop: 15 }}
          onPress={() => {
            props.navigation.navigate("Upload");
          }}
        >
          Upload one
        </Button>
      </View>
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
    fetch("https://booksapp2021.herokuapp.com/Book/Pickedupbooks/Added", {
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
          setPickupdata(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setPickupdata([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Pickedupbooks", {
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
          console.log(data.response.books);
          setPickedupbooks(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setPickedupbooks([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Uploadedbooks", {
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
          setBookData(data.response.books);

          console.log(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setBookData([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Pickedupbooks/Removed", {
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
          setRemovedbooks(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setRemovedbooks([]);
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
        <BookConditions />

        <Card style={{ marginTop: 20, borderRadius: 35 }}>
          <Card.Content>
            <Title>Books Uploaded:- {Bookdata.length}</Title>
            <Title style={{ paddingTop: 10 }}>
              Books added to Pickup:- {Pickupdata.length}
            </Title>
            <Title style={{ paddingTop: 10 }}>
              Books Pickedup:- {Pickedupbooks.length}
            </Title>
            <Title style={{ paddingTop: 10 }}>
              Books removed from Pickup:- {Removedbooks.length}
            </Title>
          </Card.Content>
        </Card>
        <Title style={styles.statistics}>Uploaded Books</Title>
        <Text></Text>
        <View style={styles.cardview}>{uploadedbook}</View>

        <Title style={styles.statistics}>Books added to Pickup</Title>
        <Text></Text>

        <View style={styles.cardview}>{booksaddedtopickup}</View>

        <Title style={styles.statistics}>Books Picked up by the user</Title>
        <Text></Text>
        <View style={styles.cardview}>{bookspickedup}</View>

        <Title style={styles.statistics}>Books Removed from pickup</Title>
        <Text></Text>
        <View style={styles.cardview}>{removedbooks}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
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
