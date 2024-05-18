import { Component } from "react";
import { CodeContextHOC, ConsoleProviderHOC } from "../HOC&Context/Context";




type P = {
  jsCode: string;
  cssCode: string;
  htmlCode: string;
  runJs: boolean;
  setConsoleMessages: React.Dispatch<
    React.SetStateAction<{ type: string; message: string }[]>
  >;
};

class Output extends Component<P> {
  originalConsole: Partial<Console> | any;

  constructor(props: P) {
    super(props);
    this.originalConsole = {};
  }

  componentDidMount(): void {
      window.addEventListener("message", this.handleMessage);
  }
componentWillUnmount(): void {
    window.removeEventListener("message", this.handleMessage);
}

  // componentDidMount() {
   
  //   window.addEventListener("message", this.handleMessage);

  //   const captureMessage = (type: keyof Console, ...args: any[]) => {
  //     const error = new Error();
  //     const stack = error.stack;
  //     let callerLine = "unknown line";
  //     if (stack) {
  //       const stackLines = stack.split("\n");
  //       for (const line of stackLines) {
  //         if (line.includes("at")) {
  //           const callerInfo = line.match(/:(\d+):(\d+)/);
  //           if (callerInfo) {
  //             callerLine = `line ${callerInfo[1]}, col ${callerInfo[2]}`;
  //             break;
  //           }
  //         }
  //       }
  //     }
      
  //     this.props.setConsoleMessages((prev) => [
  //       ...prev,
  //       { type, message: `${args.join(" ")} (at ${callerLine})` },
  //     ]);
  //     if (this.originalConsole[type]) {
  //       this.originalConsole[type]!(...args);
  //     }
  //   };


  
  //   // Capture all console methods
  //   for (const method  in console) {
      
  //     if (typeof console[method]  === "function") {
  //       this.originalConsole[method] =  console[method];
  //       console[method]   = (...args: any[]) =>
  //         captureMessage(method as keyof Console, ...args);
  //     }
  //   }
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("message", this.handleMessage);

  //   // Restore all console methods
  //   for (const method in this.originalConsole) {
  //     if (this.originalConsole[method]) {
  //       console[method] = this.originalConsole[method]!;
  //     }
  //   }
  // }

  handleMessage = (event: MessageEvent) => {
    if (event.data && event.data.type === "console") {
      this.props.setConsoleMessages((prev) => [
        ...prev,
        {
          type: event.data.level,
          message: `${event.data.message}  ${event.data.line}`,
        },
      ]);
    } else if (event.data && event.data.type === "error") {
      this.props.setConsoleMessages((prev) => [
        ...prev,
        {
          type: "error",
          message: `${event.data.message} (at ${event.data.filename}, line ${event.data.lineno  - 66}, col ${event.data.colno})`,
        },
      ]);
    } else if (event.data && event.data.type === "unhandledrejection") {
      this.props.setConsoleMessages((prev) => [
        ...prev,
        {
          type: "unhandledrejection",
          message: `${event.data.message} (at ${event.data.filename}, line ${event.data.lineno}, col ${event.data.colno})`,
        },
      ]);
    }
  };

  render() {
    return (
      <div className="w-full h-full">
        <iframe
          title="output"
          srcDoc={`
            <html>
              <head>
                <style>${this.props.cssCode}</style>
              </head>
              <body>
                <div>${this.props.htmlCode}</div>
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

                  ${this.props.runJs && this.props.jsCode}
                </script>
              </body>
            </html>
          `}
          width="100%"
          height="100%"
          sandbox="allow-scripts allow-modals"
        ></iframe>
      </div>
    );
  }
}

export default CodeContextHOC(ConsoleProviderHOC(Output));


