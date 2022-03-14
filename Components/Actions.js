import { Text } from "react-native";
import * as React from "react";

export default function Actions(props) {
  return (
    <Text
      style={{
        fontSize: 18,
        fontWeight: "700",
        color: "#E96A59",
        marginLeft: 21,
        marginTop: 16,
        marginBottom: 2,
      }}
      theme={{ fonts: { regular: "DM Sans" } }}
    >
      {props.text} ({props.length})
    </Text>
  );
}
