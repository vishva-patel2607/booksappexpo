import React, { useState, useEffect } from "react";
import SwitchSelector from "react-native-switch-selector";
import Findashop from "../Components/Findashop";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView, View, Image, StyleSheet, Pressable } from "react-native";
import { logoutUser } from "../actions";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import BAheader from "../Components/StaticBooksApp";
import StaticText from "../Components/StaticText";
import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import Svg, { Path } from "react-native-svg";
import Changeshop from "../Components/Changeshop";

const UploadRoute = (props) => {
  const [imgurl, setImgurl] = useState(null);
  const [name, setName] = useState("");
  let [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState(null);
  const [shop, setShop] = useState(null);

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [margins, setMargins] = useState(0);
  const [bookCondition, setbookCondition] = useState("");

  const [transaction_type, setTransaction_type] = useState("lend");
  const [userBookPrice, setUserBookPrice] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const Option = [
    { label: "Lend", value: "lend" },
    { label: "Sell", value: "sell" },
  ];

  const GetPreviousbookImage = async () => {
    console.log("Working");
    try {
      const resposne = await fetch(
        `https://booksapp2021.herokuapp.com/Book/Upload/Image`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "x-access-token": user.token,
          },
        }
      );

      const resImage = await resposne.json();
      console.log(resImage);
      if (resImage.status) {
        setImgurl(resImage.url);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    GetPreviousbookImage();
  }, []);

  useEffect(() => {
    setShop(props.route.params?.shop);
  }, [props.route.params?.shop]);

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

  const uploadNewImage = async (imagedata) => {
    let formData = new FormData();
    formData.append("book_img", imagedata);

    const fetchRes = await fetch(
      "https://booksapp2021.herokuapp.com/Book/Upload/Image",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          "x-access-token": user.token,
        },
        body: formData,
      }
    );
    const res = await fetchRes.json();
    if (res.status === true) {
      console.log("API resposne: ", res.response.book);
      setImgurl(res.response.book);
    } else {
      alert("Error ocuured while uploading the image");
    }
  };

  const changeImage = async (imagedata) => {
    let formData = new FormData();
    formData.append("old_book_img_url", imgurl);
    formData.append("book_img", imagedata);

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
    if (res.status === true) {
      console.log("API resposne: ", res.response.book);
      setImgurl(res.response.book);
    } else {
      alert("Error ocuured while changing the image");
    }
  };

  const uploaddetails = async () => {
    let formData = new FormData();
    formData.append("book_name", name);
    formData.append("book_author", author);
    formData.append("book_year", year);
    formData.append("book_condition", condition);
    formData.append("store_id", shop.store_id);
    formData.append("book_price", price);
    formData.append("book_img_url", imgurl);
    formData.append("book_isbn", isbn);
    formData.append("transaction_type", transaction_type);
    formData.append("book_category", category);

    console.log(formData);
    fetch("https://booksapp2021.herokuapp.com/Book/Upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        "x-access-token": user.token,
      },

      body: formData,
      usernumber: user.accountNumber,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          console.log(data.message);
          alert("Book Uploaded Succesfully");
          setImgurl(null);
          setAuthor("");
          setCondition("good");
          setName("");
          setPrice("");
          setShop(null);
          setYear("");
          setIsbn("");
          console.log(data.response.book);
          console.log(data.response.transaction);
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
  } else {
    selected = (
      <View style={{ marginTop: 20, alignSelf: "center" }}>
        <Pressable onPress={() => props.navigation.navigate("Storemodal")}>
          <Findashop />
        </Pressable>
      </View>
    );
  }

  const FetchBookfromISBN = async () => {
    const YearRegex = new RegExp("^[12][0-9]{3}$");
    try {
      const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);

      const json = await res.json();
      setName(json.title);

      if (YearRegex.test(json.publish_date)) {
        setYear(json.publish_date);
      }
      try {
        const resauthor = await fetch(
          `https://openlibrary.org/${json.authors[0].key}.json`
        );
        const jsonauthor = await resauthor.json();
        setAuthor(jsonauthor.name);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
      alert(
        "Unable to find the book from the ISBN number. Please provide the details"
      );
      // setError('Error while fetching isbn')
    }
  };

  /*Barcode scanner */
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const getPricing = async () => {
    if (!price) return;
    try {
      const response = await fetch(
        `https://booksapp2021.herokuapp.com/Book/Upload/Getpricing/${transaction_type}/${price}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "x-access-token": user.token,
          },
        }
      );

      const res = await response.json();
      if (res.status) {
        console.log(res.response.pricing);
        setUserBookPrice(res.response.pricing);
      } else {
        setUserBookPrice(0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPricing();
  }, [price, transaction_type]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <View style={{ flex: 2, justifyContent: "space-evenly" }}>
        <BAheader />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#E96A59",
            marginLeft: 21,
            marginTop: 10,
            marginBottom: 2,
            fontFamily: "DMSansbold",
          }}
        >
          NEW BOOK
        </Text>
      </View>
      <View style={{ flex: 6, flexDirection: "row", marginLeft: 10 }}>
        <View style={styles.inputfields}>
          <View style={styles.isbn}>
            <TextInput
              style={[styles.inputtextbox, styles.isbninput]}
              placeholder="ISBN"
              value={isbn}
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
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.inputtextbox}
            placeholder="Author"
            value={author}
            onChangeText={(text) => setAuthor(text)}
          />
          <View style={styles.container}>
            <TextInput
              style={[styles.inputtextbox, styles.subcontainer]}
              placeholder="Year"
              value={year}
              onChangeText={(text) => setYear(text.replace(/[^0-9]/g, ""))}
              keyboardType="number-pad"
              maxLength={4}
            />
            <TextInput
              style={[styles.inputtextbox, styles.subcontainer]}
              placeholder="Price"
              value={price}
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
            {props?.route.params?.photo && imgurl ? (
              <Pressable
                style={{ width: "100%", height: "100%" }}
                onPress={() =>
                  props.navigation.navigate("Camerascreen", {
                    redirectTo: "Upload",
                  })
                }
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
                  source={{ uri: imgurl || props?.route.params.params?.photo }}
                />
                <Button
                  style={{
                    backgroundColor: "#E96A59",
                    marginTop: -10,
                    borderRadius: 20,
                    fontFamily: "DMSans",
                  }}
                  labelStyle={{ color: "white", fontSize: 14 }}
                >
                  Edit Photo
                </Button>
              </Pressable>
            ) : (
              <Pressable
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
                onPress={() =>
                  props.navigation.navigate("Camerascreen", {
                    redirectTo: "Upload",
                  })
                }
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
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <SwitchSelector
              options={Option}
              initial={1}
              textContainerStyle={{ fontFamily: "DMSans" }}
              bold={true}
              borderRadius={50}
              borderColor={"#E96A59"}
              buttonColor={"#E96A59"}
              onPress={(value) => {
                setTransaction_type(value);
                console.log(value);
              }}
            />
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
        <Text style={{ fontFamily: "DMSans" }}>
          You'll get {!price ? 0 : userBookPrice}
        </Text>
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
          onPress={uploaddetails}
          mode="contained"
        >
          Upload
        </Button>
      </View>
    </SafeAreaView>
  );
};

const QrcodeLogo = () => {
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

export default React.memo(UploadRoute);
