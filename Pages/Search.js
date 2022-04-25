import React, { useState, useEffect, useContext } from "react";
import { useTheme } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
  RefreshControl
} from "react-native";
import { logoutUser } from "../actions";
import Searchresult from "../Components/Searchresult";
import { ThemeContext } from "../Components/Theme";
import { IconButton } from "react-native-paper";
import { styles } from "../Styles/Searchstyles";
import { debounce } from "lodash";
import { Text, Searchbar, Divider } from "react-native-paper";
import SearchbarIcon from "../Svg/Searchbaricon.js";
import SearchbarIconFilled from "../Svg/Searchbariconfilled";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { Category, Condition, Price } from "../Components/filters.js";
import Seperator from "../Components/Seperator";


const SearchRoute = (props) => {
  const { colors } = useTheme();
  const { setTheme, Theme } = useContext(ThemeContext);
  const [longitude, setLongitude] = useState();
  const [showcategoryoption, setShowcategoryoption] = useState(false);
  const [showpricedown, setShowpricedown] = useState(false);
  const [showcategorydown, setShowcategorydown] = useState(false);
  const [showdistancedown, setShowdistancedown] = useState(false);
  const [flag, setFlag] = useState(true);
  const [showdistanceoption, setShowdistanceoption] = useState(false);
  const [distancefilterlist, setDistancefilterlist] = useState(new Set());
  const [showpriceoption, setShowpriceoption] = useState(false);
  const [latitude, setLatitude] = useState();
  const [filterlist, setFilterlist] = useState(new Set());
  const [pricefilterlist, setPricefilterlist] = useState(new Set());
  const [Receiveddata, setReceiveddata] = useState([]);
  const [count, setCount] = useState(0);
  const [SearchQuery, setSearchQuery] = useState("");
  const [text, setText] = useState("Search for a book");
  const [inset, setInset] = useState(1);
  const [categoryfilterset, setCategoryfilterset] = useState(new Set());
  const [conditionfilterset,setConditionfilterset] = useState(new Set());
  const [pricefilter, setPricefilter] = useState(0);
  const [filtercount, setFiltercount] = useState(0);
  const [refreshing, setRefreshing] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const loadbooks = () => {
    setLocation();
    if (
      typeof longitude != "undefined" &&
      typeof latitude != "undefined" 
  
    ) {
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
          condition_filter: [...conditionfilterset],
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            if(inset===1){
              if (data.response.book_list.length !== 0) {
                   setReceiveddata(data.response.book_list);
                   setRefreshing(false);
                 } else {
                   setText("No books found");
                   setReceiveddata([]);
                   setRefreshing(false);
                 }
            }
            else{
              if (data.response.book_list.length !== 0) {
                setReceiveddata([...Receiveddata,data.response.book_list]);
                setRefreshing(false);
              } else {
                setText("No books found");
                setReceiveddata(Receiveddata);
                setRefreshing(false);
              }  
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
  }


  const renderData = ({ item }) => (
    <Pressable
      // key={idx}
      onPress={() => props.navigation.navigate("Bookscreen", { book: item })}
    >
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 16,
          marginTop: 6,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-equal",

            paddingBottom: 10,
          }}
        >
          <Searchresult
            bookname={item.book_name}
            bookauthor={item.book_author}
            bookcondition={item.book_condition}
            bookprice={item.book_price}
            bookdistance={item.store_distance}
            booktype={item.transaction_type}
          />
        </View>
        <View style={{ alignSelf: "flex-end" }}>
          <Image
            source={{ uri: item.book_img }}
            style={{ height: 112.5, width: 80, borderRadius: 10 }}
            resizeMode="cover"
          />
        </View>
      </View>
    </Pressable>
  );

  const removefilter = (val) => {
    
    if ([...categoryfilterset].indexOf(val) !== -1) {
      filterlist.delete(val);
      categoryfilterset.delete(val);
      setFiltercount(filtercount - 1);
      setInset(1);
    } else if ([...pricefilterlist].includes(val)) {
      pricefilterlist.clear();
      setPricefilter(0);
      setFiltercount(filtercount - 1);
      setInset(1);
    } else {
      filterlist.delete(val)
      conditionfilterset.delete(val.toLowerCase());
      setFiltercount(filtercount - 1);
      setInset(1);
    }
  };
  let arrowdown =
    Theme === "Light" ? (
      <Image
        source={require("../assets/arrowdown.png")}
        style={{
          transform: [{ rotate: showdistancedown ? "180deg" : "0deg" }],
        }}
        resizeMode="cover"
      />
    ) : (
      <Image
        source={require("../assets/chevrondowndark.png")}
        style={{
          transform: [{ rotate: showdistancedown ? "180deg" : "0deg" }],
        }}
        resizeMode="cover"
      />
    );
  let icon =
    SearchQuery === "" ? (
      <SearchbarIcon />
    ) : (
      <SearchbarIconFilled />
    );

  const Emptymessage = () => {
    return(
      <Text style={{fontFamily:'DMSans',fontSize:16,marginTop:40,alignSelf:'center',color:colors.text}}>
        No books found
      </Text>
    )
  }

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
    console.log(pricefilter,[...categoryfilterset],[...conditionfilterset])
    setLocation();
    if (
      typeof longitude != "undefined" &&
      typeof latitude != "undefined" 
    ) {
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
          condition_filter: [...conditionfilterset],
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.status) {
            if(inset===1){
              if (data.response.book_list.length !== 0) {
                   setReceiveddata(data.response.book_list);
                   setRefreshing(false);
                 } else {
                   setReceiveddata([]);
                   setRefreshing(false);
                 }
            }
            else{
              if (data.response.book_list.length !== 0) {
                setReceiveddata([...Receiveddata,data.response.book_list]);
                setRefreshing(false);
              } else {
                setReceiveddata(Receiveddata);
                setRefreshing(false);
              }  
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
  }, [
    inset,
    count,
    longitude,
    latitude,
    filtercount,
    filterlist,
    flag
  ]);

  const Calltochangecount = debounce(() => setCount(!count), 500);

  const onChangeInput = (text) => {
    setInset(1);
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
          justifyContent: "space-between",
        }}
      >
        <View style={styles.filtercontainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touchableopacitystyle}
            onPress={() => {
              setShowpriceoption(!showpriceoption);
              setShowpricedown(!showpricedown);
            }}
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
            {Theme === "Light" ? (
              <Image
                source={require("../assets/arrowdown.png")}
                style={{
                  transform: [{ rotate: showpricedown ? "180deg" : "0deg" }],
                }}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("../assets/chevrondowndark.png")}
                style={{
                  transform: [{ rotate: showpricedown ? "180deg" : "0deg" }],
                }}
                resizeMode="cover"
              />
            )}
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
                      setInset(1);
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
            style={{
              alignItems: "center",
              // paddingHorizontal:10,
              flexDirection: "row",
              justifyContent:'space-around',
              width:125,
              height: 30,
              borderRadius: 20,
            }}
            onPress={() => {
              setShowcategoryoption(!showcategoryoption);
              setShowcategorydown(!showcategorydown);
            }}
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
                Category
              </Text>
            </View>
            {Theme === "Light" ? (
              <Image
                source={require("../assets/arrowdown.png")}
                style={{
                  transform: [{ rotate: showcategorydown ? "180deg" : "0deg" }],
                  
                }}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("../assets/chevrondowndark.png")}
                style={{
                  transform: [{ rotate: showcategorydown ? "180deg" : "0deg" }],
                }}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
          {showcategoryoption && (
            <View>
              {Category.map((val, id) => {
                return (
                  <TouchableOpacity
                    key={id}
                    style={{
                      height: 30,
                      borderRadius: 10,
                      paddingVertical: 5,
                      paddingHorizontal: 12,
                      alignItems: "flex-start",
                    }}
                    onPress={() => {
                      filterlist.add(val.name);
                      categoryfilterset.add(val.name);
                      setFiltercount(filtercount + 1);
                      setInset(1);
                    }}
                  >
                    <Text
                      style={{
                        color: colors.text,
                        fontFamily: "DMSans",
                        fontSize: 14,
                      }}
                      numberOfLines={2}
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
            onPress={() => {
              setShowdistanceoption(!showdistanceoption);
              setShowdistancedown(!showdistancedown);
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "DMSans",
                  fontSize: 14,
                  color: colors.text,
                  paddingLeft:5,
                }}
              >
                Condition
              </Text>
            </View>
            {arrowdown}
          </TouchableOpacity>
          {showdistanceoption && (
            <View>
              {Condition.map((val, id) => {
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
                      filterlist.add(val.name);
                      conditionfilterset.add(val.name.toLowerCase());
                      
                      setFiltercount(count + 1);
                      setInset(1);
                      setFlag(!flag);
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
      <Divider
        style={{
          marginTop: 10,
          backgroundColor: colors.text === "#000000" ? "#6E7A7D" : "white",
          height: 0.6,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {[...filterlist, ...pricefilterlist].map(
          (val, id) => (
            <View
              style={{
                minwidth: 95,
                flexWrap: "wrap",
                borderRadius: 50,
                alignItems: "center",
                height: 35,
                backgroundColor:
                  colors.background === "#ECEFEE" ? "white" : "#0036F4",
                flexDirection: "row",
                marginTop: 5,
                marginLeft: 10,
                paddingLeft: 8,
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
              <Pressable onPress={() => removefilter(val)}>
                <IconButton
                  icon="close"
                  color={Theme === "Light" ? "black" : "white"}
                  size={15}
                  style={{ alignSelf: "flex-end" }}
                />
              </Pressable>
            </View>
          )
        )}
      </View>
      {([...filterlist].length !== 0 ||
        [...pricefilterlist].length !== 0 ||
        [...distancefilterlist].length !== 0) && (
        <Divider
          style={{
            marginTop: 10,
            backgroundColor: colors.text === "#000000" ? "#6E7A7D" : "white",
            height: 0.6,
          }}
        />
      )}

      <FlatList
        data={Receiveddata}
        renderItem={renderData}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if(Receiveddata.length>=10){
          setInset(inset+1)
        }}}
        ItemSeparatorComponent={Seperator}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent = {Emptymessage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadbooks} />
        }

      />
    </SafeAreaView>
  );
};


export default React.memo(SearchRoute);
