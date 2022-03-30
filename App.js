import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { DefaultTheme as Theme } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import * as Font from "expo-font";
import Navigation from "./main pages/Navigation";
import Appreducer from "./reducer";
import thunk from "redux-thunk";

const initialState = {
  user: {
    accountUsername: "JhonnyAppleseed",
    accountNumber: "1234567890",
    token: "JhonnyAppleseed",
    isAuthenticated: false,
  },
};
const middleware = [thunk];
const store = createStore(
  Appreducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

//import Loggedin from './Main.js';
let customFonts = {
  DMSans: require("./assets/fonts/DMSans-Regular.ttf"),
  DMSansbold: require("./assets/fonts/DMSans-Bold.ttf"),
};
export default function App() {
  const [loaded, setFontsloaded] = useState(false);
  const [loadedimages,setLoadedimages] = useState(false);

  // useEffect(() => {
  //   const imgs = [
  //     './assets/adaptive-icon.png',
  //     './assets/Addphoto.png',
  //     './assets/Applogo.png',
  //     './assets/arrowdown.png',
  //     './assets/arrowright.png',
  //     './assets/Backbutton.png',
  //     './assets/Backbuttondark.png',
  //     './assets/BAheader.png',
  //     './assets/Backbuttondark.png',
  //     './assets/BAlogo.png',
  //     './assets/BAheader.png',
  //     './assets/BAheaderdark.png',
  //     './assets/birthdatedark.png',
  //     './assets/Birthday.png',
  //     './assets/BooksApp.png',
  //     './assets/chevrondowndark.png',
  //     './assets/CurvedB.png',
  //     './assets/Demobook.png',
  //     './assets/Edit.png',
  //     './assets/Editdisabled.png',
  //     './assets/email.png',
  //     './assets/emaildark.png',
  //     './assets/favicon.png',
  //     './assets/Frame.png',
  //     './assets/Group.png',
  //     './assets/Groupfilled.png',
  //     './assets/Home.png',
  //     './assets/homefilleddark.png',
  //     './assets/icon.png',
  //     './assets/hometabdark.png',
  //     './assets/Line.png',
  //     './assets/password.png',
  //     './assets/Phone.png',
  //     './assets/Phonedark.png',
  //     './assets/search.png',
  //     './assets/searchfilled.png',
  //     './assets/Searchfilleddark.png',
  //     './assets/searchtabdark.png',
  //     './assets/searchtabdarkfilled.png',
  //     './assets/splash.png',
  //     './assets/Union.png',
  //     './assets/upload.png',
  //     './assets/uploaddark.png',
  //     './assets/uploaddarkfilled.png',
  //     './assets/uploadfilled.png',
  //     './assets/user.png',
  //     './assets/userdark.png',
  //     './assets/userfill.png',
  //     './assets/usertab.png',
  //     './assets/usertabdark.png',
  //     './assets/usertabdark.png',
  //     './assets/usertabfilleddark.png',
  //   ];
  // },[])

  // const cacheImages = async(imgs) => {
  //   const promises = await imgs.map((src) => {
  //     return new Promise(function(resolve,reject){
  //       const img = new Image();
  //       img.src=src

  //     }) 
  //   })
  // }

  useEffect(() => {
    loadFontsAsync();
  }, []);
  const loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsloaded(true);
  };

  if (!loaded) {
    console.log(loaded);
    return <View></View>;
  }
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}

//  <Loggedin token={"hello"} theme={{theme}} />
const theme = {
  ...DefaultTheme,
};


