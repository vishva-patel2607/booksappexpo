import * as React from "react";
import { Image, View } from "react-native";

export default function BAheader() {
  return (
    <View style={{ marginLeft: 25, marginTop: 14 }}>
      <Image source={require("../assets/Frame.png")} />
    </View>
  );
}
