import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Loader from "./handleError/Loader"
import AlertList from "./handleError/AlertList";






const SaveToCodeYogi = ({
  jsCode,
  cssCode,
  htmlCode,
  setHtmlCode,
  setCssCode,
  setJsCode,
  className,
}: P) => {
  const [inputValue, setInputValue] = useState("");
  const [showSave, setShowSave] = useState(0);
  const [loading, setLoading] = useState(false);
  const InputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    InputRef.current?.focus();
  }, []);

  const confirmPostClick = () => {
    const o = ApiCall("post");

    o?.then(() => {
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      <AlertList howMuch={2} type="error">
        {err.message}
      </AlertList>;
      console.log("error", err);
    });
  };

  const confirmGetClick = () => {
    const code: any = ApiCall("get")
      ?.then((data) => {
        console.table(data);
        setLoading(false);
        return data.data.code;
      })
      .catch((err) => {
        setLoading(false);
        console.log("error" + err.message);
      });

    code.then((a: any) => {
      setHtmlCode(a.html);
      setCssCode(a.css);
      setJsCode(a.js);
    });
  };
  const ApiCall = (mathod: "get" | "post") => {
    setLoading(true);
    setShowSave(0);

    if (
      inputValue.includes("https://editor.codeyogi.io/c/") &&
      inputValue.charAt(0) === "h"
    ) {
      const match = inputValue.match(/\/c\/([^\/?]+)/);

      if (match) {
        const id = match[1];

        return axios[mathod](
          "https://8o1qvwk6u4.execute-api.us-east-1.amazonaws.com/assignments/" +
            id,
          {
            code: {
              html: htmlCode,
              css: cssCode,
              js: jsCode,
            },
          }
        );
      } else {
        console.log("match failed", match);
      setLoading(false);

      }
    } else {
      console.log("not found", inputValue);
      setLoading(false);

    }
  };

  return (
    <div className={`${className}`}>
      {loading && <Loader></Loader>}
      <button
        onClick={() => setShowSave(1)}
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
            <h1 className="text-2xl font-bold mb-4 text-center">paste link</h1>
            <input
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     confirmPostClick();
              //   }
              // }}
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

type P = {
  jsCode: String;
  cssCode: String;
  htmlCode: String;
  className?: string ;
  setHtmlCode: Dispatch<SetStateAction<string>>;
  setCssCode: Dispatch<SetStateAction<string>>;
  setJsCode: Dispatch<SetStateAction<string>>;
};

SaveToCodeYogi.defaultProps = {};

export default SaveToCodeYogi;
