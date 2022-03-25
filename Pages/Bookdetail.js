import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Pressable,
  Alert
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Title, Text } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";

const BookDetail = (props) => {
  return (
    <View>
      <Text style={styles.BookDetailTitle}>{props.title}</Text>
      <Text style={styles.BookDetailValue}>{props.value}</Text>
    </View>
  );
};

const type ={ 
  "LENT":'Lent',
  "SOLD":'Sold',
  "BORROWED":'Borrowed',
  "BOUGHT":'Bought'
}



const Bookdetail = (props) => {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
const removebook = () => {
  if(props.route.params.title==="BORROWED" || props.route.params.title==="BOUGHT"){
    fetch(`https://booksapp2021.herokuapp.com/Book/${type[props.route.params.title]}/Remove`, {
      method: "DELETE",
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
  }
  else{
    fetch(`https://booksapp2021.herokuapp.com/Book/${type[props.route.params.title]}/Remove`, {
      method: "DELETE",
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
        if (data.status) {
          console.log(data);
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
          console.log(data);
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
  }
  
}

  const [book, setBook] = useState(props.route.params.book);
  var status;
  if(book.book_transaction_status===undefined){
    status = book.book_status
  }
  else{
    status = book.book_transaction_status
  }
  const [mapRegion, setmapRegion] = useState({
    latitude: book.store.store_latitude,
    longitude: book.store.store_longitude,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  return (
    <ScrollView>
      <SafeAreaView style={styles.main}>
        <Pressable onPress={() => props.navigation.navigate("Home")}>
          <Image
            source={require("../assets/Backbutton.png")}
            style={{ marginLeft: 20, marginTop: 18 }}
          />
        </Pressable>
        <Title style={styles.title}>{props.route.params.title}</Title>

        <View style={styles.layout}>
          <View style={styles.fields}>
            <View>
              <BookDetail title={"Code"} value={book.book_transaction_code} />
              <BookDetail title={"ISBN Code"} value={book.book_isbn} />
              <BookDetail title={"Name of the book"} value={book.book_name} />
              <BookDetail title={"Author"} value={book.book_author} />
              <BookDetail title={"Price"} value={book.book_price} />
              <BookDetail title={"Condition"} value={book.book_condition} />
              <BookDetail
                title={"Status"}
                value={status}
              />
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
                  uri: book.book_img,
                }}
              />
            </View>
            {(props.route.params.title === "LENT" || props.route.params.title === "SOLD") && (
              <Button style={styles.button} color="#ffffff" onPress={() =>
                props.navigation.navigate("Edituploadedbook", {
                  book: book,
                })
              }>
                EDIT
              </Button>
            )}
            <Button style={styles.button} color="#ffffff" onPress={removebook}>
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
            <Text style={styles.shopDetails}>{book.store.store_name}</Text>
          </View>
        </View>

        <View style={{ marginLeft: 20 }}>
          <Text style={styles.storeDetails}>{book.store.store_incharge} </Text>
          <Text style={styles.storeDetails}>{book.store.store_address}</Text>
          <Text style={styles.storeDetails}>{book.store.store_number}</Text>
        </View>
        <View style={styles.map}>
          <View
            style={{
              marginTop: 5,
              borderRadius: 10,
              marginLeft: 20,
              marginRight: 20,
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

export default Bookdetail;

const styles = StyleSheet.create({
  
  title: {
    marginTop: 20,
    marginLeft: 20,
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
    marginLeft: 20,
    fontSize: 14,
    color: "#6E7A7D",
    marginBottom: 5,
    fontFamily: "DMSans",
  },
  BookDetailValue: {
    marginLeft: 20,
    fontFamily: "DMSans",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#6E7A7D",
    color: "#0D1936",
    borderColor: "#0D1936",
    fontSize: 17,
  },

  aside: {
    width: "40%",
    height: 330,
    marginRight: 20,
  },
  button: {
    marginHorizontal: "auto",
    marginTop: 20,
    backgroundColor: "#E96A59",
    fontWeight: "700",
    borderRadius: 50,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  shop: {
    marginVertical: 20,
  },

  shopDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 20,
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
  storeDetails: {
    lineHeight: 20,
    fontFamily: "DMSans",
  },
  map: {
    marginBottom: 20,
  },
});
