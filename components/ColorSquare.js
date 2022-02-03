import React from "react";

export const ColorSquare = ({ bgColor, textColor, handleColorSelection }) => {
  return (
    <button
      onClick={() => {
        handleColorSelection(bgColor, textColor);
      }}
      className={`w-10 h-10 ${bgColor} rounded-lg`}
    ></button>
  );
};
