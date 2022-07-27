import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { ThemeContext } from "./Theme";
import Svg, { Path } from "react-native-svg";

 function Backbutton() {
  const { Theme, setTheme } = React.useContext(ThemeContext);
  return (
    <View style={{ marginLeft: 16, marginTop: 14 }}>
      {Theme === "Light" ? (
        <Svg
          width="22"
          height="19"
          viewBox="0 0 22 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M5.61538 1L1 5.61538L5.61538 10.2308"
            stroke="#0D1936"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M1 5.61536H14.8462C16.4783 5.61536 18.0435 6.26371 19.1976 7.41778C20.3517 8.57185 21 10.1371 21 11.7692C21 13.4013 20.3517 14.9666 19.1976 16.1206C18.0435 17.2747 16.4783 17.923 14.8462 17.923H7.15385"
            stroke="#0D1936"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
      ) : (
        <Svg
          width="22"
          height="19"
          viewBox="0 0 22 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M5.61538 1L1 5.61538L5.61538 10.2308"
            stroke="#ECEFEE"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M1 5.61536H14.8462C16.4783 5.61536 18.0435 6.26371 19.1976 7.41778C20.3517 8.57185 21 10.1371 21 11.7692C21 13.4013 20.3517 14.9666 19.1976 16.1206C18.0435 17.2747 16.4783 17.923 14.8462 17.923H7.15385"
            stroke="#ECEFEE"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
      )}
    </View>
  );
}
export default React.memo(Backbutton);