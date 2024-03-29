import React, { useState } from "react";
import { SafeAreaView, View, Alert, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions";
import { useTheme } from "@react-navigation/native";
import Backbutton from "../Components/Backbutton";
import { TextInput, Text } from "react-native-paper";
import { styles } from "../Styles/EditPhone";
import ActionButton from '../Components/Actionbutton';
import { ThemeContext } from "../Components/Theme";


const EditPhone = (props) => {
  
  const user = useSelector((state) => state.user);
  const [newphoneno, setNewphoneno] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const {textcolor} = React.useContext(ThemeContext);


  const editphone = () => {
    if (newphoneno.length === 0 || !/^\d+$/.test(newphoneno)) {
      alert("Check your Phonenumber");
      return;
    } else {
      fetch("https://booksapp2021.herokuapp.com/User/Changenumber", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify({
          newnumber: newphoneno,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            
            setError(data.message);
            Alert.alert(error, "Please log in again with your new Phone No.", [
              { text: "Login", onPress: () => dispatch(logoutUser()) },
            ]);
          } else {
            if (data.message == "Could not verify") {
              dispatch(logoutUser());
            }
          }
        })
        .catch((error) => {
          
        });
    }
  };

  return (
    <SafeAreaView style={styles.layout}>
      <View style={{ justifyContent: "flex-start", flex: 1 }}>
        <Pressable onPress={() => props.navigation.goBack()}>
          <Backbutton />
        </Pressable>
      </View>
      <View style={{ justifyContent: "flex-start", flex: 1 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: textcolor,
            marginLeft: 22,
            fontFamily: "DMSansbold",
          }}
        >
          CHANGE PHONE
        </Text>
      </View>
      <View style={{ marginLeft: 19, flex: 12 }}>
        <View style={{overflow:'hidden',height:59}}>
        <TextInput
          style={styles.inputtextbox}
          theme={{
            colors: {
              primary: colors.background
            },
            roundness: 120,
          }}
          placeholder="New phone number"
          value={newphoneno}
          onChangeText={(text) => setNewphoneno(text)}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColor="transparent"
          maxLength={10}
        />
        </View>

        <View style={{ marginTop: 25 }}>
          <ActionButton
            title="SAVE"
            Click={editphone}
            fontS="14"
            style={{ marginTop: 25 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default React.memo(EditPhone);
