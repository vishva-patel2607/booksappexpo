import * as React from "react";
import { Appbar } from "react-native-paper";
import { Image, View } from "react-native";

export default function BAheader() {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ marginLeft: 22, marginTop: 14 }}>
        <Image source={require("../assets/Frame.png")} />
      </View>
      <View style={{ marginTop: -10 }}>
        <Image source={require("../assets/CurvedB.png")} />
      </View>
    </View>
  );
}
