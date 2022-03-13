import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Divider } from "react-native-paper";
import StaticText from "./StaticText";
// let filters = [
//   {
//     id: 1,
//     name: "Mango",
//   },
// ];
export default function Dropdowncategory({ datafilter, title, value }) {
  const [showoption, setShowoption] = useState(false);
  let titletodisplay = !!value ? value : title;
  const onSelecteditem = (val) => {
    setShowoption(false);
    onSelect(val);
  };
  return (
    <View
      style={{
        flexDirection: "column",
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: "white",
        borderColor: "#0036F4",
        borderWidth: 2,
        borderRadius: 20,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "row",
          width: 120,
          height: 30,
        }}
        onPress={() => setShowoption(!showoption)}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontFamily: "DMSans", fontSize: 14 }}>
            {titletodisplay}
          </Text>
        </View>
        <Image
          source={require("../assets/arrowdown.png")}
          style={{ transform: [{ rotate: showoption ? "180deg" : "0deg" }] }}
        />
      </TouchableOpacity>

      {!showoption && (
        <View>
          {datafilter.map((val, id) => {
            return (
              <TouchableOpacity
                key={id}
                onPress={() => onSelecteditem(val)}
                style={{
                  paddingVertical: 8,
                  height: 30,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: value == val.name ? "#E96A59" : "black",
                    fontFamily: "DMSans",
                    fontSize: 14,
                  }}
                >
                  {val.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}
