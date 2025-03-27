"use client";
import CoffeSolution from "@/components/ui/CoffeSolution";
import ProductCard from "@/components/ui/ProductCard";
import SwiperSider from "@/components/ui/SwiperSlider";
import GetAPI from "@/utilities/GetAPI";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { data } = GetAPI("api/v1/admin/product");

  return (
    <div className="w-full ">
      <div className=" bg-themeLight pt-[140px] relative">
        <h2 className="font-playfairDisplay text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center text-white mb-10">
          Products
        </h2>

        <div className="h-60 sm:h-96 bg-[#FFF3DDCC]"></div>
        <div className="flex flex-wrap justify-center px-5 text-xs sm:text-base gap-2 md:gap-4 text-white mt-10 sm:mt-14 [&>button]:border [&>button]:border-[#FFF3DDCC] [&>button]:rounded-full [&>button]:px-2  sm:[&>button]:px-4 [&>button]:py-1 sm:[&>button]:py-1.5">
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
        </div>

        <div className="relative">
          <div className="relative z-10 px-0 sm:px-5 w-[95%] md:w-[90%] 2xl:w-[75%] mx-auto pt-10 sm:pt-14 pb-10 sm:pb-28 justify-items-center grid grid-cols-2 xl:grid-cols-3 gap-x-2 sm:gap-x-5 gap-y-2 sm:gap-y-10 md:gap-y-16 text-white">
            {data?.data?.data?.map((item, i) => (
              <ProductCard
                // onClick={() => router.push("/product/detail/1")}
                name={item?.name}
                imageURL={item?.image}
                quantity={item?.quantity}
                unit={item?.unit}
                price={item?.price}
                desc={item?.desc}
              />
            ))}
            {/* <ProductCard onClick={() => router.push("/product/detail/1")} /> */}
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
  );
};

export default page;
