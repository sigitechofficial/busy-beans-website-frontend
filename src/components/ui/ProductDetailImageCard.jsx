import React from "react";

export default function ProductDetailImageCard() {
  return (
    <div className="border border-cardBorderColor/80 rounded-[4px] h-32 w-28 px-3 flex items-center justify-center bg-[#FFF8EE33]/20">
      <img
        src="/images/prod-detail.png"
        alt=""
        className=" object-contain h-ful full"
      />
    </div>
  );
}
