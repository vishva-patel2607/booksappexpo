import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";


export default function PasswordIcon() {
  const {setTheme,Theme} = React.useContext(ThemeContext);
  return (
    <Svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M13.6 7.8999H2.4C1.6268 7.8999 1 8.5267 1 9.2999V17.6999C1 18.4731 1.6268 19.0999 2.4 19.0999H13.6C14.3732 19.0999 15 18.4731 15 17.6999V9.2999C15 8.5267 14.3732 7.8999 13.6 7.8999Z"
        stroke="#0D1936"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.9 7.8999V5.7999C12.9 4.50034 12.3838 3.25401 11.4648 2.33508C10.5459 1.41615 9.29957 0.899902 8.00001 0.899902C6.70044 0.899902 5.45411 1.41615 4.53518 2.33508C3.61625 3.25401 3.10001 4.50034 3.10001 5.7999V7.8999"
        stroke="#0D1936"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.99999 14.1998C8.38659 14.1998 8.69999 13.8864 8.69999 13.4998C8.69999 13.1132 8.38659 12.7998 7.99999 12.7998C7.61339 12.7998 7.29999 13.1132 7.29999 13.4998C7.29999 13.8864 7.61339 14.1998 7.99999 14.1998Z"
        stroke="#0D1936"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
