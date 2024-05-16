import React, { useEffect, useState } from "react";
import Alert, { AlertType } from "./Alert";

const AlertShow: React.FC<{ type: AlertType; children: string }> = ({
  type,
  children,
}) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 4 * 1000);
  }, []);

  return (
    showAlert && (
      <Alert setAlertShow={setShowAlert} type={type}>
        {children}
      </Alert>
    )
  );
};

export default AlertShow;
