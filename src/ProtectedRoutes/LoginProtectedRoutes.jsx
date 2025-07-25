import React, { useContext } from "react";
import { authContext } from "../Context/AuthContextProvider";
import { Navigate } from "react-router-dom";

export default function LoginProtectedRoutes({ children }) {
  const { token } = useContext(authContext);
  return <>{!token ? children : <Navigate to={"/"} />}</>;
}
