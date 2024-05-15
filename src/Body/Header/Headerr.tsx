import { FaCopy, FaShare, FaWrench } from "react-icons/fa";
import Infoalert from "../../AlertAndLoader/Alert/Infoalert";
import SaveToCodeYogi from "./SaveToCodeYogi";
import { Dispatch, SetStateAction } from "react";
import {
  AlertShowerProviderHOC,
  CodeContextHOC,
} from "../../HOC&Context/Context";
import Share from "./Share";
import { showAlertType } from "../../HOC&Context/Provider/AlertProvider";
import { useParams } from "react-router-dom";

const Header = (prop: P) => {
  let clases =
    "bg-gray-800 hover:bg-gray-700 m-2   text-white font-bold py-2 px-4 rounded";

  const didAnotherUser = useParams().didshare;
  const didAssignment = useParams().assiID;

  return (
    <div className=" md:flex gap-2 hidden flex-wrap items-center justify-center  ">
      {/* <div className="p-5 rounded-full absolute -left-5  bg-blue-600">
        <img className=" " src="/logo.svg" width={50} />
      </div> */}
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
      {prop.notSavedJs !== prop.jsCode && (
        <button
          onClick={prop.runJsFunc}
          className={`block m-2 bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline `}
        >
          Load Js
        </button>
      )}

      {!didAnotherUser && (
        <div className=" flex gap-2 mb-2 flex-wrap items-center justify-center  ">
          {" "}
          <SaveToCodeYogi></SaveToCodeYogi>
          {didAssignment && (
            <button
              onClick={() => Share("other", prop.setShowAlert)}
              className="bg-gradient-to-r flex items-center gap-2 from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md"
            >
              Share to other
              <FaShare />
            </button>
          )}
          <button
            onClick={() => Share("me", prop.setShowAlert)}
            className="bg-gradient-to-r flex items-center gap-2 from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md"
          >
            copy for you <FaCopy />
          </button>
        </div>
      )}
    </div>
  );
};

type P = {
  language: "html" | "js" | "css";
  setLanguage: (language: "html" | "js" | "css") => void;
  jsCode: string;
  notSavedJs: string;

  runJsFunc: () => void;
  runJs: boolean;
  setShowConsole: (showConsole: boolean) => void;
  showConsole: boolean;
  setHtmlCode: Dispatch<SetStateAction<string>>;
  setCssCode: Dispatch<SetStateAction<string>>;
  setShowAlert: Dispatch<SetStateAction<showAlertType>>;
  cssCode: string;
  htmlCode: string;
};

Header.defaultProps = {
  live: "html",
};

export default CodeContextHOC(AlertShowerProviderHOC(Header));
