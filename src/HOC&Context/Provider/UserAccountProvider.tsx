import React, { useEffect, useState, ReactNode } from "react";
import { AlertShowerProviderHOC, UserAccountProvider } from "../Context";
import { GetUserName, LogInApi, SignUpApi } from "../../ApiCall";

interface UserProviderProps {
  children: ReactNode;
  setLoading: (loading: boolean) => void;
  setShowAlert: (alert: {
    value: number;
    type: string;
    message: string;
  }) => void;
  showAlert: { value: number; type: string; message: string };
}

const UserProvider: React.FC<UserProviderProps> = ({
  children,
  setLoading,
  setShowAlert,
  showAlert,
}) => {
  const sttoken = localStorage.getItem("token") || "";

  const [ token, setToken ] = useState(sttoken) 
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("token", token);
    if (token) {
      GetUserName()
        .then((response) => {
          setUser(response.data.name);
          setLoading(false);
        })
        .catch((err) => {
          if(err.message !== "Network error"){

            localStorage.removeItem("token");
          }
          if (err.data === "User not found") {
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err to he " , err)
   console.log("err data" , err)
        if (err.data === "User already exists"){
            setShowAlert({
              value: showAlert.value + 1,
              type: "error",
              message: "User already exists",
            });
            return;
  
        }
          if (err.message === "Request failed with status code 400") {
            err.message =  type == "login" ? " email or password is incorrect" : "User already exists";
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

export default AlertShowerProviderHOC(UserProvider);
