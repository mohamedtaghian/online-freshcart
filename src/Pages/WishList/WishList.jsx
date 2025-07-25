import React, { useContext, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import GoBack from "../../Components/GoBack/GoBack";
import { Link } from "react-router-dom";
import WishItem from "../../Components/WishItem/WishItem";
import { wishContext } from "../../Context/WishlistProvider";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function WishList() {
  UseTitle("Wish List");

  const { getLoggedUserWish, wish, isLoading } = useContext(wishContext);

  useEffect(() => {
    getLoggedUserWish();
  }, []);

  // Should be there a skeleton

  if (isLoading) {
    return (
      <section>
        <div className="container animate-pulse">
          <div className="bg-gray-200 p-5 rounded-3xl">
            <header className="flex flex-col md:flex-row justify-between items-center gap-4 my-4 pb-8 border-b-2 border-gray-500">
              <div className="flex items-center gap-2">
                <span className="bg-gray-500 block h-8 w-8" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-500 flex items-center gap-2">
                  <span className="w-1/2 block h-6 bg-gray-500;" />
                  <span className="text-white bg-gray-500 p-2 rounded-full block h-8 w-8" />
                </h2>
              </div>
            </header>
            <div className="h-64 bg-gray-200 rounded" />
            <div className="flex flex-col justify-center items-center gap-2 py-6">
              <p className="h-6 bg-gray-200 rounded w-1/2" />
              <div className="py-2 px-6 bg-gray-200 rounded-sm w-1/2" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container ">
        <div className="bg-main-light p-5 rounded-3xl">
          <header className="flex flex-col md:flex-row justify-between items-center gap-4 my-4 pb-8 border-b-2 border-primary">
            <div className="flex items-center gap-2">
              <span>
                <GoBack />
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-dark-primary flex items-center gap-2">
                Favorite Products
                <span className="text-white bg-primary p-2 rounded-full">
                  <FaHeart />
                </span>
              </h2>
            </div>
          </header>
          {wish?.data.length > 0 ? (
            <div className="products max-h-screen overflow-x-auto">
              {wish?.data.map((item) => (
                <WishItem key={item._id} item={item} />
              ))}
            </div>
          ) : null}
          {wish?.data.length > 0 ? null : (
            <div className="flex flex-col justify-center items-center gap-2 py-6">
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
        </div>
      </div>
    </section>
  );
}
