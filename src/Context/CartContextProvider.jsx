import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContextProvider";
import toast from "react-hot-toast";

export const cartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const { token } = useContext(authContext);
  const [cartProducts, setCartProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const getLoggedUserCart = async function () {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token },
        }
      );
      //   console.log(data);
      setCartProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProductToCart = async function (productId) {
    const addProduct = toast.loading("Adding your product...");

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: { token },
        }
      );
      //   console.log(data);
      toast.success(data.message);
      setCartProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Can't add product");
    } finally {
      toast.dismiss(addProduct);
    }
  };

  const removeCartItem = async function (productId) {
    const deleteProduct = toast.loading("Removing your product...");
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: { token },
        }
      );
      //   console.log(data);
      toast.success("Product Removed Successfully");
      setCartProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Can't remove product");
    } finally {
      toast.dismiss(deleteProduct);
    }
  };

  const clearCart = async function () {
    const clearCart = toast.loading("Removing your products...");
    try {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token },
        }
      );
      console.log(data);
      toast.success("Products Removed Successfully");
      setCartProducts(null);
    } catch (error) {
      console.error(error);
      toast.error("Can't clear cart");
    } finally {
      toast.dismiss(clearCart);
    }
  };

  const updateCartItem = async function (productId, count) {
    const updateProduct = toast.loading("Wait...");
    setIsDisabled(true);
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers: { token },
        }
      );
      //   console.log(data);
      toast.success(`You have ${count} pieces now`);
      setCartProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Can't update product quantity");
    } finally {
      toast.dismiss(updateProduct);
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProductToCart,
        updateCartItem,
        getLoggedUserCart,
        removeCartItem,
        clearCart,
        isLoading,
        isDisabled,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
