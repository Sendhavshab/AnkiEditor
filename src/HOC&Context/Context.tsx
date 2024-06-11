import { createContext } from "react";
import HocCreater from "./HocCreater";
import { SolutionCodeType } from "./Provider/CodeProvider";



interface P {
  jsCode: string;
  solution: boolean;
  setRunJs: React.Dispatch<React.SetStateAction<boolean>>;
  setSolutionCode: React.Dispatch<React.SetStateAction<SolutionCodeType>>;
  setIsTailwindProject: React.Dispatch<React.SetStateAction<boolean>>;
  setSolution: React.Dispatch<React.SetStateAction<boolean>>;
  runJs: boolean;
  isTailwindProject: boolean;
  setShowConsole: (showConsole: boolean) => void;
  showConsole: boolean;
  solutionCode: SolutionCodeType;
  seeSolution: () => void;
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
  solutionCode: undefined,
  setSolutionCode: () => {},
  setIsTailwindProject: () => {},
  notSavedJs: "",
  solution: false,
  setNotSavedJs: () => {},
  seeSolution: () => {},
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
  setSolution: () => {},
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