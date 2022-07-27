import * as React from "react";
import {View } from 'react-native';
import StaticText from "./StaticText";
import { PropTypes } from "prop-types";

function Searchresult({bookname,bookcondition,booktype,bookprice,bookdistance}) {
  return (
    <View style={{justifyContent:'space-between',flex:1}}>
      <View>
      <StaticText text={bookname} fontS={18}  />
      <StaticText text={bookcondition + " condition"}  />
      <StaticText text={booktype} />
      </View>
      <View>
      <StaticText text={bookprice + " Rs"} />
      <StaticText text={bookdistance + " km(s) away"} />
      </View>
    </View>
  );
}

Searchresult.propTypes = {
  bookname:PropTypes.string,
  bookcondition:PropTypes.string,
  booktype:PropTypes.string,
  booktype:PropTypes.string,
  bookdistance:PropTypes.string
}
export default React.memo(Searchresult);