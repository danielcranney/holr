import React, { useContext } from "react";
import { StateContext } from "../../pages/_app";

export const PreviewBasicAlternative = () => {
  const { state, dispatch } = useContext(StateContext);
  return (
    <div
      className={`items-center flex flex-col relative p-4 md:p-8 rounded-lg bg-xlight hover:cursor-pointer group transition-all duration-150 ease-in-out w-full ipx:w-66 ip12:w-70 sm:w-96`}
    >
      <div className="relative flex items-center p-6 overflow-hidden bg-white rounded-lg shadow-lg shadow-light/30">
        <div className="z-20 flex w-20 mr-4 sm:w-24">
          <div className="w-20 h-20 bg-gray-300 rounded-full sm:w-24 sm:h-24"></div>
        </div>

        <div className="flex-grow">
          <div className="w-24 h-6 mb-2 rounded-md bg-dark"></div>
          <div
            className={`h-4 mb-4 rounded-md w-20 ${state.cardBgColor}`}
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
