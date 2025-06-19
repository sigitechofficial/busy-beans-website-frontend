import { DateTime } from "@/utilities/DateTime";
import React from "react";
import { FaCheck } from "react-icons/fa";

export default function TrackOrderTab(props) {
  const { heading, status, time, stepNo } = props;
  console.log("🚀 ~ TrackOrderTab ~ time:", time)
  return (
    <div className="flex items-center gap-x-4 p-4 rounded-lg border w-full max-w-[400px] mt-4 cursor-pointer">
      <div
        className={`${
          status ? "bg-themeGreen" : "bg-themeGray3"
        } size-10 flex justify-center items-center shrink-0 rounded-full text-black font-semibold`}
      >
        {status ? <FaCheck color="#FFFFFF" size={20} />: stepNo}
      </div>
      <div>
        <p className="text-start">{heading}</p>
        <p className="text-opacity-80 text-white text-sm">{time ? DateTime(time):""}</p>
      </div>
    </div>
  );
}
