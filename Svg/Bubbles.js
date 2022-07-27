import * as React from "react";
import Svg, { Path,G,Rect } from "react-native-svg";

function Bubbles() {
  return (
    <Svg
      width="48"
      height="16"
      viewBox="0 0 48 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G filter="url(#filter0_d_1041_1804)">
        <Rect x="3" width="10" height="10" rx="5" fill="#E96A59" />
        <Rect
          x="4"
          y="1"
          width="8"
          height="8"
          rx="4"
          stroke="#E96A59"
          stroke-width="2"
        />
      </G>
      <G filter="url(#filter1_d_1041_1804)">
        <Rect x="19" width="10" height="10" rx="5" fill="#E96A59" />
        <Rect
          x="20"
          y="1"
          width="8"
          height="8"
          rx="4"
          stroke="#E96A59"
          stroke-width="2"
        />
      </G>
      <G filter="url(#filter2_d_1041_1804)">
        <Rect x="35" width="10" height="10" rx="5" fill="#E96A59" />
        <Rect
          x="36"
          y="1"
          width="8"
          height="8"
          rx="4"
          stroke="#E96A59"
          stroke-width="2"
        />
      </G>
      
    </Svg>
  );
}
export default React.memo(Bubbles);
