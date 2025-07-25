import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function Register() {
  UseTitle("Register");

  const [showPass, setShowPass] = useState("password");

  const navigate = useNavigate();
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const phoneRegex = /^01[0125][0-9]{8}$/;

  async function sendDataToSignUp(values) {
    const loadingToast = toast.loading("waiting");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      // console.log(data);
      // Display success toast
      toast.success(
        <span className="text-center">
          Welcome To Fresh Cart
          <p
            style={{
              fontWeight: "bold",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            {data.user.name}
          </p>
        </span>
      );
      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  const toggleShowPass = function () {
    setShowPass(showPass === "password" ? "text" : "password");
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("name is required")
      .min(3, "name must be more than 3 characters")
      .max(25, "name must be less than 25 characters"),
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        passRegex,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    rePassword: Yup.string()
      .required("Re-Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .required("phone is required")
      .matches(phoneRegex, "phone is invalid"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendDataToSignUp,
  });

  return (
    <section>
      <div className="container">
        <h2 className="flex justify-center items-center gap-2 mb-6 text-3xl text-primary font-bold ">
          <FaRegUser />
          Register Now
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-sm mx-auto px-5 flex flex-col gap-5"
        >
          <div>
            <input
              className="py-1 px-2 bg-gray-50 border outline-0 border-gray-300 text-dark-primary placeholder:text-gray-400 rounded-sm focus:border-primary block w-full transition-all duration-300 caret-primary"
              type="text"
              id="name"
              placeholder="Enter Your Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-600 font-bold text-sm mt-1 bg-red-100 py-1 px-2 rounded-sm">
                {formik.errors.name}
              </p>
            )}
          </div>
          <div>
            <input
              className="py-1 px-2 bg-gray-50 border outline-0 border-gray-300 text-dark-primary placeholder:text-gray-400 rounded-sm focus:border-primary block w-full transition-all duration-300 caret-primary"
              type="email"
              id="email"
              placeholder="Enter Your Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-600 font-bold text-sm mt-1 bg-red-100 py-1 px-2 rounded-sm">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div>
            <input
              className="py-1 px-2 bg-gray-50 border outline-0 border-gray-300 text-dark-primary placeholder:text-gray-400 rounded-sm focus:border-primary block w-full transition-all duration-300 caret-primary"
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
            <div className="relative">
              <input
                className="py-1 px-2 bg-gray-50 border outline-0 border-gray-300 text-dark-primary placeholder:text-gray-400 rounded-sm focus:border-primary block w-full transition-all duration-300 caret-primary"
                type={showPass}
                id="password"
                placeholder="Enter Your Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span
                onClick={toggleShowPass}
                className="absolute top-1/2 right-2 -translate-1/2 cursor-pointer hover:text-dark-primary transition-colors"
              >
                {showPass === "password" ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600 font-bold text-sm mt-1 bg-red-100 py-1 px-2 rounded-sm">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div>
            <div className="relative">
              <input
                className="py-1 px-2 bg-gray-50 border outline-0 border-gray-300 text-dark-primary placeholder:text-gray-400 rounded-sm focus:border-primary block w-full transition-all duration-300 caret-primary"
                type={showPass}
                id="rePassword"
                placeholder="Enter Your Re-Password"
                name="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span
                onClick={toggleShowPass}
                className="absolute top-1/2 right-2 -translate-1/2 cursor-pointer hover:text-dark-primary transition-colors"
              >
                {showPass === "password" ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <p className="text-red-600 font-bold text-sm mt-1 bg-red-100 py-1 px-2 rounded-sm">
                {formik.errors.rePassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="py-2 px-6 rounded-sm text-white bg-primary hover:bg-dark-primary w-full cursor-pointer transition-all duration-300  "
          >
            Sign Up
          </button>
          <Link
            className="text-sm block text-primary text-center hover:underline"
            to={"/login"}
          >
            Already have an account ?
          </Link>
        </form>
      </div>
    </section>
  );
}
