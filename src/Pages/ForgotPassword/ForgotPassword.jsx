import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function ForgotPassword() {
  UseTitle("Forgot Password");

  const navigate = useNavigate();

  const sendOtp = async function (values) {
    const loadingToast = toast.loading("waiting");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      console.log(data);
      toast.success(data.message);
      // Navigate to verify-reset-code
      navigate("/verify-reset-code");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required").email("email is invalid"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendOtp,
  });

  return (
    <section>
      <div className="container">
        <div className=" flex flex-col justify-center items-center gap-3 my-8">
          <h2 className="flex justify-center items-center gap-2 text-3xl text-primary font-bold ">
            <FaRegUser />
            Forgot your password?
          </h2>
          <p className="text-gray-500 text-sm ">
            Your password will be reset by email.
          </p>
        </div>
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
          <button
            type="submit"
            className="py-2 px-6 rounded-sm text-white bg-primary hover:bg-dark-primary w-full cursor-pointer transition-all duration-300  "
          >
            Next
          </button>
          <Link
            className="text-sm block text-primary text-center font-bold hover:underline"
            to={"/login"}
          >
            Back to log in
          </Link>
        </form>
      </div>
    </section>
  );
}
