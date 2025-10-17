"use client";
import { useState } from "react";
import Head from "next/head";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What’s included in the membership?",
      answer:
        "Everything you need—premium coffee machines, all service calls, technician labor, and parts. You only pay separately for the coffee products your team consumes.",
    },
    {
      question: "Why is this better than our current setup?",
      answer:
        "Our all-inclusive membership provides seamless service with no capital expenditure, no guesswork, and all maintenance covered.",
    },
    {
      question: "What happens if something breaks?",
      answer:
        "We handle everything. Our service covers maintenance and emergency repairs, ensuring your equipment is always up and running.",
    },
    {
      question: "Can I still use our own coffee?",
      answer:
        "Yes, you can. However, our premium blends are available at exclusive prices for members.",
    },
    {
      question: "Who is this for?",
      answer:
        "This membership is designed for businesses of all sizes, especially those that need hassle-free, high-quality coffee solutions.",
    },
    {
      question: "Do I have to sign a long-term contract?",
      answer:
        "No, we offer flexible membership plans with no long-term commitment. You can adjust as needed.",
    },
  ];

  return (
    <>
      <Head>
        <title>FAQ | Busy Bean Coffee</title>
        <meta
          name="description"
          content="Frequently Asked Questions about our coffee machine membership and services."
        />
      </Head>
      <div className="w-full bg-themeLight py-10 sm:py-20">
        <h2 className="font-bold text-3xl sm:text-5xl text-center text-white pb-10">
          FAQ
        </h2>
        <p className="text-center text-lg sm:text-xl text-white mb-12">
          Still Thinking About It? Let’s Keep It Simple.
        </p>

        <div className="w-full sm:w-3/4 xl:w-[60%] mx-auto">
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-[#F8E4BE] text-black rounded-lg shadow-md">
                <button
                  className="w-full text-left px-6 py-4 text-lg font-semibold flex justify-between items-center"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{item.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-6 h-6 transform ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeIndex === index && (
                  <div className="px-6 py-4 text-sm">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
