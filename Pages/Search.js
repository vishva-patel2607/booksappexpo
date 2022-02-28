import React, { Component, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";

import FastImage from "react-native-fast-image";
import { debounce } from "lodash";
import {
  Title,
  Paragraph,
  Text,
  Searchbar,
  Subheading,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";

const SearchRoute = (props) => {
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [Receiveddata, setReceiveddata] = useState([]);
  const [count, setCount] = useState(0);
  const [SearchQuery, setSearchQuery] = useState("");
  const [text, setText] = useState("Search for a book");
  const [Message, setMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const setLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLongitude(loc.coords.longitude);
    setLatitude(loc.coords.latitude);
  };

  useEffect(() => {
    setLocation();
    if (typeof longitude != "undefined" && typeof latitude != "undefined") {
      console.log(SearchQuery);
      fetch("https://booksapp2021.herokuapp.com/Book/Search", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify({
          book_query: SearchQuery,
          longitude: longitude,
          latitude: latitude,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            if (data.message === "All the Books for given query") {
              setReceiveddata(data.response.book_list);
              setMessage(data.message);
            } else {
              setText("No books found");
              setReceiveddata([]);
              setMessage(data.message);
            }
          } else {
            if (data.message === "Could not verify") {
              dispatch(logoutUser());
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [longitude, latitude, count]);

  const Calltochangecount = debounce(() => setCount(!count), 500);

  const onChangeInput = (text) => {
    setSearchQuery(text);
    Calltochangecount();
  };

  if (Receiveddata.length !== 0) {
    return (
      <SafeAreaView style={styles.search}>
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => onChangeInput(text)}
          value={SearchQuery}
        />

        <ScrollView style={{ flex: 1 }}>
          {Receiveddata.map((book, idx) => (
            <Pressable
              key={idx}
              onPress={() =>
                props.navigation.navigate("Bookscreen", { book: book })
              }
            >
              <View style={styles.cardcontainer}>
                <View style={styles.cardcontent}>
                  <Title style={{ fontSize: 18 }}>{book.book_name}</Title>
                  <Subheading>{book.book_author}</Subheading>
                  <Paragraph>{book.book_year}</Paragraph>

                  <Paragraph>In {book.book_condition} condition</Paragraph>
                  <Paragraph>{book.book_price}</Paragraph>
                  <Paragraph>{book.store_distance} km(s) away</Paragraph>
                </View>
                <View style={styles.cardimage}>
                  <Image
                    style={{
                      resizeMode: "cover",
                      height: "100%",
                      width: "75%",
                    }}
                    source={{ uri: book.book_img }}
                  />
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.search}>
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => onChangeInput(text)}
          value={SearchQuery}
        />
        <Text style={{ marginTop: 50, textAlign: "center" }}>{text}</Text>
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  layout: {
    flex: 1,
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
    backgroundColor: "#F0F8FF",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },

  cardcontent: {
    flex: 4,

    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  search: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },

  cardimage: {
    flex: 3,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginRight: 5,
  },
});

export default React.memo(SearchRoute);
