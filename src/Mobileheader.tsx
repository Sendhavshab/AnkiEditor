// import { FaWrench, GiHamburgerMenu } from "react-icons/all";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCopy, FaShare, FaWrench } from "react-icons/fa";
import SaveToCodeYogi from "./SaveToCodeYogi";
import { GiHamburgerMenu } from "react-icons/gi";
import { AlertShowerProviderHOC, CodeContextHOC } from "./HOC&Context/Context";
import { useParams } from "react-router-dom";
import Share from "./Share";
import { showAlertType } from "./HOC&Context/AlertProvider";

const MobileManu = (props: P) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

    const didAnotherUser = useParams().didshare;

  let clases =
    "bg-gray-800 hover:bg-gray-700 m-2   text-white font-bold py-2 px-4 rounded";

  return (
    <div className="flex gap-2 md:hidden items-center justify-center relative">
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
      <button
        onClick={() => {
          props.setLanguage("js");
        }}
        className={` ${clases} ${
          props.language === "js" && "scale-110 border-2 border-white"
        } `}
      >
        JS
      </button>

      {props.notSavedJs !== props.jsCode && (
        <button
          onClick={props.runJsFunc}
          className={`block m-2 bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline `}
        >
          Load Js
        </button>
      )}
      {!didAnotherUser ? (
        <div>
          <GiHamburgerMenu
            className="text-4xl  bg-blue-500 p-2 rounded-full text-white"
            onClick={toggleMenu}
          />

          {showMenu && (
            <div
              className={`w-screen h-screen inset-0 z-20 bg-black fixed bg-opacity-80 `}
            >
              <div onClick={toggleMenu} className="w-2/4 h-full"></div>
              <div className=" bg-indigo-900 h-full  w-2/4 fixed top-0 right-0  p-8 z-10">
                <div className="text-xl flex flex-col gap-3">
                  <div className="flex flex-col  gap-5 font-bold  text-white ">
                    <div
                      className="flex gap-2 items-center cursor-pointer"
                      onClick={() => {
                        props.setShowConsole(!props.showConsole);
                        toggleMenu();
                      }}
                    >
                      <FaWrench className="text-4xl  bg-blue-500 p-2 rounded-full text-white" />
                      <h1 className="text-xl font-bold">CONSOLE</h1>
                    </div>

                    <SaveToCodeYogi
                      className="flex relative text-black z-40 flex-col gap-5"
                      {...props}
                    ></SaveToCodeYogi>
                    <button
                      onClick={() => Share("other", props.setShowAlert)}
                      className="bg-gradient-to-r min-w-max flex items-center gap-2 from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md"
                    >
                      Share to other
                      <FaShare />
                    </button>
                    <button
                      onClick={() => Share("me", props.setShowAlert)}
                      className="bg-gradient-to-r flex items-center gap-2 from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md"
                    >
                      copy for you <FaCopy />
                    </button>
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
type P = {
  language: "html" | "js" | "css";
  setLanguage: (language: "html" | "js" | "css") => void;
  jsCode: string;
  runJsFunc: () => void;
  runJs: boolean;
  notSavedJs: string;
  setShowConsole: (showConsole: boolean) => void;
  showConsole: boolean;
  setHtmlCode: Dispatch<SetStateAction<string>>;
  setCssCode: Dispatch<SetStateAction<string>>;
  setJsCode: Dispatch<SetStateAction<string>>;
  setShowAlert: Dispatch<SetStateAction<showAlertType>>;
  cssCode: string;
  htmlCode: string;
};

MobileManu.defaultProps = {
  live: "html",
};

export default CodeContextHOC(AlertShowerProviderHOC(MobileManu));
