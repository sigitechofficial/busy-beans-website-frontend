'use client'
import React from "react";
import Marquee from "react-fast-marquee";

const BrandsMarquee = ({ images, speed = 50, gradient = false }) => {
  return (
    <Marquee speed={speed} gradient={gradient}>
      {images.map((image, index) => (
        <div key={index} className="w-44 sm:w-52  flex justify-center items-center sm:mx-5">
          <img src={image} alt={`Brand ${index}`} />
        </div>
      ))}
    </Marquee>
  );
};

export default BrandsMarquee;
