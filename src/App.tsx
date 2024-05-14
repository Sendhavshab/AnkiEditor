// import React from "react";

import { Route, Routes } from "react-router";
import CodeByLocalStorage from "./COdeByLocalStorage";
import Assignment from "./Assignment";
import CodeProvider from "./CodeProvider";
// import Test from "./Test";

const App = () => {



  return (
    <div className="">
      <CodeProvider>
      <Routes>
        <Route index element={<CodeByLocalStorage />} />
        <Route  path="/assignment/c/:assiID/" element={<Assignment></Assignment>} />
        {/* <Route  path="/a" element={<Test></Test>} /> */}
      </Routes>
      </CodeProvider>
    </div>
  );
};



export default App;