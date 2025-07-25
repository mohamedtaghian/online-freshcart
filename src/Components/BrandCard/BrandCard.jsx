import React from "react";
import { Link } from "react-router-dom";

export default function BrandCard({ brand }) {
  return (
    <Link
      to={`/brand-details/${brand._id}`}
      className="flex justify-center items-center"
    >
      <img
        className="size-36 bg-white rounded-full shadow-md p-2 cursor-pointer object-contain hover:scale-[1.2] hover:-translate-y-8 duration-500"
        src={brand.image}
        alt={brand.name}
      />
    </Link>
  );
}
