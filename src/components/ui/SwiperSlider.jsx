"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useState } from "react";

const testimonials = [
  {
    image: "/images/Imagea.png",
    name: "Trish B",
    company: "Parks Lincoln of Longwood",
    text: `"I have worked at Parks Lincoln of Longwood for 25 years. I have had coffee companies come and go. I can tell you that since we installed our Busy Bean Coffee machine our customers love it and so do the employees. The machine itself has added class to our waiting area and having fresh ground coffee along with specialty coffee is a great addition for our customer satisfaction..Thanks Busy Bean"`,
  },
  {
    image: "/images/Imageb.png",
    name: "Trish B",
    company: "Parks Lincoln of Longwood",
    text: `"I have worked at Parks Lincoln of Longwood for 25 years. I have had coffee companies come and go. I can tell you that since we installed our Busy Bean Coffee machine our customers love it and so do the employees. The machine itself has added class to our waiting area and having fresh ground coffee along with specialty coffee is a great addition for our customer satisfaction..Thanks Busy Bean"`,
  },
  {
    image: "/images/Imagec.png",
    name: "Trish B",
    company: "Parks Lincoln of Longwood",
    text: `"I have worked at Parks Lincoln of Longwood for 25 years. I have had coffee companies come and go. I can tell you that since we installed our Busy Bean Coffee machine our customers love it and so do the employees. The machine itself has added class to our waiting area and having fresh ground coffee along with specialty coffee is a great addition for our customer satisfaction..Thanks Busy Bean"`,
  },
  {
    image: "/images/Imagea.png",
    name: "Trish B",
    company: "Parks Lincoln of Longwood",
    text: `"I have worked at Parks Lincoln of Longwood for 25 years. I have had coffee companies come and go. I can tell you that since we installed our Busy Bean Coffee machine our customers love it and so do the employees. The machine itself has added class to our waiting area and having fresh ground coffee along with specialty coffee is a great addition for our customer satisfaction..Thanks Busy Bean"`,
  },
  {
    image: "/images/Imageb.png",
    name: "Trish B",
    company: "Parks Lincoln of Longwood",
    text: `"I have worked at Parks Lincoln of Longwood for 25 years. I have had coffee companies come and go. I can tell you that since we installed our Busy Bean Coffee machine our customers love it and so do the employees. The machine itself has added class to our waiting area and having fresh ground coffee along with specialty coffee is a great addition for our customer satisfaction..Thanks Busy Bean"`,
  },
  {
    image: "/images/Imagec.png",
    name: "Trish B",
    company: "Parks Lincoln of Longwood",
    text: `"I have worked at Parks Lincoln of Longwood for 25 years. I have had coffee companies come and go. I can tell you that since we installed our Busy Bean Coffee machine our customers love it and so do the employees. The machine itself has added class to our waiting area and having fresh ground coffee along with specialty coffee is a great addition for our customer satisfaction..Thanks Busy Bean"`,
  },
  {
    image: "/images/Imagea.png",
    name: "Trish B",
    company: "Parks Lincoln of Longwood",
    text: `"I have worked at Parks Lincoln of Longwood for 25 years. I have had coffee companies come and go. I can tell you that since we installed our Busy Bean Coffee machine our customers love it and so do the employees. The machine itself has added class to our waiting area and having fresh ground coffee along with specialty coffee is a great addition for our customer satisfaction..Thanks Busy Bean"`,
  },
  {
    image: "/images/Imageb.png",
    name: "Trish B",
    company: "Parks Lincoln of Longwood",
    text: `"I have worked at Parks Lincoln of Longwood for 25 years. I have had coffee companies come and go. I can tell you that since we installed our Busy Bean Coffee machine our customers love it and so do the employees. The machine itself has added class to our waiting area and having fresh ground coffee along with specialty coffee is a great addition for our customer satisfaction..Thanks Busy Bean"`,
  },
  {
    image: "/images/Imagec.png",
    name: "Trish B",
    company: "Parks Lincoln of Longwood",
    text: `"I have worked at Parks Lincoln of Longwood for 25 years. I have had coffee companies come and go. I can tell you that since we installed our Busy Bean Coffee machine our customers love it and so do the employees. The machine itself has added class to our waiting area and having fresh ground coffee along with specialty coffee is a great addition for our customer satisfaction..Thanks Busy Bean"`,
  },
  
];

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.activeIndex);
  };

  return (
    <>
      <Swiper
        slidesPerView={3}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },

          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
        }}
        onSlideChange={handleSlideChange}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className={` ${activeSlide+1==index&&"duration-200 lg:scale-110"} border-1 surface-border border-round mx-2 text-center pt-3 sm:pt-6 pb-3 sm:pb-8 px-3 bg-white rounded-lg my-7 sm:my-16 md:my-16 lg:my-24 font-switzer font-thin text-themeDark`}>
              <div className="mb-1.5 sm:mb-3 flex flex-col items-center">
                <img
                  src={testimonial.image}
                  alt="image"
                  className="size-16 rounded-full shrink-0 mb-2 sm:mb-4"
                />
                <p>{testimonial.name}</p>
                <p>{testimonial.company}</p>
              </div>

              <p className="max-sm:text-sm text-center smm:pt-2">
                {testimonial.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
