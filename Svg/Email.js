import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";

function EmailIcon() {
    return (
      <Svg
        width="17"
        height="15"
        viewBox="0 0 17 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M15.2722 1H2.18935C1.53249 1 1 1.43265 1 1.96635V12.5962C1 13.1299 1.53249 13.5625 2.18935 13.5625H15.2722C15.929 13.5625 16.4615 13.1299 16.4615 12.5962V1.96635C16.4615 1.43265 15.929 1 15.2722 1Z"
          stroke="#0D1936"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M1.48315 1.48315C3.89902 4.38219 7.7644 9.21392 8.73075 9.21392C9.6971 9.21392 14.0457 4.38219 15.9783 1.48315"
          stroke="#0D1936"
        />
      </Svg>
    ); 
}
export default React.memo(EmailIcon);