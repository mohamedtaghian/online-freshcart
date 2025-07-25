import axios from "axios";
import React, { useEffect, useState } from "react";
import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import CartPreloader from "../../Components/cartPreloader/cartPreloader";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function Categories() {
  UseTitle("Categories");

  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getAllCategoriess = async function () {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      // console.log(data.data);
      setCategories(data.data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCategoriess();
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
            <SectionHeading>Shop By Category</SectionHeading>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {categories?.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
