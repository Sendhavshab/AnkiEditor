import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import Console from "./Header/Console";
import { CodeContextHOC } from "../HOC&Context/Context";
import Header from "./Header/Headerr";
import MobileManu from "./Header/Mobileheader";
import Output from "./Output";
import Shower from "../Shower";
import ColorLoader from "../AlertAndLoader/Loder/ColorLoader";

export type S = {
  editor: "hidden" | "block";
  shower: "hidden" | "block";
};

type G = {
  setHtmlCode: React.Dispatch<React.SetStateAction<string>>;
  setCssCode: React.Dispatch<React.SetStateAction<string>>;
  setJsCode: React.Dispatch<React.SetStateAction<string>>;
  setNotSavedJs: React.Dispatch<React.SetStateAction<string>>;
  htmlCode: string;
  notSavedJs: string;
  cssCode: string;
  jsCode: string;
  showConsole: boolean;
  setLanguage: React.Dispatch<
    React.SetStateAction<"html" | "css" | "javascript">
  >;
  language: "html" | "css" | "javascript";
  setRunJs: React.Dispatch<React.SetStateAction<boolean>>;
  runJs: boolean;
};

const CodeAria: React.FC<G> = ({
  setHtmlCode,
  setCssCode,
  setJsCode,
  htmlCode,
  cssCode,
  setNotSavedJs,
  runJs,
  notSavedJs,

  language,
  setRunJs,
}) => {
  const [Show, setShow] = useState<S>();

  useEffect(() => {
    const deviceWidth = window.innerWidth;

    if (deviceWidth < 1024) {
      setShow({
        editor: "block",
        shower: "hidden",
      });
    }
  }, []);

  const runJsFunc = () => {
    setRunJs(true);
    setJsCode(notSavedJs);
  };

  const handleHtmlChange = (newValue: any) => {
    setRunJs(false);
    setHtmlCode(newValue);
  };

  const handleCssChange = (newValue: any) => {
    setRunJs(false);

    setCssCode(newValue);
  };

  const handleJsChange = (newValue: any) => {
    setRunJs(false);
    setNotSavedJs(newValue);
  };

  return (
    <div className="w-screen h-screen lg:flex  overflow-hidden  bg-black  ">
      <Shower Show={Show} setShow={setShow}></Shower>
      <div className={` lg:w-1/2 w-full ${Show?.editor}`}>
        <Header runJsFunc={runJsFunc} runJs={runJs} />
        <MobileManu runJsFunc={runJsFunc} runJs={runJs} />
        {language === "html" ? (
          <Editor
            height="100vh"
            language="html"
            theme="vs-dark"
            onChange={handleHtmlChange}
            width="100%"
            value={htmlCode}
            loading={<ColorLoader />}
          />
        ) : language === "css" ? (
          <Editor
            height="100vh"
            language="css"
            theme="vs-dark"
            loading={<ColorLoader />}
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
            loading={<ColorLoader />}
            value={notSavedJs}
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
        <Output></Output>
      </div>
      <Console></Console>
    </div>
  );
};

export default CodeContextHOC(CodeAria);
