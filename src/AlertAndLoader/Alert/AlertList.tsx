import React from "react";
import AlertShow from "./AlertShow";
import { AlertType } from "./Alert";

const AlertList: React.FC<{
  type: AlertType;
  howMuch?: number;
  className?: string;
  children: string;
}> = ({ type, children, howMuch = 1, className = "" }) => {
  return (
    howMuch > 0 && (
      <div
        className={`absolute overflow-hidden max-h-52 md:max-h-80 lg:max-h-none flex flex-col top-3 right-3 ${className}`}
      >
        {[...Array(howMuch)].map((_, i) => (
          <AlertShow key={i} type={type}>
            {children}
          </AlertShow>
        ))}
      </div>
    )
  );
};

export default AlertList;
