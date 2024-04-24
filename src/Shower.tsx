import { FaEye } from "react-icons/fa";
import { S } from "./App";


const Shower = (prop : P) => {

const showCode = () => {
  if (prop.Show?.editor === "block") {
    prop.setShow({
      editor: "hidden",
      shower: "block",
    });
  } else {
    prop.setShow({
      editor: "block",
      shower: "hidden",
    });
  }
};

  return (
    <div className="inline-block lg:hidden fixed top-1 right-2">
      {
        <FaEye
          onClick={showCode}
          className="text-3xl text-blue-600 hover:text-blue-400 "
        />
      }
    </div>
  );
};

 type P = {
   setShow: (obj: S) => void;
   Show: S | undefined;
 };

Shower.defaultProps = {

};

export default Shower;