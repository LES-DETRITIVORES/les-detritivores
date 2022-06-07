import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Fade from "react-reveal/Fade";
import Rotate from "react-reveal/Rotate";
import fetcher from "libs/fetcher";
import Image from "next/image";
import Link from "next/link";

import { StoryBlok } from "libs/types";
import { convert, richText } from "libs/storyblok";
import { Images } from "data/images";

import Loading from "components/loading";
import { Icons } from "components/icons";
import { cn } from "utils/class";

const Home: NextPage = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
  });
  return (
    <>
      <>
        {data ? (
          <Fade
            left={isDesktop}
            bottom={isMobile}
            duration={500}
            delay={500}
            distance="30px"
          >
            <Fade
              left={isDesktop}
              bottom={isMobile}
              duration={500}
              delay={500}
              distance="30px"
            >
              <div className="flex flex-col items-center justify-center px-8 my-20 overflow-hidden">
                <div className="flex-col items-center justify-center mb-10 text-center">
                  {data ? (
                    <h1 className="pt-2 pb-2 text-3xl font-bold text-center md:text-6xl text-orangeDTTV -rotate-2">
                      {data.content.introTitle}
                      <div className="fancy-title !border-orangeDTTV -rotate-3 ml-auto p-0.5" />
                    </h1>
                  ) : (
                    <>
                      <h1 className="h-20 pt-2 pb-2 text-3xl font-bold text-center rounded-lg md:text-6xl text-orangeDTTV -rotate-2 bg-neutral-100 dark:bg-neutral-800 w-150 animate-pulse"></h1>
                    </>
                  )}
                </div>
                <div className="flex flex-col items-start justify-center max-w-xl mb-16 space-y-10 lg:max-w-6xl dark:text-white smph:text-xs md:px-10 lg:px-10">
                  <p className="mx-0 text-xl font-light text-center sm:mx-12 md:mx-12">
                    {data ? (
                      richText(data.content.introText)
                    ) : (
                      <Loading title="Chargement..." />
                    )}
                  </p>
                  <div className="flex justify-center m-auto">
                    <div className="flex items-center content-center justify-center">
                      <div className="grid grid-cols-1 grid-rows-1 space-x-0 space-y-0 auto-cols-max sm:space-y-2 md:space-y-2 xl:space-y-0 xxl:space-y-0 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 xl:space-x-5 2xl:space-x-20 max-w-max w-max">
                        <div className="flex justify-self-start">
                          <iframe
                            src={data?.content.youtubeVideoLink}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={data?.content.youtubeTitle}
                            className="flex justify-start rounded-2xl w-72 lg:w-250 h-52 lg:h-250 md:w-96 md:h-72 sm:w-150 sm:h-150"
                          />
                        </div>
                        <div className="flex items-center justify-center 2xl:justify-self-start xl:justify-self-start xl:justify-end sm:justify-center md:justify-center">
                          <div className="flex flex-col items-center justify-center w-auto">
                            <h1 className="pb-2 text-2xl font-bold text-orangeDTTV">
                              {data ? (
                                data?.content.usagesTitle
                              ) : (
                                <>
                                  <Loading title="Chargement.." />
                                </>
                              )}
                            </h1>
                            <div className="rounded-full bg-orangeDTTV">
                              <Icons
                                icons="people"
                                className="text-white fill-current"
                              />
                            </div>
                            <div className="flex flex-col items-center justify-center mt-2 space-y-2 w-max">
                              {data ? (
                                <>
                                  <span>{data?.content.restaurantTitle}</span>
                                </>
                              ) : (
                                <div className="h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 w-60 animate-pulse"></div>
                              )}
                              {data ? (
                                <>
                                  <span>
                                    {data?.content.restaurantCollective}
                                  </span>
                                </>
                              ) : (
                                <div className="h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 w-72 animate-pulse"></div>
                              )}
                              {data ? (
                                <>
                                  <span>{data?.content.collectivites}</span>
                                </>
                              ) : (
                                <div className="w-40 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse"></div>
                              )}
                              {data ? (
                                <>
                                  <span>{data?.content.particular}</span>
                                </>
                              ) : (
                                <div className="w-40 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
            <Fade
              left={isDesktop}
              bottom={isMobile}
              duration={500}
              delay={500}
              distance="30px"
            >
              <h1 className="pb-2 text-xl font-bold text-center md:text-3xl text-orangeDTTV">
                {data.content.trustTitle}
              </h1>
              <div className="w-full h-64 m-0 bg-greenDTTV dark:bg-orangeDTTV">
                <div className="flex items-center justify-center">
                  <div className="inline-flex my-12 space-x-5 transition-all duration-1000 ease-in-out transform translate-x-0">
                    {
                      // TODO: refactor this
                      new Set(
                        Images.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={`!rounded-md ${item.width} ${item.height}`}
                            >
                              <Image
                                className={cn(
                                  "duration-700 ease-in-out group-hover:opacity-75 !rounded-md object-contain",
                                  isLoading
                                    ? "scale-110 blur-2xl grayscale !rounded-md"
                                    : "scale-100 blur-0 grayscale-0 !rounded-md",
                                )}
                                src={item.image}
                                width={item.imageWidth}
                                height={item.imageHeight}
                                blurDataURL={item.image}
                                onLoadingComplete={() => setLoading(false)}
                              />
                            </div>
                          );
                        }),
                      )
                    }
                  </div>
                </div>
              </div>

              <Fade
                left={isDesktop}
                bottom={isMobile}
                duration={500}
                delay={500}
                distance="30px"
              >
                <div className="flex-col items-center justify-center mt-10 text-center">
                  <h1 className="h-24 pb-2 text-3xl font-bold text-center text-transparent md:text-6xl text-greenDTTV dark:text-orangeDTTV -rotate-3">
                    {data.content.ourEngagement}
                    <div className="flex justify-center space-x-0 md:space-x-2">
                      <div className="fancy-title !border-greenDTTV dark:!border-orangeDTTV ml-52 md:ml-96 -rotate-3 p-0.5" />
                    </div>
                  </h1>
                  <div className="mt-5">
                    <div className="">
                      <div className="grid justify-center grid-cols-3 mx-auto max-w-7xl md:grid-cols-12">
                        {data ? (
                          <>
                            <div className="col-span-4 space-y-5">
                              <h1 className="text-xl font-bold text-orangeDTTV">
                                {data.content.environementTitle}
                              </h1>
                              <div className="m-auto rounded-full bg-orangeDTTV w-36 focus:outline-none">
                                <Icons
                                  icons="environement"
                                  className="text-white fill-current h-36"
                                />
                              </div>
                              <p className="mx-0 text-lg font-light smph:mx-2">
                                {richText(data.content.environement)}
                              </p>
                            </div>
                            <div className="col-span-4 space-y-5">
                              <h1 className="text-xl font-bold text-orangeDTTV">
                                {data.content.socialTitle}
                              </h1>
                              <div className="m-auto rounded-full bg-orangeDTTV w-36 focus:outline-none">
                                <Icons
                                  icons="together"
                                  className="text-white fill-current h-36"
                                />
                              </div>
                              <p className="mx-0 text-lg font-light smph:mx-2">
                                {richText(data.content.socialText)}
                              </p>
                            </div>
                            <div className="col-span-4 space-y-5">
                              <h1 className="text-xl font-bold text-orangeDTTV">
                                {data.content.CooperationTitle}
                              </h1>
                              <div className="m-auto rounded-full bg-orangeDTTV w-36 focus:outline-none">
                                <Icons
                                  icons="hand"
                                  className="text-white fill-current h-36"
                                />
                              </div>
                              <p className="mx-0 text-lg font-light smph:mx-2">
                                {richText(data.content.CooperationText)}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-span-4 space-x-5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl h-80 animate-pulse">
                              <h1 className="text-xl font-bold text-orangeDTTV"></h1>
                              <div className="m-auto rounded-full bg-orangeDTTV w-36"></div>
                              <p className="mx-0 text-lg font-light smph:mx-2"></p>
                            </div>

                            <div className="col-span-4 space-y-5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl animate-pulse">
                              <h1 className="text-xl font-bold text-orangeDTTV"></h1>
                              <div className="m-auto rounded-full bg-orangeDTTV w-36"></div>
                              <p className="mx-0 text-lg font-light smph:mx-2"></p>
                            </div>
                            <div className="col-span-4 space-y-5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl animate-pulse">
                              <h1 className="text-xl font-bold text-orangeDTTV"></h1>
                              <div className="m-auto rounded-full bg-orangeDTTV w-36"></div>
                              <p className="mx-0 text-lg font-light smph:mx-2"></p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
              <Rotate top left opposite cascade className="!overflow-y-hidden">
                <div className="bg-greenDTTV dark:bg-orangeDTTV mt-20 !transition !duration-500 -rotate-6 transform scale-125 h-20 !overflow-x-hidden">
                  <div className="flex items-center justify-center my-5">
                    <h1 className="text-4xl font-bold text-white">
                      {data.content.offerTitle}
                    </h1>
                  </div>
                </div>
              </Rotate>

              <Fade
                left={isDesktop}
                bottom={isMobile}
                duration={500}
                delay={500}
                distance="30px"
              >
                <div className="flex-col items-center justify-center mt-20 text-center">
                  <div className="mt-5">
                    <div className="">
                      <div className="grid justify-center grid-cols-3 mx-auto space-y-4 max-w-7xl md:grid-cols-12 md:my- sm:space-y-0">
                        {data ? (
                          <>
                            <div className="col-span-4 space-y-5">
                              <h1 className="text-xl font-bold text-orangeDTTV">
                                {data.content.collectTitle}
                              </h1>
                              <div className="m-auto rounded-full bg-greenDTTV w-36 dark:bg-orangeDTTV">
                                <Icons
                                  icons="bike"
                                  className="text-white fill-current h-36"
                                />
                              </div>
                              <p className="mx-0 text-lg font-light smph:mx-2">
                                {richText(data.content.collectText)}
                              </p>
                              <div className="justify-center">
                                <button className="inline-flex px-3 py-2 font-medium text-white transition-all bg-orangeDTTV hover:bg-orange-600 rounded-2xl focus:outline-none focus:ring-2 ring-orange-500">
                                  <Icons
                                    icons="plus"
                                    className="text-white fill-current w-5 h-5 mr-1 mt-0.5"
                                  />
                                  <Link href="/collection">
                                    <span className="focus:outline-none text-[1rem] font-light">
                                      En savoir plus
                                    </span>
                                  </Link>
                                </button>
                              </div>
                            </div>
                            <div className="col-span-4 space-y-5">
                              <h1 className="text-xl font-bold text-orangeDTTV">
                                {data.content.sensibilisationTitle}
                              </h1>
                              <div className="m-auto rounded-full bg-greenDTTV w-36 dark:bg-orangeDTTV">
                                <Icons
                                  icons="happystar"
                                  className="text-white fill-current h-36"
                                />
                              </div>
                              <p className="mx-0 text-lg font-light smph:mx-2">
                                {richText(data.content.sensibilisationText)}
                              </p>
                              <div className="justify-center">
                                <button className="inline-flex px-3 py-2 font-medium text-white transition-all bg-orangeDTTV hover:bg-orange-600 rounded-2xl focus:outline-none focus:ring-2 ring-orange-500">
                                  <Icons
                                    icons="plus"
                                    className="text-white fill-current w-5 h-5 mr-1 mt-0.5"
                                  />
                                  <Link href="/sensitization">
                                    <span className="focus:outline-none text-[1rem] font-light">
                                      En savoir plus
                                    </span>
                                  </Link>
                                </button>
                              </div>
                            </div>
                            <div className="col-span-4 space-y-5">
                              <h1 className="text-xl font-bold text-orangeDTTV">
                                {data.content.compostTitle}
                              </h1>
                              <div className="m-auto rounded-full bg-greenDTTV w-36 dark:bg-orangeDTTV">
                                <Icons
                                  icons="flowers"
                                  className="text-white fill-current h-36"
                                />
                              </div>
                              <p className="mx-0 text-lg font-light smph:mx-2">
                                {richText(data.content.compostText)}
                              </p>
                              <div className="justify-center">
                                <button className="inline-flex px-3 py-2 font-medium text-white transition-all bg-orangeDTTV hover:bg-orange-600 rounded-2xl focus:outline-none focus:ring-2 ring-orange-500">
                                  <Icons
                                    icons="plus"
                                    className="text-white fill-current w-5 h-5 mr-1 mt-0.5"
                                  />
                                  <Link href="/composting">
                                    <span className="focus:outline-none text-[1rem] font-light">
                                      En savoir plus
                                    </span>
                                  </Link>
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-span-4 space-x-5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl h-80 animate-pulse">
                              <h1 className="text-xl font-bold text-orangeDTTV"></h1>
                              <div className="m-auto rounded-full bg-orangeDTTV w-36"></div>
                              <p className="mx-0 text-lg font-light smph:mx-2"></p>
                            </div>

                            <div className="col-span-4 space-y-5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl animate-pulse">
                              <h1 className="text-xl font-bold text-orangeDTTV"></h1>
                              <div className="m-auto rounded-full bg-orangeDTTV w-36"></div>
                              <p className="mx-0 text-lg font-light smph:mx-2"></p>
                            </div>
                            <div className="col-span-4 space-y-5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl animate-pulse">
                              <h1 className="text-xl font-bold text-orangeDTTV"></h1>
                              <div className="m-auto rounded-full bg-orangeDTTV w-36"></div>
                              <p className="mx-0 text-lg font-light smph:mx-2"></p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
              <div className="flex-col items-center justify-center mt-20 text-center">
                <h1 className="pb-2 text-3xl font-bold text-center text-transparent transition md:text-6xl bg-clip-text bg-gradient-to-t from-orangeDTTV to-orange-600 dark:bg-gradient-to-t dark:from-orangeDTTV dark:to-orange-600">
                  {data.content.contactTitle}
                  <div className="flex justify-center space-x-0 md:space-x-2">
                    <div className="fancy-title !border-orangeDTTV ml-20 md:ml-48 -rotate-3 p-0.5" />
                  </div>
                </h1>
                <footer className="relative pt-1 m-auto max-w-7xl">
                  <div className="container px-6 mx-auto md:container focus:outline-none">
                    <div className="sm:flex sm:mt-8">
                      <div className="flex flex-col justify-between mt-8 sm:mt-0 sm:w-full sm:px-8 md:flex-row">
                        <div className="flex flex-col">
                          <h1 className="text-4xl font-bold text-left text-greenDTTV dark:text-orangeDTTV focus:outline-none">
                            NOUS APPELER
                          </h1>
                          <a
                            href={`tel:${data.content.number}`}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="p-1 font-light text-left transition hover:text-orangeDTTV focus:outline-none"
                          >
                            {data.content.number}
                          </a>
                          <h1 className="text-4xl font-bold text-left text-greenDTTV dark:text-orangeDTTV focus:outline-none">
                            NOUS ÉCRIRE
                          </h1>
                          <a
                            href={`mailto:${data.content.mail}`}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-left hover:text-orangeDTTV transition p-1 !font-light focus:outline-none"
                          >
                            {data.content.mail}
                          </a>
                          <h1 className="text-4xl font-bold text-left text-greenDTTV dark:text-orangeDTTV focus:outline-none">
                            NOUS RENCONTRER
                          </h1>
                          <a
                            href={`${data.content.linkadress}`}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-left hover:text-orangeDTTV transition p-1 !font-light focus:outline-none"
                          >
                            {convert(data.content.adress)}
                          </a>
                        </div>
                        <div className="flex flex-col"></div>
                        <div className="flex flex-col space-y-2">
                          <h1 className="text-3xl font-bold text-greenDTTV dark:text-orangeDTTV focus:outline-none">
                            SUIVEZ-NOUS
                          </h1>
                          <div className="mt-5 space-y-2">
                            <div className="flex space-x-2">
                              <div className="w-10 h-10 p-1 rounded-full bg-orangeDTTV">
                                <Icons
                                  icons="linkedin"
                                  className="w-6 h-6 m-auto mt-1 text-white fill-current"
                                />
                              </div>
                              <a
                                className="text-xl hover:text-orangeDTTV transition items-center mt-0.5 font-medium focus:outline-none"
                                rel="noopener noreferrer"
                                target="_blank"
                                href={data.content.linkLinkedin}
                              >
                                Linkedin
                              </a>
                            </div>
                            <div className="flex space-x-2">
                              <div className="w-10 h-10 p-1 rounded-full bg-orangeDTTV">
                                <Icons
                                  icons="instagram"
                                  className="w-6 h-6 m-auto mt-1 text-white fill-current"
                                />
                              </div>
                              <a
                                className="text-xl hover:text-orangeDTTV transition items-center mt-0.5 font-medium focus:outline-none"
                                rel="noopener noreferrer"
                                target="_blank"
                                href={data.content.linkInstagram}
                              >
                                Instagram
                              </a>
                            </div>
                            <div className="flex space-x-2">
                              <div className="w-10 h-10 p-1 rounded-full bg-orangeDTTV">
                                <Icons
                                  icons="facebook"
                                  className="w-6 h-6 m-auto mt-1 text-white fill-current"
                                />
                              </div>
                              <a
                                className="text-xl hover:text-orangeDTTV transition items-center mt-0.5 font-medium focus:outline-none"
                                rel="noopener noreferrer"
                                target="_blank"
                                href={data.content.linkFacebook}
                              >
                                Facebook
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </Fade>
          </Fade>
        ) : (
          <Loading title="Chargement.." />
        )}
      </>
    </>
  );
};

export default Home;
