import React, { useEffect, useState } from "react";
import * as acorn from "acorn";
import { IoMdClose } from "react-icons/io";

  type T = {
    jsCode: string;
    showConsole: boolean;
    setShowConsole: (showConsole: boolean) => void;
  };


const CodeExecutor: React.FC<T> = ({
  jsCode,
  showConsole,
  setShowConsole,
}: T) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const pqrd = acorn.parse(jsCode, { ecmaVersion: 2020, locations: true });
      //  const pqrda = eval(jsCode);

      console.log("error nahi: ", pqrd);
      setError(null);
    } catch (error: any) {
      // If an error occurs, display it to the user
      console.log("error: ", error);
      setError(error.message);
    }
  }, [jsCode]);

  return (
    <div
      className={`bg-gray-950 fixed p-2 text-red-700 font-bold right-0 h-1/2 left-0   border-t-2 border-white rounded-t-3xl transition-transform  ${
        showConsole ? " bottom-0 " : "transform translate-y-1/2 -bottom-full  "
      }`}
    >
      {error && <div>Error: {error}</div>}
      <IoMdClose
        className={`absolute right-2 top-2 hover:text-white text-gray-400 text-2xl`}
        onClick={() => setShowConsole(!showConsole)}
      />
    </div>
  );
};

export default CodeExecutor;