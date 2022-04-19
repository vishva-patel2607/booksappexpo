
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

export default function Custommodal(props){
  let visible = props.visible!==undefined?props.visible:false
    const [modalvisible,setModalvisible] = useState(visible);
    return(
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalvisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.headerText}>Guideline for selecting condition</Text>
           <Text style={styles.modalTextColor}>Great</Text>
            <Text style={styles.modalText}>The book looks as new but allowing for the normal effects of time on an unused book that has been protected.</Text>
           <Text style={styles.modalTextColor}>Good</Text>
           <Text style={styles.modalText}>Book that shows some small signs of wear - but no tears - on either binding or paper.No pages are missing.</Text>
           <Text style={styles.modalTextColor}>Fair</Text>
           <Text style={styles.modalText}>Book that shows some small signs of wear - but no tears - on either binding or paper.No pages are missing.</Text>
           <Text style={styles.modalTextColor}>Bad</Text>
           <Text style={styles.modalText}>Shows wear and tear but all the text pages and illustrations or maps are present. It may lack endpapers, half-title, and even the title page</Text>

          
        </View>
      </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
   width:'70%',
    
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    fontFamily:'DMSansbold'
  },
  modalText: {
    marginBottom: 10,
    fontFamily:'DMSans',
  },
  headerText:{
    marginBottom: 10,
    fontFamily:'DMSansbold',
  },
  modalTextColor: {
    marginBottom:10,
    fontFamily:'DMSans',
    color: '#0036F4',

  }
});