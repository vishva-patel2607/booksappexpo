import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import Addtopickups from "../Components/Addtopickups";
import Queryinfo from "../Components/Queryinfo";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { Text,Button } from "react-native-paper";
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ECEFEE" }}>
      <View style={{ justifyContent: "flex-start" }}>
        <Pressable onPress={() => props.navigation.navigate("Search")}>
          <Image
            source={require("../assets/Backbutton.png")}
            style={{ marginLeft: 19, marginTop: 18 }}
          />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 12,
          marginTop: 37,
        }}
      >
        {/* <View style={{marginLeft:12,backgroundColor:'black'}}> */}
        <Queryinfo
          bookname={book.book_name}
          bookauthor={book.book_author}
          bookcondition={book.book_condition}
          bookprice={book.book_price}
          bookyear={book.book_year}
        />
        {/* </View> */}
        <View>
          <Image
            source={require("../assets/Demobook.png")}
            resizeMode="cover"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginHorizontal: 12,
          marginVertical: 12,
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
              borderRadius: 20,
              textAlign: "center",
              fontFamily: "DMSans",
            }}
          >
            {book.store_distance}
          </Text>
        </View>
        <View style={{ flex: 5 }}>
          <Text
            style={{
              borderWidth: 2,
              paddingVertical: 6,
              fontWeight: "700",
              borderColor: "#0036F4",
              borderRadius: 20,
              textAlign: "center",
              fontFamily: "DMSans",
            }}
          >
            Nirma Store
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: 12,
          marginTop: 9,
        }}
      >
        <Text style={styles.textStyle}>{book.store_incharge}</Text>
        <Text style={styles.textStyle}>{book.store_address}</Text>
        <Text style={styles.textStyle}>{book.store_number}</Text>
      </View>
      <View style={{ marginHorizontal: 12, marginTop: 9 }}>
        <MapView
          style={{ alignSelf: "stretch", height: 121, borderRadius: 10 }}
          region={{
            latitude: book.store_latitude,
            longitude: book.store_longitude,
            latitudeDelta: book.latitudeDelta,
            longitudeDelta: book.longitudeDelta,
          }}
          showsUserLocation={true}
          minZoomLevel={10}
          maxZoomLevel={15}
          scrollEnabled={true}
          loadingEnabled={true}
        >
          <Marker
            coordinate={{
              latitude: book.store_latitude,
              longitude: book.store_longitude,
              latitudeDelta: book.latitudeDelta,
              longitudeDelta: book.longitudeDelta,
            }}
            title={"Nirma Store"}
          />
        </MapView>
      </View>
      <View style={{justifyContent:'flex-end',flex:1}}>
      <Pressable style={{justifyContent:'flex-end',alignSelf:'center'}}>
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
              fontSize: 14,
              color: "white",
              flexDirection: "row",
              fontFamily: "DMSansbold",
            }}
            onPress={addtopickup}
            mode="contained"
          >
            Add to pickups
          </Button>
      </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "DMSans",
    fontSize: 16,
    marginBottom: 2,
  },
});

export default React.memo(Bookscreen);
