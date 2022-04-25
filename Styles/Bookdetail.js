import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    title: {
      marginTop: 20,
      marginLeft: 20,
      marginBottom: 20,
      color: "#E96A59",
      fontWeight: "700",
    },
    layout: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    fields: {
      width: "45%",
    },
  
    BookDetailTitle: {
      marginLeft: 20,
      fontSize: 14,
      marginBottom: 5,
      fontFamily: "DMSans",
      color: "#6E7A7D",
    },
    BookDetailValue: {
      marginLeft: 20,
      fontFamily: "DMSans",
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#6E7A7D",
      color: "#0D1936",
      borderColor: "#0D1936",
      fontSize: 17,
    },
  
    aside: {
      width: "40%",
      height: 330,
      marginRight: 20,
      alignItems:'center'
    },
    button: {
      width:150,
      marginHorizontal: "auto",
      marginTop: 20,
      backgroundColor: "#E96A59",
      fontWeight: "700",
      borderRadius: 50,
      padding: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
    shop: {
      marginVertical: 8,
    },


  
    shopDetailsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-start",
      marginHorizontal: 20,
    },
    shopDetails: {
      flex: 3,
      paddingVertical: 6,
      borderWidth: 2,
      fontWeight: "700",
      borderColor: "#0036F4",
      borderRadius: 18,
      textAlign: "center",
    },
    shopDistance: {
      flex: 2,
      marginRight: 20,
    },
    storeDetails: {
      lineHeight: 20,
      fontFamily: "DMSans",
    },
    map: {
      marginBottom: 20,
    },
  });
  