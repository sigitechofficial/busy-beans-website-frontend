import React from "react";

const CoffeSolution = () => {
  return (
    <div className="w-full bg-themeLight">
      <h4 className="text-7xl text-white text-center font-robotoSerif font-bold mx-auto leading-[125px] mb-10">
        Coffee Solution for
      </h4>

      <div className="w-full flex">
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
      <div className="w-full flex justify-center">
        <div className="">
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
