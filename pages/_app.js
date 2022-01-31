import React, { createContext, useReducer, useState } from "react";
import "../styles/globals.css";
import { InView } from "react-intersection-observer";
export const UserContext = createContext(null);

// Color State
const initialState = {
  searchUser: null,
  userValid: false,
  errorGenerating: false,
  count: 1,
};
// Color Reducer
function reducer(state, action) {
  switch (action.type) {
    case "search-user":
      // Return the total state, with colorType (eg: "mid") object
      // being returned, with the color value updated
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
    default:
      throw new Error();
  }
}

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {getLayout(<Component {...pageProps} />)}
    </UserContext.Provider>
  );
}

export default MyApp;
