import React from "react";

import FastImage from "react-native-fast-image";

import { ScrollView, View, Image, StyleSheet, Pressable } from "react-native";

import { Text } from "react-native-paper";

const Horizontalscrollview = (props) => {
  return (
    <ScrollView style={styles.cardscroll} horizontal={true}>
      {props.booklist.map((book, idx) => (
        <Pressable
          key={idx}
          onPress={() =>
            props.navigation.navigate(props.pagename, { book: book })
          }
        >
          <View
            style={{
              flex: 1,
              maxWidth: 170,
              padding: 10,
              backgroundColor: "#FDEDEC",
              borderRadius: 10,
              marginLeft: 5,
            }}
          >
            <View style={{ flex: 3 }}>
              <FastImage
                style={{
                  resizeMode: "cover",
                  maxWidth: 150,
                  maxHeight: 200,
                  minWidth: 150,
                  minHeight: 200,
                }}
                source={{ uri: book.book_img }}
              />
            </View>
            <View style={{ flex: 2, padding: 10 }}>
              <Text style={{ fontSize: 11 }}>{book.book_name}</Text>
              <Text style={{ paddingTop: 5, fontSize: 10 }}>
                {book.book_price}
              </Text>
              <Text style={{ paddingTop: 5, fontSize: 10 }}>
                {book.book_status}
              </Text>
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
    marginHorizontal: 10,
  },
});

export default React.memo(Horizontalscrollview);
