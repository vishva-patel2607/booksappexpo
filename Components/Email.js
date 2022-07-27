import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { ThemeContext } from "./Theme";
import Svg, { Path } from "react-native-svg";

 function Email() {
  const {setTheme,Theme} = React.useContext(ThemeContext);
  return (
    <View>
      {Theme === "Light" ? (
        <Svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M15.2722 0.59375H2.18935C1.53249 0.59375 1 1.0264 1 1.5601V12.1899C1 12.7236 1.53249 13.1562 2.18935 13.1562H15.2722C15.929 13.1562 16.4615 12.7236 16.4615 12.1899V1.5601C16.4615 1.0264 15.929 0.59375 15.2722 0.59375Z" stroke="#0D1936" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M1.48315 1.0769C3.89902 3.97594 7.7644 8.80767 8.73075 8.80767C9.6971 8.80767 14.0457 3.97594 15.9783 1.0769" stroke="#0D1936"/>
        </Svg>
        
      ) : (
        <Svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M15.2722 0.59375H2.18935C1.53249 0.59375 1 1.0264 1 1.5601V12.1899C1 12.7236 1.53249 13.1562 2.18935 13.1562H15.2722C15.929 13.1562 16.4615 12.7236 16.4615 12.1899V1.5601C16.4615 1.0264 15.929 0.59375 15.2722 0.59375Z" stroke="#ECEFEE" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M1.48291 1.0769C3.89878 3.97594 7.76416 8.80767 8.73051 8.80767C9.69685 8.80767 14.0454 3.97594 15.9781 1.0769" stroke="#ECEFEE"/>
        </Svg>
      )}
    </View>
  );
}

export default React.memo(Email);