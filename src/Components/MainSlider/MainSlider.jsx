import { HashLink } from "react-router-hash-link";
import { FaOpencart } from "react-icons/fa";
import img1 from "../../assets/main-slider-1.avif";
import img2 from "../../assets/main-slider-2.avif";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function MainSlider() {
  return (
    <section>
      <div className="container  flex flex-col md:flex-row">
        <div className="md:basis-[70%] overflow-hidden ">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="h-[400px] md:h-full cursor-pointer "
          >
            <SwiperSlide className="bg-[url('https://images.unsplash.com/photo-1487744480471-9ca1bca6fb7d?q=80&w=2691&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center bg-cover">
              <div className="p-5 flex flex-col gap-5">
                <h2 className="text-base md:text-3xl font-bold flex items-center gap-2 bg-white w-fit py-2 px-3 rounded-full">
                  <span className="text-primary">
                    <FaOpencart />
                  </span>
                  <span className="text-dark-primary">FreshCart</span>
                </h2>
                <p className="text-sm/6 text-white font-semibold   bg-white/10 p-5 rounded-lg max-w-sm ">
                  Whether you’re looking for the freshest produce, pantry
                  staples, or specialty items, FreshCart brings the supermarket
                  to you, redefining the way you shop for groceries.
                </p>
                <HashLink
                  className="self-start text-white bg-primary py-2 px-6 rounded-full hover:bg-dark-primary duration-300"
                  smooth
                  to="#section-products"
                >
                  Get Started
                </HashLink>
              </div>
            </SwiperSlide>
            <SwiperSlide className="bg-[url('https://eco-iota-amber.vercel.app/assets/product2-Cc8hawmZ.jpg')] bg-center bg-cover"></SwiperSlide>
            <SwiperSlide className="bg-[url('https://eco-iota-amber.vercel.app/assets/product3-CjkhanyU.jpg')] bg-center bg-cover"></SwiperSlide>
          </Swiper>
        </div>
        <div className="md:basis-[30%] flex flex-row md:flex-col overflow-hidden">
          <div>
            <img className="w-full" src={img1} alt="Cosmetics products" />
          </div>
          <div>
            <img className="w-full" src={img2} alt="Black friday offers" />
          </div>
        </div>
      </div>
    </section>
  );
}
