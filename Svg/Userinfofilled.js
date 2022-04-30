import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";

function UserInfoFilled() {
  const { setTheme, Theme } = React.useContext(ThemeContext);
  if (Theme === "Light") {
    return (
      <Svg
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M9 9.41424C11.3235 9.41424 13.2071 7.53065 13.2071 5.20712C13.2071 2.88359 11.3235 1 9 1C6.67647 1 4.79288 2.88359 4.79288 5.20712C4.79288 7.53065 6.67647 9.41424 9 9.41424Z"
          fill="#0D1936"
          stroke="#0D1936"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M17 17.8285C16.4565 16.1338 15.389 14.6555 13.9512 13.6067C12.5134 12.5578 10.7797 11.9927 9 11.9927C7.22032 11.9927 5.48661 12.5578 4.04882 13.6067C2.61104 14.6555 1.54346 16.1338 1 17.8285H17Z"
          fill="#0D1936"
          stroke="#0D1936"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    );
  } else {
    return (
      <Svg
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M9.00009 9.41424C11.3236 9.41424 13.2072 7.53065 13.2072 5.20712C13.2072 2.88359 11.3236 1 9.00009 1C6.67656 1 4.79297 2.88359 4.79297 5.20712C4.79297 7.53065 6.67656 9.41424 9.00009 9.41424Z"
          fill="#ECEFEE"
          stroke="#ECEFEE"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M17 17.8285C16.4565 16.1338 15.389 14.6555 13.9512 13.6067C12.5134 12.5578 10.7797 11.9927 9 11.9927C7.22032 11.9927 5.48661 12.5578 4.04882 13.6067C2.61104 14.6555 1.54346 16.1338 1 17.8285H17Z"
          fill="#ECEFEE"
          stroke="#ECEFEE"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    );
  }
}
export default React.memo(UserInfoFilled);