'use client'
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";


export default function Header() {
  const router = useRouter()
  return (
    <>
      <div className="w-[90%] lg:w-[77%] h-[80px] mx-auto bg-headerColor rounded-2xl my-7 flex justify-between items-center px-[18px] absolute left-1/2 -translate-x-1/2 z-50">
        <div className="w-28 lg:w-36 object-contain lg:ml-4">
          <img src="/images/logo.png" alt="" />
        </div>

        <div className="hidden md:flex gap-x-6">
          <ul className="flex gap-x-2 xl:gap-x-5 text-sm [&>li]:flex [&>li]:cursor-pointer [&>li]:items-center text-white">
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
          </ul>
        </div>

        <div className="hidden md:flex gap-x-3 lg:gap-x-5">
          <div className="rounded-xl flex items-center gap-x-2 text-themeLight bg-white px-4 py-2 text-lg">
            <IoCart className="text-white bg-themeLight rounded-full p-1 text-3xl" />
            <p>Cart</p>
          </div>
          <button onClick={() => router.push('/sign-in')} className="border border-white rounded-xl px-4 py-2 text-white">
            Log in
          </button>
        </div>
        <div className="hidden max-md:flex">
          <FaBars size="25" color="white" />
        </div>
      </div>
    </>
  );
}
