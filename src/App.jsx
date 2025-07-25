import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Categories from "./Pages/Categories/Categories";
import Brands from "./Pages/Brands/Brands";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import LoginProtectedRoutes from "./ProtectedRoutes/LoginProtectedRoutes";
import AuthContextProvider from "./Context/AuthContextProvider";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContextProvider";
import CategoryDetails from "./Pages/CategoryDetails/CategoryDetails";
import BrandDetails from "./Pages/BrandDetails/BrandDetails";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import VerifyResetCode from "./Pages/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import AllOrders from "./Pages/AllOrders/AllOrders";
import WishlistProvider from "./Context/WishlistProvider";
import WishList from "./Pages/WishList/WishList";
import UseTitle from "./Components/UseTitle/UseTitle";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

function App() {
  UseTitle("Home");

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/product-details/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/category-details/:id",
          element: (
            <ProtectedRoutes>
              <CategoryDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/brand-details/:id",
          element: (
            <ProtectedRoutes>
              <BrandDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/whish-list",
          element: (
            <ProtectedRoutes>
              <WishList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/login",
          element: (
            <LoginProtectedRoutes>
              <Login />
            </LoginProtectedRoutes>
          ),
        },
        {
          path: "/register",
          element: (
            <LoginProtectedRoutes>
              <Register />
            </LoginProtectedRoutes>
          ),
        },
        {
          path: "/forgot-password",
          element: (
            <LoginProtectedRoutes>
              <ForgotPassword />
            </LoginProtectedRoutes>
          ),
        },
        {
          path: "/verify-reset-code",
          element: (
            <LoginProtectedRoutes>
              <VerifyResetCode />
            </LoginProtectedRoutes>
          ),
        },
        {
          path: "/reset-password",
          element: (
            <LoginProtectedRoutes>
              <ResetPassword />
            </LoginProtectedRoutes>
          ),
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistProvider>
            <RouterProvider router={routes} />
            <Toaster
              toastOptions={{
                success: {
                  style: {
                    color: "green",
                  },
                },
                error: {
                  style: {
                    color: "red",
                  },
                },
              }}
            />
          </WishlistProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
