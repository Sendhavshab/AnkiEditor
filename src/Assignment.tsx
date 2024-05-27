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
  setCodeId: Dispatch<SetStateAction<string | undefined>>;
  setShowAlert: React.Dispatch<React.SetStateAction<showAlertType>>;
  setIsNotJsInassignment: Dispatch<SetStateAction<boolean>>;
};

const Assignment: React.FC<P> = ({
  setHtmlCode,
  setCssCode,
  setShowAlert,
  setIsNotJsInassignment ,
  setCodeId,
  setNotSavedJs,
}) => {
  let assignmentId = useParams().assiID || "";

   const isEdited = localStorage.getItem(assignmentId);

  const [loading, setLoading] = useState(false);

  const IsAssignmentShared = useParams().didshare;

  useEffect(() => {

    setCodeId(assignmentId)

    if (isEdited === "rerun" || !isEdited) {
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
        localStorage.setItem(assignmentId, "edited");
        setHtmlCode(a.html);
        setCssCode(a.css);
        if (a.js) {
          setNotSavedJs(a.js);
          setIsNotJsInassignment(false);
        } else {
          
          setIsNotJsInassignment(true);
        }
      });
    }
  }, [assignmentId, isEdited]);

  return (
    <div>
      {loading && <Loader></Loader>}

      <CodeByLocalStorage></CodeByLocalStorage>
    </div>
  );
};

export default CodeContextHOC(AlertShowerProviderHOC(Assignment));
