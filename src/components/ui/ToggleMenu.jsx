"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { IoCart, IoClose } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/navigation";

const ToggleMenu = ({ show, toggleMenu }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    var accessToken = JSON.parse(localStorage.getItem("accessToken")) ?? "";
  }
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
        className={`w-full h-max pb-10 bg-theme transition-all duration-300 absolute rounded-b-lg z-50 ${
          show ? "top-0 " : "top-[-600px]"
        } left-0`}
      >
        <div className="mt-5 ms:mt-10 mx-5 sm:mx-10 flex justify-between">
          <ul className="w-full text-white [&>li]:flex [&>li]:items-center [&>li]:gap-x-1 flex flex-col gap-y-3 sm:gap-y-5 ">
            <li>
              <Link
                href="/"
                className="w-32 lg:w-36 object-contain lg:ml-4"
              >
                <img src="/images/logowhite.png" alt="" />
              </Link>
            </li>
            <li
              onClick={() => {
                router.push("/our-story");
                toggleMenu();
              }}
            >
              Our Story
            </li>
            <li
              onClick={() => {
                router.push("/financing");
                toggleMenu();
              }}
            >
              Financing
            </li>
            <li
              onClick={() => {
                router.push("/recepies");
                toggleMenu();
              }}
            >
              Resources
            </li>
            <li
              onClick={() => {
                router.push("/product");
                toggleMenu();
              }}
            >
              Products
            </li>
            <li>
              {!accessToken && (
                <Link
                  href="/sign-in"
                  // onClick={() => router.push("/sign-in")}
                  className="border border-white rounded-xl px-3  py-1.5 text-sm sm:text-xl sm:px-4 sm:py-2  text-white"
                >
                  Log in
                </Link>
              )}
            </li>
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
