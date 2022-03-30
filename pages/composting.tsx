import type { NextPage } from "next";
import React, { useState, useEffect, Fragment } from "react";
import useSWR from "swr";
import Fade from "react-reveal/Fade";
import fetcher from "libs/fetcher";

import { StoryBlok } from "libs/types";
import { richText } from "libs/storyblok";

import { Icons } from "components/icons";
import Link from "next/link";
import Image from "next/image";
import { cn } from "utils/class";
import { MinusCircleIcon, XIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";

const Compost: NextPage = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const { data } = useSWR<StoryBlok>("/api/storyblok", fetcher);

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }

    if (typeof window !== "undefined") {
      document.body.scrollTop = 0;
    }
  }, []);
  return (
    <>
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={showModal}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MinusCircleIcon
                      className="h-6 w-6 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Woops !</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Cette action n'est pas encore disponible.
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <Fade
        left={isDesktop}
        bottom={isMobile}
        duration={500}
        delay={500}
        distance="30px"
      >
        <div className="max-w-screen my-3 justify-center content-center">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 sm:grid-cols-1 mx-5 my-2 space-y-2">
            <div className="flex flex-col space-y-4">
              {data ? (
                <>
                  <div className="space-y-4">
                    <h1 className="text-left pb-2 md:text-6xl text-2xl font-bold text-orangeDTTV -rotate-2">
                      COMPOSTAGE
                      <div className="bg-growing-underline-black hidden">
                        &nbsp;
                      </div>
                    </h1>
                    <div className="space-y-4">
                      <p className="text-xl sm:text-md font-bold">
                        {richText(data?.content.compostSecondText)}
                      </p>
                      <div className="flex flex-col space-y-2">
                        <p className="font-light text-xl p-4 space-y-2 pl-10">
                          {richText(data?.content.compostTreeText)}
                        </p>
                        <div className="inline-flex space-x-2">
                          <Icons icons="check" className="w-5 h-5" />
                          <p className="font-bold text-xl text-orangeDTTV">
                            {richText(data?.content.compostFourText)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid justify-center space-x-0 md:inline-flex md:space-x-2 sm:space-x-0">
                      <div className="w-60">
                        <Image
                          className={cn(
                            "duration-700 ease-in-out group-hover:opacity-75 !rounded-2xl",
                            isLoading
                              ? "scale-110 blur-2xl grayscale !rounded-2xl"
                              : "scale-100 blur-0 grayscale-0 !rounded-2xl"
                          )}
                          width="240"
                          height="180"
                          src="/static/images/DETRI_211007_399.jpg"
                          blurDataURL="/static/images/DETRI_211007_399.jpg"
                          onLoadingComplete={() => setLoading(false)}
                        />
                      </div>
                      <div className="w-60">
                        <Image
                          className={cn(
                            "duration-700 ease-in-out group-hover:opacity-75 !rounded-2xl",
                            isLoading
                              ? "scale-110 blur-2xl grayscale !rounded-2xl"
                              : "scale-100 blur-0 grayscale-0 !rounded-2xl"
                          )}
                          width="240"
                          height="180"
                          src="/static/images/IMG_0553.jpg"
                          blurDataURL="/static/images/IMG_0553.jpg"
                          onLoadingComplete={() => setLoading(false)}
                        />
                      </div>
                      <div className="w-60">
                        <Image
                          className={cn(
                            "duration-700 ease-in-out group-hover:opacity-75 !rounded-2xl",
                            isLoading
                              ? "scale-110 blur-2xl grayscale !rounded-2xl"
                              : "scale-100 blur-0 grayscale-0 !rounded-2xl"
                          )}
                          width="240"
                          height="180"
                          src="/static/images/IMG_0278.jpg"
                          blurDataURL="/static/images/IMG_0278.jpg"
                          onLoadingComplete={() => setLoading(false)}
                        />
                      </div>
                    </div>
                    <span className="flex space-x-2 justify-center 2xl:justify-start xl:justify-start sm:justify-start md:justify-start">
                      <Icons
                        icons="photo"
                        className="w-6 h-6 text-black fill-current dark:text-white"
                      />
                      <p className="font-normal text-base mt-0.5">
                        François Passerini
                      </p>
                    </span>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <h1 className="text-left pb-4 md:text-6xl text-2xl font-bold text-orangeDTTV animate-pulse -rotate-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg h-20"></h1>
                  <br />
                  <div className="space-y-6">
                    <p className="text-xl sm:text-md font-bold bg-neutral-100 dark:bg-neutral-800 rounded-lg h-10 animate-pulse"></p>
                    <div className="flex flex-col space-y-2">
                      <p className="font-light text-xl p-4 space-y-2 pl-10 rounded-lg animate-pulse bg-neutral-100 h-20"></p>
                      <div className="inline-flex space-x-2 rounded-lg animate-pulse bg-neutral-100 dark:bg-neutral-800">
                        <p className="font-bold text-xl text-orangeDTTV h-20"></p>
                      </div>
                    </div>
                  </div>
                  <div className="grid justify-center space-x-0 md:inline-flex md:space-x-2 sm:space-x-0">
                    <div className="w-60">
                      <div className="!rounded-2xl w-60 h-44 animate-pulse bg-neutral-100 dark:bg-neutral-800" />
                    </div>
                    <div className="w-60">
                      <div className="!rounded-2xl w-60 h-44 animate-pulse bg-neutral-100 dark:bg-neutral-800" />
                    </div>
                    <div className="w-60">
                      <div className="!rounded-2xl w-60 h-44 animate-pulse bg-neutral-100 dark:bg-neutral-800" />
                    </div>
                  </div>
                  <span className="flex space-x-2 justify-center 2xl:justify-start xl:justify-start sm:justify-start md:justify-start">
                    <p className="font-normal text-base mt-0.5 bg-neutral-100 dark:bg-neutral-800"></p>
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-center pb-2 md:text-vw text-vw font-bold text-orangeDTTV">
                Vous souhaitez acheter du compost auprès de
                <br /> la SCIC SA LES DETRITIVORES ?
                <div className="bg-growing-underline-black hidden">&nbsp;</div>
              </h1>
              <div className="flex flex-col">
                <button className="bg-greenDTTV transition hover:bg-green-900 dark:hover:bg-orange-600 dark:bg-orangeDTTV text-white p-4 w-60 rounded-full m-auto focus:outline-none">
                  <Link href="/quote">
                    <span className="font-normal text-xl focus:outline-none uppercase">
                      Commandez-le ici
                    </span>
                  </Link>
                </button>
                <span className="text-center text-orangeDTTV">ou</span>
                <button
                  className="bg-greenDTTV transition hover:bg-green-900 dark:hover:bg-orange-600 dark:bg-orangeDTTV text-white p-4 w-auto sm:w-auto xl:w-100 2xl:w-100 md:w-auto rounded-full m-auto focus:outline-none"
                  onClick={() => {
                    setShowModal(true);
                    setTimeout(() => {
                      setShowModal(false);
                    }, 5000);
                  }}
                >
                  <span className="focus:outline-none font-normal text-md md:text-xl uppercase">
                    Retrouvez-le dans nos magasins partenaires
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};
export default Compost;
