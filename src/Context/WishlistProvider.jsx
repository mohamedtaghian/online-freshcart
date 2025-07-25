import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContextProvider";
import toast from "react-hot-toast";

export const wishContext = createContext(null);

export default function WishlistProvider({ children }) {
  const { token } = useContext(authContext);
  const [wish, setWish] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLoggedUserWish = async function () {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: { token },
        }
      );
      // console.log(data);
      setWish(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProductToWish = async function (productId) {
    const addProduct = toast.loading("Adding your product...");

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers: { token },
        }
      );
      // console.log(data);
      toast.success(data.message);
      //   setWish(data);
      getLoggedUserWish();
    } catch (error) {
      console.error(error);
      toast.error("Can't add product");
    } finally {
      toast.dismiss(addProduct);
    }
  };

  const removeWishItem = async function (productId) {
    const deleteProduct = toast.loading("Removing your product...");
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: { token },
        }
      );
      // console.log(data);
      toast.success("Product Removed Successfully");
      //   setCartProducts(data);
      getLoggedUserWish();
    } catch (error) {
      console.error(error);
      toast.error("Can't remove product");
    } finally {
      toast.dismiss(deleteProduct);
    }
  };

  useEffect(() => {
    getLoggedUserWish();
  }, []);

  return (
    <wishContext.Provider
      value={{
        getLoggedUserWish,
        addProductToWish,
        removeWishItem,
        wish,
        setWish,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </wishContext.Provider>
  );
}
