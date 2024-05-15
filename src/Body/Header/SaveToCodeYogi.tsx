import { useEffect, useRef, useState } from "react";
import Loader from "../../AlertAndLoader/Loder/Loader";
import {
  AlertShowerProviderHOC,
  CodeContextHOC,
} from "../../HOC&Context/Context";
import ApiCall from "../../ApiCall";
import { Navigate, useParams } from "react-router-dom";
import { showAlertType } from "../../HOC&Context/Provider/AlertProvider";

const SaveToCodeYogi = ({
  jsCode,
  cssCode,
  htmlCode,
  className,
  showAlert,
  setShowAlert,
}: CodeWithSet) => {
  const [inputValue, setInputValue] = useState("");
  const [showSave, setShowSave] = useState(0);
  const [loading, setLoading] = useState(false);
  const InputRef = useRef<HTMLInputElement>(null);
  const [id, setId] = useState("");

  const LinkId = useParams().assiID;

  useEffect(() => {
    InputRef.current?.focus();
  }, []);

  const confirmPostClick = () => {
    let key = "";

    if (!LinkId) {
      if (!inputValue) {
        setShowSave(1);
        return;
      } else {
        const match = inputValue.match(/\/c\/([^\/?]+)/);

        if (match) {
          setLoading(true);
          setShowSave(0);

          key = match[1];
        }
      }
    } else {
      key = LinkId;
    }
    setLoading(true);
    const o = ApiCall("post", key, htmlCode, cssCode, jsCode);

    o?.then(() => {
      setShowAlert({
        value: showAlert.value + 1,
        type: "success",
        message: " successfully saved your assignmennt to codeyogi",
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

  const confirmGetClick = () => {
    setShowSave(0);
    const match = inputValue.match(/\/c\/([^\/?]+)/);

    if (match) {
      setId(match[1]);
    }
  };

  if (id && id !== LinkId) {
    return <Navigate to={`/assignment/c/${id}`}></Navigate>;
  }

  return (
    <div className={`${className}`}>
      {loading && <Loader></Loader>}

      <button
        onClick={() => confirmPostClick()}
        className="px-4 py-2 font-bold bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-600 focus:outline-none"
      >
        Save C.Y.
      </button>
      <button
        onClick={() => setShowSave(2)}
        className="px-4 py-2 font-bold bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-600 focus:outline-none"
      >
        Get C.Y.
      </button>
      {showSave !== 0 && (
        <div
          // onClick={() => setShowSave(false)}
          className="fixed inset-0 flex  justify-center z-40 items-center bg-black bg-opacity-60"
        >
          <div className="w-fit m-auto flex flex-col z-50 relative  gap-4 px-8 py-5 max-w-screen-lg  bg-white p-8 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">
              link {showSave === 1 ? "to save" : "to get"}
            </h1>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  showSave === 1 ? confirmPostClick() : confirmGetClick();
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
                onClick={showSave === 1 ? confirmPostClick : confirmGetClick}
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
  jsCode: string;
  cssCode: string;
  htmlCode: string;
  className?: string;
  setShowAlert: React.Dispatch<React.SetStateAction<showAlertType>>;
  showAlert: showAlertType;
};

SaveToCodeYogi.defaultProps = {};

export default CodeContextHOC(AlertShowerProviderHOC(SaveToCodeYogi));
