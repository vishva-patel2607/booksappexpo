// Page that can be seen only once
import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";

const BookConditions = (props) => {
  const user = useSelector((state) => state.user);
  if (user.isFirstTime) {
    return (
      <View>
        <Text>Hello welcome to booksapp</Text>
        <Button
          onPress={() => {
            props.navigation.navigate("Mainpage");
          }}
        >
          Go to Main screen
        </Button>
      </View>
    );
  }
  return <></>;
};
export default React.memo(BookConditions);
