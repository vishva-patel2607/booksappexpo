import React, { useState, useEffect } from "react";
import { View ,Pressable } from "react-native";
import { ThemeContext } from "../Components/Theme";
import { useTheme } from "@react-navigation/native";
import {  Text } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";

import MapView, { Marker } from "react-native-maps";

const Storemodalcard = (props) => {
  const {Theme} = React.useContext(ThemeContext);
  const { colors } = useTheme();
  const [showMap, setShowMap] = useState(false);
  const [storeInchargeName, setStoreInchargeName] = useState(
    props.storeInchargeName
  );
  const [shopName, setShopName] = useState(props.shopName);
  const [address, setAdress] = useState(props.address);
  const [pincode, setPincode] = useState(props.pincode);
  const [distance, setDistance] = useState(props.distance);
  const [contactNo, setContactNo] = useState(props.contactNo);
  const [Latitude, setLatitude] = useState(props.latitude);
  const [Longitude, setLongitude] = useState(props.longitude);
  let textColor = Theme === 'Light' ? '#0D1936' : '#ECEFEE';
  
  const mapRegion = {
    latitude: Latitude,
    longitude: Longitude,
    latitudeDelta: 0,
    longitudeDelta: 0,
  };
  let text = showMap ? "Hide Map" : "View Map";
  useEffect(() => {
    setStoreInchargeName(props.storeInchargeName);
    setShopName(props.shopName);
    setAdress(props.address);
    setPincode(props.pincode);
    setDistance(props.distance);
    setContactNo(props.contactNo);
    setLongitude(props.longitude);
    setLatitude(props.latitude);
  }, [
    props.storeInchargeName,
    props.shopName,
    props.address,
    props.pincode,
    props.distance,
    props.contactNo,
    props.latitude,
    props.longitude,
  ]);

  let map;
  if (showMap) {
    map = (
      <View>
        <MapView
          style={{
            alignSelf: "stretch",
            height: 200,
            marginTop: 10,
            borderRadius: 10,
          }}
          region={mapRegion}
          showsUserLocation={true}
          minZoomLevel={10}
          maxZoomLevel={15}
          scrollEnabled={true}
          loadingEnabled={true}
        >
          <Marker coordinate={mapRegion} title={shopName} />
        </MapView>
      </View>
    );
  } else {
    map = null;
  }
  return (
    <>
      <Pressable
        onPress={() => {
          props.Selectshop(props.id);
          props.Selectshopoption(props.Indshop);
        }}

        style={{ marginTop: 10, padding: 10 }}
      >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 6,
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
              color: textColor,
            }}
          >
            {distance} kms
          </Text>
        </View>
        <View style={{ flex: 5 }}>
          <Text
            style={{
              borderWidth: 2,
              paddingVertical: 6,
              fontWeight: "700",
              borderColor: "#0036F4",
              borderRadius: 18,
              textAlign: "center",
              fontFamily: "DMSans",
              color: textColor,
            }}
          >
            {shopName}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 9,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "column", alignSelf: "flex-end",marginLeft:2 }}>
          <Text style={{ fontFamily: "DMSans", color: textColor }}>
            {storeInchargeName}
          </Text>
          <Text style={{ fontFamily: "DMSans", color: textColor }}>
            {address}
          </Text>
          <Text style={{ fontFamily: "DMSans", color: textColor }}>
            {contactNo}
          </Text>
        </View>
        <View style={{ alignSelf: "flex-end", justifyContent: "flex-end" }}>
          <Pressable onPress={() => setShowMap(!showMap)} style={{marginRight:5}}>
            <Text style={{ color: colors.mapcolor }}>{text}</Text>
          </Pressable>
        </View>
      </View>
      {map}
      </Pressable>
    </>
  );
};

export default React.memo(Storemodalcard);
