import React, { useContext } from "react";
import { StateContext } from "../../pages/_app";

export const PreviewBannerDefault = () => {
  const { state, dispatch } = useContext(StateContext);
  return (
    <div
      className={`items-center flex flex-col relative p-4 md:p-8 rounded-lg bg-xlight hover:cursor-pointer group transition-all duration-150 ease-in-out w-86 sm:w-96`}
    >
      <div className="relative flex flex-col items-center justify-center p-6 overflow-hidden bg-white rounded-lg shadow-lg shadow-light/30">
        <div
          className={`absolute top-0 z-10 w-full overflow-hidden ${state.cardBgColor} h-28`}
        >
          <div className="h-full bg-center"></div>
        </div>
        <div className="relative z-30 flex items-center justify-center w-48">
          <div className="flex w-24 h-24 mt-2 mb-6 bg-gray-300 rounded-full"></div>
        </div>
        <div className="h-6 mb-2 rounded-md w-36 bg-dark"></div>
        <div className={`h-4 mb-4 rounded-md w-32 ${state.cardBgColor}`}></div>
        <div className="flex flex-wrap items-center justify-center mx-8 gap-x-2">
          <div className={`h-3 rounded-md w-16 bg-light mb-2`}>&nbsp;</div>
          <div className={`h-3 rounded-md w-12 bg-light mb-2`}>&nbsp;</div>
          <div className={`h-3 rounded-md w-10 bg-light mb-2`}>&nbsp;</div>
          <div className={`h-3 rounded-md w-12 bg-light mb-2`}>&nbsp;</div>
          <div className={`h-3 rounded-md w-12 bg-light mb-2`}>&nbsp;</div>
          <div className={`h-3 rounded-md w-8 bg-light mb-2`}>&nbsp;</div>
          <div className={`h-3 rounded-md w-12 bg-light mb-2`}>&nbsp;</div>
        </div>
      </div>
    </div>
  );
};
