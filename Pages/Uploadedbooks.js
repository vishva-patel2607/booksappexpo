import React, { Component, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import { logoutUser, setUser } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Title,
  Paragraph,
  TextInput,
  Text,
  Appbar,
  BottomNavigation,
  Searchbar,
  Avatar,
  Subheading,
  Caption,
  IconButton,
  Card,
} from "react-native-paper";
import { TabRouter } from "@react-navigation/routers";
import WavyHeader from "./WavyHeader";
import FastImage from "react-native-fast-image";

const UploadedBooks = (props) => {

  
  const [Bookdata, setBookData] = useState(props.route.params.book);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const removebook = () => {
    fetch("https://booksapp2021.herokuapp.com/Book/Uploadedbooks/Remove", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify({
        book_id: Bookdata.book_id,
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


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <WavyHeader customStyles={styles.svgCurve} />

          <Image style={styles.tinyLogo} source={{ uri: Bookdata.book_img }} />
          <View style={{ flex: 2 }}>
            <Button
              mode="contained"
              style={styles.submitbutton}
              labelStyle={styles.submitbutton}
              onPress={removebook}
            >
              Remove
            </Button>
            <Button
              mode="contained"
              style={styles.submitbutton}
              labelStyle={styles.submitbutton}
              onPress={() =>
                props.navigation.navigate("Edituploadedbook", {
                  book: Bookdata,
                })
              }
            >
              Edit
            </Button>
          </View>
        </View>

        <Card.Title
          style={styles.c}
          subtitle="Code"
          title={Bookdata.book_transaction_code}
          titleNumberOfLines={3}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={{
                uri: "https://cdn-icons-png.flaticon.com/512/1166/1166773.png",
              }}
            />
          )}
        />

        <Card.Title
          style={styles.c}
          subtitle="Name of the book"
          title={Bookdata.book_name}
          titleNumberOfLines={3}
          left={(props) => <Avatar.Icon {...props} icon="book" />}

        />

        <Card.Title
          style={styles.c}
          subtitle="Author"
          title={Bookdata.book_author}
          fontSize="20"
          titleNumberOfLines={3}
          left={(props) => <Avatar.Icon {...props} icon="pen" />}
        />

        <Card.Title
          style={styles.c}
          subtitle="Price"
          title={Bookdata.book_price}
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
          title={Bookdata.book_condition}
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
          subtitle="Status"
          titleNumberOfLines={3}
          title={Bookdata.book_status}
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
  container1: {
    paddingTop: 20,
  },
  c: {
    backgroundColor: "#F0F8FF",
    borderRadius: 100,
    marginTop: 20,
    marginHorizontal: 20,
  },
  submitbutton: {
    marginRight: 10,
    marginLeft: 10,
    height: 45,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
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


export default React.memo(UploadedBooks);

