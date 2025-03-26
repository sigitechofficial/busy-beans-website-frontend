import React from "react";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="w-full bg-[#3D332B] ">
      <div className="w-[90%] lg:w-[77%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-5 sm:gap-y-12 text-white font-robotoSerif pt-4 sm:pt-14">
        <div className="space-y-1.5 sm:space-y-3">
          <div className="w-24 sm:w-40">
            <img src="/images/mafsi.png" alt="mafsi logo" />
          </div>

          <div className="sm:my-4 w-28 sm:w-40">
            <img src="/images/aq.png" alt="auto quotes" />
          </div>

          <p className="font-extralight text-xs sm:text-base">
            We stand behind the quality of all of our product and are happy to
            answer any questions.
          </p>
        </div>

        <div className="md:justify-self-center space-y-1 sm:space-y-4 text-xs sm:text-base">
          <p>Questions or Concerns?</p>
          <p>Call (833) THE-BEAN</p>
          <p>
            Email: 
            <span className="underline underline-offset-3">
              info@busybeancoffee.com
            </span>
          </p>
        </div>

        <div className="md:justify-self-end text-xs sm:text-base">
          <p>FOLLOW US ON MEDIA</p>
          <div>
            <div className="flex [&>div]:cursor-pointer [&>div]:flex [&>div]:justify-center [&>div]:items-center gap-2 [&>div]:rounded-md [&>div]:bg-gradient-to-b [&>div]:from-themeLight [&>div]:to-theme [&>div]:p-1 [&>div]:size-10 [&>div]:my-2 sm:[&>div]:my-7">
              <div
                onClick={() =>
                  (window.location.href =
                    "https://www.facebook.com/busybeancoffeeinc/")
                }
              >
                <FaFacebookF className="text-xl" />
              </div>
              <div
                onClick={() =>
                  (window.location.href = "https://twitter.com/busybean_coffee")
                }
              >
                <IoLogoTwitter className="text-xl" />
              </div>
              <div
                onClick={() =>
                  (window.location.href =
                    "https://www.linkedin.com/in/thecoffeeman")
                }
              >
                <FaLinkedinIn className="text-xl" />
              </div>
              <div
                onClick={() =>
                  (window.location.href =
                    "https://www.instagram.com/busybean_coffee/")
                }
              >
                <BiLogoInstagramAlt className="text-xl" />
              </div>
            </div>
          </div>
          <p className="font-light underline underline-offset-4">
            JOIN OUR TEAM
          </p>
          <p className="font-light underline underline-offset-4 mt-2">BLOG</p>
        </div>
      </div>
      <p className="font-extralight sm:font-normal text-xs md:text-xl text-center text-white mt-8 sm:mt-16 md:mt-28 pb-5 sm:pb-10 font-robotoSerif">
        Mailing Address: PO Box 350, Mount Pleasant, SC 29464
      </p>
    </div>
  );
};

export default Footer;
