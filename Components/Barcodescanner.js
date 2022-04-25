import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Button,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Dimensions } from "react-native";

const Barcode = ({ setIsbn, FetchBookfromISBN, showQR, setShowQR }) => {
  const windowHeight = Dimensions.get("window").height;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(`ISBN code scanned successfully!`);
    setShowQR(false);
    setIsbn(data);
    FetchBookfromISBN();
    if (showQR) setScanned(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{
        zIndex:1000,
    }}>
      {showQR && (
        <View
          style={{
            display: showQR? "flex":"none",
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[
              StyleSheet.absoluteFillObject,
              {
                height: windowHeight,
                width: "100%",
                zIndex: 1000,
              },
            ]}
          />
        </View>
      )}
    </View>
  );
};

export default Barcode;
