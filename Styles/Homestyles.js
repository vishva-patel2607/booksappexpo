import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight  : 0,
    },
    submitbutton: {
      fontSize: 18,
      height: 40,
      width: 300,
      alignSelf: "center",
      borderRadius: 10,
      color: "white",
    },
    statistics: {
      textAlign: "left",
      marginTop: 20,
    },
    cardview: {
      flex: 1,
    },
  });