import  { createContext } from "react";
import HocCreater from "./HocCreater";


interface P {
  jsCode: string;
  setReloadJs: React.Dispatch<React.SetStateAction<boolean>>;
  reloadJs: boolean;
  setShowConsole: (showConsole: boolean) => void;
  showConsole: boolean;
  setHtmlCode: React.Dispatch<React.SetStateAction<string>>;
  setCssCode: React.Dispatch<React.SetStateAction<string>>;
  setJsCode: React.Dispatch<React.SetStateAction<string>>;
  cssCode: string;
  htmlCode: string;
  language: "html" | "js" | "css";
  setLanguage: (language: "html" | "js" | "css") => void;
}

const defaultValues: P = {
  language: "html",
  setLanguage: (_language: "html" | "js" | "css") => {},
  jsCode: "",
  setReloadJs: () => {},
  reloadJs: false,
  setShowConsole: (_showConsole: boolean) => {},
  showConsole: false,
  setHtmlCode: () => {},
  setCssCode: () => {},
  setJsCode: () => {},
  cssCode: "",
  htmlCode: "",
};

 export const CodeContext = createContext<P>(defaultValues);

 export const CodeContextHOC = HocCreater(CodeContext)