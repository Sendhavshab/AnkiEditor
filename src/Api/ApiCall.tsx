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

export const saveToServerApi = (codewithID: {
  [key: string]: string | boolean;
}) => {
  return axios.post(
    "https://faltuapp.koyeb.app/api/code/store",
    {
      code: {
        link: codewithID.link,
        html: codewithID.htmlCode,
        css: codewithID.cssCode,
        js: codewithID.notSavedJs,
        tailwind: codewithID.tailwind,
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
  return axios.get("https://faltuapp.koyeb.app/api/code/retrieve/" + id, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const GetUserName = () => {
  return axios.get("https://faltuapp.koyeb.app/token", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const GetFolders = (token?: string) => {
  return axios.get("https://faltuapp.koyeb.app/folder", {
    headers: {
      Authorization: token || localStorage.getItem("token"),
    },
  });
};
export const UsernameToCode = (folderName: string, username: string) => {
  return axios.get("https://faltuapp.koyeb.app/" + username + "/" + folderName);
};
export const PushFolders = (folders: Folder) => {
  return axios.post("https://faltuapp.koyeb.app/folder", folders, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const RemoveFolder = (folderId: string) => {
  return axios.delete(
    "https://faltuapp.koyeb.app/api/code/delete/" + folderId,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
};

export const SignUpApi = (data: { [key: string]: string }) => {
  return axios.post("https://faltuapp.koyeb.app/api/auth/signup", {
    name: data.name,
    password: data.password,
    username: data.username,
  });
};
export const LogInApi = (data: { [key: string]: string }) => {
  return axios.post("https://faltuapp.koyeb.app/api/auth/login", {
    password: data.password,
    username: data.username,
  });
};
