import CoffeSolution from "@/components/ui/CoffeSolution";
import ProductCard from "@/components/ui/ProductCard";
import ProductDetailImageCard from "@/components/ui/ProductDetailImageCard";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function ProductDetail() {
  return (
    <div className="w-full">
      <div className=" bg-themeLight pt-[140px] relative">
        <h2 className="font-playfairDisplay text-[7.2rem] font-bold text-center text-white mb-10">
          Product Detail
        </h2>

        <div className="h-96 bg-[#F4E9DC]"></div>

        <div className="bg-themeDark py-24">
          <div className="mx-auto w-4/6 flex items-center gap-x-16">
            {/* left side */}
            <div className="flex gap-x-2">
              <div className="space-y-4">
                <ProductDetailImageCard />
                <ProductDetailImageCard />
                <ProductDetailImageCard />
              </div>
              <div className="bg-[#997D6C] h-24 w-1 rounded-xl"></div>
            </div>
            {/* right side */}
            <div className="flex gap-10">
              {/* image */}
              <div className="rounded-[4px] h-[26rem] w-[36rem]">
                <img
                  src="/images/prod-detail.png"
                  alt=""
                  className="object-contain h-full w-full"
                />
              </div>
              {/* image detail */}
              <div className="font-switzer flex flex-col justify-between text-white py-4">
                <div className=" space-y-4">
                  <p className="text-4xl font-bold">Whole Bean</p>
                  <p className="font-semibold text-2xl">$220.00</p>
                  <p className="font-normal text-xl leading-tight">
                    For those who like a darker roast, this bean will not
                    disappoint. Flavor forward and good until the last drop.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-40 h-14 px-1 flex justify-between items-center  bg-quantityBtn text-sm py-2 rounded-full text-center !text-[28px] font-switzer">
                    <div className="bg-themeLight rounded-full size-12 flex justify-center items-center">
                      <FaMinus size="17" />
                    </div>
                    1
                    <div className="bg-themeLight rounded-full size-12 flex justify-center items-center">
                      <FaPlus size="17" />
                    </div>
                  </div>
                  <p className="w-32 h-14 flex justify-center items-center font-medium bg-white text-black text-sm rounded-full text-center cursor-pointer">
                    Order Now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[75%] mx-auto bg-themeLight pt-14 pb-10 grid grid-cols-3 gap-x-2 gap-y-16 text-white">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>

        <CoffeSolution />
      </div>
    </div>
  );
}
