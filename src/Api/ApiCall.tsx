import axios from "axios";
import { Folder } from "../HOC&Context/Provider/FolderInfoProvider";

const CodeYogiApiCall = (
  mathod: "get" | "post",
  id: string,
  htmlCode?: string,
  cssCode?: string,
  jsCode?: string
) => {
  return axios[mathod](
    "https://8hci695lxa.execute-api.us-east-1.amazonaws.com/assignments/" + id,
    {
      code: {
        html: htmlCode,
        css: cssCode,
        js: jsCode,
      },
    }
  );
};

export default CodeYogiApiCall;

export const saveToServerApi = (codewithID: { [key: string]: string | boolean }) => {
  return axios.post(
    "https://faltu-1.onrender.com/api/code/store",
    {
      code: {
        link: codewithID.link,
        html: codewithID.htmlCode,
        css: codewithID.cssCode,
        js: codewithID.notSavedJs,
        tailwind: codewithID.tailwind
      },
    },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
};
export const getFromServerApi = (id: string) => {
  return axios.get("https://faltu-1.onrender.com/api/code/retrieve/" + id, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const GetUserName = () => {
  return axios.get("https://faltu-1.onrender.com/token", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const GetFolders = (token? : string) => {
  return axios.get("https://faltu-1.onrender.com/folder", {
    headers: {
      Authorization: token || localStorage.getItem("token"),
    },
  });
};
export const UsernameToCode = (folderName: string , username : string) => {
  return axios.get(
    "https://faltu-1.onrender.com/" + username + "/" + folderName
  );
};
export const PushFolders = (folders: Folder) => {
  return axios.post("https://faltu-1.onrender.com/folder", folders, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const RemoveFolder = (folderId: string) => {
  return axios.delete(
    "https://faltu-1.onrender.com/api/code/delete/" + folderId,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
};

export const SignUpApi = (data: { [key: string]: string }) => {
  return axios.post("https://faltu-1.onrender.com/api/auth/signup", {
    name: data.name,
    password: data.password,
    username: data.username,
  });
};
export const LogInApi = (data: { [key: string]: string }) => {
  return axios.post("https://faltu-1.onrender.com/api/auth/login", {
    password: data.password,
    username: data.username,
  });
};
