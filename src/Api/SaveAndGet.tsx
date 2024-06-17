import { useEffect, useRef, useState } from "react";
import { BiImport } from "react-icons/bi";
import { FaFileExport } from "react-icons/fa";
import { IoMdRefreshCircle } from "react-icons/io";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Infoalert from "../AlertAndLoader/Alert/Infoalert";
import Loader from "../AlertAndLoader/Loder/Loader";
import ApiCall, { saveToServerApi } from "./ApiCall";
import { AlertShowerProviderHOC, CodeContextHOC, FolderProviderHOC } from "../HOC&Context/Context";
import { showAlertType } from "../HOC&Context/Provider/AlertProvider";

const SaveToCodeYogi = ({
  notSavedJs,
  cssCode,
  htmlCode,
  className,
  showAlert,
  setShowAlert,
  isTailwindProject,
  onlyGet,
  folderSaved,
}: CodeWithSet) => {
  const [inputValue, setInputValue] = useState("");
  const [showSave, setShowSave] = useState(0);
  const [loading, setLoading] = useState(false);
  const InputRef = useRef<HTMLInputElement>(null);
  const [assignmentId, setAssignmentId] = useState("");
  const LinkAssignmentId = useParams().assiID || "";
  let LinkPracticeId = useParams().practiceId || "";

  const navigate = useNavigate();

  useEffect(() => {
    if (!!showSave) InputRef.current?.focus();
  }, [showSave]);

  const confirmServerSaveClick = () => {
    setLoading(true);
    const code: any = saveToServerApi({
      htmlCode,
      cssCode,
      notSavedJs,
      link: LinkPracticeId,
      tailwind: isTailwindProject,
    });
    code
      .then((r: any) => {

        folderSaved(LinkPracticeId);

        setShowAlert({
          value: showAlert.value + 1,
          type: "success",
          message: r.data,
        });
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        setShowAlert({
          value: showAlert.value + 1,
          type: "error",
          message: err.message || err.data,
        });
      });
  };

  const confirmCyPostClick = () => {
    let key = "";

    if (!LinkAssignmentId) {
      setShowSave(1);
      if (!inputValue) {
        return;
      } else {
        const match = inputValue.match(/\/c\/([^\/?]+)/);

        if (match) {
          setLoading(true);
          setShowSave(0);

          key = match[1];
        } else {
          setShowAlert({
            value: showAlert.value + 1,
            type: "error",
            message: "can't find link ",
          });
          return;
        }
      }
    } else {
      key = LinkAssignmentId;
    }
    setLoading(true);
    const o = ApiCall("post", key, htmlCode, cssCode, notSavedJs);

    o.then(() => {
      setShowAlert({
        value: showAlert.value + 1,
        type: "success",
        message: " successfully saved your assignmennt to codeyogi ",
      });
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      setShowAlert({
        value: showAlert.value + 1,
        type: "error",
        message: err.message,
      });
    });
  };

  const handleReGetClick = () => {
    const confirmOutPut = confirm(
      "this will descard all your change and reImport from CodeYogi"
    );

    if (confirmOutPut) {
      if (LinkAssignmentId) {
        ~localStorage.setItem(LinkAssignmentId, "rerun");

        navigate(`/assignment/c/${LinkAssignmentId}`);
      } else {
        localStorage.setItem(LinkPracticeId, "rerun");

        navigate(`/code/a/${LinkPracticeId}`);
      }
    }
  };

  const confirmGetClick = () => {
    setShowSave(0);
    const match = inputValue.match(/\/c\/([^\/?]+)/);

    if (match) {
      setAssignmentId(match[1]);
    } else {
      setShowAlert({
        value: showAlert.value + 1,
        type: "error",
        message: "can't find link ",
      });
    }
  };

  if (assignmentId && assignmentId !== LinkAssignmentId) {
    return <Navigate to={`/assignment/c/${assignmentId}`}></Navigate>;
  }
  // if (practiceId && practiceId !== LinkPracticeId) {
  //   return <Navigate to={`/code/a/${assignmentId}`} />;
  // }

  return (
    <div className={`${className}`}>
      {loading && <Loader></Loader>}
      {onlyGet && (
        <button
          onClick={() => setShowSave(2)}
          className="px-4 m-2 py-2 font-bold bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-600 focus:outline-none"
        >
          Do CodeYogi assignment
        </button>
      )}
      {onlyGet || (
        <>
          {!!LinkPracticeId || (
            <div
              className="inline-block cursor-pointer"
              onClick={() => setShowSave(2)}
            >
              <div className="relative inline-block">
                <BiImport className="text-gray-500 peer inline-block   text-3xl hover:text-white m-2 " />
                <Infoalert>Get from CodeYogi</Infoalert>
              </div>
              <p className="lg:hidden inline-block  text-white">Get C. Y.</p>
            </div>
          )}
          <div
            className="inline-block cursor-pointer"
            onClick={() =>
              LinkPracticeId ? confirmServerSaveClick() : confirmCyPostClick()
            }
          >
            <div className="relative inline-block">
              <FaFileExport className="text-gray-500 peer inline-block   text-3xl hover:text-white m-2 " />
              <Infoalert>
                Save to {LinkAssignmentId ? "CodeYogi" : "Server"}
              </Infoalert>
            </div>
            <p className="lg:hidden inline-block  text-white">Save to server</p>
          </div>
          {/* <button
        onClick={() => setShowSave(2)}
        className="px-4 py-2 font-bold bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-600 focus:outline-none"
      >
        Get C.Y.
      </button> */}
          <div
            onClick={handleReGetClick}
            className="inline-block cursor-pointer"
          >
            <div className="relative inline-block">
              <IoMdRefreshCircle className="text-gray-500 peer inline-block   text-3xl hover:text-white m-2 " />
              <Infoalert>get code again</Infoalert>
            </div>
            <p className="lg:hidden inline-block  text-white">Refresh</p>
          </div>
        </>
      )}
      {showSave !== 0 && (
        <div
          onDoubleClick={() => setShowSave(0)}
          className="fixed inset-0 flex  justify-center z-40 items-center bg-black bg-opacity-60"
        >
          <div className="w-fit m-auto flex flex-col z-50 relative  gap-4 px-8 py-5 max-w-screen-lg  bg-white p-8 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">
              link {showSave === 1 ? "to save" : "to get"}
            </h1>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  showSave === 1 ? confirmCyPostClick() : confirmGetClick();
                }
              }}
              ref={InputRef}
              type="text"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              value={inputValue}
              className="border border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none"
              placeholder="Enter your Assi. link"
            />
            <div className="w-full flex justify-between p-3 gap-3">
              {" "}
              <button
                onClick={() => setShowSave(0)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-600 focus:outline-none"
              >
                Cencle
              </button>
              <button
                onClick={showSave === 1 ? confirmCyPostClick : confirmGetClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-600 focus:outline-none"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export type CodeWithSet = {
  notSavedJs: string;
  folderSaved: (folderId: string) => void;
  cssCode: string;
  htmlCode: string;
  className?: string;
  setShowAlert: React.Dispatch<React.SetStateAction<showAlertType>>;
  showAlert: showAlertType;
  onlyGet?: boolean;
  isTailwindProject: boolean;
};

SaveToCodeYogi.defaultProps = {};

export default CodeContextHOC(AlertShowerProviderHOC(FolderProviderHOC(SaveToCodeYogi)));
