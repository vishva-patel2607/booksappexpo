
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable
} from "react-native";
import { Platform, StatusBar ,Text} from "react-native";
import {
  Title,
  Paragraph,
  IconButton,
  Button
} from "react-native-paper";
// import DateTimePicker from "@react-native-community/datetimepicker";

 import MapView, { Marker } from "react-native-maps";


const Storemodalcard = (props) => {
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
  const [mapRegion, setmapRegion] = useState({
    latitude: Latitude,
    longitude: Longitude,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  let text = showMap?"Hide Map":"View Map"
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
          style={{ alignSelf: "stretch", height: 200 }}
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
    <><View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <View style={{
        flex: 2,
        marginRight: 10
      }}>
        <Text style={{
          borderWidth: 2,
          paddingVertical: 6,
          fontWeight: "500",
          borderColor: "#0036F4",
          borderRadius: 20,
          textAlign: "center",
          fontFamily: 'DMSans'
        }}>
          {distance} kms
        </Text>

      </View>
      <View style={{ flex: 5 }}>
        <Text style={{
          borderWidth: 2,
          paddingVertical: 6,
          fontWeight: "700",
          borderColor: "#0036F4",
          borderRadius: 20,
          textAlign: "center",
          fontFamily: 'DMSans'
        }}>
          {shopName}
        </Text>

      </View>
    </View>
    <View style={{flexDirection:'row',marginTop:9,justifyContent:'space-between'}}>
      <View style={{flexDirection:'column',alignSelf:'flex-end'}}>
        <Text style={{fontFamily:'DMSans'}}>{storeInchargeName}</Text>
        <Text style={{fontFamily:'DMSans'}}>{address}</Text>
        <Text style={{fontFamily:'DMSans'}}>{contactNo}</Text>
      </View>
      <View style={{alignSelf:'flex-end',justifyContent:'flex-end'}}>
        <Pressable onPress={() => setShowMap(!showMap)}>
        <Text style={{color:'#0036F4'}}>
          {text}
          </Text>
          </Pressable>
      </View>

      </View>
      {map}</>
  );
};

const styles = StyleSheet.create({
  
});

export default React.memo(Storemodalcard);

