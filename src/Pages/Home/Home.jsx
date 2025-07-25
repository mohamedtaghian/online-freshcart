import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import axios from "axios";
import CartPreloader from "../../Components/cartPreloader/cartPreloader";
import MainSlider from "../../Components/MainSlider/MainSlider";
import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import CategoriesSlider from "../../Components/CategoriesSlider/CategoriesSlider";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function Home() {
  UseTitle("Home");

  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getAllProducts = async function () {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      // console.log(data);
      setProducts(data.data);
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
        <>
          <MainSlider />
          <CategoriesSlider />
          <section>
            <div className="container">
              <SectionHeading> Shop now by popular products</SectionHeading>
              <div
                id="section-products"
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
