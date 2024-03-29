import React, { useState, useEffect } from "react";
import SwitchSelector from "react-native-switch-selector";
import Findashop from "../Components/Findashop";
import RNPickerSelect from "react-native-picker-select";
import Svg, { Path } from "react-native-svg";
import {
  SafeAreaView,
  View,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { logoutUser } from "../actions";
import Closemodal from "../Svg/Closemodal";
import { styles, customPickerStyles } from "../Styles/Uploadstyles.js";
import { Platform, StatusBar} from "react-native";
import { ThemeContext } from "../Components/Theme";
import {
  Button,
  Text,
  TextInput,
  ActivityIndicator,
  Snackbar,
} from "react-native-paper";
import QrcodeLogo from "../Svg/Qrcode";
import StaticText from "../Components/StaticText";
import BooksApp from "../Components/BooksApp";
import { useDispatch, useSelector } from "react-redux";
import Changeshop from "../Components/Changeshop";
import Addphoto from "../Svg/Addphoto";
import Info from "../Svg/Info";
import Barcode from "../Components/Barcodescanner";

const UploadRoute = (props) => {
  const [imgurl, setImgurl] = useState(null);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  let [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [shop, setShop] = useState(null);
  const [imageloading, setImageloading] = useState(false);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [price, setPrice] = useState("");

  const [bookCondition, setbookCondition] = useState("Fair");
  const [transaction_type, setTransaction_type] = useState("");
  const [userBookPrice, setUserBookPrice] = useState(null);
  const {textcolor} = React.useContext(ThemeContext);


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
      
      if (resImage.status) {
        setImgurl(resImage.url);
      }
    } catch (e) {
      
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
        setImageloading(true);
        
      } else {
        uploadNewImage(imagedata);
        setImageloading(true);
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
      
      setImgurl(res.response.book);
    } else {
      alert("Error occured while uploading the image");
    }
  };

  useEffect(() => {
    let unmounted = false;

    setTimeout(() => {
      if (!unmounted) {
        setError("");
      }
    }, 3000);
    return () => {
      unmounted = true;
    };
  }, [error]);

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
      formData.append("book_condition", bookCondition.toLowerCase());
      formData.append("store_id", shop.store_id);
      formData.append("book_price", price);
      formData.append("book_img_url", imgurl);

      formData.append("book_isbn", isbn);
      formData.append("transaction_type", transaction_type);
      formData.append("book_category", category);

      
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
            
            alert("Book Uploaded Succesfully");
            setImgurl(null);
            setAuthor("");
            setbookCondition("good");
            setName("");
            setPrice("");
            setShop(null);
            setYear("");
            setIsbn("");
            
            
          } else {
            if (data.message === "Could not verify") {
              dispatch(logoutUser());
            }
          }
        })
        .catch((error) => {
          
        });
    } else {
      setError("Please fill all the fields");
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
                  { color: textcolor },
                ]}
              >
                {shop.store_distance}
              </Text>
              <Text style={[styles.shopDetails, { color: textcolor }]}>
                {shop.store_name}
              </Text>
            </View>
          </View>

          <View>
            <Text style={[styles.storeDetails, { color: textcolor }]}>
              {shop.store_incharge}{" "}
            </Text>
            <Text style={[styles.storeDetails, { color: textcolor }]}>
              {shop.store_address}{" "}
            </Text>
            <Text style={[styles.storeDetails, { color: textcolor }]}>
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
    
    if (isbn.length === 10 || isbn.length === 13) {
      const YearRegex = new RegExp("^[12][0-9]{3}$");
      try {
        
        const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);

        const json = await res.json();
        setName(json.title);

        if (YearRegex.test(json.publish_date)) {
          
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
          
        }
      } catch (e) {
        
        if (isbn.length === 13) {
          alert(
            "Unable to find the book from the ISBN number. Please provide the details"
          );
        }
        // setError('Error while fetching isbn')
      }
    }
  };

  /*Barcode scanner */
  const [scanned, setScanned] = useState(false);
  const [showQR, setShowQR] = useState(false);

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
        
        setUserBookPrice(res.response.pricing);
      } else {
        setUserBookPrice(0);
      }
    } catch (e) {
      
    }
  };

  useEffect(() => {
    getPricing();
  }, [price, transaction_type]);
  
  

  return (
    <SafeAreaView
      style={{
        flex: 1,
        
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        opacity: visible || showQR ? 0.1 : 1,
      }}
    >
      <View style={{flex:1}}>
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
          <Modal visible={showQR} transparent={true}>
            <TouchableOpacity
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                justifyContent:'center',
                opacity: showQR ? 0.7 : 0,
                zIndex: 1000,
              }}
              onPress={() => setShowQR(false)}
            >
              <Pressable
                onPress={() => setShowQR(false)}
                style={{
                  alignSelf: "flex-end",
                  marginRight: "9%",
                }}
              >
                <Closemodal />
              </Pressable>
              <Barcode
                setIsbn={setIsbn}
                FetchBookfromISBN={FetchBookfromISBN}
                showQR={showQR}
                setShowQR={setShowQR}
              />
            </TouchableOpacity>
          </Modal>
        )}

        <View style={{ flex: 6, flexDirection: "row", marginLeft: 10 }}>
          <View style={styles.inputfields}>
            <View style={styles.isbn}>
              <TextInput
                style={[
                  styles.inputtextbox,
                  styles.isbninput,
                  { color: textcolor },
                ]}
                placeholder="ISBN"
                placeholdertextcolor={"#6E7A7D"}
                underlineColor={textcolor}
                value={isbn}
                onChangeText={(isbn) => FetchBookfromISBN(isbn)}
                keyboardType="number-pad"
                theme={{
                  colors: { text: textcolor, placeholder: textcolor },
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
              placeholdertextcolor={"#6E7A7D"}
              value={name}
              underlineColor={textcolor}
              onChangeText={(text) => setName(text)}
              theme={{
                colors: { text: textcolor, placeholder: textcolor},
              }}
            />
            <TextInput
              style={styles.inputtextbox}
              placeholder="Author"
              value={author}
              placeholdertextcolor={"#6E7A7D"}
              underlineColor={textcolor}
              onChangeText={(text) => setAuthor(text)}
              theme={{
                colors: { text: textcolor, placeholder: textcolor},
              }}
            />
            <View style={styles.container}>
              <TextInput
                style={[styles.inputtextbox, styles.subcontainer]}
                placeholder="Year"
                placeholdertextcolor={"#6E7A7D"}
                value={year}
                onChangeText={(text) => setYear(text.replace(/[^0-9]/g, ""))}
                keyboardType="number-pad"
                underlineColor={textcolor}
                maxLength={4}
                theme={{
                  colors: { text: textcolor, placeholder: textcolor },
                }}
              />
              <View
                style={{
                  flex: 1,
                  marginLeft: 10,
                  justifyContent: "flex-end",
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
                    color: textcolor,
                  }}
                  place
                  useNativeAndroidPickerStyle={false}
                  style={customPickerStyles}
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "column", flex: 1 }}>
            <View style={styles.uploadimage}>
              {props.route.params?.photo && imgurl ? (
                <View style={{ width: "100%", height: "100%" }}>
                  {imageloading && (
                    <ActivityIndicator style={{ marginTop: 20 }} color='#E96A59' />
                  )}
                  <Image
                    style={{
                      flex: 1,
                      height: "100%",
                      width: "100%",
                      resizeMode: "cover",

                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
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
                      height: 40,
                    }}
                    labelStyle={{ color: "white", fontSize: 14 }}
                    onPress={() => props.navigation.navigate("Camerascreen")}
                  >
                    Edit Photo
                  </Button>
                </View>
              ) : (
                <Pressable
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => props.navigation.navigate("Camerascreen")}
                >
                  <Addphoto />
                </Pressable>
              )}
            </View>
          </View>
        </View>
        <View style={{ flex: 2, flexDirection: "row", marginLeft: 10 }}>
          <View style={{ width: "55%", flexDirection: "row" }}>
            <View style={{ alignSelf: "center", width: "40%" }}>
              <TextInput
                style={[styles.inputtextbox]}
                placeholder="Price"
                value={price}
                placeholdertextcolor={"#6E7A7D"}
                onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ""))}
                keyboardType="number-pad"
                underlineColor={textcolor}
                maxLength={4}
                theme={{
                  colors: { text: textcolor, placeholder: textcolor },
                }}
              />
            </View>
            <View style={{ alignSelf: "center", flex: 1, marginLeft: 10 }}>
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
                  
                }}
              />
            </View>
          </View>
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Text
              style={{
                fontFamily: "DMSansbold",
                color: "#E96A59",
                alignSelf: "center",
                fontSize: 16,
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
            marginLeft: 10,
            justifyContent: "flex-start",
          }}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <StaticText text="Condition of the book" fontS={16} />
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Pressable
                  onPress={() => {
                    setVisible(true);
                    
                  }}
                >
                  <Info />
                </Pressable>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={visible}
                >
                  <TouchableOpacity
                    style={styles.centeredView}
                    onPress={() => setVisible(false)}
                  >
                    <Pressable
                      onPress={() => setVisible(false)}
                      style={{
                        alignSelf: "flex-end",
                        marginRight: "10%",
                      }}
                    >
                      <Closemodal />
                    </Pressable>
                    <View style={styles.modalView}>
                      <Text style={styles.headerText}>
                        Guideline for selecting condition
                      </Text>
                      <Text style={styles.modaltextcolor}>
                        Great(Tight and unopened)
                      </Text>
                      <Text style={styles.modalText}>
                        The book looks as new but allowing for the normal
                        effects of time on an unused book that has been
                        protected.
                      </Text>
                      <Text style={styles.modaltextcolor}>
                        Good(Shelfwear and EdgeWorn)
                      </Text>
                      <Text style={styles.modalText}>
                        Book that shows some small signs of wear - but no tears
                        - on either binding or paper.No pages are missing.
                      </Text>
                      <Text style={styles.modaltextcolor}>
                        Fair(Chipped and Dampstained)
                      </Text>
                      <Text style={styles.modalText}>
                        Book that shows some small signs of wear - but no tears
                        - on either binding or paper.No pages are missing.
                      </Text>
                      <Text style={styles.modaltextcolor}>
                        Bad(Price Clipped and wormless)
                      </Text>
                      <Text style={styles.modalText}>
                        Shows wear and tear but all the text pages and
                        illustrations or maps are present. It may lack
                        endpapers, half-title, and even the title page
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Modal>
              </View>
            </View>
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
                      color:
                        bookCondition === "Great" ? "#ffffff" : textcolor,
                    },
                  ]}
                >
                  Great
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
                      color: bookCondition === "Good" ? "#ffffff" : textcolor,
                    },
                  ]}
                >
                  Good
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
                      color: bookCondition === "Fair" ? "#ffffff" : textcolor,
                    },
                  ]}
                >
                  Fair
                </Text>
              </Pressable>
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
                      color: bookCondition === "Bad" ? "#ffffff" : textcolor,
                    },
                  ]}
                >
                  Bad
                </Text>
              </Pressable>
            </View>
          </View>

          {selected}

          {error !== "" && (
            <Snackbar
              visible={true}
              style={{
                flexDirection: "row",
                borderColor: "#E96A59",
                alignSelf: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderRadius: 20,
                backgroundColor: "#FFFFFF",
                width: "80%",
                height: 50,
              }}
            >
              <Svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M1.69774 16.3181L9.19481 3.12325C9.96913 1.76045 11.939 1.77753 12.6895 3.15357L19.8867 16.3484C20.6137 17.6812 19.649 19.3061 18.1309 19.3061H3.43665C1.90318 19.3061 0.940188 17.6514 1.69774 16.3181Z"
                  fill="#E96A59"
                />
                <Path
                  d="M10.9792 8.61069C10.6525 8.61069 10.3819 8.51269 10.1672 8.31669C9.96187 8.12069 9.8592 7.87336 9.8592 7.57469C9.8592 7.27602 9.96187 7.03336 10.1672 6.84669C10.3819 6.65069 10.6525 6.55269 10.9792 6.55269C11.3059 6.55269 11.5719 6.65069 11.7772 6.84669C11.9919 7.03336 12.0992 7.27602 12.0992 7.57469C12.0992 7.87336 11.9919 8.12069 11.7772 8.31669C11.5719 8.51269 11.3059 8.61069 10.9792 8.61069ZM10.0832 16.6327V9.68869H11.8752V16.6327H10.0832Z"
                  fill="white"
                />
              </Svg>

              <Text
                style={{
                  fontSize: 16,

                  fontFamily: "DMSansbold",
                  color: "#E96A59",
                }}
              >
                Please fill all the fields
              </Text>
            </Snackbar>
          )}
        </View>

        <View
          style={{
            marginLeft: 20,
            alignItems: "center",
            flex: 2.5,
            justifyContent: "flex-end",
          }}
        >
          {shopoption}
          <Button
            theme={{ roundness: 120 }}
            style={{
              width: 215,
              height: 40,
              marginBottom: 10,
              alignSelf: "center",
              backgroundColor:'#E96A59'
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
      </View>
    </SafeAreaView>
  );
};

export default React.memo(UploadRoute);
