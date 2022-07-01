import React, { useState, useEffect } from "react";
import { ThemeContext } from "../Components/Theme";
import {
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
  Image,
} from "react-native";
import { logoutUser } from "../actions";
import {styles} from '../Styles/Storemodalcardstyles.js';
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
  const [selectedshopoption,setSelectedShopOption] = useState(null);
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
      <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
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
              selectedShop === shop.store_id
            ) {
              
              return (
                <View
                  key={idx}
                  style={{
                    borderRadius: 10,
                    backgroundColor: Theme === 'Light' ? '#D5DDEE': '#6E797C',
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
                    Indshop = {shop}
                    longitude={shop.store_longitude}
                    id={shop.store_id}
                    Selectshop = {(selectedShop) => setSelectedShop(selectedShop)}
                    Selectshopoption = {(selectedshopoption) => setSelectedShopOption(selectedshopoption)}
                  />
                </View>
              );
            } else {
              return (
                <View key={idx}>
                  <Storemodalcard
                    shopName={shop.store_name}
                    storeInchargeName={shop.store_incharge}
                    address={shop.store_address}
                    pincode={shop.store_pincode}
                    distance={shop.store_distance}
                    contactNo={shop.store_number}
                    latitude={shop.store_latitude}
                    longitude={shop.store_longitude}
                    id={shop.store_id}
                    Indshop = {shop}
                    Selectshop = {(selectedShop) => setSelectedShop(selectedShop)}
                    Selectshopoption = {(selectedshopoption) => setSelectedShopOption(selectedshopoption)}
                  />
               </View>
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
                params: { shop: selectedshopoption },
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
      <SafeAreaView style={{flex:1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
        <View style={styles.activityindicator}>
          <ActivityIndicator animating={true} size={100} />
        </View>
      </SafeAreaView>
    );
  }
};



export default React.memo(Storemodal);