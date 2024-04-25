

const Header = (prop: P) => {

  

  let clases =
    "bg-gray-800 hover:bg-gray-700 m-2  text-white font-bold py-2 px-4 rounded";


  return (
    <div className=" flex gap-2 items-center justify-center  ">
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
  
};

Header.defaultProps = {
  live: "html",
};

export default Header;
