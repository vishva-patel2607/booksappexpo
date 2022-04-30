import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";

function UserIcon() {
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
}
export default React.memo(UserIcon);