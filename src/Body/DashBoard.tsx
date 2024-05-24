import React from "react";
import FolderCleateButton from "./FolderCleateButton";
import ShowFolder from "./showFolder";
import SaveToCodeYogi from "./Header/SaveToCodeYogi";
import { UserAccountProviderHOC } from "../HOC&Context/Context";

interface DashBoardProps {
user:string
}

const DashBoard: React.FC<DashBoardProps> = ({ user }) => {
  return (
    <div className="">
      <h1 className="text-3xl myfont text-center m-2 p-2 font-black">
        {user
          ? `Hello ${user} Looks like you're going to achieve something big today!`
          : "Hello user Looks like you're going to achieve something big today!"}
      </h1>

      <SaveToCodeYogi onlyGet={true}></SaveToCodeYogi>

      <FolderCleateButton></FolderCleateButton>
      <ShowFolder></ShowFolder>
    </div>
  );
};

export default UserAccountProviderHOC(DashBoard);
