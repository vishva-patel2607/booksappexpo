import * as React from "react";
import {View } from 'react-native';
import StaticText from "./StaticText";

export default function Queryinfo(props) {
  return (
    <View style={{justifyContent:'space-between',flex:1}}>
      <StaticText text={props.bookname} fontS={18}  />
      <StaticText text={props.bookauthor} fontS={16}/>
      <StaticText text={props.bookcondition + " condition"}  />
      <StaticText text={props.bookprice} />
      <StaticText text={props.bookdistance} />
    </View>
  );
}
