import * as React from "react";
import { Button } from "react-native-paper";
import { Pressable } from "react-native";

export default function RenderActionButton(props) {
  return (
    <Pressable onPress={props.Click}>
      <Button
        theme={{ roundness: 50 }}
        style={{
          width: 215,
          height: 40,
          alignItems: "flex-start",

          justifyContent: "center",
        }}
        labelStyle={{
          fontSize: parseInt(props.fontS),
          color: "white",
          flexDirection: "row",
          fontFamily: "DMSansbold",
        }}
        mode="contained"
      >
        {props.title}
      </Button>
    </Pressable>
  );
}
RenderActionButton.defaultProps = {
  fontSize: 20,
};
