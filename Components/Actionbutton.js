import * as React from "react";
import { Button } from "react-native-paper";
import { Pressable } from "react-native";
import { PropTypes } from "prop-types";


function RenderActionButton({Click,fontS,title}) {
  

  
  return (
    <Pressable onPress={Click}  style={({ pressed }) => [
            
      pressed ? { opacity: 0.9 } : {},
    ]}>
      <Button
        theme={{ roundness: 50 }}
        style={{
          width: 215,
          height: 40,
          alignItems: "flex-start",
          backgroundColor:'#E96A59',
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
export default React.memo(RenderActionButton);