// import React from "react";

import { Route, Routes } from "react-router";
import CodeProvider from "./HOC&Context/Provider/CodeProvider";
import AlertProvider from "./HOC&Context/Provider/AlertProvider";
import ConsoleValueProvide from "./HOC&Context/Provider/ConsoleValueProvide";
// import Test from "./Test/Test";
import FolderInfoProvider from "./HOC&Context/Provider/FolderInfoProvider";
import UserAccountProvider from "./HOC&Context/Provider/UserAccountProvider";
import LogIn from "./Acount/LogIn";
import SignUp from "./Acount/SignUp";
import RedirectLogin , { RedirectHomeHOC } from "./Acount/redirect";
import DashBoard from "./Component/DashBoard/DashBoard";
import Assignment from "./Component/Assignments/Assignment";
import Practice from "./Component/Practice/Practice";
import Preview from "./Component/MakeWeb/Website";
import NotFound from "./Component/NotFound";

const App = () => (
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
                <Route path="/web/:codeid" element={<Preview></Preview>} />
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
                />{" "}
                <Route
                  path="*"
                  element={<NotFound></NotFound>}
                />
              </Routes>
            </CodeProvider>
          </ConsoleValueProvide>
        </UserAccountProvider>
      </FolderInfoProvider>
    </AlertProvider>
  </div>
);

export default App;
