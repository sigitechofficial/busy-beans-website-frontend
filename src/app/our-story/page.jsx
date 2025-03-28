"use client";
import SwiperSider from "@/components/ui/SwiperSlider";

export default function story() {
  const brandImages = [
    "/images/cafePrime.png",
    "/images/BistroElite.png",
    "/images/gourmethub.png",
    "/images/dinelux.png",
    "/images/beanmaster.png",
    "/images/roastrite.png",
    "/images/brewpros.png",
    "/images/cafePrime.png",
    "/images/BistroElite.png",
    "/images/gourmethub.png",
    "/images/dinelux.png",
    "/images/beanmaster.png",
    "/images/roastrite.png",
    "/images/brewpros.png",
  ];

  const brandImages1 = [
    "/images/brewpros.png",
    "/images/caffeine.png",
    "/images/javajoint.png",
    "/images/express.png",
    "/images/cafePrime.png",
    "/images/bistroElite.png",
    "/images/gourmethub.png",
    "/images/brewpros.png",
    "/images/caffeine.png",
    "/images/javajoint.png",
    "/images/express.png",
    "/images/cafePrime.png",
    "/images/bistroElite.png",
    "/images/gourmethub.png",
  ];

  return (
    <>
      <div className="w-full ">
        <div className=" bg-themeLight pt-[140px] relative">
          <h2 className="font-playfairDisplay text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center text-white mb-10">
            Our Story
          </h2>

          <div
            role="image"
            aria-label="Busy Bean Our Story"
            className="h-[250px] sm:h-[400px] md:h-[500px] 2xl:h-[800px] bg-[url(/images/ourstory.png)] bg-cover bg-center bg-no-repeat"
          ></div>
        </div>
        {/* ==meet out team== */}

        <div className="w-full bg-themeLight py-10">
          <h4 className="text-xl sm:text-4xl lg:text-6xl  2xl:text-7xl text-white text-center font-robotoSerif font-bold mx-auto pt-4">
            Meet Our Team
          </h4>

          <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-y-4 justify-items-between items-center w-[90%] xl:w-[60%] mx-auto pt-10 lg:pt-20">
            <div className="text-center">
              <img className="mx-auto" src="/images/image 31.png" alt="" />
              <h3 className="text-sm sm:text-xl font-semibold text-white text-center mt-3 font-playfairDisplay">
                Travis Esters
              </h3>
              <p className="my-2 text-sm">Owner, Co-Founder</p>
              <button className="bg-goldenLight rounded-full px-4 py-2 text-black mt-6">
                Send Email
              </button>
            </div>
            <div className="text-center">
              <img className="mx-auto" src="/images/image 32.png" alt="" />
              <h3 className="text-sm sm:text-xl font-semibold text-white text-center mt-3 font-playfairDisplay">
                Joe Argyle
              </h3>
              <p className="my-2 text-sm">Sales</p>
              <button className="bg-goldenLight rounded-full px-4 py-2 text-black mt-6">
                Send Email
              </button>
            </div>
            <div className="text-center">
              <img className="mx-auto" src="/images/image 33.png" alt="" />
              <h3 className="text-sm sm:text-xl font-semibold text-white text-center mt-3 font-playfairDisplay">
                Leslie Cook
              </h3>
              <p className="my-2 text-sm">
                Executive Chef <br /> Director of Technical Services
              </p>
              <button className="bg-goldenLight rounded-full px-4 py-2 text-black mt-2">
                Send Email
              </button>
            </div>
          </div>
        </div>
        {/* ==Our mission== */}

        <div className="w-full bg-themeLight py-10 sm:pt-10 sm:pb-14 max-lg:px-5">
          <h4 className="text-xl sm:text-4xl lg:text-6xl  2xl:text-7xl text-white text-center font-robotoSerif font-bold mx-auto">
            Our Mission and Promise to You
          </h4>

          <p className="font-robotoSerif sm:text-xl font-semibold text-white text-center py-6 sm:py-10">
            "Message From Our Founders"
          </p>
          <p className="text-center text-sm sm:text-lg text-white max-w-[1000px] mx-auto font-switzer font-extralight sm:leading-9">
            Hello and thank you for visiting. We would love to welcome you to
            the Busy Bean Coffee Family.  Busy Bean Coffee is a manufacturer of
            Specialty Coffee Equipment for the Foodservice Industry.  ​Since
            2014, we have been helping hotels, restaurants, Cafes, and bakeries
            implement successful <br /> and very profitable specialty coffee
            programs. ​I would like to personally invite you to try Busy Bean
            Coffee and see what we can do for you. You can stop by one of our
            demo centers around the country or better yet we will come to you.
            <br />
            ​Sincerely,
          </p>
          <p className="text-center text-lg text-white max-w-[1000px] mx-auto font-switzer font-extralight leading-9">
            ​Travis Estes, Co-Founder
          </p>
        </div>

        {/* ==Customer says== */}

        <div className="w-full bg-themeDark pt-10 sm:pt-24 pb-10 max-lg:px-5">
          <h4 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:6xl text-white text-center font-robotoSerif font-bold mx-auto">
            What Our Customers Say About Our Products
          </h4>
          <div className="w-full xl:w-[90%] 2xl:w-[78%] mx-auto">
            <SwiperSider />
          </div>
        </div>
      </div>
    </>
  );
}
