import { useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { withAlert } from "../withProvider";

// Define the Alert type
export interface AlertType {
  message: string;
  type: keyof typeof themeMap; // 'success' | 'error'
}

// Define the props for the Alert component
interface AlertProps {
  alert?: AlertType | undefined; // alert can be undefined
  setAlert: (alert?: AlertType) => void;
  removeAlert: () => void;
}

// Define the themeMap with types
const themeMap = {
  success: {
    color: "bg-green-400",
    Icon: FaRegCheckCircle,
  },
  error: {
    color: "bg-red-400",
    Icon: MdErrorOutline,
  },
};

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
