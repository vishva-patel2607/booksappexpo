import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { ThemeContext } from "./Theme";

export default function BAheader() {
  const { setTheme, Theme } = React.useContext(ThemeContext);

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {Theme === "Light" ? (
        <View style={{ marginLeft: 22, marginTop: 14 }}>
          <Image source={require("../assets/Frame.png")} />
        </View>
      ) : (
        <View style={{ marginLeft: 22, marginTop: 14 }}>
          <Image source={require("../assets/BAheaderdark.png")} />
        </View>
      )}
      <View style={{ marginTop: -10 }}>
        <Image source={require("../assets/CurvedB.png")} />
      </View>
    </View>
  );
}
