import React, { useState } from "react";

//import all the components we are going to use
import { SafeAreaView, StyleSheet, View, TextInput, Image } from "react-native";

export default function Textinput(props) {
  console.log(props);
  const [bordercolor, setBordercolor] = useState("black");
  return (
    <View style={[styles.sectionStyle, { borderColor: bordercolor }]}>
      <Image source={props.src} style={styles.imageStyle} />
      <TextInput
        style={{ flex: 1 }}
        onBlur={() => setBordercolor("black")}
        onFocus={() => setBordercolor("white")}
        placeholder="Enter Your Mobile No Here"
        underlineColorAndroid="transparent"
        autoCorrect={false}
        maxlength={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 50,
    borderRadius: 120,
    margin: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
});
