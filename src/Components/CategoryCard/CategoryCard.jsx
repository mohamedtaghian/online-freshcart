import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ category, isSlider }) {
  return (
    <article
      className={`flex flex-col  ${
        isSlider ? "" : "p-4 justify-center items-center"
      }`}
    >
      <Link
        to={`/category-details/${category._id}`}
        className={`relative  inline-block mb-6  ${
          isSlider ? "h-72" : "group size-[150px] rounded-xl shadow-md p-1"
        }  cursor-pointer`}
      >
        <img
          className={`size-full object-cover ${
            isSlider ? "" : "rounded-xl"
          } group-hover:scale-[1.03] duration-500`}
          src={category.image}
          alt={category.name}
        />
        <h2
          className={`text-dark-primary  font-semibold text-center ${
            isSlider ? "bg-main-light" : "mt-3"
          }`}
        >
          {category.name}
        </h2>
        {/* <p className="bg-red-600 bg-opacity-50 text-sm w-[95%] text-white uppercase  text-center absolute top-1/2  -translate-y-1/2">
          Out OFF STOCK
        </p> */}
      </Link>
    </article>
  );
}
