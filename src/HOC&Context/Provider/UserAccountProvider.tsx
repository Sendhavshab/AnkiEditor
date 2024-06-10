import React, { useEffect, useState, ReactNode } from "react";
import {
  AlertShowerProviderHOC,
  FolderProviderHOC,
  UserAccountProvider,
} from "../Context";
import { GetFolders, GetUserName, LogInApi, SignUpApi } from "../../Api/ApiCall";
import { Folder } from "./FolderInfoProvider";
import { generateRandomString } from "../../functions/RandomStr";

interface UserProviderProps {
  children: ReactNode;
  setLoading: (loading: boolean) => void;
  setShowAlert: (alert: {
    value: number;
    type: string;
    message: string;
  }) => void;
  showAlert: { value: number; type: string; message: string };
  setFolders: React.Dispatch<React.SetStateAction<Folder>>;
}

const UserProvider: React.FC<UserProviderProps> = ({
  children,
  setLoading,
  setShowAlert,
  setFolders,
  showAlert,
}) => {
  const sttoken = localStorage.getItem("token") || "";

  const [token, setToken] = useState(sttoken);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    token !== "" && localStorage.setItem("token", token);
    if (token) {
      GetUserName()
        .then((response) => {
          setUser(response.data.name);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.data === "User not found") {
            setToken("");
            localStorage.removeItem("token");
            setLoading(false);
          } else if (err.message === "Network Error") {
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }
  }, [token, setLoading]);

  const accountApiCall = (
    data: { [key: string]: string },
    type: "signup" | "login"
  ) => {
    setLoading(true);
    (type === "signup" ? SignUpApi(data) : LogInApi(data))
      .then((data) => {
        setToken(data.data.token);

        setShowAlert({
          value: showAlert.value + 1,
          type: "success",
          message:
            type === "signup"
              ? "User created successfully"
              : "User logged in successfully",
        });
        GetFolders(data.data.token)
          .then((r) => {
            console.clear();
            setFolders(r.data);

            setLoading(false);
          })
          .catch((e) => {
            if (e.message === "Request failed with status code 404") {
              const folderId = generateRandomString(19);

              localStorage.setItem("folder" + folderId, "new");
              setFolders({
                "example folder": {
                  id: folderId,
                },
              });
            }
            setShowAlert({
              value: showAlert.value + 1,
              type: "error",
              message: e.message || e.data,
            });
          });
      })
      .catch((err) => {
        setLoading(false);
        if (err.data === "User already exists") {
          setShowAlert({
            value: showAlert.value + 1,
            type: "error",
            message: "User already exists",
          });
          return;
        }
        if (err.message === "Request failed with status code 400") {
          err.message =
            type == "login"
              ? " email or password is incorrect"
              : "User already exists";
        }
        setShowAlert({
          value: showAlert.value + 1,
          type: "error",
          message: err.message || err.data,
        });
      });
  };

  return (
    <UserAccountProvider.Provider
      value={{ accountApiCall, user, setUser, setLoading, token }}
    >
      {children}
    </UserAccountProvider.Provider>
  );
};

export default AlertShowerProviderHOC(FolderProviderHOC(UserProvider));
