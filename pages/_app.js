import React, { createContext, useReducer, useState } from "react";
import "../styles/globals.css";
import { InView } from "react-intersection-observer";
export const StateContext = createContext(null);

// Color State
const initialState = {
  searchUser: null,
  userValid: false,
  loading: false,
  errorGenerating: false,
  count: 1,
  selectedStyle: "basic-default",
  cardBgColor: "bg-blue-500",
  cardTextColor: "text-blue-500",
  cardRingColor: "ring-blue-500",
};
// Color Reducer
function reducer(state, action) {
  switch (action.type) {
    case "search-user":
      return {
        ...state,
        searchUser: action.payload,
      };
    case "set-count":
      return {
        ...state,
        count: action.payload,
      };
    case "set-user-validity":
      return {
        ...state,
        userValid: action.payload,
      };
    case "check-for-errors":
      return {
        ...state,
        errorGenerating: action.payload,
      };
    case "select-style":
      return {
        ...state,
        selectedStyle: action.payload,
      };
    case "set-bg-color":
      return {
        ...state,
        cardBgColor: action.payload,
      };
    case "set-text-color":
      return {
        ...state,
        cardTextColor: action.payload,
      };
    case "set-ring-color":
      return {
        ...state,
        cardRingColor: action.payload,
      };
    case "set-loading":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      throw new Error();
  }
}

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </StateContext.Provider>
  );
}

export default MyApp;
