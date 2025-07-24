"use client";
import CoffeSolution from "@/components/ui/CoffeSolution";
import ProductCard from "@/components/ui/ProductCard";
import SwiperSider from "@/components/ui/SwiperSlider";
import GetAPI from "@/utilities/GetAPI";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { FaArrowLeftLong } from "react-icons/fa6";
import ProdBanner from "@/components/ui/ProdBanner";
import ProdModal from "@/components/ui/ProdModal";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import Head from "next/head";

export default function Product() {
  if (typeof window !== "undefined") {
    var existingCartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
  }
  const router = useRouter();
  const [categoryID, setCategoryID] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const [productModalData, setProductModalData] = useState({
    productId: "",
    image: "",
    name: "",
    description: "",
    discount: "",
    qty: "",
    price: "",
    unit: "",
    wholesalePrice: "",
  });

  const { data } = GetAPI("api/v1/admin/product");
  const { data: categoryData } = GetAPI("api/v1/admin/category");
  
  const handleOrderNowButton = (id) => {
    if (existingCartItems) {
      const item = existingCartItems.find((item) => item?.productId === id);
      return item ? item?.qty : "Order Now";
    } else {
      return "Order Now";
    }
  };

  const handleOrderNowButtonQty = (id) => {
    if (existingCartItems) {
      const item = existingCartItems.find((item) => {
        return item?.productId === id;
      });
      return item ? item?.qty : 1;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    const catList = [{ id: 0, name: "All" }];
    categoryData?.data?.data?.map((cat) => catList.push(cat));
    setCategoryList([...catList]);
    setCategoryID(0);
  }, [categoryData]);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Busy Bean Coffee",
      url: "https://www.busybeancoffee.com/",
      logo: "https://www.busybeancoffee.com/images/logowhite.png",
      sameAs: [
        "https://www.facebook.com/busybeancoffee",
        "https://www.instagram.com/busybean_coffee",
        "https://x.com/busybean_coffee",
        "https://www.youtube.com/channel/UC4b4PYax5H3jRSyw4r0MCjQ/featured",
        "https://www.linkedin.com/company/busy-bean-coffee",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Product Listing",
      url: "https://www.busybeancoffee.com/product", // Update actual URL
      description:
        "Browse Busy Bean Coffee’s premium wholesale coffee beans, creamers, syrups, and café supplies tailored for foodservice businesses.",
    },
    // Optional: Add individual products if needed
  ];

  return data.length === 0 ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>Shop Coffee Beans, Syrups & More | Busy Bean Coffee</title>
        <meta
          name="description"
          content="Explore high-margin, premium products like specialty coffee beans, syrups, and creamers for cafés, hotels & bakeries. Delivered fresh by Busy Bean Coffee."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="w-full ">
        <div className=" bg-themeLight pt-[140px] relative">
          <h2 className="font-playfairDisplay text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center text-white mb-10">
            Products
          </h2>

          {/* <ProdBanner /> */}

          {/* <div className="flex flex-wrap justify-center px-5 text-xs sm:text-base gap-2 md:gap-4 text-white mt-10 sm:mt-14 [&>button]:border [&>button]:border-[#FFF3DDCC] [&>button]:rounded-full [&>button]:px-2  sm:[&>button]:px-4 [&>button]:py-1 sm:[&>button]:py-1.5">
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
        </div> */}

          <div className="relative pt-16 sm:px-5 overflow-visible flex flex-wrap w-[95%] md:w-[90%] 2xl:w-[75%] mx-auto">
            <Swiper
              spaceBetween={10}
              navigation={{
                nextEl: ".cat-custom-swiper-button-next",
                prevEl: ".cat-custom-swiper-button-prev",
              }}
              breakpoints={{
                1440: { slidesPerView: 5 },
                1280: { slidesPerView: 5 },
                768: { slidesPerView: 5 },
                640: { slidesPerView: 4 },
                0: { slidesPerView: 3 },
              }}
              modules={[Navigation]}
              className="catgeory-swipper"
            >
              {categoryList?.map((cat, index) => (
                <SwiperSlide key={index} className="!w-auto">
                  <button
                    onClick={() => setCategoryID(cat.id)}
                    className={`transition-colors duration-200 ease-in-out px-4 py-1.5 ${
                      cat.id === categoryID
                        ? "text-themeDark bg-white"
                        : "text-white"
                    }  border border-white rounded-md `}
                  >
                    {cat.name}
                  </button>
                </SwiperSlide>
              ))}
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

          <div className="relative overflow-hidden">
            <div className="relative z-10 px-0 sm:px-5 w-[95%] md:w-[90%] 2xl:w-[75%] mx-auto pt-10 sm:pt-14 pb-10 sm:pb-28 justify-items-center grid grid-cols-2 xl:grid-cols-3 gap-x-2 sm:gap-x-5 gap-y-2 sm:gap-y-10 md:gap-y-16 text-white">
              {data?.data?.data?.map((item, i) =>
                categoryID === 0 ? (
                  <div className="w-full h-full" div key={i}>
                    <ProductCard
                      // onClick={() => router.push("/product/detail/1")}
                      name={item?.name}
                      weight={item?.weight}
                      imageURL={item?.image}
                      unit={item?.unit}
                      price={item?.price}
                      desc={item?.desc}
                      buttonText={handleOrderNowButton(item?.id)}
                      onClick={() => {
                        setProductModalData({
                          productId: item?.id,
                          image: item?.image,
                          name: item?.name,
                          description: item?.desc,
                          discount: 0,
                          qty: handleOrderNowButtonQty(item?.id),
                          price: item?.price,
                          unit: item?.unit,
                          wholesalePrice: item?.wholesalePrice,
                          weight: item?.weight,
                        });
                        setProductModal(true);
                      }}
                    />
                  </div>
                ) : (
                  item?.categoryId === categoryID && (
                    <div className="w-full h-full" div key={i}>
                      <ProductCard
                        // onClick={() => router.push("/product/detail/1")}
                        name={item?.name}
                        weight={item?.weight}
                        imageURL={item?.image}
                        unit={item?.unit}
                        price={item?.price}
                        desc={item?.desc}
                        buttonText={handleOrderNowButton(item?.id)}
                        onClick={() => {
                          setProductModalData({
                            productId: item?.id,
                            image: item?.image,
                            name: item?.name,
                            description: item?.desc,
                            discount: 0,
                            qty: handleOrderNowButtonQty(item?.id),
                            price: item?.price,
                            unit: item?.unit,
                            wholesalePrice: item?.wholesalePrice,
                            weight: item?.weight,
                          });
                          setProductModal(true);
                        }}
                      />
                    </div>
                  )
                )
              )}
              {/* <ProductCard onClick={() => setProductModal(true)} />
              <ProductCard onClick={() => setProductModal(true)} />
              <ProductCard onClick={() => setProductModal(true)} />
              <ProductCard onClick={() => setProductModal(true)} /> */}
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
        productModalData={productModalData}
        productModal={productModal}
        setProductModal={setProductModal}
      />
    </>
  );
}
