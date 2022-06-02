import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Fade from "react-reveal/Fade";

import fetcher from "libs/fetcher";
import { StoryBlok } from "libs/types";
import { richText } from "libs/storyblok";

import { Icons } from "components/icons";
import Images from "components/card/images";
import Loading from "components/card/loading";
import Content from "components/card/content";

const Collecte: NextPage = () => {
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

    if (typeof window !== "undefined") {
      document.body.scrollTop = 0;
    }
  }, []);

  return (
    <>
      <Fade
        left={isDesktop}
        bottom={isMobile}
        duration={500}
        delay={500}
        distance="30px"
      >
        <div className="max-w-screen">
          <div className="grid grid-cols-1 mx-5 my-2 md:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1">
            <div className="flex flex-col space-y-2">
              {data ? (
                <>
                  <Images
                    isLoading={isLoading}
                    image="/static/images/DETRI_211007_137.jpg"
                    width={320}
                    height={200}
                    onLoadingComplete={() => setLoading(false)}
                  />
                  <Images
                    isLoading={isLoading}
                    image="/static/images/DETRI_211007_336.jpg"
                    width={320}
                    height={200}
                    onLoadingComplete={() => setLoading(false)}
                  />
                  <Images
                    isLoading={isLoading}
                    image="/static/images/IMG_0099.jpg"
                    width={320}
                    height={200}
                    onLoadingComplete={() => setLoading(false)}
                  />
                  <Images
                    isLoading={isLoading}
                    image="/static/images/DETRI_211007_623.jpg"
                    width={320}
                    height={200}
                    onLoadingComplete={() => setLoading(false)}
                  />
                </>
              ) : (
                <>
                  {[...Array(4)].map((_, i) => (
                    <>
                      <div>
                        <div className="rounded-lg w-80 bg-greenDTTV" />
                      </div>
                    </>
                  ))}
                </>
              )}
              <span className="inline-flex justify-center space-x-2 2xl:justify-start xl:justify-start sm:justify-start md:justify-start">
                <Icons
                  icons="photo"
                  className="w-6 h-6 text-black fill-current dark:text-white"
                />
                <p className="font-normal text-base mt-0.5">
                  François Passerini
                </p>
              </span>
            </div>
            <div className="flex flex-col justify-between space-x-10">
              {data ? (
                <>
                  <div className="space-y-4">
                    <h1 className="pb-2 text-3xl font-bold text-left md:text-6xl text-orangeDTTV -rotate-2">
                      COLLECTE
                    </h1>
                    <div className="space-y-4">
                      <p className="text-xl font-bold">
                        {data?.content.collectMiniText}
                      </p>
                      <div className="flex flex-col items-center content-center space-y-2">
                        <Content
                          number={1}
                          text={richText(data?.content.collectFirstText)}
                        />
                        <Content
                          number={2}
                          text={richText(data?.content.collectSecondText)}
                        />
                        <Content
                          number={3}
                          text={richText(data?.content.collectTreeText)}
                        />

                        <div>
                          <p className="text-xl font-bold">
                            En camions, à vélos ou grâce à l'installation de
                            Bornes d'Apport Volontaire, nos équipes parcourent
                            les rues de Bordeaux et ses alentours pour collecter
                            l'ensemble de vos restes alimentaires !
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Loading />
              )}
            </div>
            <div className="hidden space-y-2">
              <h1 className="text-2xl font-medium text-center ">
                Où intervenons-nous ?
              </h1>
              <div className="flex justify-center">
                <iframe
                  title="Maps"
                  src="https://www.google.com/maps/d/embed?mid=1olZRTAgF9fAuYSYS-eFXcWhBzopWmh3g&ehbc=2E312F"
                  className="w-96 h-80 sm:w-52 sm:h-52 md:w-80 md:h-150 lg:w-200 lg:200 rounded-2xl"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};
export default Collecte;
