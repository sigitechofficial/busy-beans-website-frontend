import React from "react";
import { FaFacebookF, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="w-full bg-[#3D332B] ">
      <div className="w-[90%] lg:w-[77%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-12 text-white font-robotoSerif pt-8 sm:pt-14">
        <div>
          <div className="">
            <img src="/images/mafsi.png" alt="" />
          </div>
          <div className="my-4">
            <img src="/images/aq.png" alt="" />
          </div>

          <p className="font-extralight">
            We stand behind the quality of all of our product and are happy to
            answer any questions.
          </p>
        </div>

        <div className="md:justify-self-center space-y-4">
          <p>Questions or Concerns?</p>
          <p>Call (833) THE-BEAN</p>
          <p>
            Email: 
            <span className="underline underline-offset-3">
              info@busybeancoffee.com{" "}
            </span>
          </p>
        </div>

        <div className="md:justify-self-end">
          <p>FOLLOW US ON MEDIA</p>
          <div>
            <div className="flex [&>div]:flex [&>div]:justify-center [&>div]:items-center gap-2 [&>div]:rounded-md [&>div]:bg-gradient-to-b [&>div]:from-themeLight [&>div]:to-theme [&>div]:p-1 [&>div]:size-10 [&>div]:my-7">
              <div>
                <FaFacebookF />
              </div>
              <div>
                <IoLogoTwitter />
              </div>
              <div>
                <FaLinkedinIn />
              </div>
              <div>
                <FaPinterest />
              </div>
            </div>
          </div>
          <p className="font-light underline underline-offset-4">
            JOIN OUR TEAM
          </p>
          <p className="font-light underline underline-offset-4 mt-2">BLOG</p>
        </div>
      </div>
      <p className="md:text-xl text-center text-white mt-16 sm:mt-28 pb-10 font-robotoSerif">
        Mailing Address: PO Box 350, Mount Pleasant, SC 29464
      </p>
    </div>
  );
};

export default Footer;
