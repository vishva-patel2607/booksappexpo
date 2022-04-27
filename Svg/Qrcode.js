import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";

export default function QrcodeLogo() {
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
        <Path d="M17 5.57143V1H12.4286" stroke="#0D1936" stroke-width="2" />
        <Path
          d="M12.4286 17.7619L17 17.7619L17 13.1905"
          stroke="#0D1936"
          stroke-width="2"
        />
        <Path
          d="M0.999997 13.1905L0.999998 17.7619L5.57143 17.7619"
          stroke="#0D1936"
          stroke-width="2"
        />
        <Path
          d="M5.57143 0.999982L1 0.999982L1 5.57141"
          stroke="#0D1936"
          stroke-width="2"
        />
        <Path
          d="M8.43033 12.0511C10.0093 12.0511 11.2892 10.7711 11.2892 9.19221C11.2892 7.61329 10.0093 6.33331 8.43033 6.33331C6.8514 6.33331 5.57143 7.61329 5.57143 9.19221C5.57143 10.7711 6.8514 12.0511 8.43033 12.0511Z"
          stroke="#0D1936"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12.4286 13.1904L10.4505 11.2124"
          stroke="#0D1936"
          stroke-width="2"
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
      <Path d="M17.0001 5.57143V1H12.4287" stroke="white" stroke-width="2" />
      <Path
        d="M12.4286 17.7619L17 17.7619L17 13.1905"
        stroke="white"
        stroke-width="2"
      />
      <Path
        d="M0.99986 13.1905L0.99986 17.7619L5.57129 17.7619"
        stroke="white"
        stroke-width="2"
      />
      <Path
        d="M5.57143 1.00001L1 1.00001L1 5.57144"
        stroke="white"
        stroke-width="2"
      />
      <Path
        d="M8.43019 12.0511C10.0091 12.0511 11.2891 10.7712 11.2891 9.19224C11.2891 7.61332 10.0091 6.33334 8.43019 6.33334C6.85126 6.33334 5.57129 7.61332 5.57129 9.19224C5.57129 10.7712 6.85126 12.0511 8.43019 12.0511Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.4282 13.1905L10.4502 11.2125"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>);
  }
}
