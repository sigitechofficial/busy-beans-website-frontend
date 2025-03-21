"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { IoCart, IoClose } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

const ToggleMenu = ({ show, toggleMenu }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);
  return (
    <>
      <div
        className={`w-full h-[500px] bg-theme transition-all duration-300 absolute z-50 ${
          show ? "top-0 " : "top-[-600px]"
        } left-0`}
      >
        <div className="mt-5 ms:mt-10 mx-5 sm:mx-10 flex justify-between">
          <ul className="w-full text-white [&>li]:flex [&>li]:items-center [&>li]:gap-x-1 flex flex-col gap-y-3 sm:gap-y-5 ">
            <li>
              <Link
                href="/"
                className="w-24 sm:w-28 lg:w-36 object-contain lg:ml-4"
              >
                <img src="/images/logo.png" alt="" />
              </Link>
            </li>
            <li>
              Our Story <MdKeyboardArrowDown size="20" />
            </li>
            <li>
              Financing <MdKeyboardArrowDown size="20" />
            </li>
            <li>
              Resources <MdKeyboardArrowDown size="20" />
            </li>
            <li>
              Products <MdKeyboardArrowDown size="20" />
            </li>
            <li className="w-full flex justify-between items-center">
              <div className="rounded-xl flex items-center gap-x-2 text-themeLight bg-white px-3  py-1.5 text-sm sm:px-4 sm:py-2 sm:text-lg">
                <IoCart className="text-white bg-themeLight rounded-full p-1 text-xl sm:text-3xl" />
                <p>Cart</p>
              </div>

              <Link
                href="/sign-in"
                // onClick={() => router.push("/sign-in")}
                className="border border-white rounded-xl px-3  py-1.5 text-sm sm:text-xl sm:px-4 sm:py-2  text-white"
              >
                Log in
              </Link>
            </li>
            {/* <li>
             
            </li> */}
          </ul>

          <div
            className={`bg-themeDark rounded-full h-max p-1 mt-2 duration-300 delay-300 absolute top-5 right-5 sm:right-9 ${
              show ? "rotate-180" : "rotate-0"
            } `}
            onClick={toggleMenu}
          >
            <IoClose size="25" color="white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ToggleMenu;
