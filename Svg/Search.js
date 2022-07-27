import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";

function SearchIcon() {
  const { setTheme, Theme } = React.useContext(ThemeContext);
  if (Theme === "Light") {
    return (
      <Svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M8.08769 15.1754C12.0021 15.1754 15.1754 12.0021 15.1754 8.08769C15.1754 4.17327 12.0021 1 8.08769 1C4.17327 1 1 4.17327 1 8.08769C1 12.0021 4.17327 15.1754 8.08769 15.1754Z"
          stroke="#0D1936"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18 18L13.0962 13.0962"
          stroke="#0D1936"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    );
  } else {
    return (
      <Svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M8.08769 15.1754C12.0021 15.1754 15.1754 12.0021 15.1754 8.08769C15.1754 4.17327 12.0021 1 8.08769 1C4.17327 1 1 4.17327 1 8.08769C1 12.0021 4.17327 15.1754 8.08769 15.1754Z"
          stroke="#ECEFEE"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18 18L13.0962 13.0961"
          stroke="#ECEFEE"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    );
  }
}
export default React.memo(SearchIcon);