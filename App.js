import React, { useState, useEffect } from "react";
import { View,Text } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { DefaultTheme as Theme } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import * as Font from "expo-font";
import Navigation from "./main pages/Navigation";
import Appreducer from "./reducer";
import thunk from "redux-thunk";
import NetInfo from "@react-native-community/netinfo";
import {LogBox} from "react-native";

LogBox.ignoreLogs([
"ViewPropTypes will be removed",
"EventEmitter.removeListener",
'"requestPermissionsAsync()" is now deprecated'
])
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
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    loadFontsAsync();

  }, []);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);


  const loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsloaded(true);
  };

  if (!loaded) {
    
    return <View>
      <Text>Trouble connecting to the internet</Text>
    </View>;
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


