import { Text } from "react-native";
import * as React from "react";
import { PropTypes } from "prop-types";

 function Actions({text,length}) {
  return (
    <Text
      style={{
        fontSize: 18,
        fontWeight: "700",
        color: "#E96A59",
        marginLeft: 21,
        marginTop: 16,
        marginBottom: 2,
      }}
      theme={{ fonts: { regular: "DM Sans" } }}
    >
      {text} ({length})
    </Text>
  );
}

Actions.propTypes = {
  text:PropTypes.string,
  length:PropTypes.number
}
export default React.memo(Actions);