import { Text } from "react-native";
import * as React from "react";
import {useTheme} from '@react-navigation/native';


function StaticText(props) {
  const {colors} = useTheme();
  return (
    <Text style={{ fontSize: props.fontS, fontFamily: "DMSans",color:colors.text }}>
      {props.text}
    </Text>
  );
}

StaticText.defaultProps = {
  fontSize: 14,
};
export default React.memo(StaticText);