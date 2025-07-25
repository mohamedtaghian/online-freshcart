import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcMoneyTransfer, FcOnlineSupport } from "react-icons/fc";
import axios from "axios";
import { cartContext } from "../../Context/CartContextProvider";
import { authContext } from "../../Context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckOut({ totalPrice }) {
  const { token } = useContext(authContext);
  const { cartProducts, setCartProducts } = useContext(cartContext);
  const [pay, setPay] = useState("cash");

  const navigate = useNavigate();

  const phoneRegex = /^01[0125][0-9]{8}$/;
  const validationSchema = Yup.object().shape({
    details: Yup.string()
      .required("Details is required")
      .min(3, "Details must be more than 3 characters")
      .max(50, "Details must be less than 50 characters"),
    phone: Yup.string()
      .required("phone is required")
      .matches(phoneRegex, "phone is invalid"),
    city: Yup.string()
      .required("City is required")
      .min(3, "City must be more than 3 characters")
      .max(25, "City must be less than 25 characters"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (pay === "cash") {
        payCash(values);
      } else if (pay === "online") {
        payOnline(values);
      }
    },
  });

  const payOnline = async function (values) {
    const loadingToast = toast.loading("Waiting...");

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartProducts.cartId}?url=https://online-freshcart.netlify.app`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token,
          },
        }
      );
      //   console.log(data);
      if (data.status === "success") {
        window.location.href = data.session.url;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.statusMsg);
    } finally {
      toast.dismiss(loadingToast);
    }
  };
  const payCash = async function (values) {
    const loadingToast = toast.loading("Waiting...");
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartProducts.cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token,
          },
        }
      );

      console.log(data);

      if (!data.data.cartItems.length > 0) {
        throw new Error("error");
      }

      if (data.status === "success" && data.data.cartItems.length > 0) {
        toast.success(data.status);
        navigate("/allorders");
        setCartProducts(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("fail");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <>
      <h2 className="text-center my-8 pt-2.5 font-bold text-lg text-dark-primary border-t-2 ">
        Check Out
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="p-8 border-1 border-gray-300 rounded-lg max-w-sm mx-auto flex flex-col gap-5"
      >
        <div>
          <h3 className="font-bold">
            <span className="text-dark-primary">Total Price</span>
            <span className="mx-1 text-dark-primary">:</span>
            <span className="text-primary">
              EGP <span>{totalPrice}</span>
            </span>
          </h3>
        </div>

        <div>
          <input
            className="text-sm py-1 px-2 bg-gray-50 border outline-0 border-gray-300 text-dark-primary placeholder:text-gray-400 rounded-sm focus:border-primary block w-full transition-all duration-300 caret-primary"
            type="text"
            id="city"
            placeholder="Enter Your City Name"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.city && formik.touched.city && (
            <p className="text-red-600 font-bold text-sm mt-1 bg-red-100 py-1 px-2 rounded-sm">
              {formik.errors.city}
            </p>
          )}
        </div>

        <div>
          <input
            className="text-sm py-1 px-2 bg-gray-50 border outline-0 border-gray-300 text-dark-primary placeholder:text-gray-400 rounded-sm focus:border-primary block w-full transition-all duration-300 caret-primary"
            type="tel"
            id="phone"
            placeholder="Enter Your Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-600 font-bold text-sm mt-1 bg-red-100 py-1 px-2 rounded-sm">
              {formik.errors.phone}
            </p>
          )}
        </div>

        <div>
          <textarea
            id="details"
            className="text-sm py-1 px-2 bg-gray-50 border outline-0 border-gray-300 text-dark-primary placeholder:text-gray-400 rounded-sm focus:border-primary block w-full transition-all duration-300 caret-primary resize-none h-28"
            placeholder="Details"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>

          {formik.errors.details && formik.touched.details && (
            <p className="text-red-600 font-bold text-sm mt-1 bg-red-100 py-1 px-2 rounded-sm">
              {formik.errors.details}
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            onClick={() => {
              setPay("cash");
            }}
            type="submit"
            className="flex-1 self-stretch flex justify-center items-center gap-2 py-2 px-6 rounded-sm text-white bg-primary hover:bg-dark-primary  cursor-pointer transition-all duration-300  "
          >
            <FcMoneyTransfer className="size-8" />
            <span> Cash Order</span>
          </button>
          <button
            onClick={() => {
              setPay("online");
            }}
            type="submit"
            className="flex-1 self-stretch flex justify-center items-center gap-2 py-2 px-6 rounded-sm text-dark-primary bg-white shadow-lg hover:bg-dark-primary hover:text-white  cursor-pointer transition-all duration-300  "
          >
            <FcOnlineSupport className="size-8" />
            <span>Online Order</span>
          </button>
        </div>
      </form>
    </>
  );
}
