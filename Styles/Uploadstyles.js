import { StyleSheet,StatusBar } from "react-native";
export const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      width: "70%",
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 10,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      textAlign: "center",
      fontFamily: "DMSansbold",
    },
    modalText: {
      marginBottom: 10,
      fontFamily: "DMSans",
    },
    headerText: {
      marginBottom: 10,
      fontFamily: "DMSansbold",
    },
    modalTextColor: {
      marginBottom: 10,
      color: "#0036F4",
      fontFamily:"DMSansbold"
    },
  
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
      width: "55%",
      justifyContent: "space-between",
    },
    inputtextbox: {
      backgroundColor: "transparent",
      justifyContent: "center",
      height: 35,
      marginTop: 10,
    },
    isbn: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingTop: 2,
    },
    isbninput: {
      width: "85%",
    },
    container: {
      flexDirection: "row",

    },
    subcontainer: {
      marginHorizontal: 1,
      width: "40%",
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
      justifyContent: "flex-end",
       
      backgroundColor: "#6E797C",
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
      borderRadius: 18,
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
      color: '#FFFFFF',
      paddingHorizontal:10,
      height: 40,
      marginHorizontal: 1,
      width: "100%",
      backgroundColor:'#0036F4'
    },
    inputAndroid: {
      fontSize: 14,
      borderWidth: 2,
      borderColor: "#0036F4",
      borderRadius: 20,
      color: '#FFFFFF',
      paddingHorizontal:10,
      height: 40,
      marginHorizontal: 1,
      width: "100%",
      backgroundColor:'#0036F4'
    },
  });
