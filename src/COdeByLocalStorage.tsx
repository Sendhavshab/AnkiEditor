import React , { useEffect, useState } from "react";
import Header from "./Headerr";
import { Editor } from "@monaco-editor/react";
import Output from "./Output";
import Shower from "./Shower";
import Console from "./Console";
import MobileManu from "./Mobileheader";
import { CodeContextHOC } from "./Context";
// import {  useSearchParams } from "react-router-dom";




export  type S = {
  editor: "hidden" | "block";
  shower: "hidden" | "block";
};

type G = {
  setHtmlCode: React.Dispatch<React.SetStateAction<string>>;
  setCssCode: React.Dispatch<React.SetStateAction<string>>;
  setJsCode: React.Dispatch<React.SetStateAction<string>>;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  showConsole: boolean;
  setLanguage: React.Dispatch<
    React.SetStateAction<"html" | "css" | "javascript">
  >;
  language: "html" | "css" | "javascript";
  setReloadJs: React.Dispatch<React.SetStateAction<boolean>>;
  reloadJs: boolean;
};


const CodeByLocalStorage: React.FC<G> = ({
  
  setHtmlCode,
  setCssCode,
  setJsCode,
  htmlCode,
  cssCode,
  jsCode,
  showConsole,
  reloadJs,
  
  language,
  setReloadJs,
}) => {
  const [Show, setShow] = useState<S>();


  //  const [searchParams , setSearchParams] = useSearchParams();

  useEffect(() => {
    

    const deviceWidth = window.innerWidth;

    if (deviceWidth < 1024) {
      setShow({
        editor: "block",
        shower: "hidden",
      });
    }
  }, []);

  const reloadJsFunc = () => {
    setReloadJs(true);
  };

  const handleHtmlChange = (newValue: any) => {
    if (reloadJs && jsCode.indexOf("prompt") !== -1) {
      setReloadJs(false);
    }

    setHtmlCode(newValue);
  };

  const handleCssChange = (newValue: any) => {
    if (reloadJs && jsCode.indexOf("prompt") !== -1) {
      setReloadJs(false);
    }

    setCssCode(newValue);
  };

  const handleJsChange = (newValue: any) => {
    console.log("promp  ", jsCode.indexOf("prompt"), reloadJs);
    if (reloadJs && jsCode.indexOf("prompt") !== -1) {
      setReloadJs(false);
    }
    setJsCode(newValue);
  };

  console.log("showConsole && " + showConsole);

  return (
    <div className="w-screen h-screen lg:flex  overflow-hidden  bg-black  ">

      <Shower Show={Show} setShow={setShow}></Shower>
      <div className={` lg:w-1/2 w-full ${Show?.editor}`}>
        <Header
          reloadJsFunc={reloadJsFunc}
          reloadJs={reloadJs}
        />
        <MobileManu
          reloadJsFunc={reloadJsFunc}
          reloadJs={reloadJs}
        />
        {language === "html" ? (
          <Editor
            height="100vh"
            language="html"
            theme="vs-dark"
            onChange={handleHtmlChange}
            width="100%"
            value={htmlCode}
          />
        ) : language === "css" ? (
          <Editor
            height="100vh"
            language="css"
            theme="vs-dark"
            onChange={handleCssChange}
            width="100%"
            value={cssCode}
          />
        ) : (
          <Editor
            height="100vh"
            language="javascript"
            theme="vs-dark"
            onChange={handleJsChange}
            width="100%"
            value={jsCode}
            options={{
              renderValidationDecorations: "on",
              acceptSuggestionOnCommitCharacter: true,
              showUnused: true,
              formatOnPaste: true,
              glyphMargin: true,
            }}
          />
        )}
      </div>
      <div className={`lg:w-1/2 w-full h-full bg-white ${Show?.shower}`}>
        <Output reloadJs={reloadJs}></Output>
      </div>
      <Console></Console>
    </div>
  );
};

export default CodeContextHOC(CodeByLocalStorage);
