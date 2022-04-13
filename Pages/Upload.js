import React, { useState, useEffect } from "react";
import SwitchSelector from "react-native-switch-selector";
import Findashop from "../Components/Findashop";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView, View, Image, StyleSheet, Pressable } from "react-native";
import { logoutUser } from "../actions";
import { Platform, StatusBar } from "react-native";
import { Button, Text, TextInput,ActivityIndicator } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import StaticText from "../Components/StaticText";
import BooksApp from "../Components/BooksApp";
import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import Svg, { Path } from "react-native-svg";
import Changeshop from "../Components/Changeshop";


const UploadRoute = (props) => {
  const { colors } = useTheme();
  const [imgurl, setImgurl] = useState(null);
  const [name, setName] = useState("");
  let [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [shop, setShop] = useState(null);
  const [imageloading,setImageloading] = useState(false);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [bookCondition, setbookCondition] = useState("Fair");

  const [transaction_type, setTransaction_type] = useState("");
  const [userBookPrice, setUserBookPrice] = useState(null);
  let fieldcheck =
    imgurl !== null &&
    name !== "" &&
    isbn !== "" &&
    year !== "" &&
    shop !== null &&
    category !== "" &&
    price !== "";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const Option = [
    { label: "Lend", value: "lend" },
    { label: "Sell", value: "sell" },
  ];

  const GetPreviousbookImage = async () => {
    console.log("Getting previous book image");
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
        console.log(imagedata);
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
    console.log(imagedata, "imagedata");

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
      alert("Error occured while uploading the image");
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
      console.log(imgurl, imagedata, "imgurl and imagedata");
      console.log("API response: ", res.response.book);
      setImgurl(res.response.book);
    } else {
      alert("Error occured while changing the image");
    }
  };

  const uploaddetails = async () => {
    if (fieldcheck) {
      let formData = new FormData();
      formData.append("book_name", name);
      formData.append("book_author", author);
      formData.append("book_year", year);
      formData.append("book_condition", bookcondition);
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
    } else {
      alert("Please fill all the fields");
      return;
    }
  };

  let selected;
  if (shop != null) {
    selected = (
      <>
        <View style={{ justifyContent: "flex-start", marginRight: 16 }}>
          <View style={styles.shop}>
            <View style={styles.shopDetailsContainer}>
              <Text
                style={[
                  styles.shopDetails,
                  styles.shopDistance,
                  { color: colors.text },
                ]}
              >
                {shop.store_distance}
              </Text>
              <Text style={[styles.shopDetails, { color: colors.text }]}>
                {shop.store_name}
              </Text>
            </View>
          </View>

          <View>
            <Text style={[styles.storeDetails, { color: colors.text }]}>
              {shop.store_incharge}{" "}
            </Text>
            <Text style={[styles.storeDetails, { color: colors.text }]}>
              {shop.store_address}{" "}
            </Text>
            <Text style={[styles.storeDetails, { color: colors.text }]}>
              {shop.store_number}
            </Text>
          </View>
        </View>
      </>
    );
  }

  let shopoption;
  if (shop !== undefined) {
    shopoption = (
      <View style={{ alignSelf: "center" }}>
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
    );
  } else {
    shopoption = (
      <View style={{ alignSelf: "center" }}>
        <Pressable onPress={() => props.navigation.navigate("Storemodal")}>
          <Findashop />
        </Pressable>
      </View>
    );
  }

  const FetchBookfromISBN = async (isbn) => {
    setIsbn(isbn.replace(/[^0-9]/g, ""));
    console.log(isbn);
    if (isbn.length === 10 || isbn.length === 13) {
      const YearRegex = new RegExp("^[12][0-9]{3}$");
      try {
        console.log(isbn);
        const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);

        const json = await res.json();
        setName(json.title);

        if (YearRegex.test(json.publish_date)) {
          console.log(json.publish_date);
          setYear(json.publish_date);
        } else {
          setYear(json.publish_date.slice(json.publish_date.length - 4));
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
        if (isbn.length === 13) {
          alert(
            "Unable to find the book from the ISBN number. Please provide the details"
          );
        }
        // setError('Error while fetching isbn')
      }
    }
  };
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(`ISBN code scanned successfully!`);
    FetchBookfromISBN();
    setShowQR(false);
    setIsbn(data);
    if (showQR) setScanned(false);
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
        <BooksApp />
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

      <View style={{ flex: 6, flexDirection: "row", marginLeft: 10 }}>
        <View style={styles.inputfields}>
          <View style={styles.isbn}>
            <TextInput
              style={[
                styles.inputtextbox,
                styles.isbninput,
                { color: colors.text },
              ]}
              placeholder="ISBN"
              placeholderTextColor={"#6E7A7D"}
              underlineColor={colors.text}
              value={isbn}
              onChangeText={(isbn) => FetchBookfromISBN(isbn)}
              keyboardType="number-pad"
              theme={{
                colors: { text: colors.text, placeholder: colors.text },
              }}
            />
            <Pressable
              onPress={() => {
                setShowQR(!showQR);
                if (showQR) setScanned(false);
              }}
            >
              <View style={{ marginTop: 10, justifyContent: "center" }}>
                <QrcodeLogo />
              </View>
            </Pressable>
          </View>
          <TextInput
            style={styles.inputtextbox}
            placeholder="Name of the book"
            numberOfLines={2}
            placeholderTextColor={"#6E7A7D"}
            value={name}
            underlineColor={colors.text}
            onChangeText={(text) => setName(text)}
            theme={{ colors: { text: colors.text, placeholder: colors.text } }}
          />
          <TextInput
            style={styles.inputtextbox}
            placeholder="Author"
            value={author}
            placeholderTextColor={"#6E7A7D"}
            underlineColor={colors.text}
            onChangeText={(text) => setAuthor(text)}
            theme={{ colors: { text: colors.text, placeholder: colors.text } }}
          />
          <View style={styles.container}>
            <TextInput
              style={[styles.inputtextbox, styles.subcontainer]}
              placeholder="Year"
              placeholderTextColor={"#6E7A7D"}
              value={year}
              onChangeText={(text) => setYear(text.replace(/[^0-9]/g, ""))}
              keyboardType="number-pad"
              underlineColor={colors.text}
              maxLength={4}
              theme={{
                colors: { text: colors.text, placeholder: colors.text },
              }}
            />
            <View
              style={{
                alignSelf: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <RNPickerSelect
                onValueChange={(value) => setCategory(value)}
                items={[
                  { label: "Crime/Thriller", value: "crime/thriller" },
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
                  label: "Genre",
                  value: "",
                  color: colors.text,
                }}
                place
                useNativeAndroidPickerStyle={false}
                style={customPickerStyles}
              />
              {/* <TextInput
              style={[styles.inputtextbox, styles.subcontainer]}
              placeholder="Price"
              value={price}
              placeholderTextColor={'#6E7A7D'}
              onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ""))}
              keyboardType="number-pad"
              underlineColor={colors.text}
              maxLength={4}
              theme={{
                colors: { text: colors.text, placeholder: colors.text },
              }}
            /> */}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View style={styles.uploadimage}>
            {props.route.params?.photo && imgurl ? (
              <Pressable
                style={{ width: "100%", height: "100%" }}
                onPress={() => props.navigation.navigate("Camerascreen")}
              >
                {imageloading && <ActivityIndicator style={{marginTop:20}}/>}
                <Image
                  style={{
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    resizeMode: "cover",
                    width: "100%",
                    borderRadius: 20,
                  }}
                  onLoadStart={() => setImageloading(true)}
                  onLoadEnd={() => setImageloading(false)}
                  source={{ uri: imgurl }}
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
                onPress={() => props.navigation.navigate("Camerascreen")}
              >
                <Image
                  style={{
                    alignSelf: "center",

                    height: "50%",
                    width: "50%",
                    resizeMode: "contain",
                  }}
                  source={require("../assets/Union.png")}
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>
      <View style={{ flex: 2, flexDirection: "row", marginLeft: 10 }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ alignSelf: "center", width: "45%" }}>
            <TextInput
              style={[styles.inputtextbox]}
              placeholder="Price"
              value={price}
              placeholderTextColor={"#6E7A7D"}
              onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ""))}
              keyboardType="number-pad"
              underlineColor={colors.text}
              maxLength={4}
              theme={{
                colors: { text: colors.text, placeholder: colors.text },
              }}
            />
          </View>
          <View
            style={{ marginLeft: 10, marginRight: 10, alignSelf: "center" }}
          >
            <SwitchSelector
              options={Option}
              initial={1}
              style={{ width: 100 }}
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
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent:'center' }}
        >
          <Text
            style={{
              fontFamily: "DMSansbold",
              color: "#E96A59",
              alignSelf: "center",
              fontSize:16,
            }}
          >
            You'll get Rs {!price ? 0 : userBookPrice}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 6,
          flexDirection: "column",
          marginLeft: 20,
          justifyContent: "flex-start",
        }}
      >
        <View>
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
            <Pressable
              onPress={() => {
                setbookCondition("Bad");
              }}
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
                    color: bookCondition === "Bad" ? "#ffffff" : colors.text,
                  },
                ]}
              >
                Bad
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setbookCondition("Fair");
              }}
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
                    color: bookCondition === "Fair" ? "#ffffff" : colors.text,
                  },
                ]}
              >
                Fair
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.checkboxContainer,
                {
                  backgroundColor:
                    bookCondition === "Good" ? "#0036F4" : "transparent",
                },
              ]}
              onPress={() => {
                setbookCondition("Good");
              }}
            >
              <Text
                style={[
                  styles.checkboxText,
                  {
                    color: bookCondition === "Good" ? "#ffffff" : colors.text,
                  },
                ]}
              >
                Good
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.checkboxContainer,
                {
                  backgroundColor:
                    bookCondition === "Great" ? "#0036F4" : "transparent",
                },
              ]}
              onPress={() => {
                setbookCondition("Great");
              }}
            >
              <Text
                style={[
                  styles.checkboxText,
                  {
                    color: bookCondition === "Great" ? "#ffffff" : colors.text,
                  },
                ]}
              >
                Great
              </Text>
            </Pressable>
          </View>
        </View>

        {selected}
      </View>

      <View
        style={{
          marginLeft: 20,
          justifyContent: "space-around",
          alignItems: "center",
          flex: 2.5,
        }}
      >
        {shopoption}
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
            fontSize: 16,
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
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
    justifyContent: "space-between",
  },
  inputtextbox: {
    backgroundColor: "transparent",
    justifyContent: "center",
    height: 35,
    marginTop: 10,
  },
  isbn: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 2,
  },
  isbninput: {
    width: "85%",
  },
  container: {
    flexDirection: "row",
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
    paddingHorizontal: 5,
    height: 35,
    marginHorizontal: 10,
    width: "80%",
    marginLeft: 10,
  },
  inputAndroid: {
    fontSize: 14,
    borderWidth: 2,
    borderColor: "#0036F4",
    borderRadius: 50,
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingLeft: 10,
    height: 40,
    marginTop: 10,
  },
});

export default React.memo(UploadRoute);
