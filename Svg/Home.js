import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";

export default function HomeIcon() {
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
          d="M18 9.42154C18.0012 9.24003 17.9646 9.06025 17.8926 8.89365C17.8205 8.72705 17.7146 8.57727 17.5815 8.45385L9.5 1L1.41849 8.45385C1.2854 8.57727 1.17946 8.72705 1.10742 8.89365C1.03537 9.06025 0.998802 9.24003 1.00003 9.42154V16.6923C1.00003 17.0391 1.1378 17.3717 1.38304 17.617C1.62828 17.8622 1.9609 18 2.30772 18H16.6923C17.0391 18 17.3717 17.8622 17.617 17.617C17.8622 17.3717 18 17.0391 18 16.6923V9.42154Z"
          stroke="#0D1936"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    );
  } else {
    return (
        <Svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M18 9.42154C18.0012 9.24003 17.9646 9.06025 17.8926 8.89365C17.8205 8.72705 17.7146 8.57727 17.5815 8.45385L9.5 1L1.41849 8.45385C1.2854 8.57727 1.17946 8.72705 1.10742 8.89365C1.03537 9.06025 0.998802 9.24003 1.00003 9.42154V16.6923C1.00003 17.0391 1.1378 17.3717 1.38304 17.617C1.62828 17.8622 1.9609 18 2.30772 18H16.6923C17.0391 18 17.3717 17.8622 17.617 17.617C17.8622 17.3717 18 17.0391 18 16.6923V9.42154Z" stroke="#ECEFEE" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
        
    );
  }
}
