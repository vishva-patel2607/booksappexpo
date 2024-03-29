import React, { useEffect, useState } from "react";
import { Text, View, Image, Dimensions, StyleSheet,Pressable } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions";
import { scrollInterpolator, animatedStyles } from "./animations";
import Carousel from "react-native-snap-carousel";
import { ThemeContext } from "./Theme";
import Bubbles from "../Svg/Bubbles";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
import { useNavigation } from '@react-navigation/native';
import { Alerttypes } from "./Alertypes";
function Alert() {
  const [data, setData] = useState([]);
  const navigation = useNavigation(); 
  const [index,setIndex] = useState();
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { Theme } = React.useContext(ThemeContext);
  let cardcolor = Theme === "Light" ? "#ECEFEE" : "#0D1936";
  
  const renderItem = ({ item }) => {
    let buttontype = item.book_transaction_default === "BORROWED_BOOK_NOT_RETURNED" ? "Claim lost" : "Remove"
    let textalign = item.book_transaction_default === "BORROWED_BOOK_NOT_RETURNED" ? "flex-start" : "center"
    let defaulttext = Alerttypes[item.book_transaction_default]
    return (
      <>
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 20,
            backgroundColor: cardcolor,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.9,
            marginVertical: 10,
          }}
          key={data.indexOf(item.id)}
        >
          <View
            style={{
              
              paddingTop: 20,
              
              flexDirection: "row",
              justifyContent: "space-around",
              borderRadius:20,
            }}
          >
            <View style={{paddingLeft:20}}>
              <Image
                source={{
                  uri: item.book_img,
                }}
                style={{ width: 120, height: 150, borderRadius: 20 }}
                resizeMode="stretch"
              />
              <View style={{ paddingTop: 20 }}>
                
                <Text
                  style={{
                    fontWeight: "700",
                    fontFamily: "DMSans",
                    fontSize: 16,
                    color: '#E96A59',
                  }}
                >
                 {item.book_name}
                </Text>
                <Text
                  style={{
                    fontWeight: "500",
                    marginTop: 10,
                    fontFamily: "DMSans",
                    fontSize: 16,
                    color: '#E96A59',
                  }}
                  numberOfLines={2}
                >
                  {defaulttext}
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    marginTop: 10,
                    fontFamily: "DMSansbold",
                    fontSize: 16,
                    color: '#E96A59',
                  }}
                >
                  TYPE
                </Text>
                <Text
                  style={{
                    fontWeight: "500",
                    marginBottom: 15,
                    fontFamily: "DMSans",
                    fontSize: 16,
                    color: '#E96A59',
                  }}
                >
                  {item.book_transaction_type}
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                marginTop: 20,
                height: 120,
                justifyContent: "space-around",
                marginLeft:'auto',
                marginRight:20,
              }}
            >
              <Button
                mode="contained"
                style={{
                  width: 150,
                  borderRadius: 50,
                  height: 45,
                  justifyContent: "center",
                  alignItems:textalign,
                  backgroundColor: "#E96A59",
                }}
                labelStyle={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#ECEFEE",
                }}
              >
                {buttontype}
              </Button>
              <Pressable onPress={() => navigation.navigate("Alertbookscreen", { book: item })}  style={({ pressed }) => [
              pressed ? { opacity: 0.9 } : {},
              ]}>
              <Button
                mode="contained"
                style={{
                  width: 150,
                  borderRadius: 50,
                  height: 45,
                  justifyContent: "center",
                  backgroundColor: "#E96A59",
                }}
                labelStyle={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#ECEFEE",
                }}
              >
                View
              </Button>
              </Pressable>
            </View>
          </View>
        </View>
        {count > 1 && index!==data.length-1 && (
          <View style={{ marginHorizontal: 20, alignItems: "flex-end" }}>
            <View>
              <View style={{ marginLeft: "auto" }}>
                <Bubbles />
              </View>
              <Text
                style={{
                  fontWeight: "400",
                  fontFamily: "DMSansbold",
                  color: "#E96A59",
                }}
              >
                Swipe for more
              </Text>
            </View>
          </View>
        )}
      </>
    );
  };

  useEffect(() => {
    
    fetch("https://booksapp2021.herokuapp.com/Book/Alerts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        if (data.status) {
          
          setData(data.response.books);

          setCount(data.response.books.length);

        } else {
          setCount(2);
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch((error) => {
        
      });
  }, []);

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={SLIDER_WIDTH}
      itemWidth={ITEM_WIDTH}
      containerCustomStyle={styles.carouselContainer}
      inactiveSlideShift={0}
      scrollInterpolator={scrollInterpolator}
      slideInterpolatedStyle={animatedStyles}
      useScrollView={true}
      activeSlideOffset={1}
      enableMomentum={true}
      decelerationRate={0.99}
      onSnapToItem={(index) => setIndex(index)}
    />
  );
}

export default React.memo(Alert);

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 10,
    alignSelf: "center",
  },
  itemLabel: {
    color: "white",
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
