"use client";
import MiniLoader from "@/components/ui/MiniLoader";
import GetAPI from "@/utilities/GetAPI";
import { BASE_URL } from "@/utilities/URL";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function History() {
  const router = useRouter();
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userID");
  }
  const [orderType, setOrderType] = useState(true);

  const { data } = GetAPI(`api/v1/users/orders?userId=${userId}`);
  console.log("🚀 ~ History ~ data:", data?.data?.data[0]?.items);
  const pastOrder = [];
  console.log("🚀 ~ History ~ pastOrder:", pastOrder);
  const activeOrders = [];
  console.log("🚀 ~ History ~ activeOrders:", activeOrders);

  data?.data?.data?.forEach((item) => {
    if (item?.statusId == 5 || item?.statusId == 6) {
      pastOrder.push(item);
    } else {
      activeOrders.push(item);
    }
  });

  const orderDetails = (id) => {
    localStorage.setItem("orderId", id);
    router.push("/timeline");
  };

  return (
    <div className="w-full ">
      <div className=" bg-theme pt-36 sm:pt-[180px] pb-10 relative">
        {/* overlay */}
        <div className="w-full h-full absolute top-0 left-0 z-10 [&>img]:opacity-[0.05] bg-gradient-to-b from-[#00000097] to-transparent pointer-events-none"></div>
        {/* loader */}
        {!data?.data?.data ? (
          <div className="flex justify-center items-center h-[50vh] text-white text-3xl">
            <MiniLoader />
          </div>
        ) : /* NO orders */
        data?.data?.results === 0 ? (
          <div className="flex justify-center items-center h-[50vh] text-white text-3xl">
            No Orders !
          </div>
        ) : (
          /* content */
          <div className="w-[90%] md:w-[75%] min-h-[50vh] mx-auto bg-themeLight border-theme border text-white rounded-xl shadow-md pb-10 relative z-20">
            <h4 className="mx-6 pt-6 md:mx-14 text-2xl font-semibold">
              Order History
            </h4>
            <div
              onClick={() => setOrderType(!orderType)}
              className="[&>button]:border [&>button]:py-3 [&>button]:px-16  pt-6"
            >
              <button
                className={`ms-6 md:ms-14 text-xl font-semibold rounded-l-md ${
                  orderType
                    ? "bg-white text-theme"
                    : "bg-transparent text-white"
                }`}
              >
                Active Orders
              </button>
              <button
                onClick={() => setOrderType(!orderType)}
                className={`text-xl font-semibold rounded-r-md ${
                  !orderType
                    ? "bg-white text-theme"
                    : "bg-transparent text-white"
                }`}
              >
                Past Orders
              </button>
            </div>

            <div className="gap-5 px-6 md:px-14 cursor-pointer">
              {(orderType ? activeOrders : pastOrder)?.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="border-b border-theme pb-4"
                    onClick={() => orderDetails(item?.id)}
                  >
                    {/* order no. , Order date , Order Status , Amount and Order Quantity. */}

                    <div className="py-6 space-y-2">
                      <h4 className="font-semibold text-lg">
                        Order ID: {item?.id}
                      </h4>
                      <p className="text-gray-400">
                        Quantity: {item?.totalQuantity ?? 0}
                      </p>
                      <p className="text-gray-400">
                        Order Status: {item?.orderCurrentStatus}
                      </p>
                      <p className="text-gray-400">Order Date: {item?.on}</p>
                      <p className="text-gray-400">
                        Amount: ${item?.totalBill ?? 0}
                      </p>
                    </div>
                  </div>
                );
              })}
              {/* {activeOrders?.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="border-b border-theme pb-4"
                    onClick={() => orderDetails(item?.id)}
                  >
                    <div className="grid lg:grid-cols-2">
                      {item?.items?.map((elem, i) => (
                        <div key={i} className="py-6 flex items-center gap-x-4">
                          <img
                            src={BASE_URL + elem?.image}
                            alt="product image"
                            className="w-36 object-cover h-24 rounded-md"
                          />
                          <div>
                            <h4 className="font-semibold text-lg">
                              {elem.product}
                            </h4>
                            <p className="text-sm py-1">
                              Payment Method: {item?.paymentMethod}
                            </p>
                            <p className="text-xs text-gray-400">
                              {item?.orderCurrentStatus}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-right mt-2 pr-4 font-semibold text-base">
                      Order Total: ${item?.itemsPrice}
                    </div>
                  </div>
                );
              })} */}
            </div>
            {/* <div className="gap-5 px-6 md:px-14 cursor-pointer">
              {activeOrders?.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="border-b border-theme pb-4"
                    onClick={() => orderDetails(item?.id)}
                  >
                    <div className="grid lg:grid-cols-2">
                      {item?.items?.map((elem, i) => (
                        <div key={i} className="py-6 flex items-center gap-x-4">
                          <img
                            src={BASE_URL + elem?.image}
                            alt="product image"
                            className="w-36 object-cover h-24 rounded-md"
                          />
                          <div>
                            <h4 className="font-semibold text-lg">
                              {elem.product}
                            </h4>
                            <p className="text-sm py-1">
                              Payment Method: {item?.paymentMethod}
                            </p>
                            <p className="text-xs text-gray-400">
                              {item?.orderCurrentStatus}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-right mt-2 pr-4 font-semibold text-base">
                      Order Total: ${item?.itemsPrice}
                    </div>
                  </div>
                );
              })}
            </div> */}

            {/* {pastOrder?.length > 0 && (
              <h4 className="mx-6 pt-6 md:mx-14 text-xl font-semibold">
                Past Orders
              </h4>
            )} */}

            {/* <div className="gap-5 px-6 md:px-14 cursor-pointer">
              {pastOrder?.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="border-b border-theme pb-4"
                    onClick={() => orderDetails(item?.id)}
                  >
                    <div className="grid lg:grid-cols-2">
                      {item?.items?.map((elem, i) => (
                        <div key={i} className="py-6 flex items-center gap-x-4">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrJDWSOHW_Bm1hqobe1KDhoLyFhG1m5y5W25JwhlLWVAol441ajn4MmCjAN9hnm33Vd8U&usqp=CAU"
                            alt="product image"
                            className="w-36 object-cover h-24 rounded-md"
                          />
                          <div>
                            <h4 className="font-semibold text-lg">
                              {elem.product}
                            </h4>
                            <p className="text-sm py-1">
                              Payment Method: {item?.paymentMethod}
                            </p>
                            <p className="text-xs text-gray-400">
                              {item?.orderCurrentStatus}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-right mt-2 pr-4 font-semibold text-base">
                      Order Total: ${item?.itemsPrice}
                    </div>
                  </div>
                );
              })}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
