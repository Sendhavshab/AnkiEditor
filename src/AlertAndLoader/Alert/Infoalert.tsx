// import React from "react";

const Infoalert = ({children} : P) => {


  // ise jab us karoiske parent ko absolute and aag vale ko peer karna he 

  return (
    <div className="bg-black hidden peer-hover:block  min-w-max text-white font-bold py-1 px-2 border-2 border-white before:-z-10 before:rounded-br-full  before:border-l-2 before:border-white before:border-t-2  absolute  -bottom-12 z-20 right-0 before:bg-black  rounded-3xl before:w-4 text-center  before:h-4 before:absolute before:right-4 before:-top-[9px] before:rotate-45  ">
      {children}
    </div>
  );
};

 type P = {
    children : string ;

};

Infoalert.defaultProps = {

};

export default Infoalert;