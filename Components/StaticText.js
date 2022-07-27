import { Text } from "react-native";
import * as React from "react";
import { ThemeContext } from "./Theme";

function StaticText(props) {
  const {textcolor} = React.useContext(ThemeContext);
  
  return (
    <Text style={{ fontSize: props.fontS, fontFamily: "DMSans",color:textcolor }}>
      {props.text}
    </Text>
  );
}

StaticText.defaultProps = {
  fontSize: 14,
};
export default React.memo(StaticText);