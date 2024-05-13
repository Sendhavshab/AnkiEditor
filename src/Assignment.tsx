// import React from "react";

import { useParams } from "react-router-dom";
import CodeByLocalStorage from "./COdeByLocalStorage";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ApiCall from "./ApiCall";
import Loader from "./handleError/Loader";
import { CodeContextHOC } from "./Context";

type P = {
  setHtmlCode: Dispatch<SetStateAction<string>>;
  setCssCode: Dispatch<SetStateAction<string>>;
  setJsCode: Dispatch<SetStateAction<string>>;
};


const Assignment: React.FC<P> = ({ setHtmlCode, setCssCode, setJsCode }) => {
  const assignmentId = useParams().assiID || "";
  const [loading, setLoading] = useState(false);


  const assignment = useParams().assiID


  useEffect(() => {
    console.log("useeffects", assignmentId);
    setLoading(true);
    const code: any = ApiCall("get", assignmentId)
      ?.then((data) => {
        console.log(data.data);
        setLoading(false);
        if (data.data.code) {
          return data.data.code;
        }
        return data.data.assignment.initCode;
      })
      .catch((err) => {
        setLoading(false);
        console.log("error" + err.message);
      });

    code.then((a: any) => {
      console.table("code", a);
      setHtmlCode(a.html);
      setCssCode(a.css);
      setJsCode(a.js);
    });
  }, [assignment]);

  return (
    <div>
      {loading && <Loader></Loader>}

      <CodeByLocalStorage></CodeByLocalStorage>
    </div>
  );
};

export default CodeContextHOC(Assignment);
