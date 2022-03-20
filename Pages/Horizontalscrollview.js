import React from "react";



import { ScrollView, View, Image, StyleSheet, Pressable } from "react-native";
import StaticText from "../Components/StaticText";
import { Text } from "react-native-paper";

const Horizontalscrollview = (props) => {
  console.log(props);
  return (
    <ScrollView style={styles.cardscroll} horizontal={true}>
      {props.booklist.map((book, idx) => (
        <Pressable
          key={idx}
          onPress={() =>
            props.navigation.navigate(props.pagename, {
              book: book,
              title: props.title,
            })
          }
        >
          <View
            style={{
              flexDirection: "column",
              marginRight: 12,
              // alignContent: "center",
              // justifyContent: "center",
            }}
          >
            <View>
              <Image
                style={{
                  resizeMode: "contain",
                  // maxWidth: 150,
                  height: 150,
                  width: 100,

                  // maxHeight: 200,
                  // minWidth: 150,
                  // minHeight: 200,
                  borderRadius: 10,
                }}
                source={{ uri: book.book_img }}
              />
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <StaticText text={book.book_name} />
              <StaticText text={book.book_price} />
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  cardscroll: {
    flex: 1,
    height: "100%",
    marginLeft: 21,
  },
});

export default React.memo(Horizontalscrollview);
