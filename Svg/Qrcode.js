import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";

export default function QrcodeLogo() {
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
}
