import React from "react";

interface InfoAlertProps {
  children: React.ReactNode;
  mirror?: boolean;
  contentRight?: boolean;
}

const InfoAlert: React.FC<InfoAlertProps> = ({ children, mirror, contentRight }) => {
  // Note: Ensure the parent has position relative and the element with this component is wrapped in a div if necessary

  let sideClass = "before:right-4 right-0";
  let classes = "before:rounded-br-full before:border-l-2 before:border-t-2 before:-top-[9px] -bottom-12";

  if (mirror) {
    classes = "before:rounded-tl-full before:border-r-2 before:border-b-2 before:-bottom-[9px] -top-12";
  }

  if (contentRight) {
    sideClass = "before:left-4 left-0";
  }

  return (
    <div
      className={`dark:bg-black bg-white text-black hidden peer-hover:block hover:block min-w-max dark:text-white font-bold py-1
      px-2 border-2 dark:border-white border-black before:-z-10 before:dark:border-white before:border-black
      absolute z-50 before:dark:bg-black before:bg-white rounded-3xl before:w-4 text-center before:h-4
      before:absolute before:rotate-45 ${classes} ${sideClass}`}
    >
      {children}
    </div>
  );
};

export default InfoAlert;
