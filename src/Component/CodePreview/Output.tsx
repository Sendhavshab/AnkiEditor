import { Component } from "react";
import { CodeContextHOC, ConsoleProviderHOC } from "../../HOC&Context/Context";
import Preview from "./CodePreview";

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
