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

const RemovedBookScreen = (props) => {
  const [Pickupdata, setPickupdata] = useState(props.route.params.book);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container1}>
        <View style={styles.container}>
          <WavyHeader customStyles={styles.svgCurve} />
          <Image
            style={styles.tinyLogo}
            source={{ uri: Pickupdata.book_img }}
          />
          <Button
            mode="text"
            style={styles.submitbutton}
            labelStyle={styles.submitbutton}
          ></Button>
        </View>

        <Card.Title
          style={styles.c}
          subtitle="Code"
          title={Pickupdata.book_transaction_code}
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
          title={Pickupdata.book_name}
          fontSize="20"
          titleNumberOfLines={3}
          left={(props) => <Avatar.Icon {...props} icon="pen" />}
        />

        <Card.Title
          style={styles.c}
          subtitle="Author"
          title={Pickupdata.book_author}
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
          subtitle="Price"
          title={Pickupdata.book_price}
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
          subtitle="Condition"
          title={Pickupdata.book_condition}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={{
                uri: "https://static.thenounproject.com/png/1801462-200.png",
              }}
            />
          )}
        />
        <Card.Content style={styles.c1}>
          <Title>Store details</Title>
          <Subheading>{Pickupdata.store.store_name}</Subheading>
          <Subheading>{Pickupdata.store.store_incharge}</Subheading>
          <Paragraph>{Pickupdata.store.store_address}</Paragraph>
          <Paragraph>{Pickupdata.store.store_number}</Paragraph>
        </Card.Content>
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
    marginTop: 15,
    marginHorizontal: 10,
  },
  c1: {
    backgroundColor: "#F0F8FF",
    borderRadius: 10,
    marginTop: 15,
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

export default RemovedBookScreen;
