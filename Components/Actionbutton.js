import * as React from "react";
import { Button } from "react-native-paper";
import { Pressable } from "react-native";
import { PropTypes } from "prop-types";


export default function RenderActionButton({Click,fontS,title}) {
  

  
  return (
    <Pressable onPress={Click}>
      <Button
        theme={{ roundness: 50 }}
        style={{
          width: 215,
          height: 40,
          alignItems: "flex-start",

          justifyContent: "center",
        }}
        labelStyle={{
          fontSize: parseInt(fontS),
          paddingLeft:5,
          color: '#FFFFFF',
          flexDirection: "row",
          fontFamily: "DMSansbold",
        }}
        mode="contained"
      >
        {title}
      </Button>
    </Pressable>
  );
}
RenderActionButton.defaultProps = {
  fontSize: 20,
};

RenderActionButton.propTypes = {
  Click:PropTypes.func,
  fontS:PropTypes.string,
  title:PropTypes.string
}
