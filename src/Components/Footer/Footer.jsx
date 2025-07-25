import React from "react";
import amazonPay from "../../assets/amazon.png";
import americanExpress from "../../assets/American-Express.png";
import masterCard from "../../assets/mastercard.webp";
import payPal from "../../assets/paypal.png";
import appleStore from "../../assets/apple-store.png";
import googlePlay from "../../assets/google-play.png";

export default function Footer() {
  return (
    <footer className="bg-main-light py-10 px-5">
      <div className="container">
        <h2 className="text-2xl font-bold text-dark-primary">
          Get the FreshCart App
        </h2>
        <p className="my-2 text-gray-500">
          We will send you a link, open it on your phone to download the app
        </p>
        <div className="flex flex-col md:flex-row items-center gap-2 ">
          <input
            type="email"
            placeholder="Email..."
            className="w-full md:w-0 flex-grow bg-white py-1 px-2 rounded-sm border-2 border-dark-primary focus:outline-0  focus:border-primary duration-150 caret-dark-primary text-dark-primary"
          ></input>
          <button className="bg-primary py-2 px-6 rounded-sm text-sm text-white hover:bg-dark-primary duration-300 cursor-pointer">
            Share App Link
          </button>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2 mt-8 border-y py-4 border-slate-200">
          <div className="partners flex gap-2.5 md:gap-4 items-center">
            <h2 className="text-sm md:text-base text-dark-primary">
              Payment Partners
            </h2>
            <img className="w-10 md:w-16" src={amazonPay} alt="Amazon Logo" />
            <img
              className="w-10 md:w-16"
              src={americanExpress}
              alt="American Express Logo"
            />
            <img
              className="w-10 md:w-16"
              src={masterCard}
              alt="MasterCard Logo "
            />
            <img className="w-10 md:w-16" src={payPal} alt="PayPal Logo" />
          </div>
          <div className="partners flex gap-4 items-center">
            <h2 className="text-sm md:text-base text-dark-primary">
              Get deliveries with FreshCart
            </h2>
            <img
              className="w-12 md:w-24"
              src={appleStore}
              alt="Apple Store Logo"
            />
            <img
              className="w-12 md:w-24"
              src={googlePlay}
              alt="Google Play Logo"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
