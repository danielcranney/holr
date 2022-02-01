import React, { useContext, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { fetchUser } from "../services/twitter";
import { MadeWithTag } from "../components/MadeWithTag";
import MainLayout from "../components/MainLayout";
import { urlObjectKeys } from "next/dist/shared/lib/utils";
import { useRouter } from "next/router";
import { StateContext } from "./_app";
import { GoBackStep } from "../components/StartAgainButton";

const BasicDefault = (props) => {
  console.log(props);
  let twitterName = props.twitterInfo.name;
  let twitterScreenName = props.twitterInfo.screenName;
  let twitterDescription = props.twitterInfo.description;
  let textColor = props.textColor;

  let profileImageURL = props.twitterInfo.profileImageURL.replace(
    /_normal/g,
    ""
  );

  return (
    <div
      className={`w-full sm:w-96 relative p-8 rounded-lg bg-xlight hover:cursor-pointer group transition-all duration-150 ease-in-out border-xlight
        `}
    >
      <div className="relative flex flex-col items-center justify-center p-8 bg-white rounded-lg">
        <div className="w-24">
          <Image
            src={profileImageURL}
            width={102}
            height={102}
            className="object-scale-down rounded-full"
          />
        </div>
        <p className="mb-1 text-2xl font-bold text-dark">{twitterName}</p>
        <p className={`text-base font-semibold tracking-wider ${textColor}`}>
          @{twitterScreenName}
        </p>
        <p className="mb-0 text-sm tracking-wide text-center text-mid">
          {twitterDescription}
        </p>
      </div>
      <MadeWithTag />
    </div>
  );
};

function BasicAlternative(props) {
  console.log(props);
  let twitterName = props.twitterInfo.name;
  let twitterScreenName = props.twitterInfo.screenName;
  let twitterDescription = props.twitterInfo.description;
  let profileImageURL = props.twitterInfo.profileImageURL.replace(
    /_normal/g,
    ""
  );
  let textColor = props.textColor;

  return (
    <div
      className={`bg-xlight relative flex flex-col items-start justify-center p-8 rounded-lg  hover:cursor-pointer border-8 group transition-all duration-150 ease-in-out border-xlight`}
    >
      <div className="grid grid-cols-3 gap-6 p-8 bg-white rounded-lg shadow-lg shadow-light/30">
        <div className="flex items-center h-full col-span-1">
          <Image
            src={profileImageURL}
            width={486}
            height={486}
            className="object-scale-down overflow-hidden rounded-full"
          />
        </div>
        <div className="col-span-2">
          <p className="mb-1 text-2xl font-bold text-dark">{twitterName}</p>
          <p className={`text-base font-semibold tracking-wider ${textColor}`}>
            @{twitterScreenName}
          </p>
          <p className="mb-0 text-sm tracking-wide text-mid">
            {twitterDescription}
          </p>
        </div>
      </div>
      <MadeWithTag />
    </div>
  );
}

function BannerDefault(props) {
  console.log(props);
  let twitterName = props.twitterInfo.name;
  let twitterScreenName = props.twitterInfo.screenName;
  let twitterDescription = props.twitterInfo.description;
  let profileBannerURL = props.twitterInfo.profileBannerURL;
  let profileImageURL = props.twitterInfo.profileImageURL.replace(
    /_normal/g,
    ""
  );
  let textColor = props.textColor;
  let bgColor = props.bgColor;

  return (
    <div
      className={`relative p-8 rounded-lg bg-xlight border-8 hover:cursor-pointer group transition-all duration-150 ease-in-out border-xlight`}
    >
      <div className="relative flex flex-col items-center justify-center p-8 overflow-hidden bg-white rounded-lg shadow-lg shadow-light/30">
        <div
          className={`absolute top-0 w-full overflow-hidden ${bgColor} h-28`}
        >
          <div
            className={`h-full bg-center bg-cover opacity-20`}
            style={{
              backgroundImage: `url(${profileBannerURL})`,
            }}
          ></div>
        </div>
        <div className="w-1/3">
          <div className="bg-white border-2 border-white">
            <Image
              src={profileImageURL}
              width={486}
              height={486}
              className="object-scale-down overflow-hidden rounded-full"
            />
          </div>
        </div>
        <p className="mb-1 text-2xl font-bold text-dark">{twitterName}</p>
        <p className={`text-base font-semibold tracking-wider ${textColor}`}>
          @{twitterScreenName}
        </p>
        <p className="mb-0 text-sm tracking-wide text-center text-mid">
          {twitterDescription}
        </p>
      </div>
      <MadeWithTag />
    </div>
  );
}

function BannerAlternative(props) {
  console.log(props);
  let twitterName = props.twitterInfo.name;
  let twitterScreenName = props.twitterInfo.screenName;
  let twitterDescription = props.twitterInfo.description;
  let profileBannerURL = props.twitterInfo.profileBannerURL;
  let profileImageURL = props.twitterInfo.profileImageURL.replace(
    /_normal/g,
    ""
  );
  let textColor = props.textColor;
  let bgColor = props.bgColor;

  return (
    <div
      className={`bg-xlight relative flex flex-col items-start justify-center p-8 rounded-lg  hover:cursor-pointer border-8 group transition-all duration-150 ease-in-out border-xlight`}
    >
      <div className="relative grid grid-cols-3 gap-6 p-8 overflow-hidden bg-white rounded-lg shadow-lg shadow-light/30">
        <div
          className={`absolute top-0 left-0 w-20 h-full overflow-hidden ${bgColor}`}
        >
          <div
            className={`h-full bg-center opacity-20`}
            style={{
              backgroundImage: `url(${profileBannerURL}/mobile_retina)`,
            }}
          ></div>
        </div>
        <div className="flex items-center h-full col-span-1">
          <Image
            src={profileImageURL}
            width={102}
            height={102}
            className="object-scale-down overflow-hidden rounded-full"
          />
        </div>
        <div className="col-span-2">
          <p className="mb-1 text-2xl font-bold text-dark">{twitterName}</p>
          <p className={`text-base font-semibold tracking-wider ${textColor}`}>
            @{twitterScreenName}
          </p>
          <p className="mb-0 text-sm tracking-wide text-mid">
            {twitterDescription}
          </p>
        </div>
      </div>
      <MadeWithTag />
    </div>
  );
}

export default function Generate(props) {
  const basicDefaultRef = useRef();
  const router = useRouter();
  console.log(props);
  const { state, dispatch } = useContext(StateContext);

  useEffect(() => {
    dispatch({
      type: "set-count",
      payload: 4,
    });
  }, []);

  const handleDownloadImage = async (elementRef, type) => {
    const element = elementRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/" + type);
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "shoutout." + type;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <div className="flex flex-col w-full max-h-screen">
      <Head>
        <title>hollr | Share Your Shoutout</title>
        <meta name="description" content="Twitter shoutout machine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-grow">
        <aside className="fixed top-0 w-20 h-full p-4 bg-white border-r lg:p-8 lg:w-80 border-xlight">
          <div className="flex items-center mb-8">
            <div className="flex items-center justify-center w-12 h-12 mr-0 lg:mr-2 rounded-2xl bg-brand">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
              </svg>
            </div>
            <h1 className="hidden mb-0 text-3xl font-semibold lg:block">
              holr
            </h1>
          </div>
          <div className="flex flex-col">
            <Link href="/#find-user">
              <button
                onClick={() => {
                  dispatch({
                    type: "set-count",
                    payload: 1,
                  });
                  dispatch({
                    type: "search-user",
                    payload: "",
                  });
                  dispatch({
                    type: "set-user-validity",
                    payload: false,
                  });
                }}
                className={`transition-all duration-150 ease-in-out flex group items-center p-3 mb-1 text-left rounded-md hover:cursor-pointer justify-center lg:justify-start ${
                  state.count === 1
                    ? "bg-opacity-5 bg-brand"
                    : "bg-opacity-0 bg-transparent hover:bg-opacity-5 hover:bg-brand"
                }`}
              >
                <svg
                  className={`w-5 h-5 mr-0 lg:mr-3 ${
                    state.count === 1
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
                    state.count === 1
                      ? "text-brand"
                      : "text-mid group-hover:text-brand"
                  }`}
                >
                  Find user
                </p>
              </button>
            </Link>
            <Link href="/#select-style">
              <button
                onClick={() => {
                  dispatch({
                    type: "set-count",
                    payload: 2,
                  });
                }}
                className={`transition-all duration-150 ease-in-out mb-1 flex group items-center p-3 text-left rounded-md hover:cursor-pointer justify-center lg:justify-start ${
                  state.count === 2
                    ? "bg-opacity-5 bg-brand"
                    : "bg-opacity-0 bg-transparent hover:bg-opacity-5 hover:bg-brand"
                }`}
              >
                <svg
                  className={`w-5 h-5 mr-0 lg:mr-3 ${
                    state.count === 2
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
                    state.count === 2
                      ? "text-brand"
                      : "text-mid group-hover:text-brand"
                  }`}
                >
                  Select Style
                </p>
              </button>
            </Link>
            <Link href="/#edit-colors">
              <button
                onClick={() => {
                  dispatch({
                    type: "set-count",
                    payload: 3,
                  });
                }}
                className={`transition-all duration-150 mb-1 ease-in-out flex group items-center p-3 text-left rounded-md hover:cursor-pointer justify-center lg:justify-start ${
                  state.count === 3
                    ? "bg-opacity-5 bg-brand"
                    : "bg-opacity-0 bg-transparent hover:bg-opacity-5 hover:bg-brand"
                }`}
              >
                <svg
                  className={`w-5 h-5 mr-0 lg:mr-3 ${
                    state.count === 3
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
                    state.count === 3
                      ? "text-brand"
                      : "text-mid group-hover:text-brand"
                  }`}
                >
                  Edit Colors
                </p>
              </button>
            </Link>
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
        </aside>
        <div className="flex flex-col w-full px-4 py-4 ml-20 lg:py-12 lg:px-12 lg:ml-80">
          <GoBackStep newCount={1} />
          <h1 className="mb-2 text-4xl">Download Shoutout</h1>
          <p className="mb-6 text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>

          {!props.twitterInfo ? (
            <p>Couldn't fetch information from Twitter</p>
          ) : props.cardStyle === "basic-default" ? (
            <article className="flex flex-col gap-8 mb-8">
              <div className="flex gap-x-4">
                <button
                  className="self-start p-3.5 font-bold text-white rounded-lg bg-brand text-base"
                  type="button"
                  onClick={() => {
                    handleDownloadImage(basicDefaultRef, "jpg");
                  }}
                >
                  Download JPG
                </button>

                <button
                  className="self-start p-3.5 font-bold text-white rounded-lg bg-brand text-base"
                  onClick={() => {
                    handleDownloadImage(basicDefaultRef, "png");
                  }}
                >
                  Download PNG
                </button>
              </div>

              <div ref={basicDefaultRef} className="w-full sm:w-96">
                <BasicDefault
                  twitterInfo={props.twitterInfo}
                  textColor={props.textColor}
                  bgColor={props.bgColor}
                />
              </div>
            </article>
          ) : props.cardStyle === "basic-alt" ? (
            <BasicAlternative
              twitterInfo={props.twitterInfo}
              textColor={props.textColor}
              bgColor={props.bgColor}
            />
          ) : props.cardStyle === "banner-default" ? (
            <BannerDefault
              twitterInfo={props.twitterInfo}
              textColor={props.textColor}
              bgColor={props.bgColor}
            />
          ) : props.cardStyle === "banner-alt" ? (
            <BannerAlternative
              twitterInfo={props.twitterInfo}
              textColor={props.textColor}
              bgColor={props.bgColor}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // console.log(context.query.searchUser);
  // console.log(context.query.cardStyle);
  // console.log(context.query.textColor);
  // console.log(context.query.bgColor);

  let cardStyle = context.query.cardStyle;
  let textColor = context.query.textColor;
  let bgColor = context.query.bgColor;
  let twitterHandle = context.query.searchUser;
  let twitterInfo = null;

  const userResponse = await fetchUser(twitterHandle);
  if (!userResponse.profile_banner_url) {
    userResponse.profile_banner_url = null;
  }
  twitterInfo = {
    screenName: userResponse.screen_name,
    name: userResponse.name,
    profileImageURL: userResponse.profile_image_url_https,
    profileBannerURL: userResponse.profile_banner_url,
    description: userResponse.description,
  };

  return {
    props: {
      twitterInfo: twitterInfo,
      cardStyle: cardStyle,
      textColor: textColor,
      bgColor: bgColor,
    },
  };
}

// Share.getLayout = function getLayout(page) {
//   return <MainLayout>{page}</MainLayout>;
// };
