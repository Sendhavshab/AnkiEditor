// import React from "react";

import { Route, Routes } from "react-router";
import Assignment from "./Assignment";
import CodeProvider from "./HOC&Context/Provider/CodeProvider";
import AlertProvider from "./HOC&Context/Provider/AlertProvider";
import ConsoleValueProvide from "./HOC&Context/Provider/ConsoleValueProvide";
// import Test from "./Test/Test";
import FolderInfoProvider from "./HOC&Context/Provider/FolderInfoProvider";
import Practice from "./Practice";
import DashBoard from "./Body/DashBoard";
import UserAccountProvider from "./HOC&Context/Provider/UserAccountProvider";
import LogIn from "./Acount/LogIn";
import SignUp from "./Acount/SignUp";
import RedirectLogin , { RedirectHomeHOC } from "./Acount/redirect";

const App = () => {
  return (
    <div className="">
      <AlertProvider>
          <FolderInfoProvider>
        <UserAccountProvider>
            <ConsoleValueProvide>
              <CodeProvider>
                <Routes>
                  <Route
                    index
                    element={
                      <RedirectLogin>
                        <DashBoard />
                      </RedirectLogin>
                    }
                  />
                  <Route
                    path="/assignment/c/:assiID/:didshare?"
                    element={<Assignment></Assignment>}
                  />
                  {/* <Route path="/a" element={<Test></Test>} /> */}
                  <Route
                    path="/login"
                    element={
                      <RedirectHomeHOC>
                        <LogIn></LogIn>
                      </RedirectHomeHOC>
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      <RedirectHomeHOC>
                        <SignUp></SignUp>
                      </RedirectHomeHOC>
                    }
                  />
                  <Route
                    path="/code/a/:practiceId/:didshare?"
                    element={<Practice></Practice>}
                  />
                </Routes>
              </CodeProvider>
            </ConsoleValueProvide>
        </UserAccountProvider>
          </FolderInfoProvider>
      </AlertProvider>
    </div>
  );
};

export default App;
