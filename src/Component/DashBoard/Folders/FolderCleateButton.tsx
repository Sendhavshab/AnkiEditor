import React, { useRef, useState, useEffect, memo } from "react";
import { GiConfirmed } from "react-icons/gi";
import { FolderProviderHOC } from "../../../HOC&Context/Context";

interface FolderCleateButtonProps {
  createFolder: (folderName: string) => void;
}

const FolderCleateButton: React.FC<FolderCleateButtonProps> = (props) => {
  const [folderCreating, setFolderCreating] = useState(false);
  const [createFolderInputValue, setCreateFolderInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (folderCreating) {
      inputRef.current?.focus();
    }
  }, [folderCreating]);

  const handleCreateFolderClick = () => {
    setFolderCreating(true);
    setCreateFolderInputValue("");
  };

  const newFolderCreate = () => {
    setFolderCreating(false);
    props.createFolder(createFolderInputValue);
  };

  return (
    <div
      onDoubleClick={() => setFolderCreating(false)}
      className="flex items-center "
    >
      <button
        onClick={handleCreateFolderClick}
        className="p-2 m-2 border-2 font-bold  border-white shadow-2xl -skew-x-6 text-zinc-50 rounded-lg bg-blue-400 px-3   "
      >
        Create Folder
      </button>
      {folderCreating && (
        <div className="flex max-w-6xl  flex-grow relative">
          <input
            maxLength={25}
            minLength={1}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                newFolderCreate();
              }
            }}
            ref={inputRef}
            className="flex-grow  border-2 p-1 m-2 rounded-lg "
            value={createFolderInputValue}
            onChange={(e) =>
              setCreateFolderInputValue(e.target.value.replace(/\s+/g, ""))
            }
          />
          <GiConfirmed
            onClick={newFolderCreate}
            className="text-2xl hover:bg-black rounded-full hover:text-white  absolute top-1/4  right-4"
          />
        </div>
      )}
    </div>
  );
};

export default FolderProviderHOC(memo(FolderCleateButton));
