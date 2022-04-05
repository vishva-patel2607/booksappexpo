import React, { useState, useEffect, useContext } from "react";
import { useTheme } from "@react-navigation/native";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Pressable,
  StatusBar,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import Divider from "../Components/Divider";
import { ThemeContext } from "../Components/Theme";
import {  IconButton } from "react-native-paper";
import { debounce } from "lodash";
import { Text, Searchbar } from "react-native-paper";
import Queryinfo from "../Components/Queryinfo";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { Category, Distance, Price } from "../Components/filters.js";

const SearchRoute = (props) => {
  const { colors } = useTheme();
  const { setTheme, Theme } = useContext(ThemeContext);
  const [longitude, setLongitude] = useState();
  const [showcategoryoption, setShowcategoryoption] = useState(false);
  const [showdistanceoption, setShowdistanceoption] = useState(false);
  const [distancefilterlist,setDistancefilterlist] = useState(new Set());
  const [showpriceoption, setShowpriceoption] = useState(false);
  const [latitude, setLatitude] = useState();
  const [filterlist, setFilterlist] = useState(new Set());
  const [pricefilterlist,setPricefilterlist] = useState(new Set());
  const [Receiveddata, setReceiveddata] = useState([]);
  const [count, setCount] = useState(0);
  const [SearchQuery, setSearchQuery] = useState("");
  const [text, setText] = useState("Search for a book");
  const [Message, setMessage] = useState("");
  const [inset,setInset] = useState(1);
  const [categoryfilterset, setCategoryfilterset] = useState(new Set());
  const [pricefilter, setPricefilter] = useState(0);
  const [distancefilter, setDistancefilter] = useState(0);
  const [filtercount, setFiltercount] = useState(0);
  const [refreshcount, setRefreshCount] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setRefreshCount(count + 1);
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let pricefilterobj = { "<250": 1, "250-500": 2, "500-750": 3, ">750": 4 };
  let distancefilterobj = {"near to far":1,"far to near": 2}

  useEffect(() => {

    setRefreshing(props.route.params?.refreshing);
    setRefreshCount(count + 1);
  }, [props.route.params?.refreshing]);

  const removefilter = (val) => {
    console.log(pricefilterobj[val],[...pricefilterlist],'pricef');
    if ([...categoryfilterset].indexOf(val) !== -1) {
      filterlist.delete(val);
      categoryfilterset.delete(val);
      console.log(categoryfilterset);
      setFiltercount(filtercount - 1);
    } else if([...pricefilterlist].includes(val)) {
      pricefilterlist.clear();
      setPricefilter(0);
      setFiltercount(filtercount - 1);
    }
    else{
      distancefilterlist.clear();
      setDistancefilter(0);
      setFiltercount(filtercount-1);
    }
  };
  let arrowdown =
    Theme === "Light" ? (
      <Image
        source={require("../assets/arrowdown.png")}
        style={{
          transform: [{ rotate: "0deg" }],
        }}
        resizeMode="cover"
      />
    ) : (
      <Image
        source={require("../assets/chevrondowndark.png")}
        style={{
          transform: [{ rotate: "0deg" }],
        }}
        resizeMode="cover"
      />
    );
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
      console.log(pricefilter,distancefilter)
      fetch(`https://booksapp2021.herokuapp.com/Book/Search/${inset}`, {
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
          price_filter: pricefilter,
          genre_filter: [...categoryfilterset],
          distance_filter: distancefilter
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            if (data.response.book_list.length!==0) {
              console.log(data);
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
    setRefreshing(false);
  }, [longitude, latitude, count,inset,pricefilter,distancefilter,categoryfilterset,refreshcount]);

  const Calltochangecount = debounce(() => setCount(!count), 500);

  const onChangeInput = (text) => {
    setSearchQuery(text);
    Calltochangecount();
  };

  return (
    <SafeAreaView style={styles.search}>
      <Searchbar
        placeholder="SEARCH"
        inputStyle={{
          fontSize: 14,
          fontFamily: "DMSans",
          justifyContent: "center",
        }}
        onChangeText={(text) => onChangeInput(text)}
        value={SearchQuery}
        style={{
          backgroundColor: "#FFFFFF",
          elevation: 2,
          borderRadius: 50,
          marginHorizontal: 15,
        }}
        icon={() => icon}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginHorizontal: 15,
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.filtercontainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touchableopacitystyle}
            onPress={() => setShowpriceoption(!showpriceoption)}
          >
            <View>
              <Text
                style={{
                  justifyContent: "center",
                  fontFamily: "DMSans",
                  fontSize: 14,
                  color: colors.text,
                }}
              >
                Price
              </Text>
            </View>
            {arrowdown}
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
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      alignItems: "flex-start",
                    }}
                    onPress={() => {
                      pricefilterlist.clear();
                      pricefilterlist.add(val.name);
                      setPricefilter(val.id);
                      setFiltercount(filtercount + 1);
                    }}
                  >
                    <Text
                      style={{
                        color: colors.text,
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
        <View style={styles.filtercontainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touchableopacitystyle}
            onPress={() => setShowcategoryoption(!showcategoryoption)}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "DMSans",
                  fontSize: 14,
                  color: colors.text,
                }}
              >
                Category
              </Text>
            </View>
            {arrowdown}
          </TouchableOpacity>
          {showcategoryoption && (
            <View>
              {Category.map((val, id) => {
                return (
                  <TouchableOpacity
                    key={id}
                    style={{
                      paddingVertical: 5,
                      paddingLeft: 10,
                      alignItems: "flex-start",
                      height: 30,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      filterlist.add(val.name);
                      categoryfilterset.add(val.name);
                      setFiltercount(count + 1);
                    }}
                  >
                    <Text
                      style={{
                        color: colors.text,
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
        <View style={styles.filtercontainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touchableopacitystyle}
            onPress={() => setShowdistanceoption(!showdistanceoption)}
          >
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "DMSans",
                  fontSize: 14,
                  color: colors.text,
                }}
              >
                Distance
              </Text>
            </View>
            {arrowdown}
          </TouchableOpacity>
          {showdistanceoption && (
            <View>
              {Distance.map((val, id) => {
                return (
                  <TouchableOpacity
                    key={id}
                    style={{
                      paddingVertical: 5,
                      height: 30,
                      borderRadius: 10,
                      paddingLeft: 10,
                    }}
                    onPress={() => {
                      distancefilterlist.clear();
                      distancefilterlist.add(val.name);
                      setDistancefilter(val.name);
                      setFiltercount(count + 1);
                    }}
                  >
                    <Text
                      style={{
                        color: colors.text,
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
      <Divider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {[...filterlist,...pricefilterlist,...distancefilterlist].map((val, id) => (
          <View
            style={{
              minwidth: 95,
              flexWrap: "wrap",
              borderRadius: 50,
              alignItems: "center",
              height: 35,
              backgroundColor:
                colors.background === "#ECEFEE" ? "white" : '#0036F4',
              flexDirection: "row",
              marginBottom: 5,
              marginTop: 5,
              marginLeft: 10,
            }}
            key={id}
          >
            <Text
              style={{
                fontFamily: "DMSans",
                marginLeft: 5,
                color: colors.text,
              }}
            >
              {val}
            </Text>
            <Pressable onPress={() => removefilter(val)} >
              <IconButton
                icon="close"
                color={Theme==='Light'?'black':'white'}
                size={15}
                style={{ alignSelf: "flex-end" }}
                
              />
            </Pressable>
          </View>
        ))}
      </View>
      {[...filterlist].length !== 0 && (
        <Divider  />
      )}

      {Receiveddata.length !== 0 && (
        <ScrollView style={{ flex: 1 }} onScrollEndDrag={() => {
          setInset(inset+1) 
        }}  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
                  marginHorizontal: 16,
                  marginTop: 10,
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Queryinfo
                    bookname={book.book_name}
                    bookauthor={book.book_author}
                    bookcondition={book.book_condition}
                    bookprice={book.book_price}
                    bookdistance={book.store_distance}
                    style={{ justifyContent: "flex-start" }}
                  />
                </View>
                <View style={{ alignSelf: "flex-end" }}>
                  <Image
                    source={{ uri: book.book_img }}
                    style={{ height: 100, width: 100, borderRadius: 10 }}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: 17,
                  height: 1,
                  backgroundColor:
                    colors.text === "#000000" ? "#6E7A7D" : colors.text,
                }}
              />
            </Pressable>
          ))}
        </ScrollView>
      )}
      {Receiveddata.length == 0 && (
        <View
          style={{ justifyContent: "center", alignSelf: "center", margin: 50 }}
        >
          <Text
            style={{ fontFamily: "DMSans", fontSize: 16, color: colors.text }}
          >
            No books found
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  search: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  touchableopacitystyle: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: 100,
    height: 30,
    borderRadius: 20,
  },
  filtercontainer: {
    flexDirection: "column",
    marginTop: 10,

    borderColor: "#0036F4",
    borderWidth: 2,
    borderRadius: 20,
  },
});

export default React.memo(SearchRoute);
