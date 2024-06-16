import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CodeWordToString } from '../../functions/StrToCode';
import  { getFromServerApi } from '../../Api/ApiCall';
import { AlertShowerProviderHOC, CodeContextHOC } from '../../HOC&Context/Context';
import { showAlertType } from '../../HOC&Context/Provider/AlertProvider';
import CodePreview from '../CodePreview/CodePreview';

interface PreviewProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAlert: React.Dispatch<React.SetStateAction<showAlertType>>;
  isTailwindProject: boolean;
  setIsTailwindProject: React.Dispatch<React.SetStateAction<boolean>>;
}

const Website: React.FC<PreviewProps> = ({
  setLoading,
  setShowAlert,
  setIsTailwindProject,
}) => {
  const codeId = CodeWordToString(useParams().codeid || "");
  const [htmlCode, setHtmlCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    
        setLoading(true);
    const code: any = getFromServerApi(codeId)
      ?.then((data) => {
        setLoading(false);

        return data.data;
      })
      .catch((err) => {
        if (err.response.data === "Code not found") {
          navigate("/notfound");
        }
        setLoading(false);
        setShowAlert({
          value: 1,
          type: "error",
          message: err.response.data || err.message || err.data,
        });
      });

    code.then((a: any) => {
      if (a) {
        setHtmlCode(a.html);
        setCssCode(a.css);
        setJsCode(a.js);
        setIsTailwindProject(a.tailwind || false)
      }
    });
  }, []);

  return (
    <CodePreview
      htmlCode={htmlCode}
      cssCode={cssCode}
      jsCode={jsCode}
    ></CodePreview>
  );
};

export default AlertShowerProviderHOC(CodeContextHOC(Website));