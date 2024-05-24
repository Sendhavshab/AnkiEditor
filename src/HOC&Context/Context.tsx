import { createContext } from "react";
import HocCreater from "./HocCreater";

interface P {
  jsCode: string;
  setRunJs: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTailwindProject: React.Dispatch<React.SetStateAction<boolean>>;
  runJs: boolean;
  isTailwindProject: boolean;
  setShowConsole: (showConsole: boolean) => void;
  showConsole: boolean;
  isAuther: boolean;
  setHtmlCode: React.Dispatch<React.SetStateAction<string>>;
  setCssCode: React.Dispatch<React.SetStateAction<string>>;
  setJsCode: React.Dispatch<React.SetStateAction<string>>;
  notSavedJs: string;
  setNotSavedJs: React.Dispatch<React.SetStateAction<string>>;
  cssCode: string;
  setCodeId: React.Dispatch<React.SetStateAction<string | undefined>>;
  htmlCode: string;
  language: "html" | "javascript" | "css";
  setLanguage: (language: "html" | "javascript" | "css") => void;
  setIsNotJsInassignment: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuther: React.Dispatch<React.SetStateAction<boolean>>;
  isNotJsInassignment: boolean;
}

const defaultValues: P = {
  isTailwindProject: false,
  setIsTailwindProject: () => {},
  notSavedJs: "",
  setNotSavedJs: () => {},
  language: "html",
  setLanguage: (_language: "html" | "javascript" | "css") => {},
  jsCode: "",
  setRunJs: () => {},
  runJs: false,
  setShowConsole: (_showConsole: boolean) => {},
  showConsole: false,
  setHtmlCode: () => {},
  setCssCode: () => {},
  setJsCode: () => {},
  setCodeId: () => {},
  setIsAuther: () => {},
  cssCode: "",
  isAuther: true,
  htmlCode: "",
  setIsNotJsInassignment: () => {},
  isNotJsInassignment: false,
};

export const CodeContext = createContext<P>(defaultValues);

export const CodeContextHOC = HocCreater(CodeContext);


export const AlertShowerContext = createContext({});

export const AlertShowerProviderHOC = HocCreater(AlertShowerContext);

export const ConsoleContext = createContext({});

export const ConsoleProviderHOC = HocCreater(ConsoleContext);

export const FolderProvider = createContext({});

export const FolderProviderHOC = HocCreater(FolderProvider);
export const UserAccountProvider = createContext({});

export const UserAccountProviderHOC = HocCreater(UserAccountProvider);