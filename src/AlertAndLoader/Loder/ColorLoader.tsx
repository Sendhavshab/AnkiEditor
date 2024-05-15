import { FaSyncAlt } from "react-icons/fa";

const ColorLoader = () => {
  return (
    <FaSyncAlt
      style={{
        animation: "loader 0.3s linear infinite",
        transitionProperty: "color rotate",
      }}
      className="text-white text-3xl    transi"
    />
  );
};





export default ColorLoader;