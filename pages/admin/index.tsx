import { Icons } from "components/icons";
import { Firebase } from "libs/firebase";
import React, { useState } from "react";
import config from "react-reveal/globals";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
function Index() {
  // form title, description content image date of publish author button
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (e) => {
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
      const fire = new Firebase();
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

    e.preventDefault();
    console.log(title, description, content, image, date, author);
  };

  return (
    <>
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
      <div className="flex flex-no-wrap transition">
        <Fade left>
          <div className="lg:w-64 absolute sm:relative bg-greenDTTV shadow flex-col justify-between sm:flex h-48 w-screen lg:h-screen">
            <div className="px-6">
              <div className="h-16 w-full flex items-center">
                <Icons
                  icons="logo"
                  className="text-white fill-current w-36 h-20 mt-10 ml-2"
                />
              </div>
              <ul className="mt-12">
                <li className="flex w-full justify-between text-neutral-50 hover:text-neutral-100 cursor-pointer items-center mb-6">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-grid"
                      width={18}
                      height={18}
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
                    <span className="text-sm ml-2">News</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Fade>
        <Fade top>
          <div className="container mx-auto py-8 lg:py-10 md:w-4/5 w-11/12 px-6 lg:h-64 h-screen">
            <div className="w-full h-full rounded">
              <div>
                <div className="w-full">
                  <h1
                    tabIndex={0}
                    role="heading"
                    aria-label="profile information"
                    className="focus:outline-none text-3xl font-bold text-gray-800 mt-12"
                  >
                    Ajout d'un nouvelle news
                  </h1>
                  <p
                    role="contentinfo"
                    className=" focus:outline-nonetext-sm font-light leading-tight text-gray-600 mt-4"
                  >
                    Ajouter une news
                  </p>
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
                          className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
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
                          className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
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
                          className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
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
                          className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
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
                          className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                          placeholder="Date de publication"
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
                          className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                          placeholder="Auteur"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      role="submit"
                      aria-label="Next step"
                      className="flex items-center justify-center py-4 px-7 focus:outline-none bg-white border rounded border-gray-400 mt-7 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                    >
                      <span className="text-sm font-medium text-center text-gray-800 capitalize">
                        Ajouter
                      </span>
                      <svg
                        className="mt-1 ml-3"
                        width={12}
                        height={8}
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.01 3H0V5H8.01V8L12 4L8.01 0V3Z"
                          fill="#242731"
                        />
                      </svg>
                    </button>
                  </form>
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
