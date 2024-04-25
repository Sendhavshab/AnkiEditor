import { useEffect, useState } from "react";
import Header from "./Headerr";
import { Editor } from "@monaco-editor/react";
import Output from "./Output";
import Shower from "./Shower";

type P = "html" | "js" | "css";
export  type S = {
  editor: "hidden" | "block";
  shower: "hidden" | "block";
};
function App() {
  const html = localStorage.getItem("html") || "";
  const css = localStorage.getItem("css") || "";
  const js = localStorage.getItem("js") || "";
  const [htmlCode, setHtmlCode] = useState(html);
  const [cssCode, setCssCode] = useState(css);
  const [jsCode, setJsCode] = useState(js);
  const [language, setLanguage] = useState<P>("html");
  const [reloadJs, setReloadJs] = useState(false);
const [ Show, setShow ] = useState<S>() 


  useEffect(() => {
   
    const deviceWidth = window.innerWidth;
    
    console.log("device width: " + deviceWidth);

    if(deviceWidth < 1024 ){
      setShow({
        editor: "block",
        shower: "hidden",
      });
    }


  } , [])



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
       console.log("promp  ", jsCode.indexOf("prompt")  , reloadJs);
    if (reloadJs && jsCode.indexOf("prompt") !== -1) {
   
      setReloadJs(false);
    }
    localStorage.setItem("js", newValue);
    setJsCode(newValue);
  };

    console.log("device outer: " + Show);

  return (
    <div className="w-screen h-screen lg:flex  overflow-hidden  bg-black  ">
      <Shower Show={Show} setShow={setShow}></Shower>
      <div className={` lg:w-1/2 w-full ${Show?.editor}`}>
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
      <div className={`lg:w-1/2 w-full h-full bg-white ${Show?.shower}`}>
        <Output
          reloadJs={reloadJs}
          jsCode={jsCode}
          cssCode={cssCode}
          htmlCode={htmlCode}
        ></Output>
      </div>
    </div>
  );
}

export default App;
