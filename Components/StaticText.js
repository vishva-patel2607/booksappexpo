import { Text } from "react-native";
import * as React from "react";
import {useTheme} from '@react-navigation/native';
import { ThemeContext } from "./Theme";

function StaticText(props) {
  const {colors} = useTheme();
  const {Theme} = React.useContext(ThemeContext);
  let textcolor = Theme === 'Light' ? '#0D1936' : '#ECEFEE';
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