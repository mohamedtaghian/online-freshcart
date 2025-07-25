import React, { useEffect, useState } from "react";
import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import axios from "axios";
import BrandCard from "../../Components/BrandCard/BrandCard";
import CartPreloader from "../../Components/cartPreloader/cartPreloader";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function Brands() {
  UseTitle("Brands");

  const [brands, setBrands] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [pagination, setPagination] = useState(null);

  const getAllBrands = async function (page = 1) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands?page=${page}`
      );
      // console.log(data);
      setBrands(data.data);
      setPagination(data.metadata);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBrands();
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
            <SectionHeading>Shop By Brand</SectionHeading>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {brands?.map((brand) => (
                <BrandCard key={brand._id} brand={brand} />
              ))}
            </div>
            <div className="flex justify-center items-center gap-4 my-10">
              {[...Array(pagination?.numberOfPages)].map((page, i) => (
                <button
                  disabled={i + 1 === pagination?.currentPage}
                  onClick={() => {
                    getAllBrands(i + 1);
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
