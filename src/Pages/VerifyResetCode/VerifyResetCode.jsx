import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function VerifyResetCode() {
  UseTitle("Verify Code");
  const [showPass, setShowPass] = useState("password");

  const navigate = useNavigate();

  const toggleShowPass = function () {
    setShowPass(showPass === "password" ? "text" : "password");
  };

  const verifyCode = async function (values) {
    const loadingToast = toast.loading("waiting");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      console.log(data);
      toast.success(data.status);
      // Navigate to reset-password
      navigate("/reset-password");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .required("Verification code is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: verifyCode,
  });

  return (
    <section>
      <div className="container">
        <h2 className="flex justify-center items-center gap-2 text-3xl text-primary font-bold my-8">
          <FaRegUser />
          Verify Your Code
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-sm mx-auto px-5 flex flex-col gap-6 "
        >
          <div>
            <div className="relative">
              <input
                className="py-1 px-2 bg-gray-50 border outline-0 border-gray-300 text-dark-primary placeholder:text-gray-400 rounded-sm focus:border-primary block w-full transition-all duration-300 caret-primary"
                type={showPass}
                id="resetCode"
                placeholder="Enter Your Code"
                name="resetCode"
                value={formik.values.resetCode}
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
            {formik.errors.resetCode && formik.touched.resetCode && (
              <p className="text-red-600 font-bold text-sm mt-1 bg-red-100 py-1 px-2 rounded-sm">
                {formik.errors.resetCode}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="py-2 px-6 rounded-sm text-white bg-primary hover:bg-dark-primary w-full cursor-pointer transition-all duration-300  "
          >
            Verify
          </button>
        </form>
      </div>
    </section>
  );
}
