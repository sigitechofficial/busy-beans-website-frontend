"use client";
import BrandsMarquee from "@/components/ui/BrandsMarquee";
import CustomerCarousel from "@/components/ui/Carousel";
import CoffeSolution from "@/components/ui/CoffeSolution";
import SwiperSider from "@/components/ui/SwiperSlider";
import socket from "@/utilities/Socket";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
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

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Busy Bean Coffee",
      url: "https://www.busybeancoffee.com/",
      logo: "https://www.busybeancoffee.com/images/logowhite.png",
      sameAs: [
        "https://www.facebook.com/busybeancoffee",
        "https://www.instagram.com/busybean_coffee",
        "https://x.com/busybean_coffee",
        "https://www.youtube.com/channel/UC4b4PYax5H3jRSyw4r0MCjQ",
        "https://www.linkedin.com/company/busy-bean-coffee",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        telephone: "+1-833-843-2326",
        email: "info@busybeancoffee.com",
      },
      foundingDate: "2014",
      address: {
        "@type": "PostalAddress",
        addressCountry: "USA",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "https://www.busybeancoffee.com/",
      name: "Busy Bean Coffee",
      description:
        "Wholesale specialty coffee beans, creamers, syrups and support for cafés, hotels, stores & bakeries. High-margin products delivered fresh.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you offer free coffee samples?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! You can request a free sample of any coffee blend to try before you buy.",
          },
        },
        {
          "@type": "Question",
          name: "What types of businesses do you serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We serve restaurants, cafés, hotels, bakeries, grocery stores, cafeterias, and more.",
          },
        },
        {
          "@type": "Question",
          name: "Can I set up recurring orders?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our online portal allows you to schedule repeat deliveries with ease.",
          },
        },
        {
          "@type": "Question",
          name: "What sizes do your coffee beans come in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer 5 lb and 25 lb bulk packaging for commercial use.",
          },
        },
      ],
    },
  ];

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
      socket.emit("message", "Hello from client!");
    });
  }, []);

  return (
    <>
      <Head>
        <title>Premium Coffee Beans & Add-Ons for Businesses</title>
        <meta
          name="description"
          content="Wholesale specialty coffee beans, creamers & syrups with expert support for cafés, hotels, bakeries & stores. Fresh taste, high margins, fast delivery."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="w-full ">
        <div className="h-[550px] sm:h-[768px] 2xl:h-[950px] bg-theme bg-gradient-to-b from-themeDark to-[#5C4F4A] pt-[220px] sm:pt-[310px] relative">
          <h4 className="text-center bg-gradient-to-r from-[#F8E4BE] to-[#F9C06A38] w-max bg-clip-text text-transparent text-3xl sm:text-5xl lg:text-7xl 2xl:text-[120px] font-robotoSerif font-bold mx-auto lg:leading-[85px] 2xl:leading-[125px]">
            The Future Of Coffee <br /> For Business
          </h4>

          <p
            onClick={() => router.push("/product/")}
            className="h-10 sm:h-14 w-36 sm:w-40 rounded-xl font-robotoSerif font-bold text-base text-[#F8E4BE] bg-themeLight mx-auto flex justify-center items-center mt-10 sm:mt-20 shadow-customYellow cursor-pointer"
          >
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
            <h4 className="text-xl sm:text-4xl lg:text-6xl  2xl:text-7xl text-white text-center font-robotoSerif font-bold mx-auto xl:leading-[70px] 2xl:leading-[85px]">
              Providing Services To <br /> Millions Of People Worldwide
            </h4>
            <div className="flex justify-center mt-10  sm:mt-24 md:w-[80%] mx-auto">
              <img
                src="/images/Container.png"
                alt="Providing Services to Millions of People Worldwide"
              />
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
            Our Mission And Promise To You
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
