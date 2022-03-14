import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Alert,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { logoutUser, setUser } from "../actions";
import { Platform, StatusBar, Dimensions } from "react-native";
import {
  Button,
  Title,
  Paragraph,
  TextInput,
  Text,
  Appbar,
  BottomNavigation,
  Searchbar,
  RadioButton,
  Headline,
  IconButton,
  Provider,
  Portal,
  Modal,
  Surface,
  Subheading,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import Storemodalcard from "./Storemodalcard";

import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BarCodeScanner } from "expo-barcode-scanner";
import Svg, { Path } from "react-native-svg";

const UploadRoute = (props) => {
  const [imgurl, setImgurl] = useState(null);
  const [name, setName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState(null);
  const [shop, setShop] = useState(null);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [bookCondition, setbookCondition] = useState("");

  const [transaction_type, setTransaction_type] = useState("lend");
  const [userBookPrice, setUserBookPrice] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
      alert("Image uploaded successfully");
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
      alert("Image changed successfully");
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

    console.log(formData);
    fetch("https://booksapp2021.herokuapp.com/Book/Upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        "x-access-token": user.token,
      },

      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
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
      <View>
        <View style={styles.shop}>
          <View style={styles.shopDetailsContainer}>
            <Text style={[styles.shopDetails, styles.shopDistance]}>
              12 kms
            </Text>
            <Text style={styles.shopDetails}>Nirma Store</Text>
          </View>
        </View>

        <View>
          <Text style={styles.storeDetails}>Shailesh Patel </Text>
          <Text style={styles.storeDetails}>Nirma University, SG Highway </Text>
          <Text style={styles.storeDetails}>92503xxxxx</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button style={styles.button} color="#ffffff">
            Change Shop
          </Button>
        </View>
      </View>
    );
  } else {
    selected = (
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
          }}
        >
          * Select a drop off shop
        </Text>
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

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(`ISBN code scanned successfully!`);
    FetchBookfromISBN();
    setShowQR(false);
    setIsbn(data);
    if (showQR) setScanned(false);
  };

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
    <ScrollView>
      <SafeAreaView style={styles.main}>
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <BooksappLogo />
        </View>

        <Text style={styles.heading}>NEW BOOK</Text>
        {showQR && (
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              top: 20,
              right: "20%",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  height: 300,
                  width: 500,
                  zIndex: 1000,
                },
              ]}
            />
          </View>
        )}

        <View style={styles.layout}>
          <View style={styles.inputfields}>
            <View style={styles.isbn}>
              <TextInput
                style={[styles.inputtextbox, styles.isbninput]}
                label="ISBN Code"
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
                <View>
                  <QrcodeLogo />
                </View>
              </Pressable>
            </View>

            <View>
              <TextInput
                style={styles.inputtextbox}
                label="Name of the book"
                value={name}
                onChangeText={(text) => setName(text)}
              />

              <TextInput
                style={styles.inputtextbox}
                label="Author"
                value={author}
                onChangeText={(text) => setAuthor(text)}
              />

              <View style={styles.container}>
                <TextInput
                  style={[styles.inputtextbox, styles.subcontainer]}
                  label="Year"
                  value={year}
                  onChangeText={(text) => setYear(text.replace(/[^0-9]/g, ""))}
                  keyboardType="number-pad"
                  maxLength={4}
                />
                <TextInput
                  style={[styles.inputtextbox, styles.subcontainer]}
                  label="Price"
                  value={price}
                  onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ""))}
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
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
                  placeholder={{ label: "Select the genre", value: "" }}
                  useNativeAndroidPickerStyle={false}
                  style={
                    category ? customPickerStylesSelected : customPickerStyles
                  }
                />
              </View>
            </View>
          </View>

          <View style={styles.uploadimage}>
            {props.route.params?.photo || imgurl ? (
              <Pressable
                style={{ flex: 1, height: "100%", width: "100%" }}
                onPress={() => props.navigation.navigate("Camerascreen")}
              >
                <Image
                  style={{
                    flex: 1,
                    resizeMode: "cover",
                    height: "100%",
                    width: "100%",
                  }}
                  source={{ uri: imgurl }}
                />
              </Pressable>
            ) : (
              <IconButton
                icon="image-plus"
                color="#EF90A9"
                size={50}
                onPress={() => props.navigation.navigate("Camerascreen")}
              />
            )}
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text
            style={{
              marginBottom: 10,
            }}
          >
            Condition of the Book
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
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
        <View style={styles.container3}>
          <Title style={styles.textbox}>
            Select the condition of your book:
          </Title>
          <RadioButton.Group
            onValueChange={(value) => setCondition(value)}
            value={condition}
          >
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <RadioButton.Item label="Bad" value="Bad" mode="android" />
                </View>
                <View style={{ flex: 1 }}>
                  <RadioButton.Item label="Fair" value="Fair" mode="android" />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <RadioButton.Item label="Good" value="Good" mode="android" />
                </View>
                <View style={{ flex: 1 }}>
                  <RadioButton.Item
                    label="Great"
                    value="Great"
                    mode="android"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={styles.button}
            onPress={() => props.navigation.navigate("Storemodal")}
            color="#ffffff"
          >
            Find a Shop
          </Button>
        </View>

        {selected}

        <View
          style={{
            marginTop: 15,
            paddingBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        <Button
          mode="contained"
          style={styles.submitbutton}
          labelStyle={styles.submitbutton}
          onPress={uploaddetails}
          disabled={!imgurl}
        >
          <Text>You'll get {!price ? 0 : userBookPrice}</Text>
          <Button
            style={styles.button}
            onPress={uploaddetails}
            disabled={!imgurl}
            color="#ffffff"
          >
            Upload
          </Button>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};


const BooksappLogo = () => {
  return (
    <View>
      <Svg
        width="90"
        height="23"
        viewBox="0 0 90 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M0.375 1.63227C2.1 1.55808 3.675 1.48389 4.95 1.48389C8.625 1.48389 10.5 2.74518 10.5 5.19356C10.5 6.08389 10.2 6.90002 9.675 7.56776C9.15 8.2355 8.25 8.68066 7.05 8.90324C8.175 9.05163 9.075 9.3484 9.75 9.94195C10.425 10.4613 10.725 11.4258 10.725 12.8355C10.8 15.6549 9 17.0645 5.25 17.0645H0.375V1.63227ZM4.95 1.70647C4.125 1.70647 3.225 1.78066 2.25 1.85485V8.82905H5.55C7.65 8.75485 8.7 7.56776 8.7 5.19356C8.7 4.08066 8.4 3.19034 7.725 2.59679C7.2 2.00324 6.225 1.70647 4.95 1.70647ZM2.25 16.842H5.25C6.6 16.842 7.5 16.471 8.1 15.8032C8.7 15.1355 9 14.0968 9 12.6129C9 11.129 8.7 10.2387 8.175 9.79356C7.65 9.3484 6.75 9.05163 5.625 9.05163H2.25V16.842Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M17.85 17.1387C16.275 17.1387 15 16.6935 14.025 15.8032C13.05 14.9129 12.525 13.5774 12.525 11.7226C12.525 9.86772 13.05 8.45804 14.1 7.41933C15.15 6.38062 16.425 5.86127 18 5.86127C19.575 5.86127 20.85 6.30643 21.825 7.19675C22.8 8.08707 23.325 9.42256 23.325 11.2774C23.325 13.1322 22.8 14.6161 21.75 15.5806C20.775 16.6193 19.425 17.1387 17.85 17.1387ZM18 6.00965C16.875 6.00965 15.9 6.52901 15.15 7.49353C14.4 8.45804 14.025 9.86772 14.025 11.6484C14.025 13.429 14.4 14.7645 15.075 15.6548C15.75 16.5451 16.65 16.9161 17.85 16.9161C18.975 16.9161 19.95 16.3968 20.7 15.4322C21.45 14.3935 21.825 13.058 21.825 11.2774C21.825 9.49675 21.45 8.16127 20.775 7.27094C20.1 6.45482 19.125 6.00965 18 6.00965Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M30.45 17.1387C28.875 17.1387 27.6 16.6935 26.625 15.8032C25.65 14.9129 25.125 13.5774 25.125 11.7226C25.125 9.86772 25.65 8.45804 26.7 7.41933C27.75 6.38062 29.025 5.86127 30.6 5.86127C32.175 5.86127 33.45 6.30643 34.425 7.19675C35.4 8.08707 35.925 9.42256 35.925 11.2774C35.925 13.1322 35.4 14.5419 34.35 15.5806C33.375 16.6193 32.025 17.1387 30.45 17.1387ZM30.6 6.00965C29.475 6.00965 28.5 6.52901 27.75 7.49353C27 8.45804 26.625 9.86772 26.625 11.6484C26.625 13.429 27 14.7645 27.675 15.6548C28.35 16.5451 29.25 16.9161 30.45 16.9161C31.575 16.9161 32.55 16.3968 33.3 15.4322C34.05 14.3935 34.425 13.058 34.425 11.2774C34.425 9.49675 34.05 8.16127 33.375 7.27094C32.7 6.45482 31.725 6.00965 30.6 6.00965Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M39.075 0.370972V11.4258L44.025 5.93549H44.25L40.575 10.0161L45.45 17.0645H43.875L39.75 10.9806L39.15 11.6484V17.0645H37.5V0.370972H39.075Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M53.475 6.67743C53.25 6.45485 52.875 6.30646 52.35 6.15808C51.825 6.00969 51.45 5.9355 51.15 5.9355C50.85 5.9355 50.7 5.9355 50.7 5.9355C49.875 5.9355 49.275 6.15808 48.975 6.52904C48.6 6.90001 48.45 7.34517 48.45 7.86453C48.45 8.38388 48.6 8.75485 48.9 9.12582C49.2 9.49679 49.575 9.71937 50.1 9.86775C50.55 10.0903 51.075 10.2387 51.6 10.5355C52.125 10.7581 52.65 10.9807 53.1 11.2774C53.55 11.5 54 11.871 54.3 12.3161C54.6 12.7613 54.75 13.3549 54.75 14.0968C54.75 14.7645 54.525 15.3581 54 15.8774C53.475 16.3968 52.95 16.6936 52.35 16.8419C51.75 16.9903 51.075 17.0645 50.4 17.0645C48.9 17.0645 47.7 16.6936 46.95 16.1L47.1 15.9516C47.4 16.2484 47.85 16.471 48.45 16.6194C49.05 16.7678 49.65 16.9161 50.175 16.9161C51.075 16.9161 51.825 16.6936 52.35 16.1742C52.95 15.729 53.25 15.0613 53.25 14.3936C53.25 13.7258 53.025 13.0581 52.575 12.6871C52.125 12.2419 51.6 11.9452 51 11.6484C50.4 11.3516 49.725 11.129 49.125 10.9065C48.525 10.6839 48 10.3129 47.55 9.86775C47.1 9.42259 46.875 8.90324 46.875 8.30969C46.875 7.71614 47.025 7.27098 47.25 6.90001C47.55 6.52904 47.85 6.30646 48.3 6.15808C49.05 5.9355 49.8 5.78711 50.625 5.78711C51.9 5.78711 52.95 6.00969 53.625 6.52904L53.475 6.67743Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M65.7 17.0645C64.65 17.0645 63.975 16.8419 63.6 16.471C63.225 16.1742 63.075 15.8774 63.075 15.6548V15.2097C62.325 16.5452 61.2 17.2129 59.55 17.2129C57.675 17.2129 56.55 16.3968 56.325 14.6903C56.325 14.5419 56.25 14.3194 56.25 14.171C56.25 14.0226 56.25 13.8 56.325 13.5774C56.4 13.3548 56.55 13.1323 56.85 12.8355C57.45 12.3161 58.65 11.9452 60.6 11.871C61.05 11.7968 61.5 11.7968 61.95 11.7968C62.4 11.7968 62.7 11.7968 63.075 11.871V8.16129C63.075 8.16129 63.075 8.0871 63.075 7.93871C63.075 7.79032 63.075 7.64194 63 7.41936C62.925 7.19678 62.775 7.04839 62.7 6.82581C62.55 6.60323 62.325 6.45484 61.95 6.30645C61.575 6.15807 61.125 6.08387 60.6 6.08387C60.075 6.08387 59.4 6.15807 58.65 6.38065C57.9 6.60323 57.375 6.75161 57 6.9742L56.925 6.82581C58.275 6.23226 59.625 5.93549 60.975 5.93549C62.55 5.93549 63.525 6.23226 64.05 6.75162C64.425 7.19678 64.65 7.64194 64.65 8.0871V15.5065C64.65 15.9516 64.725 16.2484 64.875 16.471C65.025 16.6936 65.25 16.8419 65.4 16.8419L65.625 16.9161H66.3V17.0645H65.7ZM59.85 16.9903C60.675 16.9903 61.35 16.6936 62.025 16.1742C62.625 15.6548 63 15.1355 63.075 14.6161V11.871C62.625 11.871 62.25 11.871 61.8 11.871C61.35 11.871 60.975 11.871 60.6 11.9452C59.475 12.0936 58.725 12.3161 58.35 12.6871C57.975 13.0581 57.825 13.5774 57.825 14.2452C57.825 14.3936 57.825 14.4677 57.825 14.6161C58.05 16.1742 58.65 16.9903 59.85 16.9903Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M67.8 5.93546H69.375V8.68062C69.6 8.01288 70.125 7.34514 70.8 6.75159C71.475 6.15804 72.3 5.86127 73.125 5.86127C76.2 5.86127 77.7 7.64191 77.7 11.129C77.7 15.1355 75.75 17.1387 71.775 17.1387C71.1 17.1387 70.275 16.9903 69.375 16.6193V22.5548H67.8V5.93546ZM73.125 6.00965C72.225 6.00965 71.325 6.38062 70.575 7.19675C69.825 8.01288 69.45 8.68062 69.375 9.34836V16.4709C70.275 16.8419 71.1 16.9903 71.775 16.9903C74.7 16.9903 76.125 15.0613 76.125 11.129C76.125 7.71611 75.15 6.00965 73.125 6.00965Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M79.725 5.93546H81.3V8.68062C81.525 8.01288 82.05 7.34514 82.725 6.75159C83.4 6.15804 84.225 5.86127 85.05 5.86127C88.125 5.86127 89.625 7.64191 89.625 11.129C89.625 15.1355 87.675 17.1387 83.7 17.1387C83.025 17.1387 82.2 16.9903 81.3 16.6193V22.5548H79.725V5.93546ZM85.05 6.00965C84.15 6.00965 83.25 6.38062 82.5 7.19675C81.75 8.01288 81.375 8.68062 81.3 9.34836V16.4709C82.2 16.8419 83.025 16.9903 83.7 16.9903C86.625 16.9903 88.05 15.0613 88.05 11.129C88.05 7.71611 87.075 6.00965 85.05 6.00965Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
      </Svg>
    </View>
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
  barcode: {
    position: "relative",
    height: 300,
    zIndex: 100,
  },


const styles = StyleSheet.create({
  main: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#ECEFEE",
    paddingHorizontal: 15,
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
    width: "55%",
  },
  inputtextbox: {
    color: "#6E7A7D",
    backgroundColor: "transparent",
    justifyContent: "center",
    height: 50,
  },
  isbn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  isbninput: {
    width: "90%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subcontainer: {
    marginHorizontal: 2,
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
    width: "70%",
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6E797C",
    borderRadius: 10,
    marginLeft: 10,
  },
  shop: {
    marginVertical: 20,
  },

  shopDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
    borderRadius: 50,
    color: "#0D1936",
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingLeft: 10,
    height: 100,
  },
  inputAndroid: {
    fontSize: 14,
    borderWidth: 2,
    borderColor: "#0036F4",
    color: "#0D1936",
    borderRadius: 50,
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingLeft: 10,
    height: 35,
  },
});

const customPickerStylesSelected = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    borderWidth: 2,
    backgroundColor: "#0036F4",
    borderColor: "#0036F4",
    borderRadius: 50,
    color: "#ffffff",
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingLeft: 10,
    height: 100,
  },
  inputAndroid: {
    fontSize: 14,
    borderWidth: 2,
    backgroundColor: "#0036F4",
    borderColor: "#0036F4",
    color: "#ffffff",
    borderRadius: 50,
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingLeft: 10,
    height: 35,
  },
});
export default React.memo(UploadRoute);
