import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";

export default function UploadIconFilled() {
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
          d="M9.50001 1C7.88094 1 8.28571 6.13953 8.28571 8.51163C5.85712 8.51163 1 8.11628 1 9.69767C1 11.2791 5.0476 10.8837 8.28571 10.8837C8.28571 13.2558 7.88094 18 9.50001 18C11.1191 18 10.7143 13.2558 10.7143 10.8837C13.1428 10.8837 18 11.2791 18 9.69767C18 8.11628 13.1428 8.51163 10.7143 8.51163C10.7143 6.13953 11.1191 1 9.50001 1Z"
          fill="#0D1936"
          stroke="#0D1936"
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
          d="M9.50001 1C7.88094 1 8.28571 6.13953 8.28571 8.51163C5.85712 8.51163 1 8.11628 1 9.69767C1 11.2791 5.0476 10.8837 8.28571 10.8837C8.28571 13.2558 7.88094 18 9.50001 18C11.1191 18 10.7143 13.2558 10.7143 10.8837C13.1428 10.8837 18 11.2791 18 9.69767C18 8.11628 13.1428 8.51163 10.7143 8.51163C10.7143 6.13953 11.1191 1 9.50001 1Z"
          fill="#ECEFEE"
          stroke="#ECEFEE"
        />
      </Svg>
    );
  }
}
