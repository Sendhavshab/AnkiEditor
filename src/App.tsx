import { useState } from "react";
import Header from "./Headerr";
import { Editor } from "@monaco-editor/react";
import Shower from "./Shower";

type P = "html" | "js" | "css";

function App() {
  const html = localStorage.getItem("html") || "";
  const css = localStorage.getItem("css") || "";
  const js = localStorage.getItem("js") || "";
  const [htmlCode, setHtmlCode] = useState(html);
  const [cssCode, setCssCode] = useState(css);
  const [jsCode, setJsCode] = useState(js);
  const [language, setLanguage] = useState<P>("html");
  const [reloadJs, setReloadJs] = useState(false);
  


  
  const reloadJsFunc = () => {
    setReloadJs(true);
  };

  const handleHtmlChange = (newValue: any) => {
    if (reloadJs && jsCode.indexOf("prompt") !== -1) {
      setReloadJs(false);
    }

    localStorage.setItem("html", newValue);
    setHtmlCode(newValue);
  };

  const handleCssChange = (newValue: any) => {
    if (reloadJs && jsCode.indexOf("prompt") !== -1) {
      setReloadJs(false);
    }

    localStorage.setItem("css", newValue);
    setCssCode(newValue);
  };

  const handleJsChange = (newValue: any) => {
    if (reloadJs && jsCode.indexOf("prompt") !== -1) {
      setReloadJs(false);
    }
    localStorage.setItem("js", newValue);
    setJsCode(newValue);
  };

  return (
    <div className="w-screen h-screen flex  overflow-hidden  bg-black  ">
      <div className="w-1/2">
        <Header
          reloadJsFunc={reloadJsFunc}
          reloadJs={reloadJs}
          jsCode={jsCode}
          language={language}
          setLanguage={setLanguage}
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
          />
        )}
      </div>
      <div className="w-1/2 h-full bg-white">
      
        <Shower
          reloadJs={reloadJs}
          jsCode={jsCode}
          cssCode={cssCode}
          htmlCode={htmlCode}
        ></Shower>
      </div>
    </div>
  );
}

export default App;
