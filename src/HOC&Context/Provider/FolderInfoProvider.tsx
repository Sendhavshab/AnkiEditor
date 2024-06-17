import React, { ReactNode, useEffect, useState } from "react";
import { AlertShowerProviderHOC, FolderProvider } from "../Context";
import { showAlertType } from "./AlertProvider";
import { PushFolders } from "../../Api/ApiCall";
import { generateRandomString } from "../../functions/RandomStr";

interface FolderInfoProviderProps {
  children: ReactNode;
  setShowAlert: React.Dispatch<React.SetStateAction<showAlertType>>;
}




export type Folder = {
  [key: string]: { id: string , saved? : boolean , _id? : string};
};

const FolderInfoProvider: React.FC<FolderInfoProviderProps> = (props) => {
  const folderLocalst = JSON.parse(localStorage.getItem("folders") || "{}");


          // localStorage.setItem(practiceId + "auther" + practiceId, a.author);

  const [folders, setFolders] = useState<Folder>(folderLocalst);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);


  const uploadFolder = (newFolder : Folder , message? : string) => {

     PushFolders(newFolder)
       .then((m : any) => {
         props.setShowAlert({
           value: 1,
           type: "success",
           message: message || m.message || m.data ,
         });
       })
       .catch((e) => {
         props.setShowAlert({
           value: 1,
           type: "error",
           message: e.message || e.data,
         });
       });
  }



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
      [folderName]: { id: folderId , saved: false },
    });

   uploadFolder({
     ...folders,
     [folderName]: { id: folderId, saved: false },
   });

  };

 const DeleteFolder = (folderName: string) => {
   const confirmMsg = confirm(
     `Are you sure you want to delete ${folderName} folder?`
   );

   const newFolder = { ...folders };
   if (confirmMsg) {

     delete newFolder[folderName];

     setFolders(newFolder);
   }
   uploadFolder(newFolder , "folder deleted successfully");
 };

 const findFolderById = (id: string) => {

  return Object.keys(folders).find((folderName )  => {

   return  folders[folderName].id  === id

   })

 }

 const folderSaved = (folderId: string ) => {
    
    const savedFolder = findFolderById(folderId);

    const newFolders = JSON.parse(JSON.stringify(folders))
    newFolders[savedFolder as string].saved = true
    setFolders(newFolders)
    uploadFolder(newFolders, "You can share this folder with others😃")
 
 }



  return (
    <FolderProvider.Provider
      value={{
        createFolder,
        folderSaved,
        folders,
        DeleteFolder,
        findFolderById,
        setFolders,
      }}
    >
      {props.children}
    </FolderProvider.Provider>
  );
};

export default AlertShowerProviderHOC(FolderInfoProvider);
