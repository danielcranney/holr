import React, { useContext } from "react";
import { MadeWithTag } from "../MadeWithTag";
import { SelectedTag } from "../SelectedTag";
import Image from "next/image";
import { StateContext } from "../../pages/_app";

export const BannerDefault = () => {
  const { state, dispatch } = useContext(StateContext);
  return (
    <div
      className={`relative p-3 md:p-6 w-70 rounded-lg bg-xlight border-8 hover:cursor-pointer group transition-all duration-150 sm:w-96 ease-in-out ${
        state.selectedStyle === "banner-default"
          ? "border-brand"
          : "border-xlight"
      }`}
      onClick={() => {
        dispatch({
          type: "select-style",
          payload: "banner-default",
        });
      }}
    >
      {state.selectedStyle === "banner-default" ? <SelectedTag /> : null}
      <div className="relative flex flex-col items-center justify-center p-6 overflow-hidden bg-white rounded-lg shadow-lg md:p-8 shadow-light/30">
        <div className="absolute top-0 w-full overflow-hidden bg-blue-500 h-28">
          <div className="bg-[url('/profile.jpg')] h-full bg-center opacity-20"></div>
        </div>
        <div className="flex items-center justify-center h-full mb-2 w-36">
          <Image
            src="/profile.jpg"
            width={102}
            height={102}
            className="object-scale-down overflow-hidden rounded-full"
          />
        </div>
        <h1 className="mb-1 text-xl font-bold sm:text-2xl text-dark">
          Sara Jenkins
        </h1>
        <h2 className="text-base font-semibold tracking-wider text-brand">
          @sarajenkins90
        </h2>
        <p className="mb-0 text-sm tracking-wide text-center text-mid">
          A designer and developer in Queensland, Australia. Coding by day,
          designing by night.
        </p>
      </div>
      <MadeWithTag />
    </div>
  );
};
