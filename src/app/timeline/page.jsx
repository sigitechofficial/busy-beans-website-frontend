"use client";
import BackButton from "@/components/ui/BackButton";
import MiniLoader from "@/components/ui/MiniLoader";
import TrackOrderTab from "@/components/ui/TrackOrderTab";
import GetAPI from "@/utilities/GetAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsChatLeftTextFill } from "react-icons/bs";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import Head from "next/head";


const Timeline = () => {
  const [tab, setTab] = useState(1);
  let orderId = "";
  let userID = "";
  if (typeof window !== "undefined") {
    userID = localStorage.getItem("userID");
    orderId = localStorage.getItem("orderId");
  }
  const { data } = GetAPI(`api/v1/users/order-details/${orderId}`);

  console.log("🚀 ~ Timeline ~ data:", data?.data?.order);

  const handleTrackOrderTab = (statusId) => {
    const result = data?.data?.order?.orderHistories?.find(
      (history) => history?.statusId === statusId
    );
    return result ? true : false;
  };

  const handleTrackOrderTabTime = (statusId) => {
    const result = data?.data?.order?.orderHistories?.find(
      (history) => history?.statusId === statusId
    );
    return result?.on ?? "";
  };

  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Order Tracking",
  url: "https://www.busybeancoffee.com/timeline",
  description:
    "Track your Busy Bean Coffee order in real-time. View every stage from order confirmation to delivery.",
  isPartOf: {
    "@type": "WebSite",
    name: "Busy Bean Coffee",
    url: "https://www.busybeancoffee.com",
  },
};

  return (

    <>
    <Head>
        <title>Track Order | Busy Bean Coffee</title>
        <meta
          name="description"
          content="Track your Busy Bean Coffee order in real-time with updates on preparation, shipping, and delivery."
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
        {/* content */};
        {data?.data?.order ? (
          <div className="w-[90%] md:w-[75%] min-h-[50vh] mx-auto bg-themeLight border-theme border text-white rounded-xl shadow-md pb-10 relative z-20 px-6 pt-6 md:px-14 space-y-10">
            <div className="text-2xl font-semibold flex gap-x-10">
              <div className="flex items-center gap-x-2">
                <BackButton route="/order-history" />
                <p
                  className={` ${
                    tab === 1 ? "underline" : ""
                  }   underline-offset-8 cursor-pointer`}
                  onClick={() => setTab(1)}
                >
                  Status
                </p>
              </div>
              <p
                className={` ${
                  tab === 2 ? "underline" : ""
                }   underline-offset-8 cursor-pointer`}
                onClick={() => setTab(2)}
              >
                Details
              </p>
            </div>
            {tab === 1 ? (
              <div>
                <div className="flex flex-col gap-y-4">
                  {data?.data?.order?.statusId === 5 ? (
                    <TrackOrderTab
                      heading="Delivered Order"
                      status={handleTrackOrderTab(5)}
                      time={handleTrackOrderTabTime(5)}
                      stepNo={5}
                    />
                  ) : data?.data?.order?.statusId === 6 ? (
                    <TrackOrderTab
                      heading="Cancelled Order"
                      status={handleTrackOrderTab(6)}
                      time={handleTrackOrderTabTime(6)}
                      stepNo={6}
                    />
                  ) : (
                    <>
                      <TrackOrderTab
                        heading="Order Placed"
                        status={handleTrackOrderTab(1)}
                        time={handleTrackOrderTabTime(1)}
                        stepNo={1}
                      />
                      <TrackOrderTab
                        heading="Order Confirmed"
                        status={handleTrackOrderTab(2)}
                        time={handleTrackOrderTabTime(2)}
                        stepNo={2}
                      />
                      <TrackOrderTab
                        heading="Supplier Acknowledged"
                        status={handleTrackOrderTab(3)}
                        time={handleTrackOrderTabTime(3)}
                        stepNo={3}
                      />
                      <TrackOrderTab
                        heading="Dispatched Orders"
                        status={handleTrackOrderTab(4)}
                        time={handleTrackOrderTabTime(4)}
                        stepNo={4}
                      />
                      <TrackOrderTab
                        heading="Delivered Order"
                        status={handleTrackOrderTab(5)}
                        time={handleTrackOrderTabTime(5)}
                        stepNo={5}
                      />
                    </>
                  )}
                </div>

                <div className="w-full">
                  <p className="text-xl mt-16">Need help with your order?</p>

                  <Link href={`/contact-us/${userID}`} className="flex items-center gap-x-4 p-4 rounded-lg border w-full max-w-[400px] mt-4 cursor-pointer">
                    <div className="border size-10 flex justify-center items-center shrink-0 rounded-full bg-white text-black">
                      <BsChatLeftTextFill size={17} />
                    </div>

                    <div className="w-full">
                      <h5>Contact support</h5>
                      <p>If you need help with your order</p>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex justify-between">
                  <div className="space-y-2 [&>p]:text-gray-300">
                    <h4 className="text-2xl font-bold">
                      {data?.data?.order?.supplier?.supplierName}
                    </h4>
                    <p>Frequency: {data?.data?.order?.frequency}</p>
                    <p
                      className={`${
                        data?.data?.order?.note ? "block" : "hidden"
                      }`}
                    >
                      Note: {data?.data?.order?.note}
                    </p>
                    {/* <p>Order placed: 29th, April 2025 5:02 pm</p> */}
                    <p>
                      Tracking number:{" "}
                      {data?.data?.order?.trackingNumber || "Pending"}
                    </p>
                    <p>Order ID: {data?.data?.order?.id}</p>
                    <p>
                      Delivered to:{" "}
                      {[
                        data?.data?.order?.address?.companyaddress,
                        // data?.data?.order?.address?.addressLineOne,
                        // data?.data?.order?.address?.addressLineTwo,
                        data?.data?.order?.address?.town,
                        data?.data?.order?.address?.state,
                        data?.data?.order?.address?.country,
                        data?.data?.order?.address?.zipCode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {/* <button className="p-2 border rounded-lg">
                    View Restaurant Info
                  </button> */}
                    <p className="p-2 border rounded-lg uppercase text-center">
                      {data?.data?.order?.paymentMethod === "cod" ? "Cash on Delivery":data?.data?.order?.paymentMethod}
                    </p>
                    <p className="p-2 border rounded-lg uppercase text-center">
                      {data?.data?.order?.paymentStatus === "done"
                        ? "Paid"
                        : "Unpaid"}
                    </p>
                  </div>
                </div>
                <h4 className="text-2xl font-bold">Items</h4>

                {data?.data?.order?.items?.map((item, idx) => {
                  return (
                    <div className="flex justify-between items-center text-gray-300">
                      <p>
                        <span>{item?.qty} x </span>{" "}
                        <span>
                          {item?.product}
                          {/* (${item?.price}) */}
                        </span>
                      </p>
                      <div className="flex items-center gap-x-5">
                        {/* <p>
                          ${item?.price} x {item?.qty} =
                        </p> */}
                        <p> ${Number(item?.price).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
                {/* <div className="flex justify-between items-center">
                  <p className="text-gray-300">total weight</p>
                  <p className="text-gray-300">
                    {data?.data?.order?.totalWeight}
                  </p>
                </div> */}

                <div className="flex justify-between items-center">
                  <h4 className="text-2xl font-bold">Subtotal</h4>
                  <p className="text-gray-300">
                    ${data?.data?.order?.subTotal}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-300">VAT</p>
                  <p className="text-gray-300">${data?.data?.order?.vat}</p>
                </div>

                <div className="flex justify-between items-center">
                  <h4 className="text-2xl font-bold">Total</h4>
                  <p className="text-gray-300">
                    ${data?.data?.order?.totalBill}
                  </p>
                </div>

                <div>
                  <p className="text-xl mt-16">Need help with your order?</p>

                  <Link href={`/contact-us/${userID}`} className="flex items-center gap-x-4 p-4 rounded-lg border w-max mt-4 cursor-pointer">
                    <div className="border size-10 flex justify-center items-center rounded-full bg-white text-black">
                      <BsChatLeftTextFill size={17} />
                    </div>

                    <div>
                      <h5>Contact support</h5>
                      <p>If you need help with your order</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-[50vh] flex justify-center items-center">
            <MiniLoader />
          </div>
        )}
      </div>
    </div>

      </>
  );
};

export default Timeline;
