import React, { useState, useContext, useRef, useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { GoToNextStep } from "../components/GoToNextStep";

import { StateContext } from "../pages/_app";
import { ColorSquare } from "../components/ColorSquare";

import { BasicDefault } from "../components/styles/BasicDefault";
import { BasicAlternative } from "../components/styles/BasicAlt";
import { BannerDefault } from "../components/styles/BannerDefault";
import { BannerAlt } from "../components/styles/BannerAlt";
import { PreviewBasicDefault } from "../components/previews/PreviewBasicDefault";
import { PreviewBasicAlternative } from "../components/previews/PreviewBasicAlt";
import { PreviewBannerDefault } from "../components/previews/PreviewBannerDefault";
import { PreviewBannerAlternative } from "../components/previews/PreviewBannerAlt";
import { SidebarFooter } from "../components/SidebarFooter";
import { BodyFooter } from "../components/BodyFooter";

export default function Home() {
  const { state, dispatch } = useContext(StateContext);
  const searchRef = useRef(null);
  const router = useRouter();
  const [visibleSection, setVisibleSection] = useState("findUser");
  const [scrolling, setScrolling] = useState(false);

  const getDimensions = (ele) => {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height - 1;

    return {
      height,
      offsetTop,
      offsetBottom,
    };
  };

  const scrollTo = (ele) => {
    ele.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const contentWrapperRef = useRef();
  const findUserRef = useRef(null);
  const selectStyleRef = useRef(null);
  const editColorsRef = useRef(null);

  useEffect(() => {
    const sectionRefs = [
      { section: "findUser", ref: findUserRef, id: 1 },
      { section: "selectStyle", ref: selectStyleRef, id: 2 },
      { section: "editColors", ref: editColorsRef, id: 3 },
    ];

    const handleScroll = () => {
      const scrollPosition = contentWrapperRef.current.scrollTop;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition >= offsetTop && scrollPosition <= offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();

    contentWrapperRef.current.addEventListener("scroll", handleScroll, true);
    // return () => {
    //   contentWrapperRef.current.removeEventListener(
    //     "scroll",
    //     handleScroll,
    //     true
    //   );
    // };
  }, [visibleSection, scrolling]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      contentWrapperRef.current.addEventListener("scroll", () =>
        setScrolling(contentWrapperRef.current.pageYOffset >= 0)
      );
    }
    return () => {
      setScrolling(false);
    };
  }, []);

  function handleColorSelection(bg, text, ring) {
    dispatch({
      type: "set-bg-color",
      payload: bg,
    });
    dispatch({
      type: "set-text-color",
      payload: text,
    });
    dispatch({
      type: "set-ring-color",
      payload: ring,
    });
  }

  const ValidateUser = async (inputValue) => {
    const response = await fetch("/api/twitter-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        twitterHandle: inputValue,
      }),
    });

    if (!response.ok) {
      const resError = await response.json();
      // throw new Error(`Error: ${response.status}`);
      // console.log(response.message);
      console.log(resError.message);
      console.log(response.status);
      dispatch({
        type: "set-user-validity",
        payload: false,
      });
    } else {
      console.log(response.status);
      const validatedUser = await response.json();
      console.log(validatedUser);
      dispatch({
        type: "set-user-validity",
        payload: validatedUser,
      });
      dispatch({
        type: "check-for-errors",
        payload: false,
      });
    }
  };

  return (
    <main className="flex flex-1 h-screen overflow-hidden" id="Wrapper">
      <Head>
        <title>yodlr | Create a Twitter Shoutout</title>
        <meta name="description" content="Twitter shoutout machine" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <aside
        className="flex flex-col w-20 p-4 bg-white lg:p-8 lg:w-80"
        id="sidebar"
      >
        <div className="flex items-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 mr-0 lg:mr-2 rounded-2xl bg-brand">
            <svg
              className={`w-6 h-6 text-white`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              ></path>
            </svg>
          </div>
          <h1 className="hidden mb-0 text-3xl font-semibold lg:block">yodlr</h1>
        </div>
        <div className="flex flex-col">
          <button
            onClick={() => {
              scrollTo(findUserRef.current);
              dispatch({
                type: "set-count",
                payload: 1,
              });
            }}
            className={`transition-all duration-150 ease-in-out flex group items-center p-3 mb-1 text-left rounded-md hover:cursor-pointer justify-center lg:justify-start ${
              visibleSection === "findUser"
                ? "bg-opacity-5 bg-brand"
                : "bg-opacity-0 bg-transparent hover:bg-opacity-5 hover:bg-brand"
            }`}
          >
            <svg
              className={`w-5 h-5 mr-0 lg:mr-3 ${
                visibleSection === "findUser"
                  ? "text-brand"
                  : "text-mid group-hover:text-brand"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <p
              className={`mb-0 text-lg hidden lg:inline-flex ${
                visibleSection === "findUser"
                  ? "text-brand"
                  : "text-mid group-hover:text-brand"
              }`}
            >
              Find user
            </p>
          </button>

          <button
            onClick={() => {
              scrollTo(selectStyleRef.current);
              dispatch({
                type: "set-count",
                payload: 2,
              });
            }}
            className={`transition-all duration-150 ease-in-out mb-1 flex group items-center p-3 text-left rounded-md hover:cursor-pointer justify-center lg:justify-start ${
              visibleSection === "selectStyle"
                ? "bg-opacity-5 bg-brand"
                : "bg-opacity-0 bg-transparent hover:bg-opacity-5 hover:bg-brand"
            }`}
          >
            <svg
              className={`w-5 h-5 mr-0 lg:mr-3 ${
                visibleSection === "selectStyle"
                  ? "text-brand"
                  : "text-mid group-hover:text-brand"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              ></path>
            </svg>
            <p
              className={`mb-0 text-lg hidden lg:inline-flex ${
                visibleSection === "selectStyle"
                  ? "text-brand"
                  : "text-mid group-hover:text-brand"
              }`}
            >
              Select Style
            </p>
          </button>

          <button
            onClick={() => {
              scrollTo(editColorsRef.current);
              dispatch({
                type: "set-count",
                payload: 3,
              });
            }}
            className={`transition-all duration-150 mb-1 ease-in-out flex group items-center p-3 text-left rounded-md hover:cursor-pointer justify-center lg:justify-start ${
              visibleSection === "editColors"
                ? "bg-opacity-5 bg-brand"
                : "bg-opacity-0 bg-transparent hover:bg-opacity-5 hover:bg-brand"
            }`}
          >
            <svg
              className={`w-5 h-5 mr-0 lg:mr-3 ${
                visibleSection === "editColors"
                  ? "text-brand"
                  : "text-mid group-hover:text-brand"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
            <p
              className={`mb-0 text-lg hidden lg:inline-flex ${
                visibleSection === "editColors"
                  ? "text-brand"
                  : "text-mid group-hover:text-brand"
              }`}
            >
              Edit Colors
            </p>
          </button>

          <button
            onClick={() => {
              if (state.userValid) {
                dispatch({
                  type: "check-for-errors",
                  payload: false,
                });
                router.push({
                  pathname: "/generate",
                  query: {
                    searchUser: state.searchUser,
                    cardStyle: state.selectedStyle,
                    textColor: state.cardTextColor,
                    bgColor: state.cardBgColor,
                  },
                });
                dispatch({
                  type: "set-count",
                  payload: 4,
                });
              } else {
                dispatch({
                  type: "check-for-errors",
                  payload: true,
                });
                router.push("/#find-user");
              }
            }}
            className={`relative transition-all duration-150 mb-1 ease-in-out flex group items-center p-3 text-left rounded-md hover:cursor-pointer justify-center lg:justify-start ${
              state.count === 4
                ? "bg-opacity-5 bg-brand"
                : "bg-opacity-0 bg-transparent hover:bg-opacity-5 hover:bg-brand"
            }`}
          >
            <svg
              className={`w-5 h-5 mr-0 lg:mr-3 ${
                state.count === 4
                  ? "text-brand"
                  : "text-mid group-hover:text-brand"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              ></path>
            </svg>
            <p
              className={`mb-0 text-lg hidden lg:inline-flex ${
                state.count === 4
                  ? "text-brand"
                  : "text-mid group-hover:text-brand"
              }`}
            >
              Download Shoutout
            </p>
          </button>
        </div>
        <SidebarFooter />
      </aside>
      <div
        className="flex flex-col flex-1 px-4 pb-4 overflow-y-auto lg:px-8 lg:pb-8 bg-xxlight"
        id="content-wrapper"
        ref={contentWrapperRef}
      >
        {/* Find User Section */}
        <section
          id="find-user"
          ref={findUserRef}
          className="flex flex-col py-4 border-b-2 lg:py-8 border-xlight"
        >
          <p className="mb-0 font-semibold tracking-wide uppercase text-mid">
            Step 1
          </p>
          <h1 className="mb-2 text-4xl">Find User</h1>
          <p className="mb-6 text-lg">
            Using the box below, search for a Twitter user to create a shoutout
            for.
          </p>
          <form className="relative flex flex-col">
            <div className="flex">
              <label className="flex items-center justify-center w-12 h-12 text-xl font-bold text-white rounded-tl-lg rounded-bl-lg bg-mid">
                @
              </label>
              <input
                className="w-full h-12 px-3 py-4 text-lg bg-white border rounded-tr-lg rounded-br-lg appearance-none placeholder:text-mid text-dark border-xlight focus:outline-none"
                placeholder="username"
                ref={searchRef}
                onChange={() => {
                  if (
                    searchRef.current.value.length < 2 ||
                    searchRef.current.value.length > 15
                  ) {
                    console.log("Username is less than 2 or greater than 15");
                    dispatch({
                      type: "search-user",
                      payload: "",
                    });
                    dispatch({
                      type: "set-user-validity",
                      payload: false,
                    });
                  } else {
                    dispatch({
                      type: "search-user",
                      payload: searchRef.current.value,
                    });
                    ValidateUser(searchRef.current.value);
                  }
                }}
              />
            </div>

            {!state.userValid ? (
              <p className="relative top-auto right-auto flex items-center w-auto h-8 p-2 mt-2 mb-0 text-xs font-semibold tracking-wider text-red-500 uppercase bg-red-500 rounded-md -translate-y-0 sm:mt-0 sm:-translate-y-1/2 sm:absolute sm:right-2 sm:top-1/2 bg-opacity-10">
                <svg
                  className="w-4 h-4 mr-1.5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  ></path>
                </svg>
                User not valid
              </p>
            ) : (
              <p className="relative top-auto right-auto flex items-center w-auto h-8 p-2 mt-2 mb-0 text-xs font-semibold tracking-wider text-green-500 uppercase bg-green-500 rounded-md -translate-y-0 sm:mt-0 sm:-translate-y-1/2 sm:absolute sm:right-2 sm:top-1/2 bg-opacity-10">
                <svg
                  className="w-4 h-4 mr-1.5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                User valid
              </p>
            )}
          </form>

          {state.errorGenerating ? (
            <div className="w-full h-auto p-2 mt-6 text-xs font-semibold text-center text-red-500 bg-red-500 rounded-md bg-opacity-10">
              Error - Check user is valid and then try again.
            </div>
          ) : null}

          <GoToNextStep newCount={2} scrollTo={"/#select-style"} />
        </section>
        {/* Select Style */}
        <section
          id="select-style"
          ref={selectStyleRef}
          className="flex flex-col pt-4 pb-4 border-b-2 lg:pb-8 lg:pt-8 border-xlight"
        >
          <p className="mb-0 font-semibold tracking-wide uppercase text-mid">
            Step 2
          </p>
          <h1 className="mb-2 text-4xl">Select Style</h1>
          <p className="mb-6 text-lg">
            Select one of the pre-made styles below
          </p>
          <article className="flex flex-col flex-wrap md:flex-row gap-x-4 gap-y-4">
            {/* Style 1 - Basic Default */}
            <BasicDefault />
            {/* Style 2 - Basic Alternative */}
            <BasicAlternative />
            {/* Style 3 - With Banner Default */}
            <BannerDefault />
            {/* Style 4 - With Banner Alternative */}
            <BannerAlt />
          </article>
          <GoToNextStep newCount={3} scrollTo={"/#edit-colors"} />
        </section>
        {/* Edit Colors */}
        <section
          id="edit-colors"
          ref={editColorsRef}
          className="flex flex-col pt-4 pb-4 border-b-2 lg:pb-8 lg:pt-8 border-xlight"
        >
          <p className="mb-0 font-semibold tracking-wide uppercase text-mid">
            Step 3
          </p>
          <h1 className="mb-2 text-4xl">Edit Colors</h1>
          <p className="mb-6 text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <article className="flex flex-col w-full md:flex-row gap-x-0 sm:gap-x-4">
            <div className="flex-grow">
              {/* Color Buttons */}
              <article className="flex flex-wrap w-auto gap-y-2 gap-x-2">
                <ColorSquare
                  bgColor={`bg-dark`}
                  textColor={`text-dark`}
                  ringColor={`ring-dark`}
                  handleColorSelection={handleColorSelection}
                />

                <ColorSquare
                  bgColor={`bg-slate-700`}
                  textColor={`text-slate-700`}
                  ringColor={`ring-slate-700`}
                  handleColorSelection={handleColorSelection}
                />

                <ColorSquare
                  bgColor={`bg-slate-500`}
                  textColor={`text-slate-500`}
                  ringColor={`ring-slate-500`}
                  handleColorSelection={handleColorSelection}
                />

                <ColorSquare
                  bgColor={`bg-red-500`}
                  textColor={`text-red-500`}
                  ringColor={`ring-red-500`}
                  handleColorSelection={handleColorSelection}
                />
                <ColorSquare
                  bgColor={`bg-orange-500`}
                  textColor={`text-orange-500`}
                  ringColor={`ring-orange-500`}
                  handleColorSelection={handleColorSelection}
                />
                <ColorSquare
                  bgColor={`bg-amber-500`}
                  textColor={`text-amber-500`}
                  ringColor={`ring-amber-500`}
                  handleColorSelection={handleColorSelection}
                />
                <ColorSquare
                  bgColor={`bg-yellow-500`}
                  textColor={`text-yellow-500`}
                  ringColor={`ring-yellow-500`}
                  handleColorSelection={handleColorSelection}
                />

                <ColorSquare
                  bgColor={`bg-lime-500`}
                  textColor={`text-lime-500`}
                  ringColor={`ring-lime-500`}
                  handleColorSelection={handleColorSelection}
                />
                <ColorSquare
                  bgColor={`bg-green-500`}
                  textColor={`text-green-500`}
                  ringColor={`ring-green-500`}
                  handleColorSelection={handleColorSelection}
                />
                <ColorSquare
                  bgColor={`bg-emerald-500`}
                  textColor={`text-emerald-500`}
                  ringColor={`ring-emerald-500`}
                  handleColorSelection={handleColorSelection}
                />
                <ColorSquare
                  bgColor={`bg-teal-500`}
                  textColor={`text-teal-500`}
                  ringColor={`ring-teal-500`}
                  handleColorSelection={handleColorSelection}
                />
                <ColorSquare
                  bgColor={`bg-cyan-500`}
                  textColor={`text-cyan-500`}
                  ringColor={`ring-cyan-500`}
                  handleColorSelection={handleColorSelection}
                />
                <ColorSquare
                  bgColor={`bg-blue-500`}
                  textColor={`text-blue-500`}
                  ringColor={`ring-blue-500`}
                  handleColorSelection={handleColorSelection}
                />

                <ColorSquare
                  bgColor={`bg-indigo-500`}
                  textColor={`text-indigo-500`}
                  ringColor={`ring-indigo-500`}
                  handleColorSelection={handleColorSelection}
                />
                <ColorSquare
                  bgColor={`bg-violet-500`}
                  textColor={`text-violet-500`}
                  ringColor={`ring-violet-500`}
                  handleColorSelection={handleColorSelection}
                />
                <ColorSquare
                  bgColor={`bg-purple-500`}
                  textColor={`text-purple-500`}
                  ringColor={`ring-purple-500`}
                  handleColorSelection={handleColorSelection}
                />
                <ColorSquare
                  bgColor={`bg-fuchsia-500`}
                  textColor={`text-fuchsia-500`}
                  ringColor={`ring-fuchsia-500`}
                  handleColorSelection={handleColorSelection}
                />
                <ColorSquare
                  bgColor={`bg-pink-500`}
                  textColor={`text-pink-500`}
                  ringColor={`ring-pink-500`}
                  handleColorSelection={handleColorSelection}
                />
                <ColorSquare
                  bgColor={`bg-rose-500`}
                  textColor={`text-rose-500`}
                  ringColor={`ring-rose-500`}
                  handleColorSelection={handleColorSelection}
                />
              </article>
            </div>
            {/* Preview */}
            <div className="flex flex-col mt-8 w-70 md:mt-0 sm:w-96">
              {state.selectedStyle === "basic-default" ? (
                <PreviewBasicDefault />
              ) : state.selectedStyle === "basic-alt" ? (
                <PreviewBasicAlternative />
              ) : state.selectedStyle === "banner-default" ? (
                <PreviewBannerDefault />
              ) : state.selectedStyle === "banner-alt" ? (
                <PreviewBannerAlternative />
              ) : null}
            </div>
          </article>
        </section>
        {/* Generate Button */}
        <section className="flex flex-col pt-12 pb-2">
          <button
            onClick={() => {
              if (state.userValid) {
                dispatch({
                  type: "check-for-errors",
                  payload: false,
                });
                router.push({
                  pathname: "/generate",
                  query: {
                    searchUser: state.searchUser,
                    cardStyle: state.selectedStyle,
                    textColor: state.cardTextColor,
                    bgColor: state.cardBgColor,
                  },
                });
              } else {
                dispatch({
                  type: "check-for-errors",
                  payload: true,
                });
              }
            }}
            className="w-full p-3.5 font-bold text-white rounded-lg bg-brand mb-4"
          >
            Generate Shoutout
          </button>
          {state.errorGenerating ? (
            <div className="w-full h-8 p-2 text-xs font-semibold text-center text-red-500 bg-red-500 rounded-md right-2 bg-opacity-10">
              Error - Check user is valid
            </div>
          ) : null}
          <BodyFooter />
        </section>
      </div>
    </main>
  );
}
