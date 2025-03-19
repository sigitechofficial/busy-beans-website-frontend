import CustomerCarousel from "@/components/ui/Carousel";
import CoffeSolution from "@/components/ui/CoffeSolution";
import SwiperSider from "@/components/ui/SwiperSlider";

export default function Home() {
  return (
    <>
      <div className="w-full ">
        <div className="h-[950px] bg-theme bg-gradient-to-b from-themeDark to-[#5C4F4A] pt-[310px] relative">
          <h4 className="bg-gradient-to-r from-[#F8E4BE] to-[#F9C06A38] w-max bg-clip-text text-transparent text-[120px] font-robotoSerif font-bold mx-auto leading-[125px]">
            The Future of Coffee
          </h4>
          <h4 className="bg-gradient-to-r from-[#F8E4BE] to-[#F9C06A38] w-max bg-clip-text text-transparent text-[120px] font-robotoSerif font-bold mx-auto leading-[125px]">
            for Business
          </h4>

          <p className="h-14 w-40 rounded-xl font-robotoSerif font-bold text-base text-[#F8E4BE] bg-themeLight mx-auto flex justify-center items-center mt-20 shadow-customYellow">
            Order Now
          </p>

          <div className="w-full h-20 absolute bottom-0 left-0 bg-[url(/images/frame1st.png)] bg-contain bg-center bg-no-repeat z-10"></div>
        </div>

        {/* ==Trusted partners== */}

        <div className="bg-themeLight pb-20">
          <h4 className="text-8xl text-white text-center font-robotoSerif font-bold mx-auto leading-[125px]">
            Our Trusted Partners
          </h4>

          <div className="flex justify-center items-center gap-x-5 mt-20">
            <div className="flex gap-x-5 [&>div]:w-48">
              <div>
                <img src="/images/cafePrime.png" />
              </div>
            </div>
            <div className=" flex gap-x-5">
              <div>
                <img src="/images/BistroElite.png" />
              </div>
            </div>
            <div className=" flex gap-x-5">
              <div>
                <img src="/images/gourmethub.png" />
              </div>
            </div>
            <div className=" flex gap-x-5">
              <div>
                <img src="/images/dinelux.png" />
              </div>
            </div>
            <div className=" flex gap-x-5">
              <div>
                <img src="/images/beanmaster.png" />
              </div>
            </div>
            <div className=" flex gap-x-5">
              <div>
                <img src="/images/roastrite.png" />
              </div>
            </div>
            <div className=" flex gap-x-5">
              <div>
                <img src="/images/brewpros.png" />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-x-5 mt-8">
            <div className="flex gap-x-5 [&>div]:w-48">
              <div>
                <img src="/images/brewpros.png" />
              </div>
            </div>
            <div className=" flex gap-x-5">
              <div>
                <img src="/images/caffeine.png" />
              </div>
            </div>
            <div className=" flex gap-x-5">
              <div>
                <img src="/images/javajoint.png" />
              </div>
            </div>
            <div className=" flex gap-x-5">
              <div>
                <img src="/images/express.png" />
              </div>
            </div>
            <div className=" flex gap-x-5">
              <div>
                <img src="/images/cafePrime.png" />
              </div>
            </div>
            <div className=" flex gap-x-5">
              <div>
                <img src="/images/bistroElite.png" />
              </div>
            </div>
            <div className=" flex gap-x-5">
              <div>
                <img src="/images/gourmethub.png" />
              </div>
            </div>
          </div>
        </div>
        {/* ==Providing Services== */}
        <div className=" bg-themeLight bg-gradient-to-b from-themeDark to-themeLight py-[100px] relative">
          <div className="w-full h-[300px] absolute top-0 left-0 z-10 [&>img]:opacity-[0.05] bg-gradient-to-b from-[#00000097] to-transparent">
            <img src="/images/frame2foldtexture.png" />
          </div>
          <div className="relative z-20">
            <h4 className="text-7xl text-white text-center font-robotoSerif font-bold mx-auto leading-[90px]">
              Providing Services to
            </h4>
            <h4 className="text-7xl text-white text-center font-robotoSerif font-bold mx-auto leading-[90px]">
              Millions of People Worldwide
            </h4>
            <div className="flex justify-center mt-24">
              {" "}
              <img src="/images/Container.png" />
            </div>
          </div>
        </div>
        {/* ==Coffee Solution for== */}

        <CoffeSolution />

        {/* ==Our mission== */}

        <div className="w-full bg-themeLight pt-32 pb-14">
          <h4 className="text-7xl text-white text-center font-robotoSerif font-bold mx-auto">
            Our Mission and Promise to You
          </h4>

          <p className="font-robotoSerif text-xl font-semibold text-white text-center py-10">
            "Message From Our Founders"
          </p>
          <p className="text-center text-lg text-white max-w-[1000px] mx-auto font-switzer font-extralight leading-9">
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

        <div className="w-full bg-themeDark pt-24 pb-10">
          <h4 className="text-6xl text-white text-center font-robotoSerif font-bold mx-auto">
            What Our Customers Say About Our Products
          </h4>
          <div className="w-[78%] mx-auto">
            <SwiperSider />
          </div>
        </div>
      </div>
    </>
  );
}
