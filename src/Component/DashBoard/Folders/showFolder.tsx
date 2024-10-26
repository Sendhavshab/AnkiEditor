import React from 'react'
import { FolderProviderHOC } from '../../../HOC&Context/Context'
import { Folder } from '../../../HOC&Context/Provider/FolderInfoProvider'
import { Link, useNavigate } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Infoalert from '../../../AlertAndLoader/Alert/Infoalert'

interface showFolderProps {
  folders: Folder
  DeleteFolder: (folderName: string) => void
}

const ShowFolder: React.FC<showFolderProps> = (props) => {
  const navigate = useNavigate()

  const handleGoWebClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, foldersName: string) => {
    e.preventDefault()
    const username = localStorage.getItem('username')
    navigate(`/${username}/${foldersName.replace(/\s+/g, '')}`) // ye replace hatana hekuchh time bad abhi folders me space he isliye
  }

  const hoverClass = 'text-black hover:text-gray-500'

  return Object.keys(props.folders).map((foldersName, index) => {
    return (
      <Link key={index} to={`/code/a/${props.folders[foldersName].id}`}>
        <div className=" flex gap-2 items-center p-2 relative bg-indigo-300 bg-opacity-90 text-white font-bold text-xl  m-2 border-4 rounded-xl border-blue-600">
          <img width={40} src="/Images/folder.png" />
          {foldersName}
          <div className="absolute flex gap-2 right-2 top-1/3  ">
            {' '}
            <MdDeleteForever
              onClick={(e) => {
                e.preventDefault()
                props.DeleteFolder(foldersName)
              }}
              className={`${hoverClass}`}
            />
            <button onClick={(e) => handleGoWebClick(e, foldersName)} disabled={!props.folders[foldersName].saved} className="  relative">
              <FaExternalLinkAlt className={`${props.folders[foldersName].saved ? hoverClass : 'text-gray-700 opacity-70'} peer `} />
              <Infoalert mirror>
                {props.folders[foldersName].saved ? 'you can share your code preview to others' : `please save your assignmennt to share`}
              </Infoalert>
            </button>
          </div>
        </div>
      </Link>
    )
  })
}

export default FolderProviderHOC(ShowFolder)
