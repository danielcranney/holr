import React, { useContext } from "react";
import { MadeWithTag } from "../MadeWithTag";
import { SelectedTag } from "../SelectedTag";
import Image from "next/image";
import { StateContext } from "../../pages/_app";

export const BasicAlternative = () => {
  const { state, dispatch } = useContext(StateContext);
  return (
    <div
      className={`bg-xlight w-86 sm:w-96 relative flex flex-col items-center justify-center p-3 md:p-6 rounded-lg hover:cursor-pointer border-8 group transition-all duration-150 ease-in-out ${
        state.selectedStyle === "basic-alt" ? "border-brand" : "border-xlight"
      }`}
      onClick={() => {
        dispatch({
          type: "select-style",
          payload: "basic-alt",
        });
      }}
    >
      {state.selectedStyle === "basic-alt" ? <SelectedTag /> : null}
      <div className="inline-flex items-center w-full p-6 bg-white rounded-lg shadow-lg md:p-8 shadow-light/30">
        <div className="flex items-center h-full mr-4 w-72">
          <Image
            src="/profile.jpg"
            width={102}
            height={102}
            className="w-full h-full overflow-hidden rounded-full"
          />
        </div>
        <div className="flex-grow">
          <h1 className="mb-1 text-xl font-bold sm:text-2xl text-dark">
            Sara Jenkins
          </h1>
          <h2 className="text-base font-semibold tracking-wider text-brand">
            @sarajenkins90
          </h2>
          <p className="mb-0 text-sm tracking-wide text-mid">
            A designer and developer in Queensland, Australia. Coding by day,
            designing by night.
          </p>
        </div>
      </div>
      <MadeWithTag />
    </div>
  );
};
