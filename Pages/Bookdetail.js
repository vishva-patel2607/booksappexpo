import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Pressable,
  Alert,
  StatusBar,
  TouchableOpacity,
  Modal
} from "react-native";
import { styles } from "../Styles/Bookdetail.js";
import Backbutton from "../Components/Backbutton";
import * as Location from "expo-location";
import { getPreciseDistance } from "geolib";
import { ThemeContext } from "../Components/Theme.js";

import { useDispatch, useSelector } from "react-redux";
import { Button, Title, Text, ActivityIndicator } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";

const BookDetail = (props) => {
  const {textcolor} = React.useContext(ThemeContext);

  return (
    <View>
      <Text style={[styles.BookDetailTitle]}>{props.title}</Text>
      <Text
        style={[styles.BookDetailValue, { color: textcolor }]}
        numberOfLines={3}
      >
        {props.value}
      </Text>
    </View>
  );
};

const Bookdetail = (props) => {
  
  const {textcolor} = React.useContext(ThemeContext);
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [imageloading, setImageloading] = useState(false);
  const [modalVisible,setModalVisible] = useState(false);
  const [distance, setDistance] = useState("");
  const { book } = props.route.params;

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
          latitude: book.store.store_latitude,
          longitude: book.store.store_longitude,
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

  var status;
  if (book.usernumber !== user.accountNumber) {
    status = "N/A";
  } else {
    if (book.book_transaction_status === undefined) {
      status = book.book_status;
    } else {
      if(book.book_transaction_status==="Book Lost by borrower! You'll get your full book price shortly"){
        status="Book lost by borrower!You'll get your full book price.";
      }
      else{
      status = book.book_transaction_status;
      }
    }
  }

  const [mapRegion, setmapRegion] = useState({
    latitude: book.store.store_latitude,
    longitude: book.store.store_longitude,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        opacity:modalVisible === true ? 0.35 : 1
      }}
    >
      <Pressable onPress={() => props.navigation.navigate("Home")}>
        <Backbutton />
      </Pressable>
      <ScrollView>
        <Title style={styles.title}>{props.route.params.title}</Title>

        <View style={styles.layout}>
          <View style={styles.fields}>
            <View>
              <BookDetail title={"Code"} value={book.book_transaction_code} />
              <BookDetail title={"ISBN Code"} value={book.book_isbn} />
              <BookDetail title={"Name of the book"} value={book.book_name} />
              <BookDetail title={"Author"} value={book.book_author} />
              <BookDetail title={"Price"} value={book.book_price} />
              <BookDetail title={"Condition"} value={book.book_condition} />
              <BookDetail title={"Status"} value={status} />
            </View>
          </View>

          <View style={styles.aside}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              {imageloading && (
               <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',zIndex:0,position:'absolute',marginTop:10}}>
               <ActivityIndicator size="small" />
               </View>
              )}
              {<Image
                style={{
                  height: 200,
                  width: 150,
                  resizeMode: "cover",
                  borderRadius: 20,
                  zIndex:0
                }}
                source={{
                  uri: book.book_img,
                }}
                onLoadStart={() => {
                  setImageloading(true);
                  
                }}
                onLoadEnd={() => {
                  setImageloading(false);
                  
                }}
              />}
            </View>
            {(props.route.params.title === "LENT" ||
              props.route.params.title === "SOLD") && (
              <Pressable
                onPress={() =>
                  props.navigation.navigate("Edituploadedbook", {
                    book: book,
                  })
                }
              >
                <Button
                  style={styles.button}
                  color="#ffffff"
                  labelStyle={{ fontFamily: "DMSansbold", fontWeight: "700" }}
                >
                  EDIT
                </Button>
              </Pressable>
            )}
            <Pressable onPress={removebook}>
              <Button
                style={styles.button}
                color="#ffffff"
                labelStyle={{ fontFamily: "DMSansbold", fontWeight: "700" }}
              >
                REMOVE
              </Button>
            </Pressable>
            {props.route.params.title === "BORROWED" && (
              <>
                <Pressable onPress={() => setModalVisible(true)}>
                  <Button
                    style={[styles.button, { alignItems: "flex-start" }]}
                    color="#ffffff"
                    labelStyle={{
                      fontFamily: "DMSansbold",
                      fontWeight: "700",
                      fontSize: 13,
                    }}
                  >
                    MARK AS LOST
                  </Button>
                </Pressable>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <TouchableOpacity style={styles.centeredView} onPress={() => setModalVisible(false)}>
                    <View
                      style={[
                        styles.modalView,
                        {
                          backgroundColor:
                            colors.background === "#ECEFEE"
                              ? "#FFFFFF"
                              : "#0D1936",
                        },
                      ]}
                    >
                      <Text style={[styles.textStyle, { color: textcolor }]}>
                        CONFIRM
                      </Text>
                      <Text style={[styles.modalText, { color: textcolor }]}>
                        Is the book lost?
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Pressable
                          style={[
                            styles.buttonmodal,
                            {
                              color: (textcolor = '#0D1936' 
                                ? "#FFFFFF"
                                : "#0036F4"),
                            },
                          ]}
                          onPress={markaslost}
                        >
                          <Text
                            style={[styles.textStyle, { color: textcolor }]}
                          >
                            YES
                          </Text>
                        </Pressable>
                        <Pressable
                          style={[
                            styles.buttonmodal,
                            styles.buttonCloseNegative,
                            {
                              color: (textcolor = "#0D1936"
                                ? "#FFFFFF"
                                : "#0036F4"),
                            },
                          ]}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text
                            style={[styles.textStyle, { color: textcolor }]}
                          >
                            NO
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Modal>
              </>
            )}
          </View>
        </View>

        <View style={styles.shop}>
          <Text style={[styles.BookDetailTitle, { color: textcolor }]}>
            Shop
          </Text>
          <View style={styles.shopDetailsContainer}>
            <Text
              style={[
                styles.shopDetails,
                styles.shopDistance,
                { color: textcolor },
              ]}
            >
              {distance} kms
            </Text>
            <Text style={[styles.shopDetails, { color: textcolor }]}>
              {book.store.store_name}
            </Text>
          </View>
        </View>

        <View style={{ marginLeft: 20 }}>
          <Text style={[styles.storeDetails, { color: textcolor }]}>
            {book.store.store_incharge}{" "}
          </Text>
          <Text style={[styles.storeDetails, { color: textcolor }]}>
            {book.store.store_address}
          </Text>
          <Text style={[styles.storeDetails, { color: textcolor }]}>
            {book.store.store_number}
          </Text>
        </View>
        <View style={styles.map}>
          <View
            style={{
              marginTop: 5,
              borderRadius: 10,
              marginLeft: 20,
              marginRight: 20,

              overflow: "hidden",
            }}
          >
            <MapView
              style={{ alignSelf: "stretch", height: 175 }}
              region={mapRegion}
              showsUserLocation={true}
              minZoomLevel={10}
              maxZoomLevel={15}
              scrollEnabled={true}
              loadingEnabled={true}
            >
              <Marker coordinate={mapRegion} title={"shopName"} />
            </MapView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Bookdetail);
