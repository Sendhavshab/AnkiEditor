import axios from "axios";

const ApiCall = (
  mathod: "get" | "post",
  id: string,
  htmlCode?: string,
  cssCode?: string,
  jsCode?: string
) => {
  return axios[mathod](
    "https://8o1qvwk6u4.execute-api.us-east-1.amazonaws.com/assignments/" + id,
    {
      code: {
        html: htmlCode,
        css: cssCode,
        js: jsCode,
      },
    }
  );
};


export default (ApiCall) ;