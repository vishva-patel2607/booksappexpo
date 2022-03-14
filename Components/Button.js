import * as React from "react";
import { Button } from "react-native-paper";

export default function RenderButton(props) {
  return (
    <Button
      theme={{ roundness: 120 }}
      style={{ width: 200, height: 50 }}
      labelStyle={{
        fontSize: 20,
        color: "white",
        padding: 3,
      }}
      onPress={props.Click}
      mode="contained"
    >
      {props.title}
    </Button>
  );
}
