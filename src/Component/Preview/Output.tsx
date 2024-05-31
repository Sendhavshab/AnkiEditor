import { Component } from "react";
import { CodeContextHOC, ConsoleProviderHOC } from "../../HOC&Context/Context";
import Preview from "./Preview";

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
          message: `${event.data.message} (at ${event.data.filename}, line ${
            event.data.lineno - 65
          }, col ${event.data.colno})`,
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
        <Preview />
      </div>
    );
  }
}

export default CodeContextHOC(ConsoleProviderHOC(Output));
