import React from 'react';
import { FolderProviderHOC } from '../HOC&Context/Context';
import { Folder } from '../HOC&Context/Provider/FolderInfoProvider';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';

interface showFolderProps {
  folders: Folder;
  DeleteFolder: (folderName: string) => void;
}

const showFolder: React.FC<showFolderProps> = (props) => {


 

  return (
    Object.keys(props.folders).map((foldersName , index) => {
        return (
          <Link key={index} to={`/code/a/${props.folders[foldersName].id}`}>
            <div className=" flex gap-2 items-center p-2 relative bg-indigo-300 bg-opacity-90 text-white font-bold text-xl  m-2 border-4 rounded-xl border-blue-600">
              <img width={40} src="/Images/folder.png" />
              {foldersName}
              {/* <Link to="/"> */}
                <MdDeleteForever onClick={(e) => { e.preventDefault() ;   props.DeleteFolder(foldersName);}} className="absolute right-2 top-1/3 text-black hover:text-gray-500" />
              {/* </Link> */}
            </div>
          </Link>
        );
    } )
  );
};

export default FolderProviderHOC(showFolder);