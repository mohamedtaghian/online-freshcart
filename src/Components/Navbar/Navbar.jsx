import React, { useContext, useState } from "react";
import {
  FaBars,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaOpencart,
  FaRegHeart,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../../Context/AuthContextProvider";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContextProvider";
import { wishContext } from "../../Context/WishlistProvider";

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { cartProducts } = useContext(cartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { wish } = useContext(wishContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const logout = function () {
    const logoutToast = toast.loading("Logging out ...");
    setTimeout(() => {
      toast.dismiss(logoutToast);
    }, 1000);
    setTimeout(() => {
      localStorage.removeItem("token");
      setToken(null);
      toast.success("logged out");
    }, 1500);
  };

  return (
    <header className="bg-main-light py-4 fixed top-0 left-0 w-full z-[999]">
      <div className="container flex justify-between items-center gap-3">
        {/* Logo */}
        <h1
          className="flex items-center gap-2 font-bold text-2xl
          text-dark-primary"
        >
          <FaOpencart className="text-primary size-7" />
          FreshCart
        </h1>
        <button
          onClick={toggleMenu}
          className="text-dark-primary md:hidden size-4 cursor-pointer"
        >
          <FaBars />
        </button>
        {/* Above medium */}
        <nav className="hidden flex-1 md:flex gap-2.5">
          {/* Pages Links */}
          {token ? (
            <ul className="flex flex-row items-center gap-4 text-gray-500">
              <li>
                <NavLink className="hover:text-primary duration-300" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-primary duration-300"
                  to={"/products"}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-primary duration-300"
                  to={"/categories"}
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-primary duration-300 "
                  to={"/brands"}
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-primary duration-300 "
                  to={"/allorders"}
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          ) : null}
          <div className="ms-auto flex items-center gap-5">
            {/* Wish-list And Cart */}
            {token ? (
              <ul className="payment flex items-center gap-2">
                <li className="relative">
                  <Link to={"/whish-list"}>
                    <FaRegHeart className="size-5 text-dark-primary hover:text-primary hover:animate-wiggle duration-300" />
                  </Link>
                  {wish?.count ? (
                    <span className="absolute -top-1 left-1 -translate-x-1/2 -translate-y-1/2 bg-primary text-xs text-white size-5 rounded-full flex justify-center items-center">
                      {wish?.count}
                    </span>
                  ) : null}
                </li>
                <li className="relative">
                  <Link to={"/cart"}>
                    <FaOpencart className="text-primary size-5 hover:text-dark-primary duration-300" />
                  </Link>
                  {cartProducts?.numOfCartItems ? (
                    <span className="absolute -top-1 left-1 -translate-x-1/2 -translate-y-1/2 bg-primary text-xs text-white size-5 rounded-full flex justify-center items-center">
                      {cartProducts?.numOfCartItems}
                    </span>
                  ) : null}
                </li>
              </ul>
            ) : null}
            {/* Social Links */}
            <ul className="socials flex items-center gap-2">
              <li>
                <a target="_blank" href="https://www.facebook.com/">
                  <FaFacebook className="text-[#1877F2] size-4 hover:-translate-y-1 duration-300" />
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.instagram.com/">
                  <FaInstagram className="text-[#e1306c] size-4 hover:-translate-y-1 duration-300" />
                </a>
              </li>
              <li>
                <a target="_blank" href="https://x.com/">
                  <FaXTwitter className="size-4 hover:-translate-y-1 duration-300" />
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.linkedin.com/">
                  <FaLinkedin className="text-[#0a66c2] size-4 hover:-translate-y-1 duration-300" />
                </a>
              </li>
            </ul>
            {/* Authentication */}
            {token ? (
              <ul className="authentication flex items-center gap-2 text-gray-500 ">
                <li>
                  <button
                    onClick={logout}
                    className="cursor-pointer hover:text-red-600 transition-all duration-300"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="authentication flex items-center gap-2 text-gray-500 ">
                <li>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
                <li>
                  <NavLink to={"/register"}>Sign up</NavLink>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen ? (
        <div className="container">
          <nav className=" flex flex-col justify-center items-center gap-5 py-5 md:hidden  ">
            {/* Pages Links */}
            {token ? (
              <ul className="flex flex-col items-center gap-5 text-gray-500">
                <li>
                  <NavLink className="hover:text-primary duration-300" to={"/"}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="hover:text-primary duration-300"
                    to={"/products"}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="hover:text-primary duration-300"
                    to={"/categories"}
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="hover:text-primary duration-300 "
                    to={"/brands"}
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="hover:text-primary duration-300 "
                    to={"/allorders"}
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            ) : null}
            <div className="flex flex-col items-center gap-5">
              {/* Wish-list And Cart */}
              {token ? (
                <ul className="payment flex items-center gap-2">
                  <li className="relative">
                    <Link to={"/whish-list"}>
                      <FaRegHeart className="size-5 text-dark-primary hover:text-primary hover:animate-wiggle duration-300" />
                    </Link>
                    {wish?.count ? (
                      <span className="absolute -top-1 left-1 -translate-x-1/2 -translate-y-1/2 bg-primary text-xs text-white size-5 rounded-full flex justify-center items-center">
                        {wish?.count}
                      </span>
                    ) : null}
                  </li>
                  <li className="relative">
                    <Link to={"/cart"}>
                      <FaOpencart className="text-primary size-5 hover:text-dark-primary duration-300" />
                    </Link>
                    {cartProducts?.numOfCartItems ? (
                      <span className="absolute -top-1 left-1 -translate-x-1/2 -translate-y-1/2 bg-primary text-xs text-white size-5 rounded-full flex justify-center items-center">
                        {cartProducts?.numOfCartItems}
                      </span>
                    ) : null}
                  </li>
                </ul>
              ) : null}
              {/* Social Links */}
              <ul className="socials flex items-center gap-2">
                <li>
                  <a target="_blank" href="https://www.facebook.com/">
                    <FaFacebook className="text-[#1877F2] size-4 hover:-translate-y-1 duration-300" />
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://www.instagram.com/">
                    <FaInstagram className="text-[#e1306c] size-4 hover:-translate-y-1 duration-300" />
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://x.com/">
                    <FaXTwitter className="size-4 hover:-translate-y-1 duration-300" />
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://www.linkedin.com/">
                    <FaLinkedin className="text-[#0a66c2] size-4 hover:-translate-y-1 duration-300" />
                  </a>
                </li>
              </ul>
              {/* Authentication */}
              {token ? (
                <ul className="authentication flex items-center gap-2 text-gray-500 ">
                  <li>
                    <button
                      onClick={logout}
                      className="cursor-pointer hover:text-red-600 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="authentication flex items-center gap-2 text-gray-500 ">
                  <li>
                    <NavLink to={"/login"}>Login</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/register"}>Sign up</NavLink>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
