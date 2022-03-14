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
export default function Dropdown(props) {
  return (
    <View
      style={{
        flexDirection: "column",
        marginTop: 10,
        marginLeft: 10,
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
          width: 100,
          height: 30,
        }}
        onPress={props.Click}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontFamily: "DMSans", fontSize: 14 }}>
            {props.title}
          </Text>
        </View>
        <Image
          source={require("../assets/arrowdown.png")}
          style={{
            transform: [{ rotate: "0deg" }],
          }}
        />
      </TouchableOpacity>
      {props.option && (
        <View>
          {props.data.map((val, id) => {
            return (
              <TouchableOpacity
                key={id}
                style={{
                  paddingVertical: 8,
                  height: 30,
                  borderRadius: 10,
                }}
                onPress={props.setSelected}
              >
                <Text
                  style={{
                    color: selectedprice == val ? "#E96A59" : "black",
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
