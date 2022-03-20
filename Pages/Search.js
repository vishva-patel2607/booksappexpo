

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Pressable,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Divider,IconButton } from "react-native-paper";
import { debounce } from "lodash";
import {
  Text,
  Searchbar,
} from "react-native-paper";
import Queryinfo from "../Components/Queryinfo";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";


let Received = [
  {
    bookname: "Autobiography",
    bookauthor: "Chetan Bhagat",
    bookyear: 2021,
    bookcondition: "Good",
    bookprice: 120,
    bookdistance: "2 km",
  },
];
let Distance = [
  { id: 1, name: "near to far" },
  { id: 2, name: "far to near" },
];
let Price = [
  { id: 3, name: "<250" },
  { id: 4, name: "250-500" },
  { id: 5, name: "500-750" },
  { id: 6, name: ">750" },
];
let Category = [
  { id: 7, name: "Romance" },
  { id: 8, name: "Crime/thriller" },
  { id: 9, name: "Self help" },
  { id: 10, name: "Humor" },
  { id: 11, name: "Science Fiction" },
  { id: 12, name: "Biography" },
  { id: 13, name: "History" },
  { id: 14, name: "Religious" },
];
const SearchRoute = (props) => {
  const [longitude, setLongitude] = useState();
  const [showcategoryoption, setShowcategoryoption] = useState(false);
  const [showdistanceoption, setShowdistanceoption] = useState(false);
  const [showpriceoption, setShowpriceoption] = useState(false);
  const [latitude, setLatitude] = useState();
  const [filterlist,setFilterlist] = useState(new Set());
  const [Receiveddata, setReceiveddata] = useState([]);
  const [count, setCount] = useState(0);
  const [SearchQuery, setSearchQuery] = useState("");
  const [text, setText] = useState("Search for a book");
  const [Message, setMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
  let icon =
    SearchQuery === "" ? (
      <Image source={require("../assets/search.png")} />
    ) : (
      <Image source={require("../assets/searchfilled.png")} />
    );
  
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
    setLocation();
    if (typeof longitude != "undefined" && typeof latitude != "undefined") {
      console.log(SearchQuery);
      fetch("https://booksapp2021.herokuapp.com/Book/Search", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify({
          book_query: SearchQuery,
          longitude: longitude,
          latitude: latitude,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            if (data.message === "All the Books for given query") {
              setReceiveddata(data.response.book_list);
              setMessage(data.message);
            } else {
              setText("No books found");
              setReceiveddata([]);
              setMessage(data.message);
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
    }
  }, [longitude, latitude, count]);

  const Calltochangecount = debounce(() => setCount(!count), 500);

  const onChangeInput = (text) => {
    setSearchQuery(text);
    Calltochangecount();
  };

  const Filterstoshow = () => {
    return (<><View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {[...filterlist].map((val, id) => (
        <View style={{ minwidth: 95, flexWrap: 'wrap', borderRadius: 50, alignItems: 'center', height: 35, backgroundColor: 'white', flexDirection: 'row' }} key={id}>
          <Text style={{ fontFamily: 'DMSans', marginLeft: 5 }}>{val}</Text>
          <Pressable onPress={() => console.log('Pressed')}>
            <IconButton icon="close" size={15} style={{ alignSelf: 'flex-end' }} onPress={(val) => { filterlist.delete(val); console.log(filterlist); } } />
          </Pressable>
        </View>
      ))}
    </View><Divider style={{marginTop:12}}/></>);
  }
  const Bookstoshow = () => {
    if (Receiveddata.length !== 0) {
      return (
        <ScrollView style={{ flex: 1 }}>
          {Receiveddata.map((book, idx) => (
            <Pressable
              key={idx}
              onPress={() =>
                props.navigation.navigate("Bookscreen", { book: book })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 16,
                  marginTop: 17,
                  
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Queryinfo
                    bookname={book.bookname}
                    bookauthor={book.bookauthor}
                    bookcondition={book.bookcondition}
                    bookprice={book.bookprice}
                    bookdistance={book.bookdistance}
                    style={{justifyContent:'flex-start'}}
                  />
                </View>
                <View>
                  {/* <Image
                    source={require("../assets/user.png")}
                    resizeMode="cover"
                  /> */}
                </View>
              </View>
              <Divider style={{ marginTop: 17, height: 2 }} />
            </Pressable>
          ))}
        </ScrollView>
      );
    } else {
      return (
        <View style={{ justifyContent: "center",alignSelf:'center',margin:50 }}>
          <Text>No books found</Text>
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={styles.search}>
        <Searchbar
          placeholder="SEARCH"
          inputStyle={{ fontSize: 13, fontFamily: "DMSans", height: 44 }}
          onChangeText={(text) => onChangeInput(text)}
          value={SearchQuery}
          style={{ backgroundColor: "#FFFFFF", elevation: 2,borderRadius:50,marginHorizontal:15 }}
          icon={() => icon}
        />

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-around",
          
        }}
      >
        <View
          style={{
            flexDirection: "column",
            
            marginTop: 10,
            marginLeft: 10,
            borderColor: "#0036F4",
            borderWidth: 2,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
              width: 100,
              height: 30,
              borderRadius: 20,
              backgroundColor: "white" ,
            }}
            onPress={() => setShowpriceoption(!showpriceoption)}
          >
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "DMSans",
                  fontSize: 14,
                  color:  "black",
                }}
              >
                Price
              </Text>
            </View>
            <Image
              source={require("../assets/arrowdown.png")}
              style={{
                transform: [{ rotate: "0deg" }],
              }}
            />
          </TouchableOpacity>
          {showpriceoption && (
            <View>
              {Price.map((val, id) => {
                return (
                  <TouchableOpacity
                    key={id}
                    style={{
                      height: 30,
                      borderRadius: 10,
                    }}
                    onPress={() => {filterlist.add(val.name)
                    }}
                  >
                    <Text
                      style={{
                        color:"black",
                        fontFamily: "DMSans",
                        fontSize: 14,
                      }}
                    >
                      {val.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "column",
            marginTop: 10,
            marginLeft: 10,
            borderColor: "#0036F4",
            borderWidth: 2,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
              width: 100,
              height: 30,
              borderRadius: 20,
              backgroundColor:'white',
              
            }}
            onPress={() => setShowcategoryoption(!showcategoryoption)}
          >
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "DMSans",
                  fontSize: 14,
                  color: "black",
                }}
              >
                Category
              </Text>
            </View>
            <Image
              source={require("../assets/arrowdown.png")}
              style={{
                transform: [{ rotate: "0deg" }],
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          {showcategoryoption && (
            <View>
              {Category.map((val, id) => {
                return (
                  <TouchableOpacity
                    key={id}
                    style={{
                      paddingVertical: 8,
                      height: 30,
                      borderRadius: 10,
                    }}
                    onPress={() => {filterlist.add(val.name)
                      }}
                  >
                    <Text
                      style={{
                        color:'black',
                        fontFamily: "DMSans",
                        fontSize: 14,
                      }}
                    >
                      {val.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "column",
            marginTop: 10,
            marginLeft: 10,
            borderColor: "#0036F4",
            borderWidth: 2,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
              width: 100,
              height: 30,
              borderRadius: 20,
              backgroundColor:"white",
                
            }}
            onPress={() => setShowdistanceoption(!showdistanceoption)}
          >
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "DMSans",
                  fontSize: 14,
                  color:  "black",
                }}
              >
                Distance
              </Text>
            </View>
            <Image
              source={require("../assets/arrowdown.png")}
              style={{
                transform: [{ rotate: "0deg" }],
              }}
            />
          </TouchableOpacity>
          {showdistanceoption && (
            <View>
              {Distance.map((val, id) => {
                return (
                  <TouchableOpacity
                    key={id}
                    style={{
                      paddingVertical: 8,
                      height: 30,
                      borderRadius: 10,
                    }}
                    onPress={() => {filterlist.add(val.name)
                     }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "DMSans",
                        fontSize: 14,
                      }}
                    >
                      {val.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </View>
      <Divider style={{ height: 2,marginTop:12,marginBottom:12 }} />
      <Filterstoshow />
      
      <Bookstoshow />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },

  search: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor:'#ECEFEE',
  },

});

export default React.memo(SearchRoute);

