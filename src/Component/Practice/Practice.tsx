import {  useParams } from "react-router-dom";
import CodeByLocalStorage from "../CodeAria/CodeAria";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getFromServerApi } from "../../Api/ApiCall";
import Loader from "../../AlertAndLoader/Loder/Loader";
import {
  AlertShowerProviderHOC,
  CodeContextHOC,
  FolderProviderHOC,
  UserAccountProviderHOC,
} from "../../HOC&Context/Context";
import { showAlertType } from "../../HOC&Context/Provider/AlertProvider";
import { CodeWordToString } from "../../functions/StrToCode";

type P = {
  setHtmlCode: Dispatch<SetStateAction<string>>;
  setCssCode: Dispatch<SetStateAction<string>>;
  setNotSavedJs: Dispatch<SetStateAction<string>>;
  setCodeId: Dispatch<SetStateAction<string | undefined>>;
  setShowAlert: React.Dispatch<React.SetStateAction<showAlertType>>;
  setIsNotJsInassignment: Dispatch<SetStateAction<boolean>>;
  setIsTailwindProject: Dispatch<SetStateAction<boolean>>;
  setIsAuther: React.Dispatch<React.SetStateAction<boolean>>;
  findFolderById: (id: string) => void;
  htmlCode: string;
  cssCode: string;
  token: string;
  notSavedJs: string;
};

const Practice: React.FC<P> = ({
  setHtmlCode,
  setCssCode,
  setShowAlert,
  setCodeId,
  setNotSavedJs,
  setIsAuther,
  
  setIsTailwindProject,
}) => {
  let practiceId = useParams().practiceId || "";

  const isEdited = localStorage.getItem(practiceId);

  const [loading, setLoading] = useState(false);
  const IsCodeShared = useParams().didshare;
  const isNewFolder = localStorage.getItem("folder" + practiceId);

  useEffect(() => {
    setCodeId(practiceId);

    if (!isNewFolder) {
      if (isEdited === "rerun" || !isEdited) {
        setLoading(true);

        if (IsCodeShared) {
          practiceId = CodeWordToString(practiceId);
        }
        const code: any = getFromServerApi(practiceId)
          ?.then((data) => {
            setLoading(false);

            if (data.data === "Code not found") {
              setShowAlert({
                value: 1,
                type: "warning",
                message: "Code not found",
              });
              return;
            }
            return data.data;
          })
          .catch((err) => {
            setLoading(false);
            setShowAlert({
              value: 1,
              type: "error",
              message: err.message || err.data,
            });
          });

        code.then((a: any) => {
          !IsCodeShared && localStorage.setItem(practiceId, "edited");
          if (a) {
            localStorage.setItem(practiceId + "author" + practiceId, a.author);
            setIsAuther(a.author);
            setHtmlCode(a.html);
            setCssCode(a.css);
            setNotSavedJs(a.js);
            setIsTailwindProject(a.tailwind || false)
          }
        });
      }
    } else {
      localStorage.removeItem("folder" + practiceId);
    }
  }, [practiceId, isEdited]);

 

  return (
    <div>
      {loading && <Loader></Loader>}

      <CodeByLocalStorage></CodeByLocalStorage>
    </div>
  );
};

export default CodeContextHOC(
  AlertShowerProviderHOC(FolderProviderHOC(UserAccountProviderHOC(Practice)))
);
