import React, { createContext, useReducer } from "react";
import { SIGN_IN } from "./constants";

const initialState = {
  name: "",
  accessToken: "",
  userID: "",
  photoURL: [],
};

export const Store = createContext(initialState);

const addAccessToken = (state, accessToken) => {
  return { ...state, accessToken: accessToken };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      return addAccessToken(state, action.accessToken);
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
