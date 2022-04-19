import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    error: {
      textAlign: "center",
      fontSize: 20,
      color: "red",
      padding: 20,
    },
  
    inputtextbox: {
      marginTop: 11,
      width: 215,
      backgroundColor: "#FFFFFF",
      borderRadius: 120,
      height: 50,
      paddingLeft: 10,
    },
  
    submitbutton: {
      margin: 10,
      fontSize: 20,
      color: "white",
    },
  
    layout: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight +10: 0
    },
  
  });