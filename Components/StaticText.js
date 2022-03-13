import { Text } from "react-native";
import * as React from "react";
import {
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";

export default function StaticText(props) {
  return (
    <Text style={{ fontSize: props.fontS, fontFamily: "DMSans" }}>
      {props.text}
    </Text>
  );
}

StaticText.defaultProps = {
  fontSize: 14,
};
