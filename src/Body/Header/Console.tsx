

import React from "react";
// import * as acorn from "acorn";
import { IoMdClose } from "react-icons/io";
import { CodeContextHOC, ConsoleProviderHOC } from "../../HOC&Context/Context";
import { AiOutlineClear } from "react-icons/ai";

type T = {
  jsCode: string;
  showConsole: boolean;
  setShowConsole: (showConsole: boolean) => void;
  consoleMessages: { type: string; message: string }[];
  setConsoleMessages: React.Dispatch<React.SetStateAction<string[]>>;
};

const CodeExecutor: React.FC<T> = ({
  showConsole,
  setShowConsole,
  consoleMessages,
  setConsoleMessages,
}: T) => {
  return (
    <div
      className={`bg-gray-950 fixed p-2 overflow-auto  fornt-bold right-0 h-1/2 left-0 border-t-2 border-white rounded-t-3xl transition-transform ${
        showConsole ? " bottom-0 " : "transform translate-y-1/2 -bottom-full "
      }`}
    >
      {consoleMessages.length !== 0 &&
        consoleMessages.map((msg, index) => (
          <div
            key={index}
            className={msg.type === "error" ? "text-red-700" : "text-white"}
          >
            {msg.type.toUpperCase()}: {msg.message}
          </div>
        ))}
      <IoMdClose
        className="absolute right-2 top-2 hover:text-white text-gray-400 text-2xl"
        onClick={() => setShowConsole(!showConsole)}
      />
      <AiOutlineClear
        className="absolute right-9 top-2 hover:text-white text-gray-400 text-2xl"
        onClick={() => setConsoleMessages([])}
      />
    </div>
  );
};

// export default CodeContextHOC(CodeExecutor);
export default CodeContextHOC(ConsoleProviderHOC(CodeExecutor));
