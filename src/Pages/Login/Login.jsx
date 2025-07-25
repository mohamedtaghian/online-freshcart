import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContextProvider";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function Login() {
  UseTitle("Login");

  const { setToken } = useContext(authContext);
  const [showPass, setShowPass] = useState("password");
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const navigate = useNavigate();

  const toggleShowPass = function () {
    setShowPass(showPass === "password" ? "text" : "password");
  };

  async function sendDataToSignUp(values) {
    const loadingToast = toast.loading("waiting");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      // console.log(data);

      // Set token in local storage
      localStorage.setItem("token", data.token);
      // Set token in authContext
      setToken(data.token);

      // Display success toast
      toast.success(
        <span className="text-center">
          Welcome Back
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

      // Navigate to home
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        passRegex,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendDataToSignUp,
  });

  return (
    <section>
      <div className="container">
        <h2 className="flex justify-center items-center gap-2 text-3xl text-primary font-bold mb-6 mt-1.5">
          <FaRegUser />
          Log in
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-sm mx-auto px-5 flex flex-col gap-3 "
        >
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
          <button
            type="submit"
            className="py-2 px-6 rounded-sm text-white bg-primary hover:bg-dark-primary w-full cursor-pointer transition-all duration-300  "
          >
            Log in
          </button>
          <Link
            className="text-sm block text-primary text-center hover:underline"
            to={"/forgot-password"}
          >
            Forgot your password?
          </Link>
          <Link
            to={"/register"}
            className="w-fit mx-auto py-2 px-6 rounded-sm text-white text-sm  bg-primary hover:bg-dark-primary cursor-pointer transition-all duration-300  "
          >
            Create New Account
          </Link>
        </form>
      </div>
    </section>
  );
}
