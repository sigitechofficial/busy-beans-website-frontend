import React from "react";

const ProdBanner = () => {
  return (
    <div className="py-4 sm:py-8 px-4 2xl:py-14 flex flex-col justify-center items-center gap-y-2 sm:gap-y-10 bg-[#FFF3DDCC] text-white bg-product bg-cover bg-center bg-no-repeat font-inter relative">
      <p className="mx-auto text-center sm:text-xl lg:text-3xl 2xl:text-5xl font-extrabold z-10">
        Easter Savings Are Here: Up to 30% Off for Your Business!
      </p>
      <div className="w-[100px] sm:w-full sm:max-w-52 z-10">
        <img src="/images/prod-detail.png" alt="product detail" />
      </div>
      <div className="flex flex-col items-center z-10">
        <p className="italic text-sm sm:text-2xl 2xl:text-4xl font-medium">
          Avail this offer
        </p>
        <button className="bg-white rounded-xl w-[180px] sm:w-[350px] 2xl:w-[500px] text-black py-2 sm:py-4 mt-3 font-satoshi font-semibold text-sm sm:text-base sm:font-extrabold">
          ORDER NOW
        </button>
      </div>

      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm"></div>
    </div>
  );
};

export default ProdBanner;
