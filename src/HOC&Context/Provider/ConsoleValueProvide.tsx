// import React from "react";

import { useState } from "react";
import { ConsoleContext } from "../Context";

const ConsoleValueProvide: React.FC<F> = ( {children} ) => {

      const [consoleMessages, setConsoleMessages] = useState<string[]>([]);



  return (
    <ConsoleContext.Provider value={{ setConsoleMessages, consoleMessages }}>
      {children}
    </ConsoleContext.Provider>
  );
};


ConsoleValueProvide.defaultProps = {

};
type F = {
  children: any;
};

export default ConsoleValueProvide;