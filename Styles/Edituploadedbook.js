import { StyleSheet,StatusBar } from "react-native";

export const styles = StyleSheet.create({
    main: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
      backgroundColor: "#ECEFEE",
    },
    heading: {
      marginVertical: 10,
      fontWeight: "700",
      color: "#E96A59",
    },
    layout: {
      flexDirection: "row",
    },
    inputfields: {
      width: "50%",
      justifyContent: "space-around",
    },
    inputtextbox: {
      backgroundColor: "transparent",
      justifyContent: "center",
      height: 20,
      marginTop: 10,
    },
    isbn: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingTop: 2,
    },
    isbninput: {
      width: "90%",
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    shop: {
      marginVertical: 15,
      marginBottom: 2,
    },
  
    shopDetailsContainer: {
      flexDirection: "row",
  
      alignItems: "center",
    },
    shopDetails: {
      flex: 8,
      paddingVertical: 6,
      borderWidth: 2,
      fontWeight: "700",
      borderColor: "#0036F4",
      borderRadius: 20,
      textAlign: "center",
      fontFamily: "DMSans",
    },
    subcontainer: {
      marginHorizontal: 1,
      width: "45%",
    },
  
    shopDistance: {
      flex: 5,
      marginRight: 20,
    },
  
    checkboxContainer: {
      width: "20%",
      borderWidth: 2,
      borderColor: "#0036F4",
      borderRadius: 20,
      alignItems: "center",
      paddingVertical: 5,
    },
    checkboxText: {
      fontWeight: "700",
    },
    button: {
      width: 215,
      margin: 10,
      padding: 5,
      fontSize: 18,
      fontWeight: "700",
      backgroundColor: "#E96A59",
      borderRadius: 25,
  
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    uploadimage: {
      marginBottom: 10,
      alignItems: "center",
      borderRadius: 20,
      marginLeft: 10,
      marginRight: 10,
    },
    shop: {
      marginVertical: 15,
      marginBottom: 2,
    },
  
    shopDetailsContainer: {
      flexDirection: "row",
  
      alignItems: "center",
    },
    shopDetails: {
      flex: 8,
      paddingVertical: 6,
      borderWidth: 2,
      fontWeight: "700",
      borderColor: "#0036F4",
      borderRadius: 20,
      textAlign: "center",
      fontFamily: "DMSans",
    },
    shopDistance: {
      flex: 5,
      marginRight: 20,
    },
    storeDetails: {
      lineHeight: 20,
    },
    map: {
      marginBottom: 20,
    },
  });
  
  export const customPickerStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      borderWidth: 2,
      borderColor: "#0036F4",
      borderRadius: 20,
  
      height: 35,
      marginHorizontal: 1,
      width: "100%",
    },
    inputAndroid: {
      fontSize: 14,
      borderWidth: 2,
      borderColor: "#0036F4",
      borderRadius: 20,
      paddingHorizontal: 5,
      height: 35,
      marginHorizontal: 10,
      width: "80%",
      marginLeft: 10,
    },
  });