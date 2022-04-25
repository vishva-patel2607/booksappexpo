import * as React from "react";
import { View } from "react-native";
import { Snackbar, Text } from "react-native-paper";
import Svg, { Path } from "react-native-svg";

export default function CustomSnackbar() {
  return (
    <Snackbar
      visible= {true}
      
      style={{
        flexDirection: "row",
        borderColor: "#E96A59",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",

        height: 40,
      }}
    >
      <Svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M1.69774 16.3181L9.19481 3.12325C9.96913 1.76045 11.939 1.77753 12.6895 3.15357L19.8867 16.3484C20.6137 17.6812 19.649 19.3061 18.1309 19.3061H3.43665C1.90318 19.3061 0.940188 17.6514 1.69774 16.3181Z"
          fill="#E96A59"
        />
        <Path
          d="M10.9792 8.61069C10.6525 8.61069 10.3819 8.51269 10.1672 8.31669C9.96187 8.12069 9.8592 7.87336 9.8592 7.57469C9.8592 7.27602 9.96187 7.03336 10.1672 6.84669C10.3819 6.65069 10.6525 6.55269 10.9792 6.55269C11.3059 6.55269 11.5719 6.65069 11.7772 6.84669C11.9919 7.03336 12.0992 7.27602 12.0992 7.57469C12.0992 7.87336 11.9919 8.12069 11.7772 8.31669C11.5719 8.51269 11.3059 8.61069 10.9792 8.61069ZM10.0832 16.6327V9.68869H11.8752V16.6327H10.0832Z"
          fill="white"
        />
      </Svg>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 16,
            justifyContent: "flex-start",
            fontFamily: "DMSansbold",
            color: "#E96A59",
          }}
        >
          Please fill all the fields
        </Text>
      </View>
    </Snackbar>
  );
}
