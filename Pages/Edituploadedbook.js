import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  Pressable,
  Image,
  
} from "react-native";
import StaticText from "../Components/StaticText";
import Findashop from "../Components/Findashop";
import Changeshop from "../Components/Changeshop";
import RNPickerSelect from "react-native-picker-select";
import { BarCodeScanner } from "expo-barcode-scanner";
import Svg, { Path } from "react-native-svg";
import { logoutUser } from "../actions";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";


const Edituploadedbook = (props) => {
  
  const [Bookdata, setBookdata] = useState(props.route.params?.book);
  const [price, setPrice] = useState("");
  const [imgurl, setImgurl] = useState(null);
  const [name, setName] = useState("");
  let [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState(null);
  const [shop, setShop] = useState(null);
  const [category, setCategory] = useState("");
  const [bookCondition, setbookCondition] = useState("");
  const [NewCondition, setNewCondition] = useState(
    props.route.params?.book.book_condition
  );
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (
      props.route.params?.photo !== null &&
      props.route.params?.photo !== undefined
    ) {
      var photouri = props.route.params?.photo.uri;

      var imagedata = {
        uri: photouri,
        type: "image/jpeg",
        name: "photo.jpg",
      };

      if (imgurl) {
        changeImage(imagedata);
        console.log("Changed image");
      } else {
        uploadNewImage(imagedata);
        console.log("New image upload");
      }
    }
  }, [props.route.params?.photo]);



  const [NewImg, setNewImg] = useState(props.route.params?.book.book_img);
  // console.log(props.route.params?.book.book_img);


  let selected;
  if (shop != null) {
    selected = (
      <>
        <View style={{ justifyContent: "center", marginRight: 16 }}>
          <View style={styles.shop}>
            <View style={styles.shopDetailsContainer}>
              <Text style={[styles.shopDetails, styles.shopDistance]}>
                {shop.store_distance}
              </Text>
              <Text style={styles.shopDetails}>{shop.store_name}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.storeDetails}>{shop.store_incharge} </Text>
            <Text style={styles.storeDetails}>{shop.store_address} </Text>
            <Text style={styles.storeDetails}>{shop.store_number}</Text>
          </View>
        </View>
        <View style={{ alignSelf: "center", marginTop: 10 }}>
          <Pressable
            onPress={() =>
              props.navigation.navigate("Storemodal", {
                params: { shop: shop },
              })
            }
          >
            <Changeshop />
          </Pressable>
        </View>
      </>
    );
  } else{
    selected = (
      <View style={{ marginTop: 20, alignSelf: "center" }}>
        <Pressable onPress={() => props.navigation.navigate("Storemodal")}>
          <Findashop />
        </Pressable>
      </View>
    );
  }

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setBookdata(props.route.params?.book);
    
  }, [props.route.params?.book]);


  const imageUpload = async (imagedata) => {
    console.log(NewImg);
    let formData = new FormData();
    formData.append("old_book_img_url", NewImg);
    formData.append("book_img", imagedata);

    try {
      const fetchRes = await fetch(
        "https://booksapp2021.herokuapp.com/Book/Upload/Image",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            "x-access-token": user.token,
          },
          body: formData,
        }
      );
      const res = await fetchRes.json();
      console.log("response of API", res);
      if (res.status === true) {
        alert("Image changed successfully");
        setNewImg(res.response.book);
      } else {
        alert("Error ocuured while changing the image");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editbooks = async () => {
    console.log("edit books function call");

    if (
      props.route.params.params.photo !== null &&
      props.route.params.params.photo !== undefined
    ) {
      console.log(
        "props.route.params.params.photo",
        props.route.params.params.photo
      );
      var photouri = props.route.params.params.photo.uri;

      var imagedata = {
        uri: photouri,
        type: "image/jpeg",
        name: "photo.jpg",
      };
      await imageUpload(imagedata);

      fetch("https://booksapp2021.herokuapp.com/Book/Uploadedbooks/Edit", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify({
          book_id: Bookdata.book_id,
          book_name: Newname,
          book_author: Newauthor,
          book_price: Newprice,
          book_year: Newyear,
          book_condition: NewCondition,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            Alert.alert("Success", "Book Details Updated", [
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
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
   <SafeAreaView style={{flex:1, flexDirection: "column"}}>
     <View style={{ justifyContent: "flex-start", flex: 1 }}>
        <Pressable onPress={() => props.navigation.navigate("Bookdetail")}>
          <Image
            source={require("../assets/Backbutton.png")}
            style={{ marginLeft: 19, marginTop: 18 }}
          />
        </Pressable>
      </View>
      <View style={{ flex: 6, flexDirection: "row", marginLeft: 10 }}>
        <View style={styles.inputfields}>
          <View style={styles.isbn}>
            <TextInput
              style={[styles.inputtextbox, styles.isbninput]}
              placeholder="ISBN"
              value={Bookdata.book_isbn}
              onChangeText={(isbn) => setIsbn(isbn.replace(/[^0-9]/g, ""))}
              keyboardType="number-pad"
            />
            <Pressable
              onPress={() => {
                setShowQR(!showQR);
                if (showQR) setScanned(false);
              }}
            >
              <View style={{ marginTop: 10, marginRight: 5 }}>
                <QrcodeLogo />
              </View>
            </Pressable>
          </View>
          <TextInput
            style={styles.inputtextbox}
            placeholder="Name of the book"
            value={Bookdata.book_name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.inputtextbox}
            placeholder="Author"
            value={Bookdata.book_author}
            onChangeText={(text) => setAuthor(text)}
          />
          <View style={styles.container}>
            <TextInput
              style={[styles.inputtextbox, styles.subcontainer]}
              placeholder="Year"
              value={String(Bookdata.book_year)}
              onChangeText={(text) => setYear(text.replace(/[^0-9]/g, ""))}
              keyboardType="number-pad"
              maxLength={4}
            />
            <TextInput
              style={[styles.inputtextbox, styles.subcontainer]}
              placeholder="Price"
              value={String(Bookdata.book_price)}
              onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ""))}
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={[
              { label: "Crime and Thriller", value: "crime/thriller" },
              { label: "Religious", value: "religious" },
              { label: "Self-Help", value: "selfhelp" },
              { label: "Romance", value: "romance" },
              { label: "Humor", value: "humor" },
              { label: "Sci-Fi", value: "scifi" },
              { label: "Biography", value: "biography" },
              { label: "History", value: "history" },
            ]}
            selectedValue={category}
            placeholder={{
              label: "Select the genre",
              value: "",
              color: "black",
            }}
            place
            useNativeAndroidPickerStyle={false}
            style={customPickerStyles}
          />
        </View>
        <View
          style={{ flexDirection: "column", flex: 1, justifyContent: "center" }}
        >
          <View style={styles.uploadimage}>
            {props.route.params?.photo && imgurl ? (
              <Pressable
                style={{ width: "100%", height: "100%" }}
                onPress={() => props.navigation.navigate("Camerascreen",{redirectTo:"Edituploadedbook"})}
              >
                <Image
                  style={{
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    resizeMode: "cover",
                    width: "100%",
                    borderRadius: 20,
                  }}
                  source={{ uri: Bookdata.book_img}}
                />
                <Button style={{backgroundColor:'#E96A59',marginTop:-10,borderRadius:20,fontFamily:'DMSans'}}  labelStyle={{color:'white',fontSize:14}}>Edit Photo</Button>
              </Pressable>
            ) : (
              <Pressable
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
                onPress={() => props.navigation.navigate("Camerascreen")}
              >
                <Image
                  style={{
                    alignSelf: "center",

                    height: "50%",
                    width: "50%",
                    resizeMode: "contain",

                    borderRadius: 20,
                  }}
                  source={require("../assets/Union.png")}
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>
      <View
          style={{
            flex: 6,
            flexDirection: "column",
            marginLeft: 20,
            justifyContent: "space-around",
          }}
        >
          <View style={{ marginTop: 30 }}>
            <StaticText text="Condition of the book" fontS={16} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
                marginRight: 16,
              }}
            >
              <View
                style={[
                  styles.checkboxContainer,
                  {
                    backgroundColor:
                      bookCondition === "Bad" ? "#0036F4" : "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.checkboxText,
                    {
                      color: bookCondition === "Bad" ? "#ffffff" : "#000000",
                    },
                  ]}
                  onPress={() => {
                    setbookCondition("Bad");
                  }}
                >
                  Bad
                </Text>
              </View>

              <View
                style={[
                  styles.checkboxContainer,
                  {
                    backgroundColor:
                      bookCondition === "Fair" ? "#0036F4" : "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.checkboxText,
                    {
                      color: bookCondition === "Fair" ? "#ffffff" : "#000000",
                    },
                  ]}
                  onPress={() => {
                    setbookCondition("Fair");
                  }}
                >
                  Fair
                </Text>
              </View>
              <View
                style={[
                  styles.checkboxContainer,
                  {
                    backgroundColor:
                      bookCondition === "Good" ? "#0036F4" : "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.checkboxText,
                    {
                      color: bookCondition === "Good" ? "#ffffff" : "#000000",
                    },
                  ]}
                  onPress={() => {
                    setbookCondition("Good");
                  }}
                >
                  Good
                </Text>
              </View>

              <View
                style={[
                  styles.checkboxContainer,
                  {
                    backgroundColor:
                      bookCondition === "Great" ? "#0036F4" : "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.checkboxText,
                    {
                      color: bookCondition === "Great" ? "#ffffff" : "#000000",
                    },
                  ]}
                  onPress={() => {
                    setbookCondition("Great");
                  }}
                >
                  Great
                </Text>
              </View>
            </View>
          </View>

          {selected}
        </View>

        <View
          style={{
            marginLeft: 20,

            justifyContent: "flex-end",
            alignItems: "center",
            flex: 2,
          }}
        >
          <Text style={{fontFamily:'DMSans'}}>You'll get {!price ? 0 : userBookPrice}</Text>
          <Button
            theme={{ roundness: 120 }}
            style={{
              width: 215,
              height: 40,
              margin: 10,
              alignSelf: "center",
              justifyContent: "flex-end",
            }}
            labelStyle={{
              fontSize: 14,
              color: "white",
              flexDirection: "row",
              fontFamily: "DMSansbold",
            }}
            
            mode="contained"
          >
            Upload
          </Button>
        </View>

   </SafeAreaView>
  );
};


const QrcodeLogo = ({ setShowQR, showQR }) => {
  return (
    <Svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M17 5.57143V1H12.4286" stroke="#0D1936" stroke-width="2" />
      <Path
        d="M12.4286 17.7619L17 17.7619L17 13.1905"
        stroke="#0D1936"
        stroke-width="2"
      />
      <Path
        d="M0.999997 13.1905L0.999998 17.7619L5.57143 17.7619"
        stroke="#0D1936"
        stroke-width="2"
      />
      <Path
        d="M5.57143 0.999982L1 0.999982L1 5.57141"
        stroke="#0D1936"
        stroke-width="2"
      />
      <Path
        d="M8.43033 12.0511C10.0093 12.0511 11.2892 10.7711 11.2892 9.19221C11.2892 7.61329 10.0093 6.33331 8.43033 6.33331C6.8514 6.33331 5.57143 7.61329 5.57143 9.19221C5.57143 10.7711 6.8514 12.0511 8.43033 12.0511Z"
        stroke="#0D1936"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.4286 13.1904L10.4505 11.2124"
        stroke="#0D1936"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};


const styles = StyleSheet.create({
  main: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#ECEFEE",
  },
  heading: {
    marginVertical: 10,
    fontWeight: "700",
    color: "#E96A59",
  },
  layout: {
    flexDirection: "row",
  },
  inputfields: {
    width: "50%",
    justifyContent: "space-evenly",
  },
  inputtextbox: {
    color: "#6E7A7D",
    backgroundColor: "transparent",
    justifyContent: "center",
    height: 50,
    marginTop: 10,
  },
  isbn: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 2,
  },
  isbninput: {
    width: "90%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subcontainer: {
    marginHorizontal: 1,
    width: "45%",
  },
  checkboxContainer: {
    width: "20%",
    borderWidth: 2,
    borderColor: "#0036F4",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 5,
  },
  checkboxText: {
    fontWeight: "700",
  },
  button: {
    width: 215,
    margin: 10,
    padding: 5,
    fontSize: 18,
    fontWeight: "700",
    backgroundColor: "#E96A59",
    borderRadius: 25,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  uploadimage: {
    justifyContent: "flex-end",
    marginBottom: 10,
    backgroundColor: "#6E797C",
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  shop: {
    marginVertical: 15,
    marginBottom: 2,
  },

  shopDetailsContainer: {
    flexDirection: "row",

    alignItems: "center",
  },
  shopDetails: {
    flex: 8,
    paddingVertical: 6,
    borderWidth: 2,
    fontWeight: "700",
    borderColor: "#0036F4",
    borderRadius: 20,
    textAlign: "center",
    fontFamily: "DMSans",
  },
  shopDistance: {
    flex: 5,
    marginRight: 20,
  },
  storeDetails: {
    lineHeight: 20,
  },
  map: {
    marginBottom: 20,
  },
});

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    borderWidth: 2,
    borderColor: "#0036F4",
    borderRadius: 20,
    color: "#000000",
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingLeft: 10,
    height: 40,
    marginTop: 25,
  },
  inputAndroid: {
    fontSize: 14,
    borderWidth: 2,
    borderColor: "#0036F4",
    color: "#0D1936",
    borderRadius: 50,
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingLeft: 10,
    height: 40,
    marginTop: 20,
  },
});
export default React.memo(Edituploadedbook);

