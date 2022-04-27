import { StyleSheet,StatusBar } from "react-native";
export const styles = StyleSheet.create({
    textbox: {
      textAlign: "center",
      padding: 20,
    },
  
    error: {
      textAlign: "center",
      fontSize: 20,
      color: "red",
      padding: 20,
    },
  
    inputtextbox: {
      marginTop: 11,
      width: 270,
      backgroundColor: "#FFFFFF",
      borderRadius: 120,
      height: 50,
    },
  
    submitbutton: {
      margin: 10,
      fontSize: 20,
      color: "white",
      width: 200,
      borderRadius: 20,
    },
  
    loginlayout: {
      flex: 1,
      alignItems: "center",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },

    containerstyle:{
      height: 59,
      overflow: "hidden",
    }
  });