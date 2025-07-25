import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function GoBack() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <button
        onClick={goBack}
        className="bg-primary text-white p-2.5 rounded-full flex justify-center items-center cursor-pointer hover:bg-dark-primary hover:-translate-x-1 hover:scale-105 transition-all duration-300"
      >
        <FaArrowLeft />
      </button>
    </div>
  );
}
