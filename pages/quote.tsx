import type { NextPage } from "next";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  Fragment,
  FormEvent,
} from "react";
import useSWR from "swr";
import Fade from "react-reveal/Fade";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";

import fetcher from "libs/fetcher";
import { StoryBlok } from "libs/types";
import { richText } from "libs/storyblok";

const Quote: NextPage = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data } = useSWR<StoryBlok>("/api/storyblok", fetcher);

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
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      setIsError(true);
    } else {
      setError("");
      setSuccess(true);
      setIsError(false);
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
    }).then((response) => response.json());
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
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={isError}
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
                    <p className="text-sm font-medium text-gray-900">Woops..</p>
                    <p className="mt-1 text-sm text-gray-500">{error}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setIsError(false);
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
          <Transition
            show={success}
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
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      Merci de votre confiance !
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Le formulaire à bien été envoyer !
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setSuccess(false);
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setWho(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">
                    Nombre de repas servis par jour:*
                  </label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNumbers(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">Structure:*</label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setStructure(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">Fonction:*</label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFonction(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">Nom:*</label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">Prénom:*</label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setLastName(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">Email:*</label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light">Téléphone:*</label>
                  <input
                    className="bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 h-12 p-3 rounded-md transition focus:outline-none"
                    autoComplete="off"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPhone(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <label className="font-light">Message:*</label>
                  <textarea
                    className="w-full h-auto px-3 py-2 focus:outline-none bg-white dark:bg-neutral-900 border-2 border-orangeDTTV w-26 p-3 rounded-md transition text-black dark:text-white"
                    autoComplete="off"
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setMessage(e.target.value)
                    }
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
export default Quote;
