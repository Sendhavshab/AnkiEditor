import  { memo } from "react";
import { ImSpinner6 } from "react-icons/im";

function Loader(){
 return (
   <div className=" flex cursor-progress z-40 fixed  bg-black bg-opacity-40 inset-0 flex-col items-center h-screen justify-center">
   
     <div className="w-screen  flex items-center justify-center">
       <ImSpinner6  className="animate-spin text-white h-6 w-6" />
     </div>
   </div>
 );
}

export default memo(Loader);