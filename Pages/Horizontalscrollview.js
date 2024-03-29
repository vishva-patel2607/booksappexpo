import React, { useState } from "react";

import { ScrollView, View, Image, StyleSheet, Pressable,FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import StaticText from "../Components/StaticText";

const Horizontalscrollview = (props) => {
 
   
  const [loading, showLoading] = useState(false);
  return (
    
    <ScrollView style={styles.cardscroll} horizontal={true} showsHorizontalScrollIndicator={false}>
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
              marginTop: 6,
              
            }}
          >
            <View>
           
           {loading && 
           <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',zIndex:0,position:'absolute'}}>
             <ActivityIndicator size="small" color="#E96A59" />
             </View>}
             {
              <Image
                style={{
                  resizeMode: "cover",
                  // maxWidth: 150,
                  height: 130,
                  width: 100,
                  zIndex:0,
                  // maxHeight: 200,
                  // minWidth: 150,
                  // minHeight: 200,
                  borderRadius: 10,
                }}
                source={{ uri: book.book_img }}
                onLoadStart={() => showLoading(true)}
                onLoadEnd={() => showLoading(false)}
              />
}
            </View>
            <View style={{ alignSelf: "flex-start" }}>
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
