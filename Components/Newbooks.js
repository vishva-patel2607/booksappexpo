import * as React from "react";
import { View } from "react-native";
import StaticText from "./StaticText";
import { PropTypes } from "prop-types";

export default function Newbooks({text}) {
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
      <StaticText text={text} />
    </View>
  );
}

Newbooks.propTypes = {
  text:PropTypes.string,
}
