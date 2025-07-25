import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Context/AuthContextProvider";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProtectedRoutes({ children }) {
  const { token, setToken } = useContext(authContext);

  const verifyToken = async function () {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
        {
          headers: {
            token,
          },
        }
      );
      // console.log(data.decoded.id);
      localStorage.setItem("userId", data.decoded.id);
    } catch (error) {
      console.error(error);
      toast.error("Access Denied");
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return <>{token ? children : <Navigate to={"/login"} />}</>;
}
