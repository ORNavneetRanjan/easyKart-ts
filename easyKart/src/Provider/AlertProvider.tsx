import { useState, ReactNode } from "react";
import { AlertContext } from "../Context";
import { AlertType } from "../Models";
interface AlertProviderProps {
  children: ReactNode;
}

function AlertProvider({ children }: AlertProviderProps) {
  const [alert, setAlert] = useState<AlertType>();

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertProvider;
