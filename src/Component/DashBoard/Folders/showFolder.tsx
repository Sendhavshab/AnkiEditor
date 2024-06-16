import React from "react";
import { FolderProviderHOC } from "../../../HOC&Context/Context";
import { Folder } from "../../../HOC&Context/Provider/FolderInfoProvider";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { StringToCodeWord } from "../../../functions/StrToCode";

interface showFolderProps {
  folders: Folder;
  DeleteFolder: (folderName: string) => void;
}

const showFolder: React.FC<showFolderProps> = (props) => {

const navigate = useNavigate();
  const handleGoWebClick = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    foldersName: string
  ) => {
    e.preventDefault();
    const url = StringToCodeWord(props.folders[foldersName].id);

navigate(`/web/${url}`)
  };
const hoverClass = "text-black hover:text-gray-500";

  return Object.keys(props.folders).map((foldersName, index) => {
    return (
      <Link key={index} to={`/code/a/${props.folders[foldersName].id}`}>
        <div className=" flex gap-2 items-center p-2 relative bg-indigo-300 bg-opacity-90 text-white font-bold text-xl  m-2 border-4 rounded-xl border-blue-600">
          <img width={40} src="/Images/folder.png" />
          {foldersName}
          <div className="absolute flex gap-2 right-2 top-1/3  ">
            {" "}
            <MdDeleteForever
              onClick={(e) => {
                e.preventDefault();
                props.DeleteFolder(foldersName);
              }}
              className={`${hoverClass}`}
            />
            <FaExternalLinkAlt
              className={`${hoverClass}`}
              onClick={(e) => handleGoWebClick(e, foldersName)}
            />
          </div>
        </div>
      </Link>
    );
  });
};

export default FolderProviderHOC(showFolder);
