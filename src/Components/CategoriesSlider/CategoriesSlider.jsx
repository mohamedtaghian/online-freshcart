import axios from "axios";
import React, { useEffect, useState } from "react";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState(null);

  const getAllCategoriess = async function () {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategoriess();
  }, []);

  return (
    <section>
      <div className="container">
        <h2 className="font-semibold text-lg text-dark-primary  my-3">
          Shop now by popular categories
        </h2>
        <Swiper
          slidesPerView={2}
          breakpoints={{
            576: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          spaceBetween={0}
          modules={[Pagination]}
        >
          {categories?.map((category) => (
            <SwiperSlide>
              <CategoryCard
                isSlider={true}
                key={category._id}
                category={category}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
