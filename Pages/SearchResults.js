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
      <Text style={styles.BookDetailValue}>{props.value}</Text>
    </View>
  );
};

const SearchResult = (props) => {
  const [mapRegion, setmapRegion] = useState({
    latitude: 72.54476,
    longitude: 22.476832,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  return (
    <ScrollView>
      <SafeAreaView style={styles.main}>
        <View style={styles.layout}>
          <View style={styles.fields}>
            <View>
              <BookDetail value={"Fault in our stars"} />
              <BookDetail value={"John Green"} />
              <BookDetail value={"2018"} />
              <BookDetail value={"700"} />
              <BookDetail value={"Good"} />
              <BookDetail value={"Drop the book on Store"} />
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
          </View>
        </View>

        <View>
          <View style={styles.shopDetailsContainer}>
            <Text style={[styles.shopDetails, styles.shopDistance]}>
              12 kms
            </Text>
            <Text style={styles.shopDetails}>Nirma Store</Text>
          </View>
        </View>

        <View style={styles.storeDetailsContainer}>
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

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 100,
          }}
        >
          <Button color="#ffffff" style={styles.button}>
            ADD TO PICKUPS
          </Button>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ECEFEE",
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
  },
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  fields: {
    width: "55%",
  },
  BookDetailValue: {
    marginBottom: 15,
    color: "#0D1936",
    fontSize: 17,
  },

  aside: {
    width: "40%",
  },

  shopDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  shopDetails: {
    flex: 3,
    paddingVertical: 6,
    borderWidth: 2,
    fontWeight: "700",
    borderColor: "#0036F4",
    borderRadius: 25,
    textAlign: "center",
  },
  shopDistance: {
    flex: 2,
    marginRight: 20,
  },
  storeDetailsContainer: {
    marginTop: 10,
  },
  storeDetails: {
    lineHeight: 20,
  },
  map: {
    marginBottom: 20,
  },
  button: {
    width: "50%",
    marginTop: 20,
    paddingVertical:5,
    backgroundColor: "#E96A59",
    fontWeight: "700",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
