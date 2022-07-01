import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  SafeAreaView,
  View,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import { ThemeContext } from "./Theme";
import Queryinfo from "./Queryinfo";
import MapView, { Marker } from "react-native-maps";
import Backbutton from "./Backbutton";
import { Text, Button } from "react-native-paper";
import * as Location from "expo-location";
import { getPreciseDistance } from "geolib";
import {  useSelector } from "react-redux";

const Alertbookscreen = (props) => {
  const { textcolor } = React.useContext(ThemeContext);
  const [distance, setDistance] = useState("");
  const { book } = props.route.params;
  const user = useSelector((state) => state.user);
  let buttontype =
    book.book_transaction_default === "BORROWED_BOOK_NOT_RETURNED"
      ? "Claim lost"
      : "Remove";



  const markaslost = () => {
    fetch(`https://booksapp2021.herokuapp.com/Book/Borrowed/Lost`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify({
        book_id: book.book_id,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          Alert.alert("Success", data.message, [
            {
              text: "Ok",
              onPress: () =>
                props.navigation.navigate("Mainpage", {
                  screen: "Home",
                  params: { refreshing: true },
                }),
            },
          ]);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          } else {
            Alert.alert("Note", data.message, [
              {
                text: "Ok",
              },
            ]);
          }
        }
      });
  };

  const removebook = () => {
    if (book.usernumber === user.accountNumber) {
      if (book.book_transaction_type === "lend") {
        fetch(`https://booksapp2021.herokuapp.com/Book/Lent/Remove`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": user.token,
          },
          body: JSON.stringify({
            book_id: book.book_id,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.status) {
              Alert.alert("Success", data.message, [
                {
                  text: "Ok",
                  onPress: () =>
                    props.navigation.navigate("Mainpage", {
                      screen: "Home",
                      params: { refreshing: true },
                    }),
                },
              ]);
            } else {
              if (data.message === "Could not verify") {
                dispatch(logoutUser());
              } else {
                Alert.alert("Note", data.message, [
                  {
                    text: "Ok",
                  },
                ]);
              }
            }
          });
      } else {
        fetch(`https://booksapp2021.herokuapp.com/Book/Sold/Remove`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": user.token,
          },
          body: JSON.stringify({
            book_id: book.book_id,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.status) {
              Alert.alert("Success", data.message, [
                {
                  text: "Ok",
                  onPress: () =>
                    props.navigation.navigate("Mainpage", {
                      screen: "Home",
                      params: { refreshing: true },
                    }),
                },
              ]);
            } else {
              if (data.message === "Could not verify") {
                dispatch(logoutUser());
              } else {
                Alert.alert("Note", data.message, [
                  {
                    text: "Ok",
                  },
                ]);
              }
            }
          });
      }
    } else {
      if (book.book_transaction_type === "lend") {
        
        fetch(`https://booksapp2021.herokuapp.com/Book/Borrowed/Remove`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": user.token,
          },
          body: JSON.stringify({
            book_id: book.book_id,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.status) {
              Alert.alert("Success", data.message, [
                {
                  text: "Ok",
                  onPress: () =>
                    props.navigation.navigate("Mainpage", {
                      screen: "Home",
                      params: { refreshing: true },
                    }),
                },
              ]);
            } else {
              if (data.message === "Could not verify") {
                dispatch(logoutUser());
              } else {
                Alert.alert("Note", data.message, [
                  {
                    text: "Ok",
                  },
                ]);
              }
            }
          });
      } else {
        fetch(`https://booksapp2021.herokuapp.com/Book/Bought/Remove`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": user.token,
          },
          body: JSON.stringify({
            book_id: book.book_id,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.status) {
              Alert.alert("Success", data.message, [
                {
                  text: "Ok",
                  onPress: () =>
                    props.navigation.navigate("Mainpage", {
                      screen: "Home",
                      params: { refreshing: true },
                    }),
                },
              ]);
            } else {
              if (data.message === "Could not verify") {
                dispatch(logoutUser());
              } else {
                Alert.alert("Note", data.message, [
                  {
                    text: "Ok",
                  },
                ]);
              }
            }
          });
      }
    }
  };

  const setLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    let lat = loc.coords.latitude;
    let long = loc.coords.longitude;
    const DISTANCE =
      getPreciseDistance(
        { latitude: lat, longitude: long },
        {
          latitude: book.book_store_info.store_latitude,
          longitude: book.book_store_info.store_longitude,
        }
      ) / 1000;

    setDistance(DISTANCE.toString().slice(0, 4));
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setLocation();
    }
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={{ justifyContent: "flex-start" }}>
        <Pressable onPress={() => props.navigation.navigate("Home")}>
          <Backbutton />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: 14,
          marginRight: 12,
          marginTop: 37,
        }}
      >
        {/* <View style={{marginLeft:12,backgroundColor:'black'}}> */}
        <Queryinfo
          bookname={book.book_name}
          bookauthor={book.book_author}
          bookcondition={book.book_condition}
          bookprice={book.book_price}
          bookyear={book.book_year}
        />
        <View>
          <Image
            source={{ uri: book.book_img }}
            resizeMode="cover"
            style={{ height: 130, width: 100, borderRadius: 10 }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginHorizontal: 12,
          marginVertical: 12,
        }}
      >
        <View
          style={{
            flex: 2,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              borderWidth: 2,
              paddingVertical: 6,
              fontWeight: "500",
              borderColor: "#0036F4",
              borderRadius: 18,
              textAlign: "center",
              fontFamily: "DMSans",
              color: textcolor,
            }}
          >
            {distance} km(s)
          </Text>
        </View>
        <View style={{ flex: 5 }}>
          <Text
            style={{
              borderWidth: 2,
              color: textcolor,
              paddingVertical: 6,
              fontWeight: "700",
              borderColor: "#0036F4",
              borderRadius: 18,
              textAlign: "center",
              fontFamily: "DMSans",
            }}
          >
            {book.book_store_info.store_name}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: 14,

          marginTop: 9,
        }}
      >
        <Text style={[styles.textStyle, { color: textcolor }]}>
          {book.book_store_info.store_incharge}
        </Text>
        <Text style={[styles.textStyle, { color: textcolor }]}>
          {book.book_store_info.store_address}
        </Text>
        <Text style={[styles.textStyle, { color: textcolor }]}>
          {book.book_store_info.store_number}
        </Text>
      </View>
      <View style={{ marginHorizontal: 12, marginTop: 9 }}>
        <MapView
          style={{ alignSelf: "stretch", height: 121, borderRadius: 10 }}
          region={{
            latitude: book.book_store_info.store_latitude,
            longitude: book.book_store_info.store_longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.15,
          }}
          showsUserLocation={true}
          minZoomLevel={10}
          maxZoomLevel={15}
          scrollEnabled={true}
          loadingEnabled={true}
        >
          <Marker
            coordinate={{
              latitude: book.book_store_info.store_latitude,
              longitude: book.book_store_info.store_longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.15,
            }}
            title={book.book_store_info.store_name}
          />
        </MapView>
      </View>
      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <Pressable style={{ justifyContent: "flex-end", alignSelf: "center" }} 
        onPress={buttontype==='Claim lost' ? markaslost : removebook}>
          <Button
            theme={{ roundness: 120 }}
            style={{
              width: 215,
              height: 40,
              margin: 10,
              alignSelf: "center",
              justifyContent: "center",
              backgroundColor:'#E96A59'
            }}
            labelStyle={{
              fontSize: 16,
              color: "white",
              flexDirection: "row",
              fontFamily: "DMSansbold",
            }}
            mode="contained"
          >
            {buttontype}
          </Button>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "DMSans",
    fontSize: 16,
    marginBottom: 2,
  },
});
export default React.memo(Alertbookscreen);
