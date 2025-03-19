import React from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductCard = () => {
  return (
    <div className="max-w-[448px] rounded-md border border-quantityBtn">
    <div className="w-full h-[360px] [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
      <img src="/images/prod.png" alt="" />
    </div>

    <div className="py-3 px-4">
      <h3 className="text-2xl font-switzer font-bold pt-2">
        Whole Bean
      </h3>
      <p className="text-sm py-2">$220.00</p>
      <p className="text-sm pb-3 font-light">
        Straight from the hills of northern Italy. Our Italian Espresso
        makes the perfect specialty coffee every time.
      </p>

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
  )
}

export default ProductCard