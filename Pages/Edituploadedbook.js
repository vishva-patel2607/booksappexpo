import React, { Component, useEffect, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { logoutUser, setUser } from "../actions";
import { useDispatch, useSelector } from "react-redux";
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
  Subheading,
  IconButton,
} from "react-native-paper";


const Edituploadedbook = (props) => {
  const [Bookdata, setBookdata] = useState(props.route.params?.book);
  const [Newname, setNewname] = useState(props.route.params?.book.book_name);
  const [Newauthor, setNewauthor] = useState(
    props.route.params?.book.book_author
  );
  const [Newprice, setNewprice] = useState(props.route.params?.book.book_price);
  const [Newyear, setNewyear] = useState(props.route.params?.book.book_year);
  const [NewCondition, setNewCondition] = useState(
    props.route.params?.book.book_condition
  );


  const [NewImg, setNewImg] = useState(props.route.params?.book.book_img);
  // console.log(props.route.params?.book.book_img);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setBookdata(props.route.params?.book);
    setNewname(props.route.params?.book.book_name),
      setNewauthor(props.route.params?.book.book_author),
      setNewprice(props.route.params?.book.book_price),
      setNewCondition(props.route.params?.book.book_condition),
      setNewyear(props.route.params?.book.book_year);
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
    <SafeAreaView style={styles.layout}>
      <View style={styles.container11}>
        {props.route.params?.photo ? (
          <Pressable
            style={{ flex: 1, height: "100%", width: "100%" }}
            onPress={() =>
              props.navigation.navigate("Camerascreen", {
                redirectTo: "Edituploadedbook",
              })
            }
          >
            <Image
              style={{
                flex: 1,
                resizeMode: "cover",
                height: "100%",
                width: "100%",
              }}
              source={{ uri: props.route.params?.book.book_img }}
            />
          </Pressable>
        ) : (
          <IconButton
            icon="image-plus"
            color="#EF90A9"
            size={50}
            onPress={() =>
              props.navigation.navigate("Camerascreen", {
                redirectTo: "Edituploadedbook",
              })
            }
          />
        )}
      </View>


      <View style={styles.layout}>
        <Text></Text>
        <TextInput
          style={styles.inputtextbox}
          placeholder={Bookdata.book_name}
          value={Newname}
          onChangeText={(text) => setNewname(text)}
          label="Name"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text></Text>
        <TextInput
          style={styles.inputtextbox}
          placeholder={Bookdata.book_author}
          value={Newauthor}
          onChangeText={(text) => setNewauthor(text)}
          label="Author"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text></Text>
        <TextInput
          style={styles.inputtextbox}
          label="Price"
          value={String(Newprice)}
          placeholder={String(Bookdata.book_price)}
          onChangeText={(text) => setNewprice(text.replace(/[^0-9]/g, ""))}
          keyboardType="number-pad"
          maxLength={4}
        />
        <Text></Text>
        <Title style={styles.textbox}>Select the condition of your book:</Title>
        <RadioButton.Group
          onValueChange={(value) => setNewCondition(value)}
          value={NewCondition}
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
                <RadioButton.Item label="Great" value="Great" mode="android" />
              </View>
            </View>

          </View>
        </RadioButton.Group>
        <Text></Text>
        <TextInput
          style={styles.inputtextbox}
          label="Year"
          value={String(Newyear)}
          onChangeText={(text) => setNewyear(text.replace(/[^0-9]/g, ""))}
          keyboardType="number-pad"
          maxLength={4}
        />
        <Text></Text>
        <Text></Text>
        <Button
          mode="contained"
          style={styles.logoutbutton}
          labelStyle={styles.logoutbutton}
          onPress={editbooks}
        >
          Save
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },


  cardview: {
    flex: 1,
  },

  logoutbutton: {
    alignSelf: "center",
    width: 300,
    fontSize: 20,
    color: "white",
    borderRadius: 10,
  },

  textbox: {
    textAlign: "center",
    padding: 10,
    fontSize: 20,
  },

  cardscroll: {
    flex: 1,
    height: "100%",
    margin: 10,
  },

  setFontSizeName: {
    fontSize: 20,
    marginTop: 110,
  },
  setFontSizeAuthor: {
    fontSize: 20,
  },


  cardcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "flex-start",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  submitbutton: {
    margin: 10,
    fontSize: 20,
    color: "white",
  },

  layout: {
    flex: 1,
  },

  editbook: {
    alignSelf: "flex-end",
    marginTop: -10,
  },

  cardcontent: {
    flex: 4,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  cardimage: {
    flex: 3,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  pickupbook: {
    alignSelf: "center",
    width: 300,
    fontSize: 20,
    color: "white",
    borderRadius: 10,
  },

  container11: {
    width: 75,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#EF90A9",
  },
});
export default React.memo(Edituploadedbook);

