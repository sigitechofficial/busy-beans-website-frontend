import React from "react";
import { FaCircleUser } from "react-icons/fa6";

const preference = () => {
  return (
    <div className="w-full ">
      <div className=" bg-theme pt-36 sm:pt-[180px] pb-10 relative">
        {/* overlay */}
        <div className="w-full h-full absolute top-0 left-0 z-10 [&>img]:opacity-[0.05] bg-gradient-to-b from-[#00000097] to-transparent pointer-events-none"></div>
        {/* content */}
        <div className="w-[90%] md:w-[75%] mx-auto bg-themeLight border-theme border text-white rounded-xl shadow-md pb-10 relative z-20">
          <div className="mx-6 md:mx-14 border-b border-theme py-6">
            <div className="space-y-2 font-satoshi">
              <h4 className="font-bold text-xl sm:text-3xl">Preferences</h4>
              <p className="text-sm opacity-60">
                Change your language, currency, and accessibility requirements.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-6 font-inter">
            <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
              Currency
            </p>{" "}
            <p className="text-sm sm:text-base font-light opacity-60">$</p>{" "}
            <p className="text-sm sm:text-lg font-medium flex justify-end">
              Edit
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-6 font-inter">
            <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
              Language
            </p>{" "}
            <p className="text-sm sm:text-base font-light opacity-60">
              American English
            </p>{" "}
            <p className="text-sm sm:text-lg font-medium flex justify-end">
              Edit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default preference;
