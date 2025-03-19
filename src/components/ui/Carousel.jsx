"use client";

// components/CustomerCarousel.js
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";

export default function CustomerCarousel() {
  const [products, setProducts] = useState([]);

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      image: "/images/Imagea.png",
      inventoryStatus: "INSTOCK",
    },
    {
      id: 2,
      name: "Product 2",
      price: 49.99,
      image: "/images/Imageb.png",
      inventoryStatus: "LOWSTOCK",
    },
    {
      id: 3,
      name: "Product 3",
      price: 19.99,
      image: "/images/Imagec.png",
      inventoryStatus: "OUTOFSTOCK",
    },
    {
      id: 4,
      name: "Product 4",
      price: 59.99,
      image: "/images/Imagea.png",
      inventoryStatus: "INSTOCK",
    },
    {
      id: 5,
      name: "Product 5",
      price: 39.99,
      image: "/images/Imageb.png",
      inventoryStatus: "INSTOCK",
    },
    {
      id: 5,
      name: "Product 5",
      price: 39.99,
      image: "/images/Imagec.png",
      inventoryStatus: "INSTOCK",
    },
    // Add more mock products if needed
  ];

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  // Get the severity of the product (INSTOCK, LOWSTOCK, OUTOFSTOCK)
  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";
      case "LOWSTOCK":
        return "warning";
      case "OUTOFSTOCK":
        return "danger";
      default:
        return null;
    }
  };

  // Product template for displaying each product in the carousel
  const productTemplate = (product) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center pt-6 pb-8 px-3 mx-7 bg-white rounded-lg my-24 font-switzer font-thin text-themeDark">
        <div className="mb-3 flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            className="size-16 rounded-full shrink-0 mb-4"
          />
          <p>Trish B</p>
          <p> Parks Lincoln of Longwood</p>
        </div>

        <p className="text-center pt-2">
          "I have worked at Parks Lincoln of Longwood for 25 years. I have had
          coffee companies come and go. I can tell you that since we installed
          our Busy Bean Coffee machine our customers love it and so do the
          employees. The machine itself  has added class to our waiting area and
          having fresh ground coffee along with specialty coffee is a great
          addition for our customer satisfaction..Thanks Busy Bean"
        </p>
      </div>
    );
  };

  // Responsive options for the carousel
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  return (
    <div className="card">
      <Carousel
        value={products}
        numScroll={1}
        numVisible={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
      />
    </div>
  );
}
