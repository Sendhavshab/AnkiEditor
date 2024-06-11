import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { loader } from "@monaco-editor/react";

import * as monaco from "monaco-editor";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

// HACK: https://github.com/remcohaszing/monaco-yaml#why-doesnt-it-work-with-vite
import tailwindWorker from "./tailwindcss.worker?worker";

import {
  configureMonacoTailwindcss,
  tailwindcssData,
} from "monaco-tailwindcss";

self.MonacoEnvironment = {
  getWorker(_, label) {
    switch (label) {
      case "css":
      case "less":
      case "scss":
        return new cssWorker();
      case "handlebars":
      case "html":
      case "razor":
        return new htmlWorker();
      case "json":
        return new jsonWorker();
      case "javascript":
      case "typescript":
        return new tsWorker();
      case "tailwindcss":
        return new tailwindWorker();
      default:
        return new editorWorker();
    }
  },
};

monaco.languages.css.cssDefaults.setOptions({
  data: {
    dataProviders: {
      tailwindcssData,
    },
  },
});

configureMonacoTailwindcss(monaco);

loader.config({ monaco });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
