import * as React from "react";
import {View } from 'react-native';
import StaticText from "./StaticText";

 function Queryinfo(props) {
  return (
    <View style={{justifyContent:'space-around',flex:1}}>
      
      <StaticText text={props.bookname} fontS={18}  />
      <StaticText text={props.bookauthor} fontS={16}/>
      <StaticText text={props.bookcondition + " condition"}  />
      <StaticText text={props.bookprice} />
      
    
    </View>
  );
}
export default React.memo(Queryinfo);