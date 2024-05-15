import React, { useEffect } from "react";

import { useState } from "react";
import { CodeContext } from "../Context";

type P = "html" | "js" | "css";

const CodeProvider: React.FC<F> = ({ children }) => {
  const html = localStorage.getItem("html") || "";
  const css = localStorage.getItem("css") || "";
  const js = localStorage.getItem("js") || "";
  const [htmlCode, setHtmlCode] = useState(html);
  const [cssCode, setCssCode] = useState(css);
  const [notSavedJs, setNotSavedJs] = useState(js);
  const [jsCode, setJsCode] = useState("");

  const whichLanguage =
    html.length > css.length
      ? html.length > js.length
        ? "html"
        : "js"
      : css.length < js.length
      ? "js"
      : "css";
  const [language, setLanguage] = useState<P>(whichLanguage);
  const [runJs, setRunJs] = useState(false);
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    localStorage.setItem("html", htmlCode);
  }, [htmlCode]);

  useEffect(() => {
    localStorage.setItem("js", notSavedJs);
  }, [notSavedJs]);

  useEffect(() => {
    localStorage.setItem("css", cssCode);
  }, [cssCode]);

  return (
    <CodeContext.Provider
      value={{
        htmlCode,
        cssCode,
        jsCode,
        setCssCode,
        setHtmlCode,
        setJsCode,
        setLanguage,
        language,
        notSavedJs,
        runJs,
        setRunJs,
        showConsole,
        setShowConsole,
        setNotSavedJs,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};

type F = {
  children: any;
};

CodeProvider.defaultProps = {};

export default CodeProvider;
