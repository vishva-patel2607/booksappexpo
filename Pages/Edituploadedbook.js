import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  Pressable,
  Image,
  StatusBar,
} from "react-native";
import StaticText from "../Components/StaticText";
import RNPickerSelect from "react-native-picker-select";
import { ThemeContext } from "../Components/Theme";
import Backbutton from "../Components/Backbutton";
import Svg, { Path } from "react-native-svg";
import { logoutUser } from "../actions";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import SwitchSelector from "react-native-switch-selector";

const Edituploadedbook = (props) => {
  const { colors } = useTheme();
  const { setTheme, Theme } = React.useContext(ThemeContext);
  const [Bookdata, setBookdata] = useState(props.route.params?.book);
  const [price, setPrice] = useState(String(Bookdata.book_price));
  const [imgurl, setImgurl] = useState(Bookdata.book_img);
  const [name, setName] = useState(Bookdata.book_name);
  const [transaction_type, setTransaction_type] = useState(
    'lend'
  );
  const [author, setAuthor] = useState(Bookdata.book_author);
  const [year, setYear] = useState(String(Bookdata.book_year));

  const [category, setCategory] = useState(Bookdata.book_category);
  const [bookCondition, setbookCondition] = useState(Bookdata.book_condition);

  const Option = [
    { label: "Lend", value: "lend" },
    { label: "Sell", value: "sell" },
  ];
  let initial = Bookdata.book_transaction_type === "lend" ? 0 : 1;

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
  }, [props.route.params.params?.photo]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const editbooks = () => {
    console.log("edit books function call",Bookdata.book_id,name,author,typeof(price),year,bookCondition,transaction_type);

    fetch("https://booksapp2021.herokuapp.com/Book/Lent/Edit", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify({
        book_id: Bookdata.book_id,
        book_name: name,
        book_author: author,
        book_price: parseInt(price),
        book_year: year,
        book_condition: bookCondition,
        book_transaction_type: transaction_type,
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
          } else {
            console.log(data);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // }
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <View style={{ justifyContent: "flex-start", flex: 1 }}>
        <Pressable onPress={() => props.navigation.navigate("Bookdetail")}>
          <Backbutton />
        </Pressable>
      </View>
      <View style={{ flex: 6, flexDirection: "row", marginLeft: 10 }}>
        <View style={styles.inputfields}>
          <TextInput
            style={styles.inputtextbox}
            theme={{ colors: { text: colors.text, placeholder: colors.text } }}
            placeholder={Bookdata.book_name}
            value={name}
            underlineColor={colors.text}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.inputtextbox}
            theme={{ colors: { text: colors.text, placeholder: colors.text } }}
            placeholder={Bookdata.book_author}
            value={author}
            underlineColor={colors.text}
            onChangeText={(text) => setAuthor(text)}
          />

          <View style={styles.container}>
            <TextInput
              style={[styles.inputtextbox, styles.subcontainer]}
              theme={{
                colors: { text: colors.text, placeholder: colors.text },
              }}
              underlineColor={colors.text}
              placeholder="Year"
              value={String(year)}
              onChangeText={(text) => setYear(text.replace(/[^0-9]/g, ""))}
              keyboardType="number-pad"
              maxLength={4}
            />
            <TextInput
              style={[styles.inputtextbox, styles.subcontainer]}
              theme={{
                colors: { text: colors.text, placeholder: colors.text },
              }}
              underlineColor={colors.text}
              placeholder="Price"
              value={String(price)}
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
              label: category,
              value: category,
              color: colors.text,
            }}
            useNativeAndroidPickerStyle={false}
            style={customPickerStyles}
          />
          <View style={{ alignSelf: "center" }}>
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
          style={{
            flexDirection: "column",
            flex: 1,
            justifyContent: "flex-start",
            marginTop: 20,
          }}
        >
          <View style={styles.uploadimage}>
            <Image
              style={{
                height: 180,
                width: 150,

                borderRadius: 20,
              }}
              source={{
                uri: imgurl,
              }}
              onLoad={() => {
                console.log("Loaded");
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
          justifyContent: "flex-start",
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
        <View style={{ justifyContent: "center", marginRight: 16 }}>
          <View style={styles.shop}>
            <View style={styles.shopDetailsContainer}>
              <Text
                style={[
                  styles.shopDetails,
                  styles.shopDistance,
                  { color: colors.text },
                ]}
              >
                12 km
              </Text>
              <Text style={[styles.shopDetails, { color: colors.text }]}>
                {Bookdata.store.store_name}
              </Text>
            </View>
          </View>

          <View>
            <Text style={[styles.storeDetails, { color: colors.text }]}>
              {Bookdata.store.store_incharge}{" "}
            </Text>
            <Text style={[styles.storeDetails, { color: colors.text }]}>
              {Bookdata.store.store_address}{" "}
            </Text>
            <Text style={[styles.storeDetails, { color: colors.text }]}>
              {Bookdata.store.store_number}
            </Text>
          </View>
        </View>

        {/* {selected} */}
      </View>

      <View
        style={{
          marginLeft: 20,

          justifyContent: "flex-end",
          alignItems: "center",
          flex: 2,
        }}
      >
        {/* <Text style={{ fontFamily: "DMSans" }}>
          You'll get {!price ? 0 : userBookPrice}
        </Text> */}
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
          mode="contained"
          onPress={editbooks}
        >
          Save
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
    justifyContent: "space-around",
  },
  inputtextbox: {
    backgroundColor: "transparent",
    justifyContent: "center",
    height: 20,
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
  subcontainer: {
    marginHorizontal: 1,
    width: "45%",
  },

  shopDistance: {
    flex: 5,
    marginRight: 20,
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
    marginBottom: 10,
    alignItems: "center",
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

    height: 35,
    marginHorizontal: 1,
    width: "100%",
  },
  inputAndroid: {
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
});
export default React.memo(Edituploadedbook);
