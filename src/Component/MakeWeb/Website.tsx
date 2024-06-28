import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CodeWordToString } from '../../functions/StrToCode';
import  { UsernameToCode, getFromServerApi } from '../../Api/ApiCall';
import { AlertShowerProviderHOC, CodeContextHOC } from '../../HOC&Context/Context';
import { showAlertType } from '../../HOC&Context/Provider/AlertProvider';
import { PracticeProps } from '../Practice/Practice';
import CodePreview from '../CodePreview/CodePreview';
import { AxiosResponse } from 'axios';

export interface PreviewProps extends PracticeProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAlert: React.Dispatch<React.SetStateAction<showAlertType>>;

  jsCode: string;
  setJsCode: React.Dispatch<React.SetStateAction<string>>;
  isTailwindProject: boolean;
  setIsTailwindProject: React.Dispatch<React.SetStateAction<boolean>>;
}

const Website: React.FC<PreviewProps> = ({
  setLoading,
  setShowAlert,
  setIsTailwindProject,
  setHtmlCode,
  setCssCode,
  setJsCode,


}) => {
  const codeId = CodeWordToString(useParams().codeid || "");
  const username = useParams().username
  const folderName = useParams().foldername
  const navigate = useNavigate();
  useEffect(() => {



    
        setLoading(true);
        if (codeId) {
// bad me ye hatana he aur vah backend me se bhi replace mathod abhi he kyoki bahut logo ne link bana li he 
          ApiCall(getFromServerApi , [codeId]);
          
        } else {
         
          ApiCall(UsernameToCode, [folderName! , username!]);

        }
        
    
  }, []);

  const ApiCall = (
    apiFuction: (...arg : string[]) => Promise<AxiosResponse<any, any>>,
    apiarg : string[]
  ) => {
    const code: any = apiFuction(...apiarg)
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
        setIsTailwindProject(a.tailwind || false);
      }
    });
  };

  return (
    <div className="h-screen w-screen ">
      <CodePreview runJs={true}
      ></CodePreview>
    </div>
  );
};

export default AlertShowerProviderHOC(CodeContextHOC(Website));