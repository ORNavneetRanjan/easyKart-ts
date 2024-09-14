import { useEffect, useState, ReactNode } from "react";
import { UserContext } from "../Context";
import Loading from "../Components/Loading";
import axios from "axios";
import { User } from "../Models";

// Define the User type based on the response structure

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
