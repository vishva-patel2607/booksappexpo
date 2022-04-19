import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    search: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
      flex: 1,
    },
    touchableopacitystyle: {
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "row",
      width: 100,
      height: 30,
      borderRadius: 20,
    },
    filtercontainer: {
      flexDirection: "column",
      marginTop: 10,
      borderColor: "#0036F4",
      borderWidth: 2,
      borderRadius: 20,
    },
  });