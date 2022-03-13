import * as React from "react";
import { View } from "react-native";
import StaticText from "./StaticText";

export default function Newbooks(props) {
  return (
    <View style={{ flexDirection: "column", marginHorizontal: 21 }}>
      <View
        style={{
          backgroundColor: "#6E797C",
          height: 103,
          borderRadius: 10,
          marginBottom: 2,
        }}
      />
      <StaticText text={props.text} />
    </View>
  );
}
