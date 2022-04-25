import * as React from "react";
import { Button } from "react-native-paper";
import { PropTypes } from "prop-types";

export default function RenderButton({title,Click}) {
  return (
    <Button
      theme={{ roundness: 120 }}
      style={{ width: 200, height: 50 }}
      labelStyle={{
        fontSize: 20,
        color: "white",
        padding: 3,
      }}
      onPress={Click}
      mode="contained"
    >
      {title}
    </Button>
  );
}


RenderButton.propTypes = {
  title:PropTypes.string,
  Click:PropTypes.func
}
