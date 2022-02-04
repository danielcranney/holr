import React, { useContext } from "react";
import { StateContext } from "../pages/_app";

export const ColorSquare = ({
  bgColor,
  textColor,
  ringColor,
  handleColorSelection,
}) => {
  const { state } = useContext(StateContext);
  return (
    <button
      onClick={() => {
        handleColorSelection(bgColor, textColor);
      }}
      className={`w-10 h-10 ${bgColor} rounded-lg ${
        state.cardBgColor === bgColor
          ? `border-2 border-white ring-2 ${ringColor}`
          : ""
      }`}
    ></button>
  );
};
