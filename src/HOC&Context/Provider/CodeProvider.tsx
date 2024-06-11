import React, { ReactNode, useEffect } from "react";

import { useState } from "react";
import { CodeContext } from "../Context";
import { GetCode, storeCode } from "./CodeStore";

type P = "html" | "javascript" | "css";
export type SolutionCodeType =
  | {
      html: string;
      css?: string;
      js?: string;
    }
  | undefined;
const CodeProvider: React.FC<F> = ({ children }) => {
  const [codeId, setCodeId] = useState<string>();
  const [isAuther, setIsAuther] = useState(true);
  const [htmlCode, setHtmlCode] = useState("");
  const [notSavedJs, setNotSavedJs] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [isNotJsInassignment, setIsNotJsInassignment] = useState(false);
  const [language, setLanguage] = useState<P>("html");
  const [runJs, setRunJs] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const localTailwind = localStorage.getItem("localTailwind") || "";
  const [isTailwindProject, setIsTailwindProject] = useState(
    localTailwind === "true"
  );
  const p = `/* aap tailwind ka use kar rahe he to kosis kare
 jitna ho sake utna kam css likhe is file me aur agar aapko
  kisi bhi prakar se tailwind me problem aa rahi he
   to https://t.me/+D0obIs02o6s0NzBl group me message kare  */`;

  const cssInfo = isTailwindProject ? p : "";

  const [solution, setSolution] = useState(false);
  const [solutionCode, setSolutionCode] = useState<SolutionCodeType>();

  const [cssCode, setCssCode] = useState(cssInfo);
  useEffect(() => {
    const doesAuther = localStorage.getItem(codeId + "author" + codeId);

    if (doesAuther) {
      setIsAuther(doesAuther === "true");
    }

    if (typeof codeId === "string") {
      const { code } = GetCode(codeId);

      (code?.css || cssCode !== p) && setCssCode(code?.css || "");
      setHtmlCode(code?.html || "");
      setNotSavedJs(code?.js || "");
    }
  }, [codeId]);

  function seeSolution() {
    if (solutionCode) {
      setSolution(false)
      setCssCode(solutionCode.css || "");
      setHtmlCode(solutionCode.html );
      setNotSavedJs(solutionCode.js || "");
    }
  }

  useEffect(() => {
    if (typeof codeId === "string") {
      storeCode(
        {
          css: cssCode,
          html: htmlCode,
          js: notSavedJs,
        },
        codeId
      );
    }
  }, [cssCode, htmlCode, notSavedJs]);

  useEffect(() => {
    localStorage.setItem("localTailwind", isTailwindProject + "");
  }, [isTailwindProject]);

  return (
    <CodeContext.Provider
      value={{
        isTailwindProject,
        setIsTailwindProject,
        htmlCode,
        cssCode,
        jsCode,
        seeSolution,
        setCssCode,
        setHtmlCode,
        setJsCode,
        setSolution,
        setCodeId,
        setLanguage,
        isAuther,
        setIsAuther,
        language,
        solution,
        notSavedJs,
        runJs,
        setRunJs,
        showConsole,
        setShowConsole,
        setNotSavedJs,
        setIsNotJsInassignment,
        setSolutionCode,
        solutionCode,
        isNotJsInassignment,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};

type F = {
  children: ReactNode;
};

CodeProvider.defaultProps = {};

export default CodeProvider;
