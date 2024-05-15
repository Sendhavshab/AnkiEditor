// import React from "react";

import { useParams } from "react-router-dom";
import CodeByLocalStorage from "./COdeByLocalStorage";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ApiCall from "./ApiCall";
import Loader from "./handleError/Loader";
import { CodeContextHOC } from "./HOC&Context/Context";

type P = {
  setHtmlCode: Dispatch<SetStateAction<string>>;
  setCssCode: Dispatch<SetStateAction<string>>;
  setNotSavedJs: Dispatch<SetStateAction<string>>;
};

const Assignment: React.FC<P> = ({
  setHtmlCode,
  setCssCode,
  setNotSavedJs,
}) => {
  const assignmentId = useParams().assiID || "";
  const [loading, setLoading] = useState(false);

  const assignment = useParams().assiID;

  useEffect(() => {
    setLoading(true);
    const code: any = ApiCall("get", assignmentId)
      ?.then((data) => {
        setLoading(false);
        if (data.data.code) {
          return data.data.code;
        }
        return data.data.assignment.initCode;
      })
      .catch(() => {
        setLoading(false);
      });

    code.then((a: any) => {
      setHtmlCode(a.html);
      setCssCode(a.css);
      setNotSavedJs(a.js);
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
