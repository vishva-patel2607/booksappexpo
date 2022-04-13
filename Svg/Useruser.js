import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";

export default function UserIcon() {
  const { setTheme, Theme } = React.useContext(ThemeContext);
  if (Theme === "Light") {
    return (
      <Svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M8.13077 8.50001C10.2018 8.50001 11.8808 6.82108 11.8808 4.75001C11.8808 2.67893 10.2018 1 8.13077 1C6.0597 1 4.38077 2.67893 4.38077 4.75001C4.38077 6.82108 6.0597 8.50001 8.13077 8.50001Z"
          stroke="#0D1936"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M15.2616 16.0001C14.7772 14.4895 13.8256 13.1718 12.544 12.237C11.2624 11.3021 9.7171 10.7983 8.13078 10.7983C6.54447 10.7983 4.99913 11.3021 3.71756 12.237C2.436 13.1718 1.48441 14.4895 1 16.0001H15.2616Z"
          stroke="#0D1936"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    );
  } else {
    return(
    <Svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9.00009 9.41424C11.3236 9.41424 13.2072 7.53065 13.2072 5.20712C13.2072 2.88359 11.3236 1 9.00009 1C6.67656 1 4.79297 2.88359 4.79297 5.20712C4.79297 7.53065 6.67656 9.41424 9.00009 9.41424Z"
        stroke="#ECEFEE"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17 17.8285C16.4565 16.1338 15.389 14.6555 13.9512 13.6067C12.5134 12.5578 10.7797 11.9927 9 11.9927C7.22032 11.9927 5.48661 12.5578 4.04882 13.6067C2.61104 14.6555 1.54346 16.1338 1 17.8285H17Z"
        stroke="#ECEFEE"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
    );
  }
}
