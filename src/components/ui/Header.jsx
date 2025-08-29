"use client";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import { FaBars, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ToggleMenu from "./ToggleMenu";
import { useState } from "react";
import DrawerBeans from "./DrawerBeans";
import ProfileDrawer from "./ProfileDrawer";
import { useCart } from "@/utilities/cartContext";

export default function Header() {
  const router = useRouter();
  const { cartItems: cart } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileDrawer, setProfileDrawer] = useState(false);
  const [render, setRender] = useState(false);

  if (typeof window !== "undefined") {
    var accessToken = localStorage.getItem("accessToken");
    var userName = localStorage.getItem("userName");
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
  }

  return (
    <>
      <div className="w-[90%] lg:w-[77%] h-[65px] sm:h-[80px] mx-auto bg-headerColor rounded-2xl my-7 flex justify-between items-center px-[18px] fixed left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <Link href={accessToken ? "/product":"/"} className="w-24 sm:w-28 lg:w-40 object-contain lg:ml-4">
          <img src="/images/logowhite.png" alt="" />
        </Link>

        <div className="hidden md:flex gap-x-6">
          <ul className="flex gap-x-2 xl:gap-x-5 text-base [&>li]:flex [&>li]:cursor-pointer [&>li]:items-center text-white">
            <li>
              <Link href="/our-story">Our Story</Link>
            </li>
            {/* <li>
              <Link href="/financing">Financing</Link>
            </li> */}
            <li>
              <Link href="/recepies">Resources</Link>
            </li>
            <li>
              <Link href="/product">Products</Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex gap-x-2 md:gap-x-3 lg:gap-x-5">
          <div
            className="rounded-xl flex items-center gap-x-2 text-themeLight bg-white px-2 lg:px-4 py-2 text-lg cursor-pointer"
            onClick={() => setDrawerOpen(true)}
          >
            <div className="text-white bg-themeLight rounded-full p-1.5 size-8 flex justify-center items-center relative">
              <IoCart size={18} onClick={() => setDrawerOpen(true)} />

              {cartItems?.length > 0 && (
                <p className="absolute -top-1 -right-1 bg-black text-xs font-semibold rounded-full size-4 flex justify-center items-center">
                  {cart?.length || cartItems?.length}
                </p>
              )}
            </div>
            <p>Cart</p>
          </div>
          {accessToken ? (
            <div
              onClick={() => setProfileDrawer(!profileDrawer)}
              className="bg-white text-white rounded-full flex justify-center items-center p-1 gap-x-5 cursor-pointer"
            >
              <div className=" bg-themeLight rounded-full shrink-0 size-10 text-xs flex justify-center items-center">
                {userName && userName[0] + userName?.split(" ")?.pop()[0]}
              </div>
              <FaChevronDown className="text-themeLight text-xl pr-1" />
            </div>
          ) : (
            <button
              onClick={() => router.push("/sign-in")}
              className="border border-white rounded-xl px-2 lg:px-4 py-2 text-white"
            >
              Log in
            </button>
          )}
        </div>
        {/* for smaller screens md */}
        <div className="hidden max-md:flex items-center gap-x-2">
          <div
            onClick={() => setProfileDrawer(!profileDrawer)}
            className=" bg-themeLight text-white rounded-full shrink-0 size-8 text-xs flex justify-center items-center"
          >
            {userName ? userName[0] + userName?.split(" ")?.pop()[0] : "U"}
          </div>

          {cartItems?.length > 0 && (
            <div className="text-white bg-themeLight rounded-full p-1.5 size-8 flex justify-center items-center relative">
              <IoCart size={18} onClick={() => setDrawerOpen(true)} />

              <p className="absolute -top-1 -right-2 bg-white text-black text-xs font-semibold rounded-full size-4 flex justify-center items-center">
                {cart?.length || cartItems?.length}
              </p>
            </div>
          )}
          {/* <div className="text-white bg-themeLight rounded-full p-1.5 size-8 flex justify-center items-center">
            <FaBars size={18} onClick={toggleMenu} />
          </div> */}
        </div>
      </div>

      {/* <ToggleMenu show={show} toggleMenu={toggleMenu} /> */}
      <DrawerBeans drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <ProfileDrawer
        profileDrawer={profileDrawer}
        setProfileDrawer={setProfileDrawer}
      />
    </>
  );
}
