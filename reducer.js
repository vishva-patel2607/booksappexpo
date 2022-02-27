import React from "react";
import SecureStore from "expo-secure-store";

const initialState = {
  user: {
    accountUsername: "JhonnyAppleseed",
    accountNumber: "1234567890",
    token: "JhonnyAppleseed",
    isAuthenticated: false,
    isFirstTime: true,
  },
};

const Appreducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload.user,
      };
    case "LOGOUT_USER":
      return {
        user: initialState.user,
      };
    default:
      return state;
  }
};

export default Appreducer;
