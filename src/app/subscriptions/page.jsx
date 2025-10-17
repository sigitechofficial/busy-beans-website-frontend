"use client";
import SwiperSider from "@/components/ui/SwiperSlider";
import CoffeSolution from "@/components/ui/CoffeSolution";
import FAQ from "@/components/ui/Faq";
import GetAPI from "@/utilities/GetAPI";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Head from "next/head";

export default function Subscription() {
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();
  const { data, reFetch } = GetAPI("api/v1/admin/category");
  const list = data?.data?.data ?? [];

  const handleSlideChange = (swiper) => setActiveSlide(swiper.activeIndex);
  
  const handleContactClick = () => {
    router.push("/subscriptions/contact"); 
  };

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
      "https://www.youtube.com/channel/UC4b4PYax5H3jRSyw4r0MCjQ/featured",
      "https://www.linkedin.com/company/busy-bean-coffee"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: "+1-833-843-2326",
      email: "info@busybeancoffee.com"
    },
    foundingDate: "2014",
    address: {
      "@type": "PostalAddress",
      addressCountry: "USA"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Chef Recipes",
    url: "https://www.busybeancoffee.com/subscriptions", 
    description:
      "Explore specialty recipes crafted by Executive Chef Leslie at Busy Bean Coffee. Featuring Coffee Dry Rub, French Vanilla Crème Brûlée, and Hot Chocolate Lava Cake using Busy Bean products."
  }
];

  return (
    <>
      <Head>
        <title>Coffee Machine</title>
        <meta name="description" content="Explore all-inclusive coffee machine membership plans." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* Coffee Machine Header Section */}
      <div className="relative bg-themeLight pt-[140px]">
        <h2 className="font-bold text-3xl sm:text-5xl text-center text-white pb-10">Coffee Machine</h2>
      </div>

      <div
        role="image"
        aria-label="Coffee Machine Background"
        className="h-[250px] sm:h-[400px] md:h-[500px] 2xl:h-[800px] bg-[url(/images/subs.png)] object-cover bg-no-repeat relative"
      >
        {/* Content overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 text-white text-center space-y-8">
          <div className="pt-10 pb-20">
          <p className="text-xl sm:text-3xl font-medium mb-6">Coffee? Already Handled</p>
          <p className="text-lg sm:text-xl font-light mb-6">The all-inclusive coffee membership that keeps your team fueled...</p>
          <button className="bg-theme text-white py-2 px-4 rounded-md font-semibold text-lg mb-6">Explore Membership</button>
          </div>
          <div className="bg-themeLight/40 py-10">
          <p className="text-lg sm:text-xl font-light mb-6">It’s Not Just Coffee. It’s One Less Thing to Worry About.</p>
          <p className="text-lg sm:text-xl font-light mb-6">
            Our all-inclusive membership takes coffee service off your plate — so your team stays happy and productive.
          </p>

          {/* Subscription Steps */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-center mb-10">
            <div className="bg-white text-black p-6 rounded-lg shadow-md max-w-xs mx-4">
              <h5 className="text-xl font-semibold mb-4">1. Choose Your Membership Level</h5>
              <p className="text-sm">We help you pick the perfect plan based on your team size and beverage needs.</p>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-md max-w-xs mx-4">
              <h5 className="text-xl font-semibold mb-4">2. We Install the Equipment</h5>
              <p className="text-sm">Our technicians install and configure everything. No capex. No guesswork.</p>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-md max-w-xs mx-4">
              <h5 className="text-xl font-semibold mb-4">3. We Handle All Maintenance</h5>
              <p className="text-sm">From preventive care to emergency repairs, we've got you covered.</p>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-md max-w-xs mx-4">
              <h5 className="text-xl font-semibold mb-4">4. You Order Products When Needed</h5>
              <p className="text-sm">Just order your favorite coffee products at exclusive member pricing.</p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-theme text-white py-2 px-4 rounded-md font-semibold text-lg">Get a Custom Quote</button>
          </div>
          </div>
        </div>
      </div>
    
       {/* Subscription Cards */}
      <div className="w-full bg-themeDark py-10 px-4 sm:px-12">
          <h2 className="font-bold text-3xl sm:text-5xl text-center text-white pb-10">One Monthly Fee. Total Coffee Confidence.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((machine) => (
            <div key={machine.id} className="bg-[#F0E1D4] rounded-lg overflow-hidden shadow-md p-6">
              <div className="text-center">
                <img
                  src={machine.image} 
                  alt={machine.machineTypeLabel}
                  className="w-full h-[200px] object-contain mb-4"
                />
                <h3 className="text-2xl font-semibold">{machine.machineTypeLabel}</h3>
                <p className="text-lg">{machine.planNameLabel}</p>
                <p className="text-sm mt-2">{machine.includes}</p>
                <div className="text-xl font-bold mt-4">{`$${machine.price}/month`}</div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Up to {machine.employeeRange} employees</p>
                  <button 
                  onClick={handleContactClick}
                  className="bg-theme text-white py-2 px-6 mt-4 rounded-md">Contact</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
       {/* Why It Matters Section */}
      <div className="w-full bg-themeLight py-10 sm:py-20">
        <h2 className="font-bold text-3xl sm:text-5xl text-center text-white pb-10">Why It Matters</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 px-20">
          <div className="flex-1 h-[300px] sm:h-[400px] xl:h-[500px] 2xl:h-[600px]">
            <img
             className="w-full h-full object-contain max-lg:rounded-lg"
             src="/images/m1.png"
             alt=""
            />
          </div>
          <div className="flex-1 text-white text-center sm:text-left">
            <h3 className="text-3xl font-semibold mb-4">You Run the Business. We’ll Handle the Coffee.</h3>
            <p className="text-lg">
              Great teams run on caffeine—but you shouldn’t be chasing service reps, managing machines, or fielding complaints from staff. Busy Bean makes it seamless. We give you café-quality coffee, flawless support, and total peace of mind—for one predictable monthly price. It’s not a vending service. It’s a fully managed coffee solution that makes you look good—and your team feel valued.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-themeLight">
        <FAQ />
      </div>
      
      {/* Coffee Solution Section */}
      <div className="w-full py-10 bg-themeLight">
        <div className="w-full sm:w-3/4 xl:w-[60%] mx-auto mt-6">
          <CoffeSolution />
        </div>
      </div>

      {/* Customer Testimonial Section */}
      <div className="w-full bg-themeDark pt-10 sm:pt-24 pb-10 max-lg:px-5">
        <h4 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:6xl text-white text-center font-robotoSerif font-bold mx-auto">
          What Our Customers Say About Our Products
        </h4>
        <div className="w-full xl:w-[90%] 2xl:w-[78%] mx-auto">
          <SwiperSider />
        </div>
      </div>
    </>
  );
}
