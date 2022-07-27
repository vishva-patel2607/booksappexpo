import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";

function EmailIcon() {
  const { setTheme, Theme } = React.useContext(ThemeContext);
  if (Theme === "Light") {
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
  } else {
    return(
    <Svg
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M15.2722 0.59375H2.18935C1.53249 0.59375 1 1.0264 1 1.5601V12.1899C1 12.7236 1.53249 13.1562 2.18935 13.1562H15.2722C15.929 13.1562 16.4615 12.7236 16.4615 12.1899V1.5601C16.4615 1.0264 15.929 0.59375 15.2722 0.59375Z"
        stroke="#ECEFEE"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.48291 1.0769C3.89878 3.97594 7.76416 8.80767 8.73051 8.80767C9.69685 8.80767 14.0454 3.97594 15.9781 1.0769"
        stroke="#ECEFEE"
      />
    </Svg>
    );
  }
}
export default React.memo(EmailIcon);