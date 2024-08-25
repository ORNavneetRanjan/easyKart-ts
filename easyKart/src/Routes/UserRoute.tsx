import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { withUser } from "../withProvider";
import { UserContextType } from "../Provider/UserProvider"; // Make sure this matches your actual type

// Define the props for UserRoute
interface UserRouteProps extends UserContextType {
  children: ReactNode;
}

function UserRoute({ user, children }: UserRouteProps) {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

export default withUser(UserRoute);
