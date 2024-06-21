import React from "react";
import { CodeContextHOC, ConsoleProviderHOC } from "../../HOC&Context/Context";

type P = {
  jsCode: string;
  cssCode: string;
  htmlCode: string;
  runJs: boolean;
  isTailwindProject: boolean;
  setConsoleMessages: React.Dispatch<
    React.SetStateAction<{ type: string; message: string }[]>
  >;
};

const CodePreview: React.FC<P> = (props) => {
  const tailwindScript = props.isTailwindProject
    ? '<script src="https://cdn.tailwindcss.com"></script>'
    : "";

  return (
    <iframe
      title="output"
      srcDoc={`
        <html>
          <head>
            <style>${props.cssCode}</style>
            ${tailwindScript}
          </head>
          <body>
          
            <div>  ${props.htmlCode}</div>
            <script>
              (function() {
                const captureMessage = (type, ...args) => {
                  const error = new Error();
                  const stack = error.stack;
                  let callerLine = "";
                  if (stack) {
                    const stackLines = stack.split("\\n");
                    for (const line of stackLines) {
                      if (line.includes("<anonymous>") || line.includes("eval at")) {
                        const callerInfo = line.match(/:(\\d+):(\\d+)/);
                        if (callerInfo) {
                          callerLine = \`line \${callerInfo[1]}, col \${callerInfo[2]}\`;
                          break;
                        }
                      }
                    }
                  }
                  window.parent.postMessage({
                    type: "console",
                    level: type,
                    message: args.join(" "),
                    line: callerLine
                  }, "*");
                };

                const originalConsole = {
                  log: console.log,
                  warn: console.warn,
                  error: console.error
                };

                console.log = (...args) => captureMessage("log", ...args);
                console.warn = (...args) => captureMessage("warn", ...args);
                console.error = (...args) => captureMessage("error", ...args);

                window.addEventListener('error', function(event) {
                  window.parent.postMessage({
                      type: "error",
                    message: event.message,
                    filename: event.filename,
                    lineno: event.lineno,
                    colno: event.colno
                  }, "*");
                });

                window.addEventListener('unhandledrejection', function(event) {
                  window.parent.postMessage({
                    type: "unhandledrejection",
                    message: event.reason,
                    filename: event.filename || "unknown",
                    lineno: event.lineno || 0,
                    colno: event.colno || 0
                  }, "*");
                });
              })();

              ${props.runJs ? props.jsCode : ""}
            </script>
          </body>
        </html>
      `}
      width="100%"
      height="100%"
      sandbox="allow-scripts allow-modals"
    ></iframe>
  );
};

export default CodeContextHOC(ConsoleProviderHOC(CodePreview));
