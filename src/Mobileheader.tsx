// import { FaWrench, GiHamburgerMenu } from "react-icons/all";
import { Dispatch, SetStateAction, useState } from "react";
import { FaWrench } from "react-icons/fa";
import SaveToCodeYogi from "./SaveToCodeYogi";
import Infoalert from "./Infoalert";
import { GiHamburgerMenu } from "react-icons/gi";

const MobileManu = (props: P) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
let clases =
  "bg-gray-800 hover:bg-gray-700 m-2   text-white font-bold py-2 px-4 rounded";

  return (
    <div className="flex gap-2 md:hidden items-center justify-center relative">
      <div className="p-5 rounded-full absolute -left-5 bg-blue-600">
        <img className="" src="/logo.svg" width={50} alt="Logo" />
      </div>
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

      <div className="relative">
        <FaWrench
          onClick={() => props.setShowConsole(!props.showConsole)}
          className="text-4xl peer bg-blue-500 p-2 rounded-full text-white"
        />
        <Infoalert> Error console </Infoalert>
      </div>

      {props.jsCode.includes("prompt") && (
        <button
          disabled={props.reloadJs}
          onClick={props.reloadJsFunc}
          className={`block m-2 bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
        >
          Run
        </button>
      )}

      {/* Hamburger Menu Icon */}
      <GiHamburgerMenu
        className="text-4xl peer bg-blue-500 p-2 rounded-full text-white"
        onClick={toggleMenu}
      />

      {/* Mobile Menu */}
      {showMenu && (
        <div
          className={`w-screen h-screen inset-0 z-20 bg-black fixed bg-opacity-80 `}
        >
          <div onClick={toggleMenu} className="w-2/4 h-full"></div>
          <div className=" bg-indigo-900 h-full  w-2/4 fixed top-0 right-0  p-8 z-10">
            <div className="text-xl flex flex-col gap-3">
              <div className="flex flex-col  gap-5 font-bold  text-white ">
                <SaveToCodeYogi
                  className="flex relative text-black z-40 flex-col gap-5"
                  {...props}
                ></SaveToCodeYogi>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Props interface
type P = {
  language: "html" | "js" | "css";
  setLanguage: (language: "html" | "js" | "css") => void;
  jsCode: string;
  reloadJsFunc: () => void;
  reloadJs: boolean;
  setShowConsole: (showConsole: boolean) => void;
  showConsole: boolean;
  setHtmlCode: Dispatch<SetStateAction<string>>;
  setCssCode: Dispatch<SetStateAction<string>>;
  setJsCode: Dispatch<SetStateAction<string>>;
  cssCode: string;
  htmlCode: string;
};

MobileManu.defaultProps = {
  live: "html",
};

export default MobileManu;
