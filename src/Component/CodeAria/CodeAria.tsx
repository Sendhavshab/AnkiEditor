import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import Console from "./Console";
import { CodeContextHOC, ConsoleProviderHOC } from "../../HOC&Context/Context";
import Header from "../Header/Headerr";
import MobileManu from "../Header/Mobileheader";
import Output from "../CodePreview/Output";
import Shower from "./ShowButton";
import ColorLoader from "../../AlertAndLoader/Loder/ColorLoader";
export type S = {
  editor: "hidden" | "block";
  shower: "hidden" | "block";
};

type G = {
  setHtmlCode: React.Dispatch<React.SetStateAction<string>>;
  setConsoleMessages: React.Dispatch<React.SetStateAction<string[]>>;
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
  setConsoleMessages,
}) => {
  const [Show, setShow] = useState<S>();

  const handleMounting = () => {
    // //  const themeResponse = await fetch("dark_plus_converted.json");
    // //  const themeData = await themeResponse.json();
    //  monaco.editor.defineTheme("vs-code-dark", (theme as any));
  };
  const deviceWidth = window.innerWidth;
  useEffect(() => {
    if (deviceWidth < 1024) {
      setShow({
        editor: "block",
        shower: "hidden",
      });
    }
  }, [deviceWidth]);

  const runJsFunc = () => {
    setConsoleMessages([]);
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
      <div className={` lg:w-1/2 w-full  ${Show?.editor}`}>
        <Header runJsFunc={runJsFunc} runJs={runJs} />
        <MobileManu runJsFunc={runJsFunc} runJs={runJs} />

        <Editor
          beforeMount={handleMounting}
          height="100vh"
          language={language}
          theme="vs-dark"
          onChange={
            language === "html"
              ? handleHtmlChange
              : language === "css"
                ? handleCssChange
                : handleJsChange
          }
          width="100%"
          loading={<ColorLoader />}
          value={
            language === "html"
              ? htmlCode
              : language === "css"
                ? cssCode
                : notSavedJs
          }
          options={{
            lineNumbersMinChars: 1,
            wordWrap: "on",
            renderValidationDecorations: "on",
            acceptSuggestionOnCommitCharacter: true,
            showUnused: true,
            formatOnPaste: true,

            glyphMargin: deviceWidth > 1024,
            padding: {
              top: 8,
              bottom: 5,
            },

            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
      <div className={`lg:w-1/2 w-full h-full bg-white ${Show?.shower}`}>
        <Output></Output>
      </div>
      <Console></Console>
    </div>
  );
};

export default CodeContextHOC(ConsoleProviderHOC(CodeAria));
