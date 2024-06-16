// import { FaWrench, GiHamburgerMenu } from "react-icons/all";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCopy, FaShareAlt, FaWrench } from "react-icons/fa";
import SaveToCodeYogi from "../../Api/SaveAndGet";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  AlertShowerProviderHOC,
  CodeContextHOC,
  ConsoleProviderHOC,
} from "../../HOC&Context/Context";
import { Link, useParams } from "react-router-dom";
import Share from "../../Api/Share";
import { showAlertType } from "../../HOC&Context/Provider/AlertProvider";
import { IoHomeSharp, IoLink } from "react-icons/io5";

const MobileManu = (props: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const didAnotherUser = useParams().didshare;
  const didAssignment = useParams().assiID || "";
  const practiceId = useParams().practiceId || "";

  let clases =
    "bg-gray-800 hover:bg-gray-700 m-2   text-white font-bold py-2 px-4 rounded";

  return (
    <div className="flex gap-2 flex-wrap md:hidden items-center justify-center relative">
      {/* <div className="p-5 rounded-full absolute -left-5 bg-blue-600">
        <img className="" src="/logo.svg" width={50} alt="Logo" />
      </div> */}
      <button
        onClick={() => {
          props.setLanguage("html");
        }}
        className={` ${clases}  ${
          props.language === "html" && "scale-110  border-2 border-white"
        } `}
      >
        HTML
      </button>
      <button
        onClick={() => {
          props.setLanguage("css");
        }}
        className={` ${clases} ${
          props.language === "css" && "scale-110 border-2 border-white"
        } `}
      >
        CSS
      </button>
      {props.isNotJsInassignment || (
        <button
          onClick={() => {
            props.setLanguage("javascript");
          }}
          className={` ${clases} ${
            props.language === "javascript" && "scale-110 border-2 border-white"
          } `}
        >
          JS
        </button>
      )}
      {props.notSavedJs !== props.jsCode && !props.isNotJsInassignment && (
        <button
          onClick={props.runJsFunc}
          className={`block m-2 bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline `}
        >
          Load Js
        </button>
      )}
      {!didAnotherUser && props.isAuther ? (
        <div>
          <GiHamburgerMenu
            className="text-4xl  bg-blue-500 p-2 rounded-full text-white"
            onClick={toggleMenu}
          />

          {showMenu && (
            <div
              className={`w-screen h-screen inset-0 z-20 bg-black fixed bg-opacity-80 `}
            >
              <div onClick={toggleMenu} className="w-1/4 h-full"></div>
              <div className=" bg-indigo-900 h-full  w-3/4 fixed top-0 right-0  p-8 z-10">
                <div className="text-xl flex flex-col gap-3">
                  <div className="flex flex-col  gap-5 font-bold  text-white ">
                    <Link to="/">
                      <div className="flex gap-2 items-center relative cursor-pointer">
                        <IoHomeSharp className="text-4xl  bg-blue-500 p-2 rounded-full text-white" />

                        <h1 className="text-xl font-bold">Go HOME</h1>
                      </div>
                    </Link>
                    <div
                      onClick={() =>
                        props.setIsTailwindProject(!props.isTailwindProject)
                      }
                      className="flex gap-2 items-center relative cursor-pointer"
                    >
                      <div className="w-10 h-10 overflow-hidden rounded-full ">
                        <img
                          className={`object-cover  ${
                            props.isTailwindProject || "opacity-40"
                          } `}
                          src="/Images/tailwindbright.jpg"
                        />
                      </div>
                      <h1 className="text-xl font-bold">
                        Tailwind {props.isTailwindProject ? "on" : "off"}
                      </h1>
                    </div>
                    <div
                      className="flex gap-2 items-center relative cursor-pointer"
                      onClick={() => {
                        props.setShowConsole(!props.showConsole);
                        toggleMenu();
                      }}
                    >
                      <FaWrench className="text-4xl  bg-blue-500 p-2 rounded-full text-white" />
                      {props.consoleMessages.length !== 0 && (
                        <span className="p-2 rounded-full bg-red-600 bg-opacity-90 absolute -left-1 -top-1"></span>
                      )}

                      <h1 className="text-xl font-bold">CONSOLE</h1>
                    </div>
                    <SaveToCodeYogi
                      className="flex relative text-black z-40 flex-col gap-5"
                      {...props}
                    ></SaveToCodeYogi>
                    {!didAnotherUser && props.isAuther && (
                      <div className=" flex gap-2 mb-2 flex-col items-center justify-center  ">
                        <button
                          onClick={() =>
                            Share(
                              "other",
                              props.setShowAlert,
                              practiceId ? practiceId : didAssignment
                            )
                          }
                          className="bg-gradient-to-r flex items-center  gap-2 from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md"
                        >
                          <FaShareAlt /> Other <IoLink />
                        </button>
                        <button
                          onClick={() =>
                            Share(
                              "me",
                              props.setShowAlert,
                              practiceId ? practiceId : didAssignment
                            )
                          }
                          className="bg-gradient-to-r flex items-center gap-2 from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md"
                        >
                          <FaCopy /> You <IoLink />
                        </button>
                        {props.solution && (
                          <button
                            onClick={props.seeSolution}
                            className="bg-gradient-to-r flex items-center gap-2 from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md"
                          >
                            Solution
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <FaWrench className="text-4xl  bg-blue-500 p-2 rounded-full text-white" />
      )}
    </div>
  );
};

// Props interface
export type HeaderProps = {
  language: "html" | "javascript" | "css";
  consoleMessages: { type: string; message: string }[];
  setLanguage: (language: "html" | "javascript" | "css") => void;
  jsCode: string;
  runJsFunc: () => void;
  runJs: boolean;
  seeSolution: () => void;
  solution: boolean;
  isNotJsInassignment: boolean;
  notSavedJs: string;
  setShowConsole: (showConsole: boolean) => void;
  showConsole: boolean;
  setHtmlCode: Dispatch<SetStateAction<string>>;
  setCssCode: Dispatch<SetStateAction<string>>;
  setShowAlert: Dispatch<SetStateAction<showAlertType>>;
  cssCode: string;
  htmlCode: string;
  isAuther: boolean;
  isTailwindProject: boolean;
  setIsTailwindProject: React.Dispatch<React.SetStateAction<boolean>>;
};

MobileManu.defaultProps = {
  live: "html",
};

export default CodeContextHOC(
  AlertShowerProviderHOC(ConsoleProviderHOC(MobileManu))
);
