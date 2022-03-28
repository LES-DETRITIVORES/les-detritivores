import { Icons } from "components/icons";
import { Firebase } from "libs/firebase";
import React, { FormEvent, useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import { Validate } from "libs/validate";
function Index() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fire = new Firebase();

  useEffect((): void => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError("Tu dois être connecté pour poster un article");
      setSuccess("");
    } else {
      if (
        title === "" ||
        description === "" ||
        content === "" ||
        image === "" ||
        date === "" ||
        author === ""
      ) {
        setError("Veuillez remplir tous les champs");
        setSuccess("");
      } else {
        fire.collection("posts").add({
          title,
          description,
          content,
          image,
          date,
          author,
        });
        setError("");
        setSuccess("Article publié");
      }
    }
  };
  const authenticateWithGoogle = async () => {
    try {
      await fire.signWith("redirectAndLink");
    } catch (error: any) {
      const up = new Validate();
      const messages = up.errors(error.code, error.message);
      setError(messages);
    }
  };
  const all = title + description + content + image + date + author;
  return (
    <>
      <title>Dashboard - Les Détritivores</title>
      {error && (
        <>
          <Slide duration={500} top>
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
        <Slide duration={500} top>
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

      <div className="flex flex-no-wrap transition overflow-auto">
        <Fade left>
          <div className="lg:w-64 absolute sm:relative bg-greenDTTV shadow flex-col justify-between sm:flex h-64 w-screen lg:h-screen">
            <div className="px-6">
              <div className="h-16 w-full flex items-center justify-center mt-8">
                <Icons
                  icons="logo"
                  className="text-white fill-current w-36 h-20"
                />
              </div>
              <ul className="mt-12">
                <li className="flex w-full justify-between transition-all text-neutral-50 hover:bg-green-900 hover:px-2 hover:py-2 cursor-pointer items-center mb-6 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-grid hover:bg-white hover:text-black rounded transition w-5 h-5"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <rect x={4} y={4} width={6} height={6} rx={1} />
                      <rect x={14} y={4} width={6} height={6} rx={1} />
                      <rect x={4} y={14} width={6} height={6} rx={1} />
                      <rect x={14} y={14} width={6} height={6} rx={1} />
                    </svg>
                    <span className="text-xs ml-2 font-light">News</span>
                  </div>
                </li>
                {isLoggedIn && (
                  <li
                    className="flex w-full justify-between transition-all text-neutral-50 hover:bg-green-900 hover:px-2 hover:py-2 cursor-pointer items-center mb-6 rounded-lg"
                    onClick={() => fire.logOut()}
                  >
                    <div className="flex items-center">
                      <svg
                        className="icon icon-tabler icon-tabler-grid hover:bg-white hover:text-black rounded transition w-4 h-4"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                        ></path>
                      </svg>
                      <span className="text-xs ml-2 font-light">
                        Déconnexion
                      </span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            {isLoggedIn ? (
              <div className="inline-flex items-center mt-48 mb-4 px-8">
                <div className="w-8 h-8 bg-cover rounded-md mr-3">
                  <img
                    src={
                      (fire.photoUrl() as string)
                        ? "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
                        : (fire.photoUrl() as string)
                    }
                    className="rounded-full h-full w-full overflow-hidden shadow"
                  />
                </div>
                <div>
                  <p className="text-neutral-100 text-xs font-light">
                    {fire.userName()}
                  </p>
                </div>
              </div>
            ) : (
              <Fade bottom>
                <button
                  type="button"
                  onClick={() => authenticateWithGoogle()}
                  className="py-2 px-4 flex text-xs font-light justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="mr-2"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z" />
                  </svg>
                  Connexion avec Google
                </button>
              </Fade>
            )}
          </div>
        </Fade>

        <Fade top>
          <div className="container mx-auto py-8 lg:py-10 md:w-4/5 w-11/12 px-6 lg:h-64 h-screen lg:my-0 my-48">
            <div className="w-full h-full">
              <div>
                <div className="w-full grid grid-cols-2">
                  <div className="flex flex-col justify-center items-center">
                    <h2
                      role="heading"
                      aria-label="enter Personal data"
                      className="text-xl font-semibold leading-7 text-gray-800 mt-10"
                    >
                      Formulaire d'ajout d'une news
                    </h2>
                    <p className="text-sm font-light leading-none text-gray-600 mt-0.5">
                      Vous pouvez ajouter une news
                    </p>
                    <form method="POST" onSubmit={handleSubmit}>
                      <div className="mt-8 md:flex items-center">
                        <div className="flex flex-col">
                          <label className="mb-3 text-sm leading-none text-gray-800">
                            Titre
                          </label>
                          <input
                            type="name"
                            tabIndex={0}
                            aria-label="Entrer le titre"
                            className="w-64 bg-gray-100 text-xs font-normal leading-none text-gray-800 p-3 border rounded border-gray-200 focus:outline-none"
                            placeholder="Titre"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                          <label className="mb-3 text-sm leading-none text-gray-800">
                            Description
                          </label>
                          <input
                            type="name"
                            tabIndex={0}
                            aria-label="Entrer la description"
                            className="w-64 bg-gray-100 text-xs font-normal leading-none text-gray-800 p-3 border rounded border-gray-200 focus:outline-none"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-12 md:flex items-center">
                        <div className="flex flex-col">
                          <label className="mb-3 text-sm leading-none text-gray-800">
                            Contenu
                          </label>
                          <input
                            type="text"
                            tabIndex={0}
                            aria-label="Entrer le contenu"
                            className="w-64 bg-gray-100 text-xs font-normal leading-none text-gray-800 p-3 border rounded border-gray-200 focus:outline-none"
                            placeholder="Contenu"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                          <label className="mb-3 text-sm leading-none text-gray-800">
                            Image
                          </label>
                          <input
                            type="text"
                            tabIndex={0}
                            aria-label="Ajouter un lien d'image"
                            className="w-64 bg-gray-100 text-xs font-normal leading-none text-gray-800 p-3 border rounded border-gray-200 focus:outline-none"
                            placeholder="Lien de l'image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-12 md:flex items-center">
                        <div className="flex flex-col">
                          <label className="mb-3 text-sm leading-none text-gray-800">
                            Date de publication
                          </label>
                          <input
                            tabIndex={0}
                            aria-label="Entrer la date de publication"
                            className="w-64 bg-gray-100 text-xs font-normal leading-none text-gray-800 p-3 border rounded border-gray-200 focus:outline-none"
                            placeholder="Date de publication"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                          <label className="mb-3 text-sm leading-none text-gray-800">
                            Auteur
                          </label>
                          <input
                            type="name"
                            tabIndex={0}
                            aria-label="Entrer l'auteur"
                            className="w-64 bg-gray-100 text-xs font-normal leading-none text-gray-800 p-3 border rounded border-gray-200 focus:outline-none"
                            placeholder="Auteur"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                          />
                        </div>
                      </div>
                      {all.length > 1 && (
                        <div className="flex justify-start items-start">
                          <div className="h-1.5 rounded-lg w-48 bg-gray-300 mt-5">
                            <div
                              style={{ width: `${all.length}%` }}
                              className={`h-full rounded-lg transition duration-300 ease-in-out ${
                                all.length < 40
                                  ? "bg-red-600 transition duration-300 ease-in-out"
                                  : "bg-green-600 transition duration-300 ease-in-out"
                              }`}
                            />
                            <span className="text-xs inline-flex bg-neutral-900 mt-1 px-1.5 py-2 text-white rounded-full">
                              {all.length}%
                            </span>
                          </div>
                        </div>
                      )}
                      <button
                        role="submit"
                        aria-label="Next step"
                        className="flex items-center justify-center py-4 px-7 bg-greenDTTV hover:bg-green-900 transition rounded-xl mt-7 md:mt-14 focus:outline-none"
                        {...(!fire.isConnected() ? { disabled: true } : {})}
                      >
                        <div className="inline-flex items-end justify-center space-x-3">
                          <span className="text-xs font-normal text-center text-white capitalize">
                            Ajouter
                          </span>
                          <svg
                            className="text-white mb-1"
                            width={12}
                            height={8}
                            viewBox="0 0 12 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.01 3H0V5H8.01V8L12 4L8.01 0V3Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </button>
                    </form>
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-2">
                    <h1
                      tabIndex={0}
                      role="heading"
                      aria-label="profile information"
                      className="focus:outline-none text-3xl font-bold text-gray-800 mt-12"
                    >
                      Liste des news
                    </h1>
                    <p
                      role="contentinfo"
                      className=" focus:outline-nonetext-sm font-light leading-tight text-gray-600 mt-4"
                    >
                      Voici toute les news que vous avez publiées.
                    </p>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <div className="grid grid-cols-4 space-x-2">
                        <div>
                          <img
                            src="https://i.picsum.photos/id/823/450/300.jpg?hmac=yy240RCPu48Zvl8pOC4HbHbC2tgDBs2pUt4pQdIT7-8"
                            alt="news"
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                        <div>
                          <img
                            src="https://i.picsum.photos/id/823/450/300.jpg?hmac=yy240RCPu48Zvl8pOC4HbHbC2tgDBs2pUt4pQdIT7-8"
                            alt="news"
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                        <div>
                          <img
                            src="https://i.picsum.photos/id/823/450/300.jpg?hmac=yy240RCPu48Zvl8pOC4HbHbC2tgDBs2pUt4pQdIT7-8"
                            alt="news"
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                        <div>
                          <img
                            src="https://i.picsum.photos/id/823/450/300.jpg?hmac=yy240RCPu48Zvl8pOC4HbHbC2tgDBs2pUt4pQdIT7-8"
                            alt="news"
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 space-x-2">
                        <div>
                          <img
                            src="https://i.picsum.photos/id/823/450/300.jpg?hmac=yy240RCPu48Zvl8pOC4HbHbC2tgDBs2pUt4pQdIT7-8"
                            alt="news"
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                        <div>
                          <img
                            src="https://i.picsum.photos/id/823/450/300.jpg?hmac=yy240RCPu48Zvl8pOC4HbHbC2tgDBs2pUt4pQdIT7-8"
                            alt="news"
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                        <div>
                          <img
                            src="https://i.picsum.photos/id/823/450/300.jpg?hmac=yy240RCPu48Zvl8pOC4HbHbC2tgDBs2pUt4pQdIT7-8"
                            alt="news"
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                        <div>
                          <img
                            src="https://i.picsum.photos/id/823/450/300.jpg?hmac=yy240RCPu48Zvl8pOC4HbHbC2tgDBs2pUt4pQdIT7-8"
                            alt="news"
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </>
  );
}

export default Index;
