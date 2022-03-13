import * as React from "react";
import StaticText from "./StaticText";

export default function Queryinfo(props) {
  return (
    <>
      <StaticText text={props.bookname} fontS={18} />
      <StaticText text={props.bookauthor} />
      <StaticText text={props.bookcondition} />
      <StaticText text={props.bookprice} />
      <StaticText text={props.bookdistance} />
    </>
  );
}
