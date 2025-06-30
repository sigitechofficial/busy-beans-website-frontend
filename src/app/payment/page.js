"use client";
import MiniLoader from "@/components/ui/MiniLoader";
import { PostAPI } from "@/utilities/PostAPI";
import { PutAPI } from "@/utilities/PutAPI";
import { info_toaster, success_toaster } from "@/utilities/Toaster";
import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoCard } from "react-icons/io5";
import { Dialog, Portal } from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";

export default function page() {
  if (typeof window !== "undefined") {
    var userName = localStorage.getItem("userName");
    var companyName = localStorage.getItem("companyName");
    var phoneNumber = localStorage.getItem("phoneNumber");
    var userEmail = localStorage.getItem("userEmail");
    var address = localStorage.getItem("address");
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
  }

  const paymentMethods = [
    { name: "COD", type: "cod" }, // New COD payment method
    { name: "Cheque", type: "cheque" }, // New Cheque payment method
    { name: "Card", type: "card" }, // New Cheque payment method
  ];

  const [modal, setModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({ value: "", label: "" });

  return (
    <div className="w-full">
      <div className=" bg-theme py-10 relative min-h-screen">
        {/* overlay */}
        <div className="w-full h-full absolute top-0 left-0 z-10 [&>img]:opacity-[0.05] bg-gradient-to-b from-[#00000097] to-transparent pointer-events-none"></div>
        {/* content */}

        <div className="w-[90%] md:w-[75%] mx-auto bg-themeLight border-theme border text-white rounded-xl shadow-md pb-10 relative z-20">
          <div className="mx-6 md:mx-14 py-3 sm:py-6 space-y-6">
            <div>
              <div className="w-96 h-48">
                <img
                  src="/images/logocoffee.png"
                  alt="busy_beans_logo"
                  className="object-contain h-full w-full"
                />
              </div>
              <h4 className="font-black font-switzer text-xl sm:text-3xl">
                Order Details
              </h4>
            </div>

            {/* order detail sections start  */}
            <div className="grid grid-cols-2 gap-x-10">
              {/* order detail left section */}
              <div className="font-switzer text-white space-y-4">
                <p className="text-lg font-black">User detail</p>
                <div className="[&>p]:flex [&>p]:justify-between [&>p]:gap-x-10 [&>p]:w-full space-y-2">
                  <p>
                    <span>Name</span>
                    <span>{userName}</span>
                  </p>
                  <p>
                    <span>Company</span>
                    <span>{companyName}</span>
                  </p>
                  <p>
                    <span>Phone Number</span>
                    <span>{phoneNumber}</span>
                  </p>
                  <p>
                    <span>Email</span>
                    <span>{userEmail}</span>
                  </p>
                  <p>
                    <span>Address</span>
                    <span>{address}</span>
                  </p>
                </div>
              </div>

              {/* products lists right section */}
              <div className="overflow-x-auto text-white font-switzer">
                <table className="w-full border-collapse">
                  <thead className="[&>tr]:font-medium [&>tr]:text-lg border-b border-theme">
                    <tr>
                      <th className="text-left py-2">Product</th>
                      <th className="text-left py-2 px-4">Quantity</th>
                      <th className="text-left py-2 px-4">Price</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems?.map((item, i) => (
                      <tr>
                        <td
                          key={i}
                          className="text-left py-1 flex items-center gap-x-2"
                        >
                          <div className="h-auto w-24">
                            <img
                              src="/images/r1.png"
                              alt="product"
                              className="object-cover h-full w-24"
                            />
                          </div>
                          <div className="font-semibold">{item?.name}</div>
                        </td>
                        <td className="text-left py-1 px-4">{item?.qty}</td>
                        <td className="text-left py-1 px-4">${item?.price}</td>
                        <td className="text-right py-1">
                          ${Number(item?.qty) * Number(item?.price)}
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td colSpan={3} className="text-right px-4 py-[2px]">
                        Sub Total:
                      </td>
                      <td className="text-right py-[2px]">$220.00</td>
                    </tr>

                    {/* Discount */}
                    <tr>
                      <td colSpan={3} className="text-right px-4 py-[2px]">
                        Discount:
                      </td>
                      <td className="text-right py-[2px]">$220.00</td>
                    </tr>

                    {/* Shipping */}
                    <tr>
                      <td colSpan={3} className="text-right px-4 py-[2px]">
                        VAT:
                      </td>
                      <td className="text-right py-[2px]">$220.00</td>
                    </tr>

                    {/* Total */}
                    <tr>
                      <td colSpan={3} className="text-right px-4 py-[2px]">
                        Total:
                      </td>
                      <td className="text-right py-[2px]">$220.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-start-2">
                <div className="bg-theme text-white rounded-lg p-5 my-4 cursor-pointer duration-200 hover:shadow-discoveryCardShadow">
                  {paymentMethod?.value ? (
                    <div
                      className="flex items-center gap-3 justify-between"
                      onClick={() => {
                        setModal(true);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center justify-between gap-x-4 w-full text-lg cursor-pointer"
                          onClick={() => {
                            setModal(true);
                          }}
                        >
                          <img
                            src={`${
                              paymentMethod?.value?.includes("cheque")
                                ? "/images/cheque1.png"
                                : paymentMethod?.value?.includes("Apple")
                                ? "/images/epay.webp"
                                : paymentMethod?.value?.includes("Google")
                                ? "/images/gpay.webp"
                                : paymentMethod?.value?.includes("cod")
                                ? "/images/cashPay.png"
                                : paymentMethod?.value?.includes("card")
                                ? "/images/credit-card.webp"
                                : ""
                            }`}
                            alt="payment-card"
                            className="w-9 h-9 object-contain"
                          />

                          <div>
                            <p className="text-theme-green-2 text-base">
                              {paymentMethod?.value}
                            </p>
                            <p className="text-sm text-checkoutTextColor/65">
                              The choosen payment method will be charged
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="text-theme-black-2 text-xl">
                        <button>
                          <FaAngleRight color="white" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-between w-full text-lg cursor-pointer"
                      onClick={() => {
                        setModal(true);
                      }}
                    >
                      <div className="flex items-center gap-x-4">
                        <IoCard size={24} />

                        <div className="space-y-[0.9px]">
                          <p className="text-theme-green-2 text-base">
                            Choose a payment method
                          </p>
                          <p className="text-sm text-checkoutTextColor/65">
                            Please add a payment method to continue with your
                            order
                          </p>
                        </div>
                      </div>
                      <div className="text-theme-black-2 text-xl">
                        <button>
                          <FaAngleRight color="white" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    // onClick={placeOrder}
                    className="bg-themeLight lg:bg-theme w-full text-base font-bold text-white rounded-md h-[54px] flex justify-center items-center gap-x-2"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog.Root
        placement="center"
        size="lg"
        open={modal}
        onOpenChange={(e) => {
          if (!e.open) {
            setModal(false);
          }
        }}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content className="rounded-tl-xl rounded-bl-xl bg-theme text-white px-4 py-4">
              <Dialog.CloseTrigger />
              {/* <Dialog.Header> */}

              {/* </Dialog.Header> */}
              <div className={`flex justify-end w-full`}>
                <button
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  <RxCross2
                    size={30}
                    className=" cursor-pointer border border-white text-themeDark hover:text-white hover:bg-themeDark rounded-md"
                  />
                </button>
              </div>
              <Dialog.Body className="pt-4">
                <>
                  <h4 className="text-3xl text-theme-black-2 font-omnes font-bold mb-8">
                    Payment methods
                  </h4>

                  <div className="">
                    {paymentMethods?.map((itm) => (
                      <div
                        className={`py-2 cursor-pointer h-[76px] border-b flex items-center w-full`}
                        onClick={() => {
                          // handleSelect(itm?.name, itm.type);
                          setModal(false);
                        }}
                      >
                        <div className="flex items-center gap-3 justify-between w-full">
                          <div className="flex items-center gap-x-4">
                            <img
                              src={`${
                                itm?.name.includes("Cheque")
                                  ? "/images/cheque1.png"
                                  : itm?.name.includes("Apple")
                                  ? "/images/epay.webp"
                                  : itm?.name.includes("Google")
                                  ? "/images/gpay.webp"
                                  : itm?.name.includes("COD")
                                  ? "/images/cashPay.png"
                                  : itm?.name.includes("Card")
                                  ? "/images/credit-card.webp"
                                  : ""
                              }`}
                              alt="payment-card"
                              className="w-9 h-9 object-contain"
                            />
                            <span className="text-base font-sf font-medium text-theme-black-2">
                              {itm?.name?.includes("Cheque") ? "Bank Cheque":itm?.name}
                            </span>
                          </div>

                          {paymentMethod?.value !== itm?.type && (
                            <button
                              onClick={() => {
                                setPaymentMethod({
                                  value: itm?.type,
                                  label: itm?.name,
                                });
                              }}
                              className="bg-themeLight text-white bg-opacity-20 flex justify-center items-center text-end rounded-md py-2 px-4 font-semibold"
                            >
                              Choose
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              </Dialog.Body>
              {/* <Dialog.Footer></Dialog.Footer> */}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}
