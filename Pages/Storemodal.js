Storemodal;
import React, { useState, useEffect } from "react";
import { ThemeContext } from "../Components/Theme";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { logoutUser } from "../actions";
import { Platform, StatusBar } from "react-native";
import { Button, ActivityIndicator, Text } from "react-native-paper";
import Storemodalcard from "./Storemodalcard";
import Backbutton from "../Components/Backbutton";

import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";

const Storemodal = (props) => {
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [selectedShop, setSelectedShop] = useState(null);
  const [shops, setShops] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { setTheme, Theme } = React.useContext(ThemeContext);

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
    setLoading(false);
    setLocation();

    if (typeof longitude != "undefined" && typeof latitude != "undefined") {
      fetch("https://booksapp2021.herokuapp.com/Store/Getstore", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify({
          longitude: longitude,
          latitude: latitude,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            console.log(data.response.stores);
            setShops(data.response.stores);
          } else {
            if (data.message === "Could not verify") {
              dispatch(logoutUser());
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(true);
    }
  }, [longitude, latitude]);

  if (loading && shops != null) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Pressable onPress={() => props.navigation.navigate("Upload")}>
            <Backbutton />
          </Pressable>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#E96A59",
              marginLeft: 20,
              marginTop: 16,
              marginBottom: 2,
              fontFamily: "DMSansbold",
            }}
          >
            Shops
          </Text>
        </View>
        <ScrollView style={{ width: "100%", padding: 10, paddingTop: 0 }}>
          {shops.map((shop, idx) => {
            if (
              selectedShop != null &&
              selectedShop.store_id === shop.store_id
            ) {
              return (
                <View
                  key={idx}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "#D5DDEE",
                    marginTop: 10,
                  }}
                >
                  <Storemodalcard
                    shopName={shop.store_name}
                    storeInchargeName={shop.store_incharge}
                    address={shop.store_address}
                    pincode={shop.store_pincode}
                    distance={shop.store_distance}
                    contactNo={shop.store_number}
                    latitude={shop.store_latitude}
                    longitude={shop.store_longitude}
                  />
                </View>
              );
            } else {
              return (
                <Pressable
                  key={idx}
                  onPress={() => setSelectedShop(shop)}
                  style={{ marginTop: 10,padding:10 }}
                >
                  <Storemodalcard
                    shopName={shop.store_name}
                    storeInchargeName={shop.store_incharge}
                    address={shop.store_address}
                    pincode={shop.store_pincode}
                    distance={shop.store_distance}
                    contactNo={shop.store_number}
                    latitude={shop.store_latitude}
                    longitude={shop.store_longitude}
                  />
                </Pressable>
              );
            }
          })}
        </ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
              fontSize: 16,
              color: "white",
              flexDirection: "row",
              fontFamily: "DMSansbold",
            }}
            onPress={() =>
              props.navigation.navigate("Mainpage", {
                screen: "Upload",
                params: { shop: selectedShop },
              })
            }
            mode="contained"
          >
            Select
          </Button>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={styles.activityindicator}>
          <ActivityIndicator animating={true} size={100} />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  textbox: {
    textAlign: "center",
    padding: 10,
    fontSize: 20,
  },

  error: {
    textAlign: "center",
    fontSize: 20,
    color: "red",
    padding: 20,
  },

  inputtextbox: {
    margin: 10,
  },

  submitbutton: {
    flex: 1,
    margin: 10,
    fontSize: 20,
    color: "white",
  },

  uploadimage: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  layout: {
    flex: 1,
    justifyContent: "center",
  },

  container1: {
    flexDirection: "row",
  },

  container11: {
    flex: 2,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
  },

  container12: {
    flex: 5,
  },

  container2: {
    justifyContent: "center",
  },

  container3: {
    flexDirection: "column",
  },

  containerStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    width: "80%",
    height: "90%",
    borderRadius: 20,
  },

  modal: {
    justifyContent: "center",
    alignItems: "center",
  },

  storemodalcardaddress: {
    flex: 3,
    backgroundColor: "#EDEDF0",
    padding: 10,
    borderTopLeftRadius: 10,
  },

  storemodalcarddistance: {
    flex: 1,
    backgroundColor: "#7CABF0",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderTopRightRadius: 10,
  },
});

export default React.memo(Storemodal);
