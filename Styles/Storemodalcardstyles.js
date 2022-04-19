import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    textbox: {
      textAlign: "center",
      padding: 10,
      fontSize: 20,
    },
  
    error: {
      textAlign: "center",
      fontSize: 20,
      color: "red",
      padding: 20,
    },
  
    inputtextbox: {
      margin: 10,
    },
  
    submitbutton: {
      flex: 1,
      margin: 10,
      fontSize: 20,
      color: "white",
    },
  
    uploadimage: {
      flex: 1,
      justifyContent: "center",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
    },
    layout: {
      flex: 1,
      justifyContent: "center",
    },
  
    container1: {
      flexDirection: "row",
    },
  
    container11: {
      flex: 2,
      marginLeft: 10,
      marginBottom: 10,
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      borderWidth: 1,
    },
  
    container12: {
      flex: 5,
    },
  
    container2: {
      justifyContent: "center",
    },
  
    container3: {
      flexDirection: "column",
    },
  
    containerStyle: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      padding: 10,
      width: "80%",
      height: "90%",
      borderRadius: 20,
    },
  
    modal: {
      justifyContent: "center",
      alignItems: "center",
    },
  
    storemodalcardaddress: {
      flex: 3,
      backgroundColor: "#EDEDF0",
      padding: 10,
      borderTopLeftRadius: 10,
    },
  
    storemodalcarddistance: {
      flex: 1,
      backgroundColor: "#7CABF0",
      justifyContent: "center",
      alignItems: "center",
      padding: 5,
      borderTopRightRadius: 10,
    },
  });