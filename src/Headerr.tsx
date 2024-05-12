import { FaWrench } from "react-icons/fa";
import Infoalert from "./Infoalert";
import SaveToCodeYogi from "./SaveToCodeYogi";
import { Dispatch, SetStateAction } from "react";

const Header = (prop: P) => {
  let clases =
    "bg-gray-800 hover:bg-gray-700 m-2   text-white font-bold py-2 px-4 rounded";

  return (
    <div className=" md:flex gap-2 hidden  items-center justify-center  ">
      <div className="p-5 rounded-full absolute -left-5  bg-blue-600">
        <img className=" " src="/logo.svg" width={50} />
      </div>

      <button
        onClick={() => {
          prop.setLanguage("html");
        }}
        className={` ${clases}  ${
          prop.language === "html" && "scale-110  border-2 border-white"
        } `}
      >
        HTML
      </button>
      <button
        onClick={() => {
          prop.setLanguage("css");
        }}
        className={` ${clases} ${
          prop.language === "css" && "scale-110 border-2 border-white"
        } `}
      >
        CSS
      </button>
      <button
        onClick={() => {
          prop.setLanguage("js");
        }}
        className={` ${clases} ${
          prop.language === "js" && "scale-110 border-2 border-white"
        } `}
      >
        JS
      </button>
      <div className="relative">
        <FaWrench
          onClick={() => prop.setShowConsole(!prop.showConsole)}
          className="text-4xl peer bg-blue-500 p-2 rounded-full text-white"
        />
        <Infoalert> Error console </Infoalert>
      </div>
      <SaveToCodeYogi
        setJsCode={prop.setJsCode}
        setCssCode={prop.setCssCode}
        setHtmlCode={prop.setHtmlCode}
        cssCode={prop.cssCode}
        htmlCode={prop.htmlCode}
        jsCode={prop.jsCode}
      ></SaveToCodeYogi>
      {prop.jsCode.indexOf("prompt") !== -1 && (
        <button
          disabled={prop.reloadJs}
          onClick={prop.reloadJsFunc}
          className={`block m-2 bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline `}
        >
          Run
        </button>
      )}
    </div>
  );
};

type P = {
  language: "html" | "js" | "css";
  setLanguage: (language: "html" | "js" | "css") => void;
  jsCode: String;
  reloadJsFunc: () => void;
  reloadJs: boolean;
  setShowConsole: (showConsole: boolean) => void;
  showConsole: boolean;
  setHtmlCode: Dispatch<SetStateAction<string>>;
  setCssCode: Dispatch<SetStateAction<string>>;
  setJsCode: Dispatch<SetStateAction<string>>;
  cssCode: String;
  htmlCode: String;
};

Header.defaultProps = {
  live: "html",
};

export default Header;
