// import React from "react";

import { Route, Routes } from "react-router";
import CodeByLocalStorage from "./Body/CodeAria";
import Assignment from "./Assignment";
import CodeProvider from "./HOC&Context/Provider/CodeProvider";
import AlertProvider from "./HOC&Context/Provider/AlertProvider";
import ConsoleValueProvide from "./HOC&Context/Provider/ConsoleValueProvide";
// import Test from "./Test/Test";

const App = () => {
  console.log("hello world")
  return (
    <div className="">
      <AlertProvider>
        <ConsoleValueProvide>
          <CodeProvider>
            <Routes>
              <Route index element={<CodeByLocalStorage />} />
              <Route
                path="/assignment/c/:assiID/:didshare?"
                element={<Assignment></Assignment>}
              />
              {/* <Route  path="/a" element={<Test></Test>} /> */}
            </Routes>
          </CodeProvider>
        </ConsoleValueProvide>
      </AlertProvider>
    </div>
  );
};

export default App;
