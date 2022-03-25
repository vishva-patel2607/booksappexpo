

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
import {Category,Distance,Price,Received} from '../Components/filters.js';



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
  const [categoryfilterlist,setCategoryfilterlist]= useState(new Set());
  const [pricefilterlist,setPricefilterlist] = useState(new Set());
  const [filtercount,setFiltercount] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let pricefilterobj = {"<250":1,"250-500":2,"500-750":3,">750":4}

  const removefilter = (val) => {

    if([...categoryfilterlist].indexOf(val)!==-1){
      filterlist.delete(val);
      categoryfilterlist.delete(val);
      setFiltercount(filtercount-1);
    }
    else{
      console.log(typeof(val));
      filterlist.delete(val);
      pricefilterlist.delete(pricefilterobj[val]);
      setFiltercount(filtercount-1);
    }
  }
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
          price_filter: [...pricefilterlist],
          genre_filter: [...categoryfilterlist]
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
              console.log(data.message);
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
  }, [longitude, latitude, count,filtercount]);

  const Calltochangecount = debounce(() => setCount(!count), 500);

  const onChangeInput = (text) => {
    setSearchQuery(text);
    Calltochangecount();
  };

  return (
    <SafeAreaView style={styles.search}>
        <Searchbar
          placeholder="SEARCH"
          inputStyle={{ fontSize: 14, fontFamily: "DMSans", justifyContent:'center' }}
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
          style={styles.filtercontainer}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touchableopacitystyle}
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
                    onPress={() => {
                      filterlist.add(val.name)
                      pricefilterlist.add(val.id)
                      console.log(pricefilterlist,'value added');
                      setFiltercount(filtercount+1)
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
         style={styles.filtercontainer}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touchableopacitystyle}
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
                      categoryfilterlist.add(val.name)
                      setFiltercount(count+1)
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
          style={styles.filtercontainer}
        >
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
      <Divider style={{ height: 2,marginTop:12 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {[...filterlist].map((val, id) => (
        <View style={{ minwidth: 95, flexWrap: 'wrap', borderRadius: 50, alignItems: 'center', height: 35, backgroundColor: 'white', flexDirection: 'row',marginBottom:5,marginTop:5 }} key={id}>
          <Text style={{ fontFamily: 'DMSans', marginLeft: 5 }}>{val}</Text>
          <Pressable onPress={() => console.log('Pressed')}>
            <IconButton icon="close" size={15} style={{ alignSelf: 'flex-end' }} onPress={() => removefilter(val)} />
          </Pressable>
        </View>
      ))}
    </View>
    {[...filterlist].length!==0 && (
        <Divider style={{height:2,marginTop:12}} />
    )}
      
      
      {Receiveddata.length!==0 && (
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
                  bookname={book.book_name}
                  bookauthor={book.book_author}
                  bookcondition={book.book_condition}
                  bookprice={book.book_price}
                  bookdistance={book.store_distance}
                  style={{justifyContent:'flex-start'}}
                />
              </View>
              <View>
                <Image
                  source={{uri:book.book_img}}
                  resizeMode="cover"
                />
              </View>
            </View>
            <Divider style={{ marginTop: 17, height: 2 }} />
          </Pressable>
        ))}
      </ScrollView>

      )}
      {Receiveddata.length==0 && (
        <View style={{ justifyContent: "center",alignSelf:'center',margin:50 }}>
        <Text style={{fontFamily:'DMSans',fontSize:16}}>No books found</Text>
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
  touchableopacitystyle:{
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: 100,
    height: 30,
    borderRadius: 20,
  
  },
  filtercontainer:{
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 10,
    borderColor: "#0036F4",
    borderWidth: 2,
    borderRadius: 20,
  }
});

export default React.memo(SearchRoute);

