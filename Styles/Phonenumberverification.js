import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    main: {
      paddingHorizontal: 20,
    },
    logo: {
      alignItems: "center",
      marginVertical: 50,
    },
    logosvg: {
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      textAlign: "center",
      fontSize: 14,
      marginBottom: 30,
      lineHeight: 20,
    },
    otpInput: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
  
    inputtextbox: {
      width: 35,
      backgroundColor: "#ffffff",
      borderRadius: 8,
      height: 35,
    },
    text: {
      marginVertical: 100,
    },
    textTitle: {
      textAlign: "center",
      color: "#E96A59",
      fontWeight: "700",
    },
    buttonView: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 100,
    },
    button: {
      backgroundColor: "#E96A59",
      fontWeight: "700",
      width: 200,
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderRadius: 120,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    loading: {
      marginHorizontal: 10,
      fontSize: 15,
      textAlign: "center",
      color: "red",
    },
  });