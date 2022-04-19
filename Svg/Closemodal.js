import * as React from "react";
import Svg, { Path, G, Rect, Defs, F } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";

export default function Closemodal() {
  return (
    <Svg
      width="27"
      height="26"
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G filter="url(#filter0_d_851_1543)">
        <Rect x="2" width="23" height="22" rx="11" fill="white" />
      </G>
      <Path
        d="M9 7L18 16"
        stroke="#6E7A7D"
        stroke-width="2"
        stroke-linecap="round"
      />
      <Path
        d="M9 16L18 7"
        stroke="#6E7A7D"
        stroke-width="2"
        stroke-linecap="round"
      />
    </Svg>
  );
}
