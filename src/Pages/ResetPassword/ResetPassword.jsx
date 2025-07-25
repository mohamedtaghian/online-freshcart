import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function ResetPassword() {
  UseTitle("Reset Password");

  const [showPass, setShowPass] = useState("password");
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const navigate = useNavigate();

  const toggleShowPass = function () {
    setShowPass(showPass === "password" ? "text" : "password");
  };

  const resetPassword = async function (values) {
    const loadingToast = toast.loading("waiting");

    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );

      toast.success("Password updated successfully");

      // Navigate to login
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required").email("email is invalid"),
    newPassword: Yup.string()
      .required("password is required")
      .matches(
        passRegex,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  return (
    <section>
      <div className="container">
        <h2 className="flex justify-center items-center gap-2 text-3xl text-primary font-bold my-8">
          <FaRegUser />
          Reset your password
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-sm mx-auto px-5 flex flex-col gap-5 "
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
                id="newPassword"
                placeholder="Enter Your New Password"
                name="newPassword"
                value={formik.values.newPassword}
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
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="text-red-600 font-bold text-sm mt-1 bg-red-100 py-1 px-2 rounded-sm">
                {formik.errors.newPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="py-2 px-6 rounded-sm text-white bg-primary hover:bg-dark-primary w-full cursor-pointer transition-all duration-300  "
          >
            Confirm
          </button>
        </form>
      </div>
    </section>
  );
}
