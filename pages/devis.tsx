import type { NextPage } from "next";
import React, { useState, useEffect, ChangeEvent } from "react";
import useSWR from "swr";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";

import fetcher from "libs/fetcher";
import { StoryBlok } from "libs/types";
import { richText } from "libs/storyblok";

import { Icons } from "components/icons";
const Devis: NextPage = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data } = useSWR<StoryBlok>(`/api/storyblok`, fetcher);

  const [who, setWho] = useState("");
  const [numbers, setNumbers] = useState("");
  const [dfunction, setFonction] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [structure, setStructure] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onMailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onWhoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWho(e.target.value);
  };
  const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumbers(e.target.value);
  };
  const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const onStructureChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStructure(e.target.value);
  };
  const onLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const onFonctionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFonction(e.target.value);
  };
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      who === "" ||
      numbers === "" ||
      dfunction === "" ||
      email === "" ||
      phone === "" ||
      name === "" ||
      lastname === "" ||
      structure === "" ||
      message === ""
    ) {
      setError("Veuillez remplir tous les champs");
      setSuccess(false);
    }
    if (
      who !== "" ||
      numbers !== "" ||
      dfunction !== "" ||
      email !== "" ||
      phone !== "" ||
      name !== "" ||
      lastname !== "" ||
      structure !== "" ||
      message !== ""
    ) {
      setError("");
      setSuccess(true);
    }

    fetch(`/api/send`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        who,
        numbers,
        dfunction,
        email,
        phone,
        name,
        lastname,
        structure,
        message,
      }),
    })
      .then((response) => response.json())
      .then((body) => console.log(body));
  };
  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, []);
  return (
    <>
      {error && (
        <>
          <Slide top>
            <div className="absolute p-6 max-w-sm bg-red-500 rounded-xl flex justify-start mx-2 my-2 items-center space-x-4 z-50">
              <div className="shrink-0">
                <Icons
                  icons="logo"
                  className="h-12 w-12 fill-current text-white"
                />
              </div>
              <div>
                <div className="text-xl font-normal text-white">Woops..</div>
                <p className="text-neutral-50 font-light">{error}</p>
              </div>
            </div>
          </Slide>
        </>
      )}
      {success && (
        <Slide top>
          <div className="absolute p-6 max-w-sm bg-green-500 rounded-xl flex justify-start mx-2 my-2 items-center space-x-4 z-50">
            <div className="shrink-0">
              <Icons
                icons="logo"
                className="h-12 w-12 fill-current text-white"
              />
            </div>
            <div>
              <div className="text-xl font-normal text-white">
                Merci de votre confiance !
              </div>
              <p className="text-neutral-50 font-light">
                Le formulaire à bien envoyer !
              </p>
            </div>
          </div>
        </Slide>
      )}
      <Fade
        left={isDesktop}
        bottom={isMobile}
        duration={500}
        delay={500}
        distance="30px"
      >
        <div className="max-w-screen my-3 justify-center content-center">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 sm:grid-cols-2 mx-0 sm:mx-5 md:mx-5 my-2 space-x-10">
            <div className="flex justify-center">
              <form
                className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 xl:w-100 md:w-96 sm:grid-cols-1 gap-x-2 gap-y-3 justify-center"
                onSubmit={onSubmit}
              >
                <div className="flex flex-col">
                  <label className="font-light">Vous êtes:*</label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={onWhoChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">
                    Nombre de repas servis par jour:*
                  </label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={onNumberChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">Structure:*</label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={onStructureChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">Fonction:*</label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={onFonctionChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">Nom:*</label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={onNameChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">Prénom:*</label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={onLastNameChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">Email:*</label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={onMailChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">Téléphone:*</label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={onPhoneChange}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <label className="font-light">Message:*</label>
                  <textarea
                    className="w-full h-auto px-3 py-2 focus:outline-none bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 p-3 rounded-md transition text-black dark:text-white"
                    autoComplete="off"
                    onChange={onMessageChange}
                  />
                  <div className="flex justify-center items-center p-2">
                    <button
                      className="bg-orangeDTTV transition hover:bg-orange-600 p-2 rounded-3xl text-white hover:ring-2 focus:ring-2 ring-orange-300 focus:outline-none"
                      type="submit"
                    >
                      <span className="font-normal text-sm">Envoyer</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex flex-col space-x-10">
              {data ? (
                <>
                  <div className="space-y-4">
                    <h1 className="text-left pb-2 text-2xl lg:text-3xl md:!text-4xl sm:text-3xl xl:!text-6xl 2xl:!text-6xl font-bold text-orangeDTTV -rotate-2">
                      {data?.content.MoneyTitle}
                      <div className="bg-growing-underline-black hidden">
                        &nbsp;
                      </div>
                    </h1>
                    <div className="space-y-4">
                      <p className="text-xl sm:text-md font-bold">
                        Vous aussi, valorisez vos biodéchets
                      </p>
                      <div className="flex flex-col space-y-2">
                        <p className="font-light text-xl space-y-2">
                          {richText(data?.content.MoneyText)}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <h1 className="text-left pb-2 text-2xl lg:text-3xl md:!text-4xl sm:text-3xl xl:!text-6xl 2xl:!text-6xl font-bold text-orangeDTTV -rotate-2 bg-neutral-100 dark:bg-neutral-800 h-20 rounded-lg animate-pulse"></h1>
                  <br />
                  <div className="space-y-4">
                    <p className="text-xl sm:text-md font-bold bg-neutral-100 dark:bg-neutral-800 h-28 rounded-lg animate-pulse"></p>
                    <div className="flex flex-col space-y-2">
                      <p className="font-light text-xl space-y-2 bg-neutral-100 dark:bg-neutral-800 h-20 rounded-lg animate-pulse"></p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};
export default Devis;
