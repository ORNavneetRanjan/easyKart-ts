import { useState, ReactNode } from "react";
import { AlertContext } from "../Context";
import { AlertType } from "../Components/Alert";
// Define the props for AlertProvider
interface AlertProviderProps {
  children: ReactNode;
}

// Define the type for the alert state
// Adjust this type based on what `alert` should be

function AlertProvider({ children }: AlertProviderProps) {
  const [alert, setAlert] = useState<AlertType>();

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertProvider;
