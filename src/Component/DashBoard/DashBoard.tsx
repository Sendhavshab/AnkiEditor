import React from "react";
import FolderCleateButton from "./Folders/FolderCleateButton";
import ShowFolder from "./Folders/showFolder";
import SaveToCodeYogi from "../../Api/SaveAndGet";
import {
  FolderProviderHOC,
  UserAccountProviderHOC,
} from "../../HOC&Context/Context";
import { GetFolders } from "../../Api/ApiCall";
import { Folder } from "../../HOC&Context/Provider/FolderInfoProvider";

interface DashBoardProps {
  user: string;
  setFolders: React.Dispatch<React.SetStateAction<Folder>>;
  setLoading: (loading: boolean) => void;

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
}) => {
  const hadleFolderRefresh = () => {
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
      });
  };


  return (
    <div className="">
      <h1 className="text-3xl myfont text-center m-2 p-2 font-black">
        {user
          ? `Hello ${user} Looks like you're going to achieve something big today!`
          : "Hello user Looks like you're going to achieve something big today!"}
      </h1>

      <SaveToCodeYogi onlyGet={true}></SaveToCodeYogi>
      <button
        onClick={hadleFolderRefresh}
        className="bg-black font-bold text-white p-2 m-2 rounded-md"
      >
        REFRESH FOLDERS
      </button>
      <FolderCleateButton></FolderCleateButton>
      <ShowFolder></ShowFolder>
    </div>
  );
};

export default UserAccountProviderHOC(FolderProviderHOC(DashBoard));
