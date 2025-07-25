import React, { useEffect, useState } from "react";
import GoBack from "../../Components/GoBack/GoBack";
import { LiaShippingFastSolid } from "react-icons/lia";
import OrderDetails from "../../Components/OrderDetails/OrderDetails";
import axios from "axios";
import CartPreloader from "../../Components/cartPreloader/cartPreloader";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { Link } from "react-router-dom";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function AllOrders() {
  UseTitle("All Orders");

  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getAllOrders = async function () {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      // console.log(data);
      setOrders(data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <section>
      <div className="container flex flex-col gap-8">
        <header className="flex items-center gap-6">
          <span>
            <GoBack />
          </span>
          <h2 className="text-2xl text-dark-primary font-bold">
            Track Your Orders
          </h2>
          <LiaShippingFastSolid className="size-8 text-primary" />
        </header>
        {isLoading ? (
          <CartPreloader />
        ) : error ? (
          <NoDataFound />
        ) : !orders?.length > 0 ? (
          <div className=" flex flex-col justify-center items-center gap-8 min-h-52">
            <h3 className="text-dark-primary font-semibold text-xl">
              There are not orders yet.
            </h3>
            <Link
              to={"/products"}
              className="bg-primary text-white px-6 py-2 rounded-sm hover:bg-dark-primary duration-300"
            >
              Add Your First Order
            </Link>
          </div>
        ) : (
          <>
            {orders?.map((order) =>
              !order.cartItems.length > 0 ? null : (
                <OrderDetails key={order._id} order={order} />
              )
            )}
          </>
        )}
      </div>
    </section>
  );
}
