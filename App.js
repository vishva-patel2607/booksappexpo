import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
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
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}

//  <Loggedin token={"hello"} theme={{theme}} />
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#E96A59",
    accent: "#EF90A9",
    background: "#FFFFFF",
    surface: "#EDEDF0",
    disabled: "#808080",
    backdrop: "#7CABF0",
    onSurface: "#EDEDF0",
    notification: "#EF90A9",
  },
};
