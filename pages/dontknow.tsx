import type { NextPage } from "next";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import useSWR from "swr";
import Fade from "react-reveal/Fade";

import fetcher from "libs/fetcher";
import { StoryBlok } from "libs/types";
import { richText } from "libs/storyblok";
import { Validator } from "utils/validator";
import Alert from "components/alert";

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
    const validate = new Validator();
    if (!validate.isEmail(email)) {
      setError("Votre email n'est pas valide");
      setIsError(true);
      return;
    }
    if (!validate.isPhone(phone)) {
      setError("Votre numéro de téléphone n'est pas valide");
      setIsError(true);
      return;
    }
    if (
      validate.isEmpty(who) ||
      validate.isEmpty(numbers) ||
      validate.isEmpty(dfunction) ||
      validate.isEmpty(email) ||
      validate.isEmpty(phone) ||
      validate.isEmpty(name) ||
      validate.isEmpty(lastname) ||
      validate.isEmpty(structure) ||
      validate.isEmpty(message)
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
        type: "compost",
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
      <Alert
        state="success"
        message={"Merci de votre confiance !"}
        show={success}
        action={() => setSuccess(false)}
        alertMessage={"Votre formulaire à bien été envoyer !"}
      />
      <Alert
        state="error"
        message={error}
        show={isError}
        action={() => setIsError(false)}
        alertMessage={"Woops.."}
      />

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
                    rows={5}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setMessage(e.target.value)
                    }
                  />
                  <div className="flex justify-center items-center p-2">
                    <button
                      type="submit"
                      className="rounded-full relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-orange-600 active:shadow-none shadow-lg bg-gradient-to-tr from-orange-500 to-orange-600 border-orangeDTTV text-white"
                    >
                      <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                      <span className="relative text-[15px]">Envoyer</span>
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
