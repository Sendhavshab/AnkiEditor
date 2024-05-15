import React, { ReactNode } from "react";
import { MdDangerous } from "react-icons/md";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { IoWarningSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

 export type AlertType = "success" | "error" | "warning" | "info";

interface AlertMapType {
  [key: string]: { backgroundColor: string, Icon: ReactNode };
}

const AlertMap: AlertMapType = {
  success: {
    backgroundColor: "bg-green-600 hover:bg-green-500",
    Icon: <FaCheckCircle className="text-3xl text-white self-center" />,
  },
  error: {
    backgroundColor: "bg-red-600 hover:bg-red-500",
    Icon: <MdDangerous className="text-3xl text-white self-center" />,
  },
  warning: {
    backgroundColor: "bg-yellow-500 hover:bg-yellow-400",
    Icon: <IoWarningSharp className="text-3xl text-white self-center" />,
  },
  info: {
    backgroundColor: "bg-blue-600 hover:bg-blue-500",
    Icon: <FaInfoCircle className="text-3xl text-white self-center" />,
  },
};

interface AlertProps {
  type: AlertType;
  children: ReactNode;
  setAlertShow: (show: boolean) => void;
}

const Alert: React.FC<AlertProps> = ({ type, children, setAlertShow }) => {
  const { backgroundColor, Icon } = AlertMap[type];

  return (
    <div
      className={`opacity-70 overflow-hidden z-50 flex p-2 m-4 min-h-20 relative gap-5 hover:scale-105 transition hover:-translate-x-2 hover:opacity-95 w-64 rounded-md shadow-sm shadow-black ${backgroundColor}`}
    >
      {Icon}
      <div>
        <h1 className="text-white text-xl font-bold">{type}</h1>
        <p className="text-white text-sm opacity-85">{children}</p>
      </div>
      <RxCross2
        onClick={() => {
          setAlertShow(false);
        }}
        className="opacity-60 absolute right-1 top-1 text-xl transition hover:scale-125 hover:opacity-100 cursor-pointer"
      />
    </div>
  );
};

export default Alert;
