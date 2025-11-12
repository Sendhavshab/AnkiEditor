import React, { useCallback } from "react";
import FolderCleateButton from "./Folders/FolderCleateButton";
import ShowFolder from "./Folders/showFolder";
import SaveToCodeYogi from "../../Api/SaveAndGet";
import {
  FolderProviderHOC,
  UserAccountProviderHOC,
} from "../../HOC&Context/Context";
import { GetFolders } from "../../Api/ApiCall";
import { Folder } from "../../HOC&Context/Provider/FolderInfoProvider";
import { downloadAllProjects } from "../../functions/DownloadAllProjects";

interface DashBoardProps {
  user: string;
  setFolders: React.Dispatch<React.SetStateAction<Folder>>;
  setLoading: (loading: boolean) => void;
  folders: Folder;
  showAlert: { value: number; type: string; message: string };
  setShowAlert: (alert: {
    value: number;

    type: string;
    message: string;
  }) => void;
}

const DashBoard: React.FC<DashBoardProps> = ({
  user,
  setFolders,
  setLoading,
  setShowAlert,
  showAlert,
  folders,
}) => {
  const hadleFolderRefresh = useCallback(() => {
    setLoading(true);
    GetFolders()
      .then((newFolders) => {
        setFolders(newFolders.data);
        setLoading(false);
      })
      .catch((e) => {
        setShowAlert({
          value: showAlert.value + 1,
          type: "error",
          message: e.message || e.data,
        });
        setLoading(false);
      });
  }, [setFolders, setLoading, setShowAlert, showAlert?.value]);

  const handleDownloadAllProjects = useCallback(async () => {
    const folderKeys = Object.keys(folders);
    if (folderKeys.length === 0) {
      setShowAlert({
        value: showAlert.value + 1,
        type: "warning",
        message: "No projects found. Please create a project first.",
      });
      return;
    }

    await downloadAllProjects(folders, setLoading, setShowAlert, showAlert);
  }, [folders, setLoading, setShowAlert, showAlert]);

  const handleDownloadApp = useCallback(() => {
    window.open(
      "https://play.google.com/store/apps/details?id=app.codekings.editor",
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  return (
    <div className="">
      <h1 className="text-3xl myfont text-center m-2 p-2 font-black">
        {user
          ? `Hello ${user} Looks like you're going to achieve something big today!`
          : "Hello user Looks like you're going to achieve something big today!"}
      </h1>

      <div className="flex flex-wrap gap-2 justify-center items-center m-4">
        <button
          onClick={handleDownloadApp}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 font-bold text-white px-4 py-2 rounded-md transition-colors"
        >
          Download CodeKings App
        </button>
        <button
          onClick={handleDownloadAllProjects}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 font-bold text-white px-4 py-2 rounded-md transition-colors"
        >
          Download All Projects
        </button>
        <SaveToCodeYogi onlyGet={true}></SaveToCodeYogi>
        <button
          onClick={hadleFolderRefresh}
          className="bg-black font-bold text-white p-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          REFRESH FOLDERS
        </button>
      </div>
      <FolderCleateButton></FolderCleateButton>
      <ShowFolder></ShowFolder>
    </div>
  );
};

export default UserAccountProviderHOC(FolderProviderHOC(DashBoard));
