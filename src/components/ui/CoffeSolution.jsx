import React from "react";

const CoffeSolution = () => {
  return (
    <div className="w-full bg-themeLight pb-10 sm:pb-20">
      <h4 className="text-2xl sm:text-4xl lg:text-6xl  2xl:text-7xl text-white text-center font-robotoSerif font-bold mx-auto leading-[80px] sm:leading-[125px] sm:mb-12">
        Coffee Solution for
      </h4>

      <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 sm:[&>div]:h-[295px] [&>div>img]:w-full [&>div>img]:h-full [&>div>img]:object-cover">
        <div className="">
          <img src="/images/bakeries.png" />
        </div>
        <div className="">
          <img src="/images/cafeterias.png" />
        </div>
        <div className="">
          <img src="/images/cafes.png" />
        </div>
        <div className="">
          <img src="/images/cstores.png" />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 sm:[&>div]:h-[295px] [&>div>img]:w-full [&>div>img]:h-full [&>div>img]:object-cover">
        <div className="lg:col-start-2">
          <img src="/images/restaurants.png" />
        </div>
        <div className="">
          <img src="/images/hospitality.png" />
        </div>
      </div>
    </div>
  );
};

export default CoffeSolution;
