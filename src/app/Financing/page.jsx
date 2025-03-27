"use client";
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="h-[550px] sm:h-[768px] 2xl:h-[800px] bg-theme bg-gradient-to-b from-themeDark to-[#5C4F4A] pt-[220px] sm:pt-[310px] relative">
        <h4 className="text-center py-4 bg-gradient-to-r from-[#F8E4BE] to-[#F9C06A38] w-max bg-clip-text text-transparent text-xl sm:text-3xl lg:text-6xl 2xl:text-[90px] font-robotoSerif font-bold mx-auto">
          Coming in the Next Phase!
        </h4>
        <h4 className="text-center bg-gradient-to-r from-[#F8E4BE] to-[#F9C06A38] bg-clip-text text-transparent text-xs md:text-base xl:text-xl font-robotoSerif font-bold mx-auto">
          "We’re working on this section as part of our next release. Stay tuned
          for exciting updates!"
        </h4>

        <div className="w-full h-20 absolute bottom-0 left-0 bg-[url(/images/frame1st.png)] bg-cover bg-center bg-no-repeat z-10"></div>
      </div>
    </div>
  );
};

export default page;
