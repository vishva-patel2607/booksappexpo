import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { ThemeContext } from "../Components/Theme";
import Queryinfo from "../Components/Queryinfo";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import Backbutton from "../Components/Backbutton";
import { Text, Button, Colors } from "react-native-paper";
const Bookscreen = (props) => {
  const { colors } = useTheme();
  const [book, setBook] = useState(props.route.params.book);

  const { setTheme, Theme } = React.useContext(ThemeContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const addtopickup = () => {
    if (book.transaction_type === "lend") {
      console.log('lend');
      fetch("https://booksapp2021.herokuapp.com/Book/Borrowed/Add", {
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
    } else {
      fetch("https://booksapp2021.herokuapp.com/Book/Bought/Add", {
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
            if (data.message === "Pickup added") {
             console.log('added')} 
             else {
              Alert.alert("Error in adding pickup", [
                {
                  text: "Ok",
                },
              ]);
            }
          } else {
            if (data.message === "Could not verify") {
              dispatch(logoutUser());
            }
          }
        })
        .catch((error) => {
          console.log('error');
        });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ justifyContent: "flex-start" }}>
        <Pressable onPress={() => props.navigation.navigate("Search")}>
          <Backbutton />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 12,
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
        {/* </View> */}
        <View>
          <Image
            source={{ uri: book.book_img }}
            resizeMode="cover"
            style={{ height: 150, width: 150, borderRadius: 10 }}
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
              color: colors.text,
            }}
          >
            {book.store_distance}
          </Text>
        </View>
        <View style={{ flex: 5 }}>
          <Text
            style={{
              borderWidth: 2,
              color: colors.text,
              paddingVertical: 6,
              fontWeight: "700",
              borderColor: "#0036F4",
              borderRadius: 18,
              textAlign: "center",
              fontFamily: "DMSans",
            }}
          >
            {book.store.store_name}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: 12,
          marginTop: 9,
        }}
      >
        <Text style={[styles.textStyle, { color: colors.text }]}>
          {book.store.store_incharge}
        </Text>
        <Text style={[styles.textStyle, { color: colors.text }]}>
          {book.store.store_address}
        </Text>
        <Text style={[styles.textStyle, { color: colors.text }]}>
          {book.store.store_number}
        </Text>
      </View>
      <View style={{ marginHorizontal: 12, marginTop: 9 }}>
        <MapView
          style={{ alignSelf: "stretch", height: 121, borderRadius: 10 }}
          region={{
            latitude: book.store.store_latitude,
            longitude: book.store.store_longitude,
            latitudeDelta: 0.10,
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
              latitude: book.store.store_latitude,
              longitude: book.store.store_longitude,
              latitudeDelta: 0.10,
              longitudeDelta: 0.15,
            }}
            title={book.store_name}
          />
        </MapView>
      </View>
      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <Pressable style={{ justifyContent: "flex-end", alignSelf: "center" }}>
          <Button
            theme={{ roundness: 120 }}
            style={{
              width: 215,
              height: 40,
              margin: 10,
              alignSelf: "center",
              justifyContent: "center",
            }}
            labelStyle={{
              fontSize: 14,
              color: "white",
              flexDirection: "row",
              fontFamily: "DMSansbold",
            }}
            onPress={addtopickup}
            mode="contained"
          >
            Add to pickups
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

export default React.memo(Bookscreen);
