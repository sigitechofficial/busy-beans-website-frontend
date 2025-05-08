import { BASE_URL } from "@/utilities/URL";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductCard = (props) => {
  const { name, unit, imageURL, price, desc } = props;
  return (
    <div
      onClick={props.onClick}
      className="w-full h-full max-w-[448px] relative rounded-md border border-quantityBtn overflow-hidden cursor-pointer"
    >
      <div className="w-full h-52">
        {/* <img src={BASE_URL + imageURL} alt="product image" /> */}
        <img
          src={BASE_URL + imageURL}
          alt="product image"
          className="object-cover h-full w-full"
        />
      </div>

      <div className="h-[calc(100%-13rem)] pb-2 pt-1 sm:pt-2 sm:pb-4 px-2 sm:px-4 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-2xl font-switzer font-bold sm:pt-2">
            {name}
          </h3>
          <p className="text-sm py-[1px] sm:py-2">${price}</p>
          <p className="text-xs sm:text-sm pb-3 font-light overflow-hidden max-sm:line-clamp-2 h-[35px] sm:h-auto">
            {desc ?? "descriotion"}
          </p>
        </div>

        <div className="flex justify-end items-center">
          {/* <div className="w-max sm:w-32 md:w-36 lg:w-40 h-7 sm:h-14 px-[2px] sm:px-1 flex justify-between items-center gap-x-1  bg-quantityBtn py-2 rounded-full text-center text-xl sm:text-[28px] font-switzer">
            <div className="bg-themeLight rounded-full size-6 sm:size-12 flex justify-center items-center">
              <FaMinus className="text-[10px] sm:text-lg" />
            </div>
            1
            <div className="bg-themeLight rounded-full size-6 sm:size-12 flex justify-center items-center">
              <FaPlus className="text-[10px] sm:text-lg" />
            </div>
          </div> */}
          <p className="w-max px-1 whitespace-nowrap sm:w-32 h-7 sm:h-14 flex justify-center items-center gap-x-2 font-medium bg-white text-black text-[10px] sm:text-sm rounded-full text-center cursor-pointer max-sm:leading-3">
            Order Now{" "}
            <span className="bg-black size-6 sm:size-8 rounded-full flex items-center justify-center">
              <FaPlus color="#ffffff" className="text-sm sm:text-xl" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
