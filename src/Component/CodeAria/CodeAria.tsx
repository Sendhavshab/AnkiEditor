import { Editor, Monaco } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import Console from "./Console";
import { CodeContextHOC, ConsoleProviderHOC } from "../../HOC&Context/Context";
import Header from "../Header/Headerr";
import MobileManu from "../Header/Mobileheader";
import Output from "../Preview/Output";
import Shower from "./Shower";
import ColorLoader from "../../AlertAndLoader/Loder/ColorLoader";
import tailwindClasses from "../../../tailwind-classes.json"
// import * as monaco from "monaco-editor";
// import {
//   configureMonacoTailwindcss,
//   tailwindcssData,
// } from "monaco-tailwindcss";
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

  const deviceWidth = window.innerWidth;
  useEffect(() => {
    if (deviceWidth < 1024) {
      setShow({
        editor: "block",
        shower: "hidden",
      });
    }
  }, [deviceWidth]);

  const handleEditorWillMount = (monaco: Monaco) => {
    
    // console.log("tailwind css data " , tailwindcssData)
    // // Set up Tailwind CSS data
    // const b = monaco.languages.css.cssDefaults.setOptions({
    //   data: {
    //     dataProviders: {
    //       tailwindcssData,
    //     },
    //   },
    // });
    // console.log(" b is ", b, monaco);
    // // Configure Tailwind CSS IntelliSense
    // const c = configureMonacoTailwindcss(monaco);
    // console.log(" b c is ", b, c);
      monaco.languages.registerCompletionItemProvider("html", {
        provideCompletionItems: () => {
          return {
            suggestions: tailwindClasses.map((cls) => ({
              label: cls,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: cls,
              range: {
                endColumn: 9000,
                endLineNumber: 9000,
                startColumn : 0 ,
                startLineNumber: 0
              },
            })),
          };
        },
      });
  };

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
          height="100vh"
          language={language}
          theme="vs-dark"
          beforeMount={handleEditorWillMount}
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
            wordWrap: "on",
            lineNumbersMinChars: 1,
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
            contextmenu: false,
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