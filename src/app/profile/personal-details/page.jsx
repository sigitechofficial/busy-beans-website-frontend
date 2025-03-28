import React from "react";
import { FaCircleUser } from "react-icons/fa6";

const personalDetails = () => {
  return (
    <div className="w-full ">
      <div className=" bg-theme pt-32 sm:pt-[180px] pb-10 relative">
        {/* overlay */}
        <div className="w-full h-full absolute top-0 left-0 z-10 [&>img]:opacity-[0.05] bg-gradient-to-b from-[#00000097] to-transparent pointer-events-none"></div>
        {/* content */}
        <div className="w-[90%] md:w-[75%] mx-auto bg-themeLight border-theme border text-white rounded-xl shadow-md pb-10 relative z-20">
          <div className="flex justify-between items-center mx-6 md:mx-14 border-b  border-theme py-3 sm:py-6">
            <div className="space-y-2 font-satoshi">
              <h4 className="font-bold text-xl sm:text-3xl">
                Personal details
              </h4>
              <p className="text-sm opacity-60">
                Upload your info and find how it’s used.
              </p>
            </div>
            <div>
              <FaCircleUser size={50} />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
            <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
              Name
            </p>{" "}
            <p className="text-sm sm:text-base font-light opacity-60">
              Sigi Technologies
            </p>{" "}
            <p className="text-sm sm:text-lg font-medium flex justify-end">
              Edit
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
            <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
              Company Name
            </p>{" "}
            <p className="text-sm sm:text-base font-light opacity-60">
              Choose a display name
            </p>{" "}
            <p className="text-sm sm:text-lg font-medium flex justify-end">
              Edit
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 py-3 sm:py-6 font-inter max-lg:border-b border-theme ">
            <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
              Email address
            </p>
            <div className="text-lg font-light space-y-2">
              <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2 opacity-60">
                Sigitechnologies@gmail.com
              </p>
              <p className="text-xs opacity-60">
                This is the email address you can to sign in.
              </p>
            </div>
            <p className="text-sm sm:text-lg font-medium flex justify-end">
              Edit
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
            <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
              Email to send invoice
            </p>{" "}
            <div className="text-lg font-light space-y-2">
              <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2 opacity-60">
                Sigitechnologies@gmail.com
              </p>
              <p className="text-xs opacity-60">This email use to send Invoice</p>
            </div>
            <p className="text-sm sm:text-lg font-medium flex justify-end">
              Edit
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
            <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
              Phone Number
            </p>{" "}
            <p className="text-sm sm:text-base font-light opacity-60">
              +92876776893
            </p>{" "}
            <p className="text-sm sm:text-lg font-medium flex justify-end">
              Edit
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
            <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
              Sales Tax Number
            </p>{" "}
            <p className="text-sm sm:text-base font-light opacity-60">-</p>{" "}
            <p className="text-sm sm:text-lg font-medium flex justify-end">
              Edit
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
            <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
              Address
            </p>{" "}
            <p className="text-sm sm:text-base font-light opacity-60">
              Add your address
            </p>{" "}
            <p className="text-sm sm:text-lg font-medium flex justify-end">
              Edit
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
            <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
              Password
            </p>{" "}
            <p className="text-sm sm:text-base font-light opacity-60">
              ********
            </p>{" "}
            <p className="text-sm sm:text-lg font-medium flex justify-end">
              Change Password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default personalDetails;
