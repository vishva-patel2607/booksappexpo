import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";

 function PhoneIcon() {
  const { setTheme, Theme } = React.useContext(ThemeContext);
    return (
      <Svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M13.7071 11.7071L16.3552 14.3552C16.7113 14.7113 16.7113 15.2887 16.3552 15.6448C14.43 17.57 11.3821 17.7866 9.20399 16.153L7.62857 14.9714C5.88504 13.6638 4.33622 12.115 3.02857 10.3714L1.84701 8.79601C0.213407 6.61788 0.430014 3.56999 2.35523 1.64477C2.71133 1.28867 3.28867 1.28867 3.64477 1.64477L6.29289 4.29289C6.68342 4.68342 6.68342 5.31658 6.29289 5.70711L5.27175 6.72825C5.10946 6.89054 5.06923 7.13846 5.17187 7.34373C6.35853 9.71706 8.28294 11.6415 10.6563 12.8281C10.8615 12.9308 11.1095 12.8905 11.2717 12.7283L12.2929 11.7071C12.6834 11.3166 13.3166 11.3166 13.7071 11.7071Z"
          stroke="#0D1936"
        />
      </Svg>
    );
  
}
export default React.memo(PhoneIcon);