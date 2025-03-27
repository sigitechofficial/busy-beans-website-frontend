"use client";
import CoffeSolution from "@/components/ui/CoffeSolution";
import ProductCard from "@/components/ui/ProductCard";
import SwiperSider from "@/components/ui/SwiperSlider";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { FaArrowLeftLong } from "react-icons/fa6";
import ProdBanner from "@/components/ui/ProdBanner";
import ProdModal from "@/components/ui/ProdModal";
import { useState } from "react";

const page = () => {
  const router = useRouter();
  const [productModal, setProductModal] = useState(false);
  return (
    <>
      <div className="w-full ">
        <div className=" bg-themeLight pt-[140px] relative">
          <h2 className="font-playfairDisplay text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center text-white mb-10">
            Products
          </h2>

          <ProdBanner />

          {/* <div className="flex flex-wrap justify-center px-5 text-xs sm:text-base gap-2 md:gap-4 text-white mt-10 sm:mt-14 [&>button]:border [&>button]:border-[#FFF3DDCC] [&>button]:rounded-full [&>button]:px-2  sm:[&>button]:px-4 [&>button]:py-1 sm:[&>button]:py-1.5">
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
        </div> */}

          <div className="relative pt-16 sm:px-5 w-[95%] md:w-[90%] 2xl:w-[75%] mx-auto">
            <Swiper
              spaceBetween={0}
              navigation={{
                nextEl: ".cat-custom-swiper-button-next",
                prevEl: ".cat-custom-swiper-button-prev",
              }}
              breakpoints={{
                1440: {
                  slidesPerView: 8,
                },
                1280: {
                  slidesPerView: 8,
                },

                768: {
                  slidesPerView: 5,
                },
                640: {
                  slidesPerView: 4,
                },
                0: {
                  slidesPerView: 3,
                },
              }}
              modules={[Navigation]}
              className=""
            >
              <div className="flex items-center justify-center">
                {(
                  "Restaurants" === "Restaurants" && [
                    1,
                    2,
                    3,
                    4,
                    5,
                    5,
                    6,
                    7,
                    8,
                    9,
                    9,
                    7,
                    5,
                    5,
                    3,
                    3,
                    3,
                    4,
                    5,
                    6,
                    ,
                    6,
                    7,
                    8,
                    9,
                    9,
                    7,
                    5,
                    5,
                    3,
                  ]
                )?.map((cat, index) => (
                  <SwiperSlide key={index}>
                    <button className="text-xs sm:text-base text-white border border-[#FFF3DDCC] rounded-full px-2 sm:px-4 py-1.5">
                      Coffee Bean
                    </button>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
            <div className="swiper-btns">
              <div className="cat-custom-swiper-button-prev">
                <FaArrowLeftLong
                  size={20}
                  color="#F8E4BE"
                  className="absolute top-8 right-20 transform -translate-y-1/2 text-black cursor-pointer"
                />
              </div>
              <div className="cat-custom-swiper-button-next">
                <FaArrowLeftLong
                  size={20}
                  color="#F8E4BE"
                  className="absolute top-8 right-10 rotate-180 transform -translate-y-1/2 text-black cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 px-0 sm:px-5 w-[95%] md:w-[90%] 2xl:w-[75%] mx-auto pt-10 sm:pt-14 pb-10 sm:pb-28 justify-items-center grid grid-cols-2 xl:grid-cols-3 gap-x-2 sm:gap-x-5 gap-y-2 sm:gap-y-10 md:gap-y-16 text-white">
              <ProductCard
                onClick={() => setProductModal(true)}
                img={"/images/prodImages/prod-italian-espresso.avif"}
                title="Whole Bean"
                desc="Straight from the hills of northern Italy. Our Italian Espresso makes the perfect specialty coffee every time."
              />
              <ProductCard
                onClick={() => setProductModal(true)}
                img={"/images/prodImages/prod-colombian.avif"}
                title="Whole Bean"
                desc="
A blend of beans from high in the mountains of Colombia. Makes a well balanced yet very flavorful cup of coffee."
              />
              <ProductCard
                onClick={() => setProductModal(true)}
                img={"/images/prodImages/prod-french-roast.avif"}
                title="Whole Bean"
                desc="
For those who like a darker roast, this bean will not disappoint. Flavor forward and good until the last drop."
              />
              <ProductCard
                onClick={() => setProductModal(true)}
                img={"/images/prodImages/ultra-capp-creamer.avif"}
                title="Soluble"
                desc="Our creamer offers just the right amount of foam to make the best latte or cappuccino. "
              />
              <ProductCard
                onClick={() => setProductModal(true)}
                img={"/images/prodImages/prod-hot-chocolate.avif"}
                title="Soluble"
                desc="
Crafted from the finest Dutch chocolate. Our chocolate is rich and creamy."
              />
              <ProductCard
                onClick={() => setProductModal(true)}
                img={"/images/prodImages/prod-french-vanilla.avif"}
                title="Soluble"
                desc="Our most popular flavored cappuccino. Delicious to the last drop."
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[100vw] h-[300px] bg-gradient-to-t from-[#000000ab]"></div>
          </div>
          <div className="w-full sm:mt-10">
            <CoffeSolution />
          </div>

          <div className="w-full bg-themeDark pt-6 sm:pt-20 pb-6 max-lg:px-2">
            <h4 className="text-xl sm:text-3xl lg:text-5xl xl:6xl text-white text-center font-robotoSerif font-bold mx-auto">
              What Our Customers Say About Our Products
            </h4>
            <div className="w-full xl:w-[90%] 2xl:w-[78%] mx-auto">
              <SwiperSider />
            </div>
          </div>
        </div>
      </div>

      <ProdModal
        productModal={productModal}
        setProductModal={setProductModal}
      />
    </>
  );
};

export default page;
