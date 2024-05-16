import React, { useState, useEffect } from "react";

const ErrorLogComponent: React.FC = () => {
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [errors, setErrors] = useState<any[]>([]);

  useEffect(() => {
    // Console Log Capture
    const originalConsoleLog = console.log;
    console.log = (...args: any[]) => {
      originalConsoleLog(...args);
      setConsoleLogs((prevLogs) => [...prevLogs, args.join(" ")]);
    };

    // Error Handling
    const originalOnError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      if (originalOnError) {
        originalOnError(message, source, lineno, colno, error);
      }
      setErrors((prevErrors) => [...prevErrors, message]);
      return false;
    };

    // Cleanup
    return () => {
      console.log = originalConsoleLog;
      window.onerror = originalOnError;
    };
  }, []);

  return (
    <div>
      <h2>Console Logs:</h2>
      <ul>
        {consoleLogs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
      <h2>Errors:</h2>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorLogComponent;
