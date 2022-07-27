import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";
function Edit() {
  const { setTheme, Theme } = React.useContext(ThemeContext);
  if (Theme === "Light") {
    return (
      <Svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M5.5 12.7409L1 14.0009L2.26 9.50088L10.5 1.30088C10.5931 1.20563 10.7044 1.12995 10.8271 1.07828C10.9499 1.02662 11.0818 1 11.215 1C11.3482 1 11.4801 1.02662 11.6029 1.07828C11.7256 1.12995 11.8369 1.20563 11.93 1.30088L13.7 3.08088C13.7937 3.17384 13.8681 3.28444 13.9189 3.4063C13.9697 3.52816 13.9958 3.65886 13.9958 3.79088C13.9958 3.92289 13.9697 4.05359 13.9189 4.17545C13.8681 4.29731 13.7937 4.40791 13.7 4.50088L5.5 12.7409Z"
          fill="#0036F4"
          stroke="#0036F4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    );
  } else {
    return (
      <Svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M5.5 12.7409L1 14.0009L2.26 9.50088L10.5 1.30088C10.5931 1.20563 10.7044 1.12995 10.8271 1.07828C10.9499 1.02662 11.0818 1 11.215 1C11.3482 1 11.4801 1.02662 11.6029 1.07828C11.7256 1.12995 11.8369 1.20563 11.93 1.30088L13.7 3.08088C13.7937 3.17384 13.8681 3.28444 13.9189 3.4063C13.9697 3.52816 13.9958 3.65886 13.9958 3.79088C13.9958 3.92289 13.9697 4.05359 13.9189 4.17545C13.8681 4.29731 13.7937 4.40791 13.7 4.50088L5.5 12.7409Z"
          fill="#ECEFEE"
          stroke="#ECEFEE"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    );
  }
}
export default React.memo(Edit);