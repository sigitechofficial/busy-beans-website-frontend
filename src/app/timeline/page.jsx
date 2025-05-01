"use client";
import MiniLoader from "@/components/ui/MiniLoader";
import GetAPI from "@/utilities/GetAPI";
import React, { useState } from "react";
import { BsChatLeftTextFill } from "react-icons/bs";

const Timeline = () => {
  const [tab, setTab] = useState(1);
  let orderId = "";
  if (typeof window !== "undefined") {
    orderId = localStorage.getItem("orderId");
  }
  const { data } = GetAPI(`api/v1/users/order-details/${orderId}`);

  return (
    <div className="w-full ">
      <div className=" bg-theme pt-36 sm:pt-[180px] pb-10 relative">
        {/* overlay */}
        <div className="w-full h-full absolute top-0 left-0 z-10 [&>img]:opacity-[0.05] bg-gradient-to-b from-[#00000097] to-transparent pointer-events-none"></div>
        {/* content */};
        {data?.data?.order ? (
          <div className="w-[90%] md:w-[75%] min-h-[50vh] mx-auto bg-themeLight border-theme border text-white rounded-xl shadow-md pb-10 relative z-20 px-6 pt-6 md:px-14 space-y-10">
            <div className="text-2xl font-semibold flex gap-x-10">
              <p
                className={` ${
                  tab === 1 ? "underline" : ""
                }   underline-offset-8 cursor-pointer`}
                onClick={() => setTab(1)}
              >
                Status
              </p>
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
                <div>
                  <div className="flex items-center gap-x-4 p-4 rounded-lg border w-full max-w-[400px] mt-4 cursor-pointer">
                    <div className="border size-10 flex justify-center items-center shrink-0 rounded-full bg-white text-black font-semibold">
                      {data?.data?.order?.statusId}
                    </div>

                    <div>
                      <h5>{data?.data?.order?.orderCurrentStatus}</h5>
                      {/* <p>Order ready</p> */}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xl mt-16">Need help with your order?</p>

                  <div className="flex items-center gap-x-4 p-4 rounded-lg border w-full max-w-[400px] mt-4 cursor-pointer">
                    <div className="border size-10 flex justify-center items-center shrink-0 rounded-full bg-white text-black">
                      <BsChatLeftTextFill size={17} />
                    </div>

                    <div>
                      <h5>Contact support</h5>
                      <p>If you need help with your order</p>
                    </div>
                  </div>
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
                    <p>Note: {data?.data?.order?.note}</p>
                    {/* <p>Order placed: 29th, April 2025 5:02 pm</p> */}
                    <p>
                      Tracking number:{" "}
                      {data?.data?.order?.trackingNumber || "--"}
                    </p>
                    <p>Order ID: {data?.data?.order?.id}</p>
                    <p>
                      Delivered to:{" "}
                      {data?.data?.order?.address?.addressLineOne ||
                        data?.data?.order?.address?.addressLineTwo}
                      , {data?.data?.order?.address?.country}{" "}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {/* <button className="p-2 border rounded-lg">
                    View Restaurant Info
                  </button> */}
                    <p className="p-2 border rounded-lg uppercase text-center">
                      {data?.data?.order?.paymentMethod}
                    </p>
                    <p className="p-2 border rounded-lg uppercase text-center">
                      {data?.data?.order?.paymentStatus}
                    </p>
                  </div>
                </div>
                <h4 className="text-2xl font-bold">Items</h4>

                {data?.data?.order?.items?.map((item, idx) => {
                  return (
                    <div className="flex justify-between items-center text-gray-300">
                      <p>{item?.product}</p>
                      <div className="flex items-center gap-x-5">
                        <p>
                          ${item?.price} x {item?.qty} =
                        </p>
                        <p> ${item?.price * item?.qty}.00</p>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-between items-center">
                  <p className="text-gray-300">total weight</p>
                  <p className="text-gray-300">
                    {data?.data?.order?.totalWeight}
                  </p>
                </div>

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

                  <div className="flex items-center gap-x-4 p-4 rounded-lg border w-max mt-4 cursor-pointer">
                    <div className="border size-10 flex justify-center items-center rounded-full bg-white text-black">
                      <BsChatLeftTextFill size={17} />
                    </div>

                    <div>
                      <h5>Contact support</h5>
                      <p>If you need help with your order</p>
                    </div>
                  </div>
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
  );
};

export default Timeline;
