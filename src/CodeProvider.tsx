import React, { useEffect } from "react";

import { useState } from "react";
import { CodeContext } from "./Context";

type P = "html" | "js" | "css";



const CodeProvider: React.FC<F> = ({children}) => {

     const html = localStorage.getItem("html") || "";
     const css = localStorage.getItem("css") || "";
     const js = localStorage.getItem("js") || "";
     const [htmlCode, setHtmlCode] = useState(html);
     const [cssCode, setCssCode] = useState(css);
     const [jsCode, setJsCode] = useState(js);
     const [language, setLanguage] = useState<P>("html");
     const [reloadJs, setReloadJs] = useState(false);
     const [showConsole, setShowConsole] = useState(false); 




  useEffect(() => {
    localStorage.setItem("html", htmlCode);
  }, [htmlCode]);
  useEffect(() => {
    localStorage.setItem("js", jsCode);
  }, [jsCode]);
  useEffect(() => {
    localStorage.setItem("css", cssCode);
  }, [cssCode]);



  return (
    <CodeContext.Provider value={{htmlCode, cssCode, jsCode, setCssCode , setHtmlCode , setJsCode, setLanguage, language, 
        reloadJs , setReloadJs , showConsole, setShowConsole}
     }>
{children}
    </CodeContext.Provider>
  );
};

 type F = {
 children:any
};

CodeProvider.defaultProps = {

};

export default CodeProvider;