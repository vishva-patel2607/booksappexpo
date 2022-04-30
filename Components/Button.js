import * as React from "react";
import { Pressable } from "react-native";
import { Button} from "react-native-paper";
import { PropTypes } from "prop-types";

 function RenderButton({ title, Click }) {
  return (
    <Pressable
      onPress={Click}
      style={({ pressed }) => [pressed ? { opacity: 0.9 } : {}]}
    >
      <Button
        theme={{ roundness: 120 }}
        style={{
          width: 200,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
        labelStyle={{
          fontSize: 20,
          color: "white",
          padding: 3,
        }}
        mode="contained"
      >
        {title}
      </Button>
    </Pressable>
  );
}

RenderButton.propTypes = {
  title: PropTypes.string,
  Click: PropTypes.func,
};
export default React.memo(RenderButton);