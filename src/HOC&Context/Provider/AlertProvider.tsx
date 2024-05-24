// import React from "react";
import { AlertType } from "../../AlertAndLoader/Alert/Alert";
import { useState } from "react";
import AlertList from "../../AlertAndLoader/Alert/AlertList";
import { AlertShowerContext } from "../Context";
import Loader from "../../AlertAndLoader/Loder/Loader";

export type showAlertType = {
  value: number;
  type: AlertType;
  message: string;
};
const AlertProvider: React.FC<F> = ({ children }) => {
  const [showAlert, setShowAlert] = useState<showAlertType>({
    value: 0,
    type: "success",
    message: " successfully saved your assignmennt to codeyogi",
  });
  const [ loading, setLoading ] = useState(false) 
  if (showAlert.value) {
    setTimeout(() => {
      setShowAlert({ ...showAlert, value: showAlert.value - 1 });
    }, 4000);
  }
  return (
    <AlertShowerContext.Provider
      value={{ setShowAlert, showAlert, setLoading, loading }}
    >
      {!!showAlert.value && (
        <AlertList howMuch={showAlert.value} type={showAlert.type}>
          {showAlert.message}
        </AlertList>
      )}
      {loading && <Loader></Loader>}

      {children}
    </AlertShowerContext.Provider>
  );
};
type F = {
  children: any;
};

AlertProvider.defaultProps = {};

export default AlertProvider;
