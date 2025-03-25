"use client";
import SwiperSider from "@/components/ui/SwiperSlider";
import dynamic from "next/dynamic";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

export default function page() {
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
            Busy Bean Coffee
          </h2>
          <h2 className="font-playfairDisplay text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center text-white mb-10 mt-[-40px] sm:mt-[-30px]">
            Executive Chef Leslie
          </h2>

          <div className="h-[300px] sm:h-[500px] md:h-[600px] 2xl:h-[900px] bg-[url(/images/recepies.png)] bg-cover bg-center bg-no-repeat"></div>
        </div>
        {/* ==Carousel== */}
        <div className="w-full bg-themeLight py-5 sm:py-10">
          <h4 className="text-xl sm:text-4xl lg:text-6xl  2xl:text-7xl text-white text-center font-robotoSerif font-bold mx-auto pt-4">
            Coffee Dry Rub
          </h4>

          <Swiper
            navigation={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            <SwiperSlide>
              {" "}
              <div className="w-[90%] 2xl:w-[80%] mx-auto flex gap-x-8 lg:gap-x-[8%] my-10 lg:my-20 text-white relative overflow-hidden group">
                <div className="flex-1 h-[300px] sm:h-[450px] xl:h-[600px]">
                  <img
                    className="w-full h-full object-cover max-lg:rounded-lg"
                    src="/images/r2.png"
                    alt=""
                  />
                </div>

                <div className="flex-1 rounded-lg max-lg:absolute bottom-[-100%] max-lg:group-hover:bg-theme/50 max-lg:group-hover:bottom-0 transition-all duration-300 left-0 px-4 sm:px-20 overflow-y-auto max-lg:pt-2 max-lg:h-full max-lg:backdrop-blur-xl lg:px-0 w-full lg:flex flex-col justify-center font-switzer text-sm 2xl:text-xl">
                  <p>
                    The Busy Bean Coffee universal dry rub has a diversity of
                    usage. Apply dry rub to any protein chicken, beef, pork,
                    fish, vegetables and get ready for a rich smoky, savory
                    experience. The dry rub can be utilized on the grill, sauté,
                    or braising. It can add flavor to French fries, potato
                    chips, soups, or sauces.
                  </p>
                  <p className="my-5">
                    This recipe can be used to add flavor to chicken, beef,
                    pork, fish or vegetables.
                  </p>
                  <ul className="leading-tight">
                    <li>Ingredients:</li>
                    <li>2 cup Busy Bean Medium Ground Coffee</li>
                    <li>2 ½ cups Brown Sugar</li>
                    <li>2 oz Onion Powder</li>
                    <li>1 oz Ole Bay</li>
                    <li>½ Cup garlic powder</li>
                    <li>1 oz Ground Mustard</li>
                    <li>1 oz Turmeric</li>
                    <li>2 oz Salt</li>
                    <li>2 oz Chili Powder</li>
                    <li>4 oz Spanish Paprika</li>
                    <li>2 oz Butt Rub</li>
                    <li>2 oz Black Pepper</li>
                    <li>2 oz Cumin</li>
                  </ul>
                  <p className="mt-3">Step 1: Combine all ingredients.</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[90%] 2xl:w-[80%] mx-auto flex flex-row-reverse gap-x-8 lg:gap-x-[8%] my-10 lg:my-20 text-white relative overflow-hidden group">
                <div className="flex-1 h-[300px] sm:h-[450px] xl:h-[600px]">
                  <img
                    className="w-full h-full object-cover max-lg:rounded-lg"
                    src="/images/r4.png"
                    alt=""
                  />
                </div>

                <div className="flex-1 rounded-lg max-lg:absolute bottom-[-100%] max-lg:group-hover:bg-theme/50 max-lg:group-hover:bottom-0 transition-all duration-300 left-0 px-4 sm:px-20 overflow-y-auto max-lg:pt-2 max-lg:h-full max-lg:backdrop-blur-xl lg:px-0 w-full lg:flex flex-col justify-center font-switzer text-sm 2xl:text-xl">
                  <ul className="leading-tight">
                    <li>Ingredients:</li>
                    <li>13 Egg Yolks </li>
                    <li>2 Quarts Heavy Crème</li>
                    <li>1 cup Busy Bean French Vanilla</li>
                  </ul>
                  <p className="my-3">
                    This recipe can be used to add flavor to chicken, beef,
                    pork, fish or vegetables.
                  </p>

                  <ul className="space-y-3 mt-3 leading-tight">
                    <li>
                      Step 1) <br />
                      Begin by steeping Heavy cream, bring to a boil and take
                      off the heat source.
                    </li>
                    <li>
                      Step 2) <br /> In a stainless-steel mixing bowl, place 9
                      egg yolks and whisks. Combine sugar and French vanilla.
                      Mix until pale yellow and eggs begin to thicken.
                    </li>
                    <li>
                      Step 3) <br /> Temper egg mixture with hot cream, a steady
                      stream of cream and whisking continuously.
                    </li>
                    <li>
                      Step 4) <br /> Pour crème Brule into ramekins and place in
                      hot water bath, cover with aluminum foil and place a hole
                      at the corner of the pan so steam can escape. Bake at 350
                      for 30-45 min.
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[90%] 2xl:w-[80%] mx-auto flex gap-x-8 lg:gap-x-[8%] my-10 lg:my-20 text-white relative overflow-hidden group">
                <div className="flex-1 h-[300px] sm:h-[450px] xl:h-[600px]">
                  <img
                    className="w-full h-full object-cover max-lg:rounded-lg"
                    src="/images/r3.png"
                    alt=""
                  />
                </div>

                <div className="flex-1 rounded-lg max-lg:absolute bottom-[-100%] max-lg:group-hover:bg-theme/50 max-lg:group-hover:bottom-0 transition-all duration-300 left-0 px-4 sm:px-20 overflow-y-auto max-lg:pt-2 max-lg:h-full max-lg:backdrop-blur-xl lg:px-0 w-full lg:flex flex-col justify-center font-switzer text-sm 2xl:text-xl">
                  <ul className="leading-tight">
                    <li>Ingredients:</li>
                    <li>1 lb Unsweetened Choc</li>
                    <li>1 lb Unsalted Butter Soften</li>
                    <li>7 Eggs</li>
                    <li>1 Bag Busy Bean Hot Chocolate Mix</li>
                    <li>1 Cup Espresso Chocolate</li>
                    <li>2 Bags Chocolate Chips</li>
                    <li>1 Cup Light corn syrup</li>
                    <li>1 lb Cake Flour</li>
                    <li>1-Pint Sugar</li>
                  </ul>
                  <ul className="space-y-3 mt-3 leading-tight">
                    <li>
                      Step 1) <br />
                      Using a wire whisk on kitchen aid mixer. Cream sugar, corn
                      syrup, butter, and eggs until pale yellow.
                    </li>
                    <li>
                      Step 2) <br />
                      Add Busy Bean Hot Chocolate mix and espresso chocolate.
                    </li>
                    <li>
                      Step 3) <br />
                      Add Cake Flour.
                    </li>
                    <li>
                      Step 4) <br /> Add Chocolate Chips
                    </li>
                    <li>
                      Step 5) <br />
                      Grease large muffin pan, ladle 7 oz potions into a pan.
                      Bake at 350 for 30min.
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
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
