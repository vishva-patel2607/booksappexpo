import React, { Component, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";

import FastImage from "react-native-fast-image";

import { Button, Text, Avatar, Card } from "react-native-paper";
import WavyHeader from "./WavyHeader";
import { useDispatch, useSelector } from "react-redux";

const Bookscreen = (props) => {
  const [book, setBook] = useState(props.route.params.book);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const addtopickup = () => {
    fetch("https://booksapp2021.herokuapp.com/Book/Pickedupbooks/Add", {
      method: "POST",
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
        console.log("in");
        if (data.status) {
          if (data.message === "Pickup added") {
            console.log(data.response.transaction);
            Alert.alert("Success", "Book added to Pickup", [
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
            console.log(data.response.message);
            Alert.alert("Error in removing pickup", [
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
        console.log(error);
      });
  };
  return (
    <SafeAreaView>
      <Text></Text>

      <View style={styles.container}>
        <WavyHeader customStyles={styles.svgCurve} />
        <FastImage style={styles.tinyLogo} source={{ uri: book.book_img }} />
        <Button
          mode="contained"
          style={styles.submitbutton}
          labelStyle={styles.submitbutton}
          onPress={addtopickup}
        >
          Add to Pickup
        </Button>
      </View>
      <ScrollView style={{ padding: 20 }}>
        <Card.Title
          style={styles.c}
          subtitle="Name of the book"
          title={book.book_name}
          titleNumberOfLines={3}
          left={(props) => <Avatar.Icon {...props} icon="book" />}
        />

        <Card.Title
          style={styles.c}
          subtitle="Author"
          title={book.book_author}
          fontSize="20"
          titleNumberOfLines={3}
          left={(props) => <Avatar.Icon {...props} icon="pen" />}
        />

        <Card.Title
          style={styles.c}
          subtitle="Price"
          title={book.book_price}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={{
                uri: "https://cdn3.iconfinder.com/data/icons/inficons-currency-set/512/rupee-512.png",
              }}
            />
          )}
        />
        <Card.Title
          style={styles.c}
          subtitle="Condition"
          title={book.book_condition}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={{
                uri: "https://static.thenounproject.com/png/729549-200.png",
              }}
            />
          )}
        />

        <Card.Title
          style={styles.c}
          subtitle="Shop distance"
          title={book.store_distance}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={{
                uri: "https://static.thenounproject.com/png/1801462-200.png",
              }}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: "row",
  },
  tinyLogo: {
    width: "75%",
    height: "100%",
    flex: 4,
    resizeMode: "cover",
    marginRight: 10,
    marginLeft: 20,
    maxWidth: 150,
    maxHeight: 200,
    minWidth: 150,
    minHeight: 200,
  },
  c: {
    backgroundColor: "#F0F8FF",
    borderRadius: 100,
    marginTop: 20,
    marginHorizontal: 20,
  },
  submitbutton: {
    flex: 2,
    fontSize: 15,
    marginTop: 20,
    marginRight: 15,
    marginLeft: 10,
    marginBottom: 20,
    alignSelf: "flex-start",
    borderRadius: 10,
    color: "white",
  },
  svgCurve: {
    position: "absolute",
    flex: 1,
    width: "100%",
    marginTop: 0,
  },
});

export default React.memo(Bookscreen);
