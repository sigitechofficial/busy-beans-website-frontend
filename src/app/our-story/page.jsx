import BrandsMarquee from "@/components/ui/BrandsMarquee";
import CustomerCarousel from "@/components/ui/Carousel";
import CoffeSolution from "@/components/ui/CoffeSolution";
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
        {/* <div className=" bg-themeLight pt-[140px] relative">
          <h2 className="font-playfairDisplay text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center text-white mb-10">
            Our Story
          </h2>

          <div className="h-60 sm:h-96 bg-[#FFF3DDCC]">
            <img src="/images/ourstory.png" alt="" />
          </div>
        </div> */}
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
