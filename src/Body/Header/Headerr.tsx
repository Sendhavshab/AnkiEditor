import { FaCopy, FaShareAlt, FaWrench } from "react-icons/fa";
import Infoalert from "../../AlertAndLoader/Alert/Infoalert";
import SaveToCodeYogi from "./SaveToCodeYogi";
import {
  AlertShowerProviderHOC,
  CodeContextHOC,
  ConsoleProviderHOC,
  FolderProviderHOC,
} from "../../HOC&Context/Context";
import Share from "./Share";
import { Link, useParams } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { HeaderProps } from "./Mobileheader";

const Header = (prop: HeaderProps) => {
  let clases =
    "bg-gray-800 hover:bg-gray-700 m-2   text-white font-bold py-2 px-4 rounded";

  const didAnotherUser = useParams().didshare;
  const didAssignment = useParams().assiID|| ''
  const practiceId = useParams().practiceId|| ''

  return (
    <div className=" md:flex gap-2 hidden flex-wrap items-center justify-center  ">
      <Link to="/">
        <IoHomeSharp className="text-gray-500 peer inline-block   text-2xl hover:text-white m-2 " />
      </Link>
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
      {prop.isNotJsInassignment || (
        <button
          onClick={() => {
            prop.setLanguage("javascript");
          }}
          className={` ${clases} ${
            prop.language === "javascript" && "scale-110 border-2 border-white"
          } `}
        >
          JS
        </button>
      )}
      <div className="relative">
        <FaWrench
          onClick={() => prop.setShowConsole(!prop.showConsole)}
          className="text-4xl peer bg-blue-500 p-2 rounded-full text-white"
        />
        {prop.consoleMessages.length !== 0 && (
          <span className="p-2 rounded-full bg-red-600 bg-opacity-90 absolute -right-1 -top-1"></span>
        )}
        <Infoalert> console </Infoalert>
      </div>
      <div
        onClick={() => prop.setIsTailwindProject(!prop.isTailwindProject)}
        className="w-10 h-10 rounded-full "
      >
        <img
          className={`object-cover  ${prop.isTailwindProject || "opacity-40"} `}
          src="/Images/tailwindbright.jpg"
        />
      </div>
      {prop.notSavedJs !== prop.jsCode && !prop.isNotJsInassignment && (
        <button
          onClick={prop.runJsFunc}
          className={`block m-2 bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline `}
        >
          Load Js
        </button>
      )}

      {!didAnotherUser && prop.isAuther && (
        <div className=" flex gap-2 mb-2 flex-wrap items-center justify-center  ">
          {" "}
          <SaveToCodeYogi></SaveToCodeYogi>
          <button
            onClick={() =>
              Share(
                "other",
                prop.setShowAlert,
                practiceId ? practiceId : didAssignment
              )
            }
            className="bg-gradient-to-r flex items-center gap-2 from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md"
          >
            Other
            <FaShareAlt />
          </button>
          <button
            onClick={() =>
              Share(
                "me",
                prop.setShowAlert,
                practiceId ? practiceId : didAssignment
              )
            }
            className="bg-gradient-to-r flex items-center gap-2 from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md"
          >
            You <FaCopy />
          </button>
        </div>
      )}
    </div>
  );
};



Header.defaultProps = {
  live: "html",
};

export default CodeContextHOC(AlertShowerProviderHOC(ConsoleProviderHOC(FolderProviderHOC(Header))));
