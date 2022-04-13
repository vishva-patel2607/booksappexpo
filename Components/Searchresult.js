import * as React from "react";
import {View } from 'react-native';
import StaticText from "./StaticText";

export default function Searchresult(props) {
  return (
    <View style={{justifyContent:'space-between',flex:1}}>
      <View>
      <StaticText text={props.bookname} fontS={18}  />
      <StaticText text={props.bookcondition + " condition"}  />
      </View>
      <View>
      <StaticText text={props.bookprice + " Rs"} />
      <StaticText text={props.bookdistance + " km(s) away"} />
      </View>
    </View>
  );
}
