import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import {
  configureMonacoTailwindcss,
  tailwindcssData,
} from "monaco-tailwindcss";

const MyEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      const monacoTailwindcss = configureMonacoTailwindcss(monaco);

      window.MonacoEnvironment = {
        getWorker(moduleId, label) {
          switch (label) {
            case "editorWorkerService":
              return new Worker(
                new URL(
                  "monaco-editor/esm/vs/editor/editor.worker",
                  import.meta.url
                )
              );
            case "css":
            case "less":
            case "scss":
              return new Worker(
                new URL(
                  "monaco-editor/esm/vs/language/css/css.worker",
                  import.meta.url
                )
              );
            case "handlebars":
            case "html":
            case "razor":
              return new Worker(
                new URL(
                  "monaco-editor/esm/vs/language/html/html.worker",
                  import.meta.url
                )
              );
            case "json":
              return new Worker(
                new URL(
                  "monaco-editor/esm/vs/language/json/json.worker",
                  import.meta.url
                )
              );
            case "javascript":
            case "typescript":
              return new Worker(
                new URL(
                  "monaco-editor/esm/vs/language/typescript/ts.worker",
                  import.meta.url
                )
              );
            case "tailwindcss":
              return new Worker(
                new URL(
                  "monaco-tailwindcss/tailwindcss.worker",
                  import.meta.url
                )
              );
            default:
              throw new Error(`Unknown label ${label}`);
          }
        },
      };

      monaco.languages.css.cssDefaults.setOptions({
        data: {
          dataProviders: {
            tailwind: tailwindcssData,
          },
        },
      });

      const htmlModel = monaco.editor.createModel(
        `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <div class="w-6 h-6 text-gray-600 bg-[#ff8888] hover:text-sky-600 ring-gray-900/5"></div>
    <p class="text-ocean-500 bg-lava"></p>
    <button class="btn-blue"></button>
  </body>
</html>
`,
        "html"
      );

      monaco.editor.create(editorRef.current, {
        automaticLayout: true,
        theme: "vs-dark",
        colorDecorators: true,
        model: htmlModel,
      });
    }
  }, []);

  return (
    <div
      id="editor"
      ref={editorRef}
      style={{ width: "800px", height: "600px" }}
    />
  );
};

export default MyEditor;
