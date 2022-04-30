import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../Components/Theme";
 function Birthday() {
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
          d="M15.8462 10.1768H3.15385C2.51659 10.1768 2 10.4523 2 10.7921V17.5614C2 17.9012 2.51659 18.1768 3.15385 18.1768H15.8462C16.4834 18.1768 17 17.9012 17 17.5614V10.7921C17 10.4523 16.4834 10.1768 15.8462 10.1768Z"
          stroke="#0D1936"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M16.6923 6.17676H2.30769C1.58547 6.17676 1 6.31452 1 6.48445V9.86907C1 10.039 1.58547 10.1768 2.30769 10.1768H16.6923C17.4145 10.1768 18 10.039 18 9.86907V6.48445C18 6.31452 17.4145 6.17676 16.6923 6.17676Z"
          stroke="#0D1936"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M14.5835 1.596C13.0909 0.0662026 10.716 1.50703 10.0547 5.62297C10.0292 5.78203 10.1947 5.90102 10.3392 5.82978C12.6617 4.68476 16.2203 3.27349 14.5835 1.596Z"
          stroke="#0D1936"
        />
        <Path
          d="M4.41648 1.596C5.90914 0.0662026 8.28401 1.50703 8.94526 5.62297C8.97082 5.78203 8.8053 5.90102 8.66081 5.82978C6.33834 4.68476 2.77973 3.27349 4.41648 1.596Z"
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
          d="M15.8462 10.1766H3.15385C2.51659 10.1766 2 10.4522 2 10.792V17.5613C2 17.9011 2.51659 18.1766 3.15385 18.1766H15.8462C16.4834 18.1766 17 17.9011 17 17.5613V10.792C17 10.4522 16.4834 10.1766 15.8462 10.1766Z"
          stroke="#ECEFEE"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M16.6923 6.17664H2.30769C1.58547 6.17664 1 6.31439 1 6.48433V9.86894C1 10.0389 1.58547 10.1766 2.30769 10.1766H16.6923C17.4145 10.1766 18 10.0389 18 9.86894V6.48433C18 6.31439 17.4145 6.17664 16.6923 6.17664Z"
          stroke="#ECEFEE"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M14.5835 1.596C13.0909 0.0662026 10.716 1.50703 10.0547 5.62297C10.0292 5.78203 10.1947 5.90102 10.3392 5.82978C12.6617 4.68476 16.2203 3.27349 14.5835 1.596Z"
          stroke="#ECEFEE"
        />
        <Path
          d="M4.41648 1.596C5.90914 0.0662026 8.28401 1.50703 8.94526 5.62297C8.97082 5.78203 8.8053 5.90102 8.66081 5.82978C6.33834 4.68476 2.77973 3.27349 4.41648 1.596Z"
          stroke="#ECEFEE"
        />
      </Svg>
    );
  }
}
export default React.memo(Birthday);