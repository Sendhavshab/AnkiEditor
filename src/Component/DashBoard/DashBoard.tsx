import React from 'react'
import FolderCleateButton from './Folders/FolderCleateButton'
import ShowFolder from './Folders/showFolder'
import SaveToCodeYogi from '../../Api/SaveAndGet'
import { FolderProviderHOC, UserAccountProviderHOC } from '../../HOC&Context/Context'
import { GetFolders } from '../../Api/ApiCall'
import { Folder } from '../../HOC&Context/Provider/FolderInfoProvider'
import { toast } from 'react-toastify'

interface DashBoardProps {
  user: string
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>
  setLoading: (loading: boolean) => void
}

const DashBoard: React.FC<DashBoardProps> = ({ user, setFolders, setLoading }) => {
  console.log('Dashboard')
  const handleFolderRefresh = () => {
    setLoading(true)

    GetFolders()
      .then((newFolders) => {
        setFolders(newFolders.data)
        setLoading(false)
        toast.success('Folders refreshed successfully')
      })
      .catch((e) => {
        toast.error(`Error refreshing folders: ${e.message || e.data}`)
        setLoading(false)
      })
  }

  return (
    <div className="">
      <h1 className="text-3xl myfont text-center m-2 p-2 font-black">
        Hello {user ? user : 'user'} Looks like you're going to achieve something big today!
      </h1>

      <SaveToCodeYogi onlyGet={true}></SaveToCodeYogi>

      <button onClick={handleFolderRefresh} className="bg-black font-bold text-white p-2 m-2 rounded-md">
        REFRESH FOLDERS
      </button>

      <FolderCleateButton></FolderCleateButton>

      <ShowFolder></ShowFolder>
    </div>
  )
}

export default UserAccountProviderHOC(FolderProviderHOC(DashBoard))
