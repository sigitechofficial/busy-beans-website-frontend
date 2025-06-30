import Head from "next/head";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";

const paymentDetails = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Payment Details",
    url: "https://www.busybeancoffee.com/profile/payment-details",
    description:
      "Securely manage your payment methods, active sessions, and account preferences on Busy Bean Coffee.",
    isPartOf: {
      "@type": "WebSite",
      name: "Busy Bean Coffee",
      url: "https://www.busybeancoffee.com",
    },
  };
  return (
    <>
      <Head>
        <title>Order History | Busy Bean Coffee</title>
        <meta
          name="description"
          content="Easily view and manage your past orders with Busy Bean Coffee. Reorder your favorite coffee beans and syrups with a single click."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="w-full ">
        <div className=" bg-theme pt-36 sm:pt-[180px] pb-10 relative">
          {/* overlay */}
          <div className="w-full h-full absolute top-0 left-0 z-10 [&>img]:opacity-[0.05] bg-gradient-to-b from-[#00000097] to-transparent pointer-events-none"></div>
          {/* content */}
          <div className="w-[90%] md:w-[75%] mx-auto bg-themeLight border-theme border text-white rounded-xl shadow-md pb-10 relative z-20">
            <div className="mx-6 md:mx-14 border-b border-theme py-6">
              <div className="space-y-2 font-satoshi">
                <h4 className="font-bold text-xl sm:text-3xl">
                  Payment details
                </h4>
                <p className="text-sm opacity-60">
                  Securely add or remove payment methods to make it easier when
                  you book.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-6 font-inter">
              <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
                Payment cards
              </p>{" "}
              <p className="text-sm sm:text-base font-light opacity-60">
                Add a phone number to set up two-factor authentication
              </p>{" "}
              <p className="text-sm sm:text-lg font-medium flex justify-end">
                Set up
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-6 font-inter">
              <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
                Active sessions
              </p>{" "}
              <p className="text-sm sm:text-base font-light opacity-60">
                Selecting “ Sign out “ will sign you out from all devices except
                this one. This can take up to 10 minutes.
              </p>{" "}
              <p className="text-sm sm:text-lg font-medium flex justify-end">
                Sign out
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-6 font-inter">
              <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
                Delete account
              </p>{" "}
              <p className="text-sm sm:text-base font-light opacity-60">
                Permanently delete your account
              </p>{" "}
              <p className="text-sm sm:text-lg font-medium flex justify-end">
                Delete account
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default paymentDetails;
