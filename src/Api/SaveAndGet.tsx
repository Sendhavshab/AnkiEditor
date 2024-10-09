import { FaFileExport } from 'react-icons/fa'
import { IoMdRefreshCircle } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import Infoalert from '../AlertAndLoader/Alert/Infoalert'
import Loader from '../AlertAndLoader/Loder/Loader'
import { saveToServerApi } from './ApiCall'
import { CodeContextHOC, FolderProviderHOC } from '../HOC&Context/Context'
import { useState } from 'react'
import { toast } from 'react-toastify'

const SaveToCodeYogi = ({ notSavedJs, cssCode, htmlCode, className, isTailwindProject, onlyGet, folderSaved }: CodeWithSet) => {
  const [loading, setLoading] = useState(false)
  const LinkPracticeId = useParams().practiceId || ''

  const navigate = useNavigate()

  const confirmServerSaveClick = () => {
    setLoading(true)
    const code: any = saveToServerApi({
      htmlCode,
      cssCode,
      notSavedJs,
      link: LinkPracticeId,
      tailwind: isTailwindProject,
    })

    code
      .then((r: any) => {
        folderSaved(LinkPracticeId)
        toast.success(r.data)
        setLoading(false)
      })
      .catch((err: any) => {
        setLoading(false)
        toast.error(err?.message)
      })
  }

  const handleReGetClick = () => {
    const confirmOutPut = confirm('this will descard all your change and reImport from server')

    if (!confirmOutPut) return

    localStorage.setItem(LinkPracticeId, 'rerun')

    navigate(`/code/a/${LinkPracticeId}`)
  }

  return (
    <div className={`${className}`}>
      {loading && <Loader></Loader>}

      {onlyGet || (
        <>
          <div className="inline-block cursor-pointer" onClick={confirmServerSaveClick}>
            <div className="relative inline-block">
              <FaFileExport className="text-gray-500 peer inline-block   text-3xl hover:text-white m-2 " />
              <Infoalert>Save to server</Infoalert>
            </div>

            <p className="lg:hidden inline-block  text-white">Save to server</p>
          </div>

          <div onClick={handleReGetClick} className="inline-block cursor-pointer">
            <div className="relative inline-block">
              <IoMdRefreshCircle className="text-gray-500 peer inline-block   text-3xl hover:text-white m-2 " />
              <Infoalert>get code again</Infoalert>
            </div>
            <p className="lg:hidden inline-block  text-white">Refresh</p>
          </div>
        </>
      )}
    </div>
  )
}

export type CodeWithSet = {
  notSavedJs: string
  folderSaved: (folderId: string) => void
  cssCode: string
  htmlCode: string

  className?: string
  onlyGet?: boolean
  isTailwindProject: boolean
}

SaveToCodeYogi.defaultProps = {}

export default CodeContextHOC(FolderProviderHOC(SaveToCodeYogi))
