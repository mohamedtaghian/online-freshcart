import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import axios from "axios";
import CartPreloader from "../../Components/cartPreloader/cartPreloader";
import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function Products() {
  UseTitle("Products");

  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState(null);

  const getAllProducts = async function (page = 1) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
      );
      // console.log(data);
      setProducts(data.data);
      setPagination(data.metadata);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <CartPreloader />
      ) : error ? (
        <NoDataFound />
      ) : (
        <section>
          <div className="container">
            <SectionHeading> Shop now by popular products</SectionHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 my-10">
              {[...Array(pagination?.numberOfPages)].map((page, i) => (
                <button
                  disabled={i + 1 === pagination?.currentPage}
                  onClick={() => {
                    getAllProducts(i + 1);
                  }}
                  key={i}
                  className="disabled:bg-primary/50  bg-primary text-white px-6 py-2 rounded-md cursor-pointer hover:bg-dark-primary duration-300"
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
