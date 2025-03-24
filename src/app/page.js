"use client"
import BrandsMarquee from "@/components/ui/BrandsMarquee";
import CustomerCarousel from "@/components/ui/Carousel";
import CoffeSolution from "@/components/ui/CoffeSolution";
import SwiperSider from "@/components/ui/SwiperSlider";

export default function Home() {
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
        <div className="h-[550px] sm:h-[768px] 2xl:h-[950px] bg-theme bg-gradient-to-b from-themeDark to-[#5C4F4A] pt-[220px] sm:pt-[310px] relative">
          <h4 className="bg-gradient-to-r from-[#F8E4BE] to-[#F9C06A38] w-max bg-clip-text text-transparent text-3xl sm:text-5xl lg:text-7xl 2xl:text-[120px] font-robotoSerif font-bold mx-auto lg:leading-[85px] 2xl:leading-[125px]">
            The Future of Coffee
          </h4>
          <h4 className="bg-gradient-to-r from-[#F8E4BE] to-[#F9C06A38] w-max bg-clip-text text-transparent text-3xl sm:text-5xl lg:text-7xl 2xl:text-[120px] font-robotoSerif font-bold mx-auto lg:leading-[85px] 2xl:leading-[125px]">
            for Business
          </h4>

          <p className="h-10 sm:h-14 w-36 sm:w-40 rounded-xl font-robotoSerif font-bold text-base text-[#F8E4BE] bg-themeLight mx-auto flex justify-center items-center mt-10 sm:mt-20 shadow-customYellow">
            Order Now
          </p>

          <div className="w-full h-20 absolute bottom-0 left-0 bg-[url(/images/frame1st.png)] bg-cover bg-center bg-no-repeat z-10"></div>
        </div>

        {/* ==Trusted partners== */}

        <div className="bg-themeLight pb-10 sm:pb-20">
          <h4 className="text-2xl sm:text-4xl lg:text-6xl 2xl:text-8xl text-white text-center font-robotoSerif font-bold mx-auto leading-[100px] sm:leading-[125px]">
            Our Trusted Partners
          </h4>

          <div className="flex justify-center items-center gap-x-5 sm:mt-20">
            <BrandsMarquee images={brandImages} speed={60} gradient={false} />
          </div>
          <div className="flex justify-center items-center gap-x-5 mt-5 sm:mt-8">
            <BrandsMarquee images={brandImages1} speed={50} gradient={false} />
          </div>
        </div>
        {/* ==Providing Services== */}
        <div className=" bg-themeLight bg-gradient-to-b from-themeDark to-themeLight pt-10 sm:py-[100px] relative">
          <div className="w-full h-[300px] absolute top-0 left-0 z-10 [&>img]:opacity-[0.05] bg-gradient-to-b from-[#00000097] to-transparent">
            <img src="/images/frame2foldtexture.png" />
          </div>
          <div className="relative z-20">
            <h4 className="text-xl sm:text-4xl lg:text-6xl  2xl:text-7xl text-white text-center font-robotoSerif font-bold mx-auto sm:leading-[80px] 2xl:leading-[90px]">
              Providing Services to
            </h4>
            <h4 className="text-xl sm:text-4xl lg:text-6xl  2xl:text-7xl text-white text-center font-robotoSerif font-bold mx-auto sm:leading-[80px] 2xl:leading-[90px]">
              Millions of People Worldwide
            </h4>
            <div className="flex justify-center mt-10 sm:mt-24">
              {" "}
              <img src="/images/Container.png" />
            </div>
          </div>
        </div>
        {/* ==Coffee Solution for== */}
        <div className="w-full">
          <CoffeSolution />
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
