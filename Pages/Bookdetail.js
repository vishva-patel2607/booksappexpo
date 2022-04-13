import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  StatusBar
} from "react-native";
import { useTheme } from "@react-navigation/native";

import Backbutton from "../Components/Backbutton";

import { useDispatch, useSelector } from "react-redux";
import { Button, Title, Text, ActivityIndicator } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";

const BookDetail = (props) => {
  const { colors } = useTheme();
  const user = useSelector((state) => state.user);

  return (
    <View>
      <Text style={[styles.BookDetailTitle]}>{props.title}</Text>
      <Text
        style={[styles.BookDetailValue, { color: colors.text }]}
        numberOfLines={3}
        
      >
        {props.value}
      </Text>
    </View>
  );
};

// const type = {
//   LENT: "Lent",
//   SOLD: "Sold",
//   BORROWED: "Borrowed",
//   BOUGHT: "Bought",
// };

const Bookdetail = (props) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [imageloading, setImageloading] = useState(false);
  let showloading =
    imageloading === true ? (
      <ActivityIndicator style={{ alignSelf: "center" }} />
    ) : (
      <View></View>
    );

  const [book, setBook] = useState(props.route.params.book);
  
  var status;
  if (book.book_transaction_status === undefined) {
    status = book.book_status;
  } else {
    status = book.book_transaction_status;
  }
  const [mapRegion, setmapRegion] = useState({
    latitude: book.store.store_latitude,
    longitude: book.store.store_longitude,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
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
        console.log('Data')
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
    
      <SafeAreaView style={{flex:1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight+10 : 0}}>
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
                alignItems:'center'
              }}
            >
              {/* <Image
                style={{
                  height: 200,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
                source={{
                  uri: book.book_img,
                }}
              /> */}
              
              <Image
                style={{
                  height: 200,
                  width:150,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
                source={{
                  uri: book.book_img,
                }}
                onLoadStart={() => {
                  setImageloading(true);
                  console.log("In");
                }}
                onLoadEnd={() => {
                  setImageloading(false);
                  console.log("Out");
                }}
              />
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
                <Button style={styles.button} color="#ffffff">
                  EDIT
                </Button>
              </Pressable>
            )}
            <Pressable onPress={removebook}>
              <Button style={styles.button} color="#ffffff">
                REMOVE
              </Button>
            </Pressable>
          </View>
        </View>

        <View style={styles.shop}>
          <Text style={[styles.BookDetailTitle, { color: colors.text }]}>
            Shop
          </Text>
          <View style={styles.shopDetailsContainer}>
            <Text
              style={[
                styles.shopDetails,
                styles.shopDistance,
                { color: colors.text },
              ]}
            >
              12 kms
            </Text>
            <Text style={[styles.shopDetails, { color: colors.text }]}>
              {book.store.store_name}
            </Text>
          </View>
        </View>

        <View style={{ marginLeft: 20 }}>
          <Text style={[styles.storeDetails, { color: colors.text }]}>
            {book.store.store_incharge}{" "}
          </Text>
          <Text style={[styles.storeDetails, { color: colors.text }]}>
            {book.store.store_address}
          </Text>
          <Text style={[styles.storeDetails, { color: colors.text }]}>
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

export default Bookdetail;

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    color: "#E96A59",
    fontWeight: "700",
  },
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fields: {
    width: "45%",
  },

  BookDetailTitle: {
    marginLeft: 20,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "DMSans",
    color: "#6E7A7D",
  },
  BookDetailValue: {
    marginLeft: 20,
    fontFamily: "DMSans",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#6E7A7D",
    color: "#0D1936",
    borderColor: "#0D1936",
    fontSize: 17,
  },

  aside: {
    width: "40%",
    height: 330,
    marginRight: 20,
    alignItems:'center'
  },
  button: {
    width:150,
    marginHorizontal: "auto",
    marginTop: 20,
    backgroundColor: "#E96A59",
    fontWeight: "700",
    borderRadius: 50,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  shop: {
    marginVertical: 8,
  },

  shopDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginHorizontal: 20,
  },
  shopDetails: {
    flex: 3,
    paddingVertical: 6,
    borderWidth: 2,
    fontWeight: "700",
    borderColor: "#0036F4",
    borderRadius: 18,
    textAlign: "center",
  },
  shopDistance: {
    flex: 2,
    marginRight: 20,
  },
  storeDetails: {
    lineHeight: 20,
    fontFamily: "DMSans",
  },
  map: {
    marginBottom: 20,
  },
});
