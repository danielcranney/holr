import React, { useContext } from "react";
import { StateContext } from "../../pages/_app";

export const PreviewBannerAlternative = () => {
  const { state, dispatch } = useContext(StateContext);
  return (
    <div
      className={`w-92 sm:w-96 bg-xlight relative flex flex-col items-center justify-center p-8 rounded-lg hover:cursor-pointer border-8 group transition-all duration-150 ease-in-out border-xlight`}
    >
      <div className="relative flex items-center p-8 overflow-hidden bg-white rounded-lg shadow-lg shadow-light/30">
        <div
          className={`absolute top-0 left-0 w-20 h-full overflow-hidden ${state.cardBgColor}`}
        ></div>
        <div className="z-20 flex w-24 mr-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        </div>

        <div className="flex-grow">
          <div className="h-6 mb-2 rounded-md w-36 bg-dark"></div>
          <div
            className={`h-4 mb-4 rounded-md w-32 ${state.cardBgColor}`}
          ></div>
          <div className="flex flex-wrap items-start justify-start gap-x-2">
            <div className={`h-3 rounded-md w-16 bg-light mb-2`}>&nbsp;</div>
            <div className={`h-3 rounded-md w-12 bg-light mb-2`}>&nbsp;</div>
            <div className={`h-3 rounded-md w-8 bg-light mb-2`}>&nbsp;</div>
            <div className={`h-3 rounded-md w-10 bg-light mb-2`}>&nbsp;</div>
            <div className={`h-3 rounded-md w-12 bg-light mb-2`}>&nbsp;</div>
            <div className={`h-3 rounded-md w-8 bg-light mb-2`}>&nbsp;</div>
            <div className={`h-3 rounded-md w-12 bg-light mb-2`}>&nbsp;</div>
          </div>
        </div>
      </div>
    </div>
  );
};
