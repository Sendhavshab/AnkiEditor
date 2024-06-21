import React, { ReactNode, useEffect, useState } from "react";
import { AlertShowerProviderHOC, FolderProvider } from "../Context";
import { showAlertType } from "./AlertProvider";
import { PushFolders, RemoveFolder } from "../../Api/ApiCall";
import { generateRandomString } from "../../functions/RandomStr";

interface FolderInfoProviderProps {
  children: ReactNode;
  setShowAlert: React.Dispatch<React.SetStateAction<showAlertType>>;
}


export type OneFolderType = { id: string , saved? : boolean , _id? : string}

export type Folder = {
  [key: string]: OneFolderType;
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
    removeFolderData(newFolder[folderName]);

     delete newFolder[folderName];

     setFolders(newFolder);
     uploadFolder(newFolder , "folder deleted successfully");
   }
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

const removeFolderData = (folder: OneFolderType) => {
  const folderId = folder.id;

if(folder.saved){
  
  RemoveFolder(folderId).catch((err: any) => {
    props.setShowAlert({
      value: 1,
      type: "error",
      message: err.data || err.message,
    });
  });
}
  localStorage.removeItem(folderId);
  localStorage.removeItem(folderId + "code");
  localStorage.removeItem(folderId + "auther" + folderId);
};


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
