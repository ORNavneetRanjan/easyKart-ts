import { useEffect, useState, ReactNode } from "react";
import { UserContext } from "../Context";
import Loading from "../Components/Loading";
import axios from "axios";

// Define the User type based on the response structure
export interface User {
  id: number;
  full_name: string;
  email: string;
  remember_me_token: string | null;
  created_at: string; // Date in ISO format
  updated_at: string; // Date in ISO format
}

export interface UserContextType {
  isLoggedIn: boolean;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("https://myeasykart.codeyogi.io/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={{ isLoggedIn: !!token, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
