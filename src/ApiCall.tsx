import axios from "axios";
import { Folder } from "./HOC&Context/Provider/FolderInfoProvider";

const CodeYogiApiCall = (
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


export default (CodeYogiApiCall) ;

export const saveToServerApi = (codewithID: { [key: string]: string }) => {
  return axios.post("https://faltu-ylbv.onrender.com/api/code/store", {
   
   
      code: {
        link : codewithID.link,
        html: codewithID.htmlCode,
        css: codewithID.cssCode,
        js: codewithID.notSavedJs,
      },
    },
    {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }
  );
};
export const getFromServerApi = (id:string) => {
  return axios.get("https://faltu-ylbv.onrender.com/api/code/retrieve/" + id, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const GetUserName = () => {
  return axios.get("https://faltu-ylbv.onrender.com/token", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const GetFolders = (token : string) => {
  return axios.get("https://faltu-ylbv.onrender.com/folder", {
    headers: {
      Authorization: token,
    },
  });
};
export const PushFolders = (folders : Folder) => {

  return axios.post("https://faltu-ylbv.onrender.com/folder" , 
folders
   , {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export const SignUpApi = (data:{[key:string] : string}) => {
   
  return axios.post("https://faltu-ylbv.onrender.com/api/auth/signup", {
    name: data.name,
    password: data.password,
    username : data.username,
  });
}
export const LogInApi = (data: { [key: string]: string }) => {
  return axios.post("https://faltu-ylbv.onrender.com/api/auth/login", {
    password: data.password,
    username: data.username,
  });
};


