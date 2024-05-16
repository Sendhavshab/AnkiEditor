// import React from "react";

import { useParams } from "react-router-dom";
import CodeByLocalStorage from "./Body/CodeAria";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ApiCall from "./ApiCall";
import Loader from "./AlertAndLoader/Loder/Loader";
import { AlertShowerProviderHOC, CodeContextHOC } from "./HOC&Context/Context";
import { CodeWordToString } from "./StrToCode";
import { showAlertType } from "./HOC&Context/Provider/AlertProvider";

type P = {
  setHtmlCode: Dispatch<SetStateAction<string>>;
  setCssCode: Dispatch<SetStateAction<string>>;
  setNotSavedJs: Dispatch<SetStateAction<string>>;
  setShowAlert: React.Dispatch<React.SetStateAction<showAlertType>>;
};

const Assignment: React.FC<P> = ({
  setHtmlCode,
  setCssCode,
  setShowAlert,

  setNotSavedJs,
}) => {
  let assignmentId = useParams().assiID || "";
  const [loading, setLoading] = useState(false);

  const IsAssignmentShared = useParams().didshare;

  useEffect(() => {
    setLoading(true);

    if (IsAssignmentShared) {
      assignmentId = CodeWordToString(assignmentId);
    }
    const code: any = ApiCall("get", assignmentId)
      ?.then((data) => {
        setLoading(false);
        if (data.data.code) {
          return data.data.code;
        }
        return data.data.assignment.initCode;
      })
      .catch((err) => {
        setLoading(false);
        setShowAlert({
          value: 1,
          type: "error",
          message: err.message,
        });
      });

    code.then((a: any) => {
      setHtmlCode(a.html);
      setCssCode(a.css);
      setNotSavedJs(a.js);
    });
  }, [assignmentId]);

  return (
    <div>
      {loading && <Loader></Loader>}

      <CodeByLocalStorage></CodeByLocalStorage>
    </div>
  );
};

export default CodeContextHOC(AlertShowerProviderHOC(Assignment));
