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
  const [isResizing, setIsResizing] = useState(false);
  const [editorWidth, setEditorWidth] = useState("50%");

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

  const onMouseUp = () => {
    console.log("mouse up");
    setIsResizing(false);
  };

  const onDoubleClick = () => {
    console.log("double clicked");
    setIsResizing(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    console.log("mouse move");
    if (!isResizing) return;

    const newWidth = e.clientX;

    console.log("new width", newWidth);
    setEditorWidth(`${newWidth}px`);
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      className="w-screen h-screen lg:flex  overflow-hidden  bg-black  "
    >
      <Shower Show={Show} setShow={setShow}></Shower>
      <div
        className={` w-full  ${Show?.editor}`}
        style={{ width: window.innerWidth > 1024 ? editorWidth : "100%" }}
      >
        <div className="overflow-hidden">
          <Header runJsFunc={runJsFunc} runJs={runJs} />
        </div>
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
      {window.innerWidth > 1024 && (
        <div
          className={`px-2.5 -mx-2.5  z-10 items-center cursor-col-resize self-stretch hidden md:flex`}
          onMouseDown={onDoubleClick}
        >
          <div
            className={`bg-blue-500 w-2 h-full`}
            style={{ filter: "blur(3px)" }}
          ></div>
        </div>
      )}
      <div
        className={`h-full bg-white ${Show?.shower}`}
        style={{
          width:
            window.innerWidth > 1024
              ? `calc(100% - ${editorWidth} - 4px)`
              : "100%",
        }}
      >
        {/* transparent div on frame */}

        {isResizing && (
          <div className="w-full z-50 h-full bg-transparent absolute top-0 left-0"></div>
        )}
        <Output></Output>
      </div>
      <Console></Console>
    </div>
  );
};

export default CodeContextHOC(ConsoleProviderHOC(CodeAria));
