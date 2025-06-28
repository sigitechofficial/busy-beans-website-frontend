"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useState } from "react";

const testimonials = [
  {
    image:
      "https://user-images.trustpilot.com/678afa76fd77a782d73663a6/73x73.png ",
    name: "Shane Russell",
    company: "US",
    text: `"I recently purchased a Busy Bean home unit and I’m absolutely impressed and in love with the machine. It has renewed my infatuation for fine coffees. The touchscreen interface means a child could operate it and speed at which it produces a stellar cup O’ Joe is mind boggling. This machine is super easy to use and jampacked with features that everyone is sure to love. My wife was initially hesitant to make the switch but now she can’t get enough of the machine either. My only question is why we didn’t make the switch sooner."`,
  },
  {
    image:
      "https://user-images.trustpilot.com/6787c48fe5a8866a4f5bf4dc/73x73.png",
    name: "John Horne",
    company: "US",
    text: `"I recently purchased a Busy Bean Coffee Machine for my law office. It was a fantastic investment. My clients and my staff love the machine. It has become a fast favorite, and it has personally saved me hundreds of dollars on Starbucks runs back and forth from the office. I highly recommend any business owner purchase the Busy Bean Machine to elevate their business. I assure you will not be disappointed.

Also, Leslie Cook, the chief technical specialist, is fantastic. He made the installation process efficient and painless, he came out to my office and trained me and my staff on how to operate it, and even programmed it with all my favorite recipes. True white glove service."`,
  },
  {
    image:
      "https://user-images.trustpilot.com/67859e0fc87d6338d8b22600/73x73.png",
    name: "Lisa Joy",
    company: "US",
    text: `"We've been using Busy Bean Coffee and their coffee makers in all three of our office locations for years, and we couldn't be happier. The coffee is always a hit with both our patients and employees. Having their product has elevated our level of customer service by offering a unique experience above and beyond a typical coffee maker, and patients really enjoy this added touch.
It's incredibly easy to swap out new flavors, and we consistently get compliments on how delicious the lattes are. The machines are reliable and user-friendly. Working with Busy Bean has been a breeze, they have amazing customer service. Highly recommend!"`,
  },
  {
    image:
      "https://user-images.trustpilot.com/677e77f47022c6486997133c/73x73.png",
    name: "Lisa Gufford",
    company: "US",
    text: `"I have been a customer for 10 years, If I could rate higher than a 5 I would!

I don't think of Busy Bean Coffee as a vendor but a Partner in business. The Service is second to none, the quality of the products are first class gourmet coffees.

I highly recommend Busy Bean Coffee company to everyone looking for a great coffee vendor!"`,
  },
  {
    image: "/images/Imageb.png",
    name: "Meahgan",
    company: "US",
    text: `"We absolutely love our Busy Bean coffee machine! At our large retirement community, the machine gets more use than you can imagine, and it’s truly one of the best additions we’ve made for both our residents and staff. It consistently makes the best coffee, and the support team, especially Leslie, has been outstanding—always available and quick to assist with any issues. We would 100% recommend Busy Bean to anyone considering a coffee machine. Who knows, we may even order another one in the future!"`,
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
            <div
              className={` ${
                activeSlide + 1 == index && "duration-200 lg:scale-110"
              } border-1 surface-border border-round mx-2 text-center pt-3 sm:pt-6 pb-3 sm:pb-8 px-3 bg-white rounded-lg my-7 sm:my-16 md:my-16 lg:my-24 font-switzer font-thin text-themeDark`}
            >
              <div className="mb-1.5 sm:mb-3 flex flex-col items-center">
                <img
                  src={testimonial.image}
                  alt="image"
                  className="size-16 rounded-full shrink-0 mb-2 sm:mb-4"
                />
                <p>{testimonial.name}</p>
                <p>{testimonial.company}</p>
              </div>

              <p className="max-sm:text-sm text-center smm:pt-2 line-clamp-[8]">
                {testimonial.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
