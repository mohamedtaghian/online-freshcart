import React, { useContext, useEffect } from "react";
import { FaOpencart, FaTrashAlt } from "react-icons/fa";
import { cartContext } from "../../Context/CartContextProvider";
import CartItem from "../../Components/CartItem/CartItem";
import { Link } from "react-router-dom";
import GoBack from "../../Components/GoBack/GoBack";
import CheckOut from "../../Components/CheckOut/CheckOut";
import { HashLink } from "react-router-hash-link";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function Cart() {
  UseTitle("Cart");

  const { cartProducts, getLoggedUserCart, clearCart, isLoading } =
    useContext(cartContext);

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  // Should be there a skeleton

  if (isLoading) {
    return (
      <section>
        <div className="container bg-main-light p-5 rounded-3xl animate-pulse">
          <header className="flex flex-col md:flex-row justify-between items-center gap-4 my-4 pb-8 border-b-2 border-primary">
            <div className="flex items-center gap-6">
              <div className="h-10 w-10 bg-white rounded-full" />
              <div className="h-6 w-24 bg-white rounded" />
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="h-4 w-24 bg-white rounded" />
              <div className="py-2 px-6 h-4 rounded-sm border" />
            </div>
          </header>
          <div className="products h-64 bg-white mt-4" />
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container ">
        <div className="bg-main-light p-5 rounded-3xl">
          <header className="flex flex-col md:flex-row justify-between items-center gap-4 my-4 pb-8 border-b-2 border-primary">
            <div className="flex items-center gap-6">
              <span>
                <GoBack />
              </span>
              <h2 className="text-2xl font-bold text-dark-primary flex items-center gap-2">
                Shop Cart
                <span className="text-primary">
                  <FaOpencart />
                </span>
              </h2>
            </div>
            {cartProducts?.data.products.length > 0 ? (
              <div className="flex flex-col justify-center items-center gap-3">
                <p className="flex items-center gap-2 font-semibold">
                  <span className="text-dark-primary">Total Price:</span>
                  <span className="text-primary">
                    EGP <span>{cartProducts?.data.totalCartPrice}</span>
                  </span>
                </p>
                <HashLink
                  className="py-2 px-6 bg-white hover:bg-primary text-primary hover:text-white text-sm rounded-sm border border-dark-primary hover:border-primary cursor-pointer transition-all duration-300"
                  smooth
                  to="#checkOut"
                >
                  Check Out
                </HashLink>
              </div>
            ) : null}
          </header>
          {cartProducts?.data.products.length > 0 ? (
            <div className="products max-h-screen overflow-x-auto">
              {cartProducts?.data.products.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
          ) : null}
          {cartProducts?.data.products.length > 0 ? (
            <button
              onClick={clearCart}
              className="group py-1 px-3 bg-red-600 text-white flex items-center gap-2 rounded-sm cursor-pointer hover:bg-red-600/80 my-5 mx-auto"
            >
              <FaTrashAlt className="group-hover:animate-wiggle" />
              <span>Clear Cart</span>
            </button>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2">
              <p className="text-dark-primary text-2xl font-bold">
                There are not items yet.
              </p>
              <Link
                className="py-2 px-6 text-white bg-primary rounded-sm hover:bg-dark-primary duration-300"
                to={"/products"}
              >
                Add Your First Product To Cart
              </Link>
            </div>
          )}
          <span id="checkOut">
            <CheckOut totalPrice={cartProducts?.data.totalCartPrice} />
          </span>
        </div>
      </div>
    </section>
  );
}
