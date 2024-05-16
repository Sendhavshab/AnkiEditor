// import React from "react";

import { Route, Routes } from "react-router";
import CodeByLocalStorage from "./Body/CodeAria";
import Assignment from "./Assignment";
import CodeProvider from "./HOC&Context/Provider/CodeProvider";
import AlertProvider from "./HOC&Context/Provider/AlertProvider";
// import Test from "./Test/Test";

const App = () => {
  return (
    <div className="">
      <AlertProvider>
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
      </AlertProvider>
    </div>
  );
};

export default App;
