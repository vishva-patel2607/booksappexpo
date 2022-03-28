import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { ThemeContext } from "../main pages/Navigation";

export default function BAheader() {
  const {Theme,setTheme} = React.useContext(ThemeContext)
  return (
    
    <View style={{ marginLeft: 25, marginTop: 14 }}>
      {Theme === "Light"? (
         <Image source={require("../assets/Frame.png")} />
      ):(
        <Image source={require("../assets/BAheaderdark.png")} />
      )}
     
    </View>
  );
}
