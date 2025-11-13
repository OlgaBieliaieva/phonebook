import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader/Loader";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  if (isRefreshing) return <Loader />;

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
