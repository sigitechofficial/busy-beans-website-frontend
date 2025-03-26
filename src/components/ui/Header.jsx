"use client";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ToggleMenu from "./ToggleMenu";
import { useState } from "react";
import DrawerBeans from "./DrawerBeans";

export default function Header() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleMenu = () => {
    setShow(!show);
  };

  if (typeof window !== "undefined") {
    var accessToken = JSON.parse(localStorage.getItem("accessToken")) ?? "";
  }

  return (
    <>
      <div className="w-[90%] lg:w-[77%] h-[65px] sm:h-[80px] mx-auto bg-headerColor rounded-2xl my-7 flex justify-between items-center px-[18px] absolute left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <Link href="/" className="w-24 sm:w-28 lg:w-36 object-contain lg:ml-4">
          <img src="/images/logowhite.png" alt="" />
        </Link>

        <div className="hidden md:flex gap-x-6">
          <ul className="flex gap-x-2 xl:gap-x-5 text-sm [&>li]:flex [&>li]:cursor-pointer [&>li]:items-center text-white">
            <li onClick={() => router.push("/our-story")}>Our Story</li>
            <li onClick={() => router.push("/Financing")}>Financing</li>
            <li onClick={() => router.push("/recepies")}>Resources</li>
            <li onClick={() => router.push("/product")}>Products</li>
          </ul>
        </div>

        <div className="hidden md:flex gap-x-2 md:gap-x-3 lg:gap-x-5">
          <div
            className="rounded-xl flex items-center gap-x-2 text-themeLight bg-white px-2 lg:px-4 py-2 text-lg cursor-pointer"
            onClick={() => setDrawerOpen(true)}
          >
            <IoCart className="text-white bg-themeLight rounded-full p-1 text-3xl" />
            <p>Cart</p>
          </div>
          {!accessToken && (
            <button
              onClick={() => router.push("/sign-in")}
              className="border border-white rounded-xl px-2 lg:px-4 py-2 text-white"
            >
              Log in
            </button>
          )}
        </div>
        <div className="hidden max-md:flex items-center gap-x-2">
          <IoCart
            className="text-white bg-themeLight rounded-full p-1 text-3xl"
            onClick={() => setDrawerOpen(true)}
          />
          <FaBars size="25" color="white" onClick={toggleMenu} />
        </div>
      </div>

      <ToggleMenu show={show} toggleMenu={toggleMenu} />
      <DrawerBeans drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
}
