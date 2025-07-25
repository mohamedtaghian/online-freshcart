import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { cartContext } from "../../Context/CartContextProvider";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaCartPlus, FaStar } from "react-icons/fa";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import GoBack from "../../Components/GoBack/GoBack";
import { wishContext } from "../../Context/WishlistProvider";
import UseTitle from "../../Components/UseTitle/UseTitle";

export default function ProductDetails() {
  UseTitle("Product Details");

  const { addProductToCart } = useContext(cartContext);
  const { addProductToWish } = useContext(wishContext);

  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getProductDetails = async function () {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      // console.log(data.data);
      setProductDetails(data.data);
      getRelatedProducts(data.data.category._id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRelatedProducts = async function (categoryId) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
      );
      // console.log(data.data);
      setRelatedProducts(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (isLoading) {
    return (
      <section>
        <div className="container flex flex-col md:flex-row gap-10 animate-pulse">
          <div className="content md:w-1/3 overflow-hidden h-60 bg-gray-200 rounded">
            <Swiper
              loop={true}
              spaceBetween={5}
              thumbs={{ swiper: thumbsSwiper }}
              allowTouchMove={false}
              freeMode={true}
              autoplay={true}
              modules={[FreeMode, Thumbs, Autoplay]}
              className="mySwiper2"
            >
              <SwiperSlide></SwiperSlide>
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={1}
              slidesPerView={4}
              freeMode={true}
              autoplay={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide></SwiperSlide>
            </Swiper>
          </div>
          <div className="details flex-1 p-4">
            <div className="flex justify-between items-center gap-2.5">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-10" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mt-2" />
            <div className="flex items-center gap-1 mt-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mt-4" />
            <div className="flex flex-col mt-4">
              <div className="h-6 bg-gray-200 rounded w-1/2" />
              <div className="h-6 bg-gray-200 rounded w-1/2 mt-2" />
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="bg-gray-200 cursor-pointer py-2 px-6 rounded-sm self-stretch w-1/4 h-10" />
              <div className="bg-gray-200 cursor-pointer flex-1 flex justify-center items-center gap-1.5 py-2 rounded-sm h-10" />
            </div>
          </div>
        </div>
        <section className="mt-20 animate-pulse">
          <div className="container border-t-4 border-primary">
            <div className="h-10 bg-gray-200 rounded w-1/2 my-5" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <div className="h-40 bg-gray-200 rounded" />
              <div className="h-40 bg-gray-200 rounded" />
              <div className="h-40 bg-gray-200 rounded" />
              <div className="h-40 bg-gray-200 rounded" />
            </div>
          </div>
        </section>
      </section>
    );
  }

  return (
    <>
      <section>
        <div className="container flex flex-col md:flex-row gap-10">
          <div className="image md:basis-1/3 overflow-hidden">
            <Swiper
              // loop={true}
              spaceBetween={5}
              thumbs={{ swiper: thumbsSwiper }}
              allowTouchMove={false}
              freeMode={true}
              autoplay={true}
              modules={[FreeMode, Thumbs, Autoplay]}
              className="mySwiper2"
            >
              {productDetails?.images.map((img) => (
                <SwiperSlide>
                  <img
                    className="max-h-120 mx-auto w-full object-contain"
                    src={img}
                    alt={productDetails?.title}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              // loop={true}
              spaceBetween={1}
              slidesPerView={4}
              freeMode={true}
              autoplay={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
              className="mySwiper"
            >
              {productDetails?.images.map((img) => (
                <SwiperSlide>
                  <img
                    className="cursor-pointer border-4 border-transparent hover:border-sky-700 transition-all duration-300 "
                    src={img}
                    alt={productDetails?.title}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="data flex-1 p-4">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center gap-2.5">
                <h2 className="text-3xl font-bold text-dark-primary line-clamp-1">
                  {productDetails?.title}
                </h2>
                <span>
                  <GoBack />
                </span>
              </div>
              <h3 className="text-sm text-primary font-semibold">
                {productDetails?.category.name}
              </h3>
              <div className="text-sm text-gray-500">
                <span> {productDetails?.brand.name}</span>
                <span className="mx-1">|</span>
                {productDetails?.quantity > 0 ? (
                  <span className="text-green-500">Available</span>
                ) : (
                  <span className="text-red-500">Sold Out</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="text-dark-primary">
                  {productDetails?.ratingsAverage}
                </span>
              </div>
            </div>
            <p className="text-slate-500 my-4">{productDetails?.description}</p>

            {productDetails?.priceAfterDiscount ? (
              <>
                <span className="inline-block me-2.5 text-slate-400 text-sm line-through">
                  EGP <span>{productDetails?.price}</span>
                </span>
                <span className="inline-block text-lg text-primary font-semibold mb-4 ">
                  EGP <span>{productDetails?.priceAfterDiscount}</span>
                </span>
              </>
            ) : (
              <span className="inline-block text-lg text-primary font-semibold mb-4 ">
                EGP <span>{productDetails?.price}</span>
              </span>
            )}

            <div className="text-white flex items-center gap-4">
              <button
                onClick={() => {
                  addProductToWish(id);
                }}
                className="bg-primary hover:bg-dark-primary cursor-pointer py-2 px-6 rounded-sm self-stretch transition-all duration-300"
              >
                <FaRegHeart />
              </button>
              <button
                onClick={() => {
                  addProductToCart(id);
                }}
                className="group bg-primary hover:bg-dark-primary cursor-pointer flex-1 flex justify-center items-center gap-1.5 py-2 rounded-sm transition-all duration-300"
              >
                <FaCartPlus className="group-hover:animate-wiggle" />
                <span className="uppercase ">Add To Cart</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-20">
        <div className="container border-t-4 border-primary">
          <h3 className="text-4xl font-extrabold text-dark-primary my-5">
            Related Products
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {relatedProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
