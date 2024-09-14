import { useEffect } from "react";
import { withAlert } from "../withProvider";
import { AlertType, themeMap } from "../Models";

interface AlertProps {
  alert?: AlertType | undefined;
  setAlert: (alert?: AlertType) => void;
  removeAlert: () => void;
}

function Alert({ alert, setAlert, removeAlert }: AlertProps) {
  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(removeAlert, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [alert, removeAlert]);

  if (!alert) {
    return null;
  }

  const { message, type } = alert;
  const { color, Icon } = themeMap[type];

  return (
    <div className="w-full p-10 bg-gray-200">
      <div
        className={
          "text-xl flex justify-between max-w-screen-lg m-auto px-4 py-2 rounded-md shadow-lg " +
          color
        }
      >
        <span className="flex items-center gap-4">
          <Icon className="text-xl" />
          <p>{message}</p>
        </span>
        <button
          className="text-gray-400 border-0"
          onClick={() => setAlert(undefined)}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

export default withAlert(Alert);
