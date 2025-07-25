import React, { createContext, useState } from "react";

export const authContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // const verifyToken = async function () {
  //   try {
  //     const { data } = await axios.get(
  //       "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
  //       {
  //         headers: {
  //           token,
  //         },
  //       }
  //     );
  //     // console.log(data.decoded.id);
  //     localStorage.setItem("userId", data.decoded.id);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Access Denied");
  //     setToken(null);
  //     localStorage.removeItem("token");
  //   }
  // };

  // useEffect(() => {
  //   verifyToken();
  // }, []);

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
