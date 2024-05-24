import React, { ReactNode, useEffect, useState } from "react";
import { AlertShowerProviderHOC, FolderProvider } from "../Context";
import { generateRandomString } from "../../Body/RandomStr";
import { showAlertType } from "./AlertProvider";

interface FolderInfoProviderProps {
  children: ReactNode;
  setShowAlert: React.Dispatch<React.SetStateAction<showAlertType>>;
}




export type Folder = {
  [key: string]: { [key: string]: string };
};

const FolderInfoProvider: React.FC<FolderInfoProviderProps> = (props) => {
  const folderLocalst = JSON.parse(localStorage.getItem("folders") || "{}");


          // localStorage.setItem(practiceId + "auther" + practiceId, a.author);

  const [folders, setFolders] = useState<Folder>(folderLocalst);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  const createFolder = (folderName: string) => {
    folderName = folderName.trim();
    if (folders[folderName]) {
      props.setShowAlert({
        value: 1,
        type: "error",
        message: "folder already exist",
      });
      return;
    }
      if (folderName !== '0' && +folderName === 0) {
       
        return;
      }
     const folderId = generateRandomString(19)

   localStorage.setItem("folder" + folderId, "new")
    setFolders({
      ...folders,
      [folderName]: { id: folderId },
    });
  };

 const DeleteFolder = (folderName: string) => {
   const confirmMsg = confirm(
     `Are you sure you want to delete ${folderName} folder?`
   );

   if (confirmMsg) {
     const newFolder = { ...folders };

     delete newFolder[folderName];

     setFolders(newFolder);
   }
 };

 const findFolderById = (id: string) => {

   Object.keys(folders).find((folderName )  => {

   return  folders[folderName].id  === id

   })

 }



  return (
    <FolderProvider.Provider
      value={{ createFolder, folders, DeleteFolder, findFolderById }}
    >
      {props.children}
    </FolderProvider.Provider>
  );
};

export default AlertShowerProviderHOC(FolderInfoProvider);
