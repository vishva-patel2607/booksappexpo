import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const Barcode = ({ setIsbn, FetchBookfromISBN, showQR, setShowQR }) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(`ISBN code scanned successfully!`);
    setShowQR(false);
    setIsbn(data);
    FetchBookfromISBN(data);
    if (showQR) setScanned(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  
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
            height:"80%",
            
            
          }}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[
              StyleSheet.absoluteFillObject,
              {
                
                borderRadius:20,
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

export default React.memo(Barcode);
