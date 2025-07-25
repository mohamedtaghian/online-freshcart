import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";
import GoBack from "../../Components/GoBack/GoBack";
import CartPreloader from "../../Components/cartPreloader/cartPreloader";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function BrandDetails() {
  UseTitle("Brands");

  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getSpecificBrand = async function () {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
      );
      //   console.log(data.data);
      setProducts(data.data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSpecificBrand();
  }, []);

  return (
    <>
      {isLoading ? (
        <CartPreloader />
      ) : error || !products?.length > 0 ? (
        <>
          <GoBack />
          <NoDataFound />
        </>
      ) : (
        <section>
          <div className="container">
            <span className="block mb-4">
              <GoBack />
            </span>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
