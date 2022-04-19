import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";

export default function Info() {
  const { setTheme, Theme } = React.useContext(ThemeContext);
  if (Theme === "Light") {
    return (
      <Svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Circle cx="5.5" cy="5.5" r="5" fill="#F6F6FF" stroke="#0D1936" />
        <Path
          d="M5.50334 3.546C5.35334 3.546 5.22734 3.498 5.12534 3.402C5.02934 3.3 4.98134 3.174 4.98134 3.024C4.98134 2.88 5.02934 2.76 5.12534 2.664C5.22734 2.568 5.35334 2.52 5.50334 2.52C5.64734 2.52 5.77034 2.568 5.87234 2.664C5.97434 2.76 6.02534 2.88 6.02534 3.024C6.02534 3.174 5.97434 3.3 5.87234 3.402C5.77034 3.498 5.64734 3.546 5.50334 3.546ZM5.12534 9V4.536H5.88134V9H5.12534Z"
          fill="#0D1936"
        />
      </Svg>
    );
  } else {
    return (
      <Svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Circle cx="5.5" cy="5.5" r="5" stroke="#ECEFEE" />
        <Path
          d="M5.50334 3.546C5.35334 3.546 5.22734 3.498 5.12534 3.402C5.02934 3.3 4.98134 3.174 4.98134 3.024C4.98134 2.88 5.02934 2.76 5.12534 2.664C5.22734 2.568 5.35334 2.52 5.50334 2.52C5.64734 2.52 5.77034 2.568 5.87234 2.664C5.97434 2.76 6.02534 2.88 6.02534 3.024C6.02534 3.174 5.97434 3.3 5.87234 3.402C5.77034 3.498 5.64734 3.546 5.50334 3.546ZM5.12534 9V4.536H5.88134V9H5.12534Z"
          fill="#ECEFEE"
        />
      </Svg>
    );
  }
}
