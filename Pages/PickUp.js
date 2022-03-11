import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Alert,
  Pressable,
  TouchableOpacity,
  Touchable,
} from "react-native";

import { logoutUser, setUser } from "../actions";
import { Platform, StatusBar, Dimensions } from "react-native";
import {
  Button,
  Title,
  Paragraph,
  TextInput,
  Text,
  Appbar,
  BottomNavigation,
  Searchbar,
  RadioButton,
  Headline,
  IconButton,
  Provider,
  Portal,
  Modal,
  Surface,
  Subheading,
} from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import Storemodalcard from "./Storemodalcard";

const BookDetail = (props) => {
  return (
    <View>
      <Text style={styles.BookDetailTitle}>{props.title}</Text>
      <Text style={styles.BookDetailValue}>{props.value}</Text>
    </View>
  );
};

const Pickup = (props) => {

  
  const [mapRegion, setmapRegion] = useState({
    latitude: 72.54476,
    longitude: 22.476832,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  
  return (
    <ScrollView>
      <SafeAreaView style={styles.main}>
        <Title style={styles.title}>PICKUPS (2)</Title>

        <View style={styles.layout}>
          <View style={styles.fields}>
            <View>
              <BookDetail title={"Code"} value={"10235976015"} />
              <BookDetail title={"ISBN Code"} value={"9786890005"} />
              <BookDetail
                title={"Name of the book"}
                value={"Fault in our stars"}
              />
              <BookDetail title={"Author"} value={"John Green"} />
              <BookDetail title={"Price"} value={"700"} />
              <BookDetail title={"Condition"} value={"Good"} />
              <BookDetail title={"Status"} value={"Book is read by borrower"} />
            </View>
          </View>

          <View style={styles.aside}>
            <View
              style={{
                flex: 1,
              }}
            >
              <Image
                style={{
                  height: 200,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
                source={{
                  uri: "https://booksapp-image-data.s3.ap-south-1.amazonaws.com/book-image-folder/book-02-27-2022_141439.jpg",
                }}
              />
            </View>
            <Button style={styles.button} color="#ffffff">
              REMOVE
            </Button>
          </View>
        </View>

        <View style={styles.shop}>
          <Text style={styles.BookDetailTitle}>Shop</Text>
          <View style={styles.shopDetailsContainer}>
            <Text style={[styles.shopDetails, styles.shopDistance]}>
              12 kms
            </Text>
            <Text style={styles.shopDetails}>Nirma Store</Text>
          </View>
        </View>

        <View>
          <Text style={styles.storeDetails}>Shailesh Patel </Text>
          <Text style={styles.storeDetails}>Nirma University, SG Highway </Text>
          <Text style={styles.storeDetails}>92503xxxxx</Text>
        </View>
        <View style={styles.map}>
          <View
            style={{
              marginTop: 5,
              borderRadius: 10,
              borderWidth: 1,
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default Pickup;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ECEFEE",
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    color: "#E96A59",
    fontWeight: "700",
  },
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fields: {
    width: "55%",
  },

  BookDetailTitle: {
    fontSize: 14,
    color: "#6E7A7D",
    marginBottom: 5,
  },
  BookDetailValue: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#6E7A7D",
    color: "#0D1936",
    borderColor: "#0D1936",
    fontSize: 17,
  },

  aside: {
    width: "40%",
    height: 300,
  },
  button: {
    marginHorizontal: "auto",
    marginTop: 20,
    backgroundColor: "#E96A59",
    fontWeight: "700",
    borderRadius: 25,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  shop: {
    marginVertical: 20,
  },

  shopDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  shopDetails: {
    flex:3,
    paddingVertical: 6,
    borderWidth: 2,
    fontWeight: "700",
    borderColor: "#0036F4",
    borderRadius: 25,
    textAlign: "center"
  },
  shopDistance: {
    flex:2,
    marginRight: 20,
  },
  storeDetails: {
    lineHeight: 20,
  },
  map:{
    marginBottom: 20
  },
});
