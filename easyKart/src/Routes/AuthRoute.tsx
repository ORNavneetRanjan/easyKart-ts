import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { withUser } from "../withProvider";
import { UserContextType } from "../Provider/UserProvider";
// Ensure this matches your actual type

// Define the props for AuthRoute
interface AuthRouteProps extends UserContextType {
  children: ReactNode;
}

function AuthRoute({ user, children }: AuthRouteProps) {
  if (user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

export default withUser(AuthRoute);
