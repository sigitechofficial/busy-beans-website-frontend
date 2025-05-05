"use client";
import CustomDeliveryIcon from "@/components/ui/CustomDeliveryIcon";
import CustomRadioBtn from "@/components/ui/CustomRadioBtn";
// import { Switch } from "@chakra-ui/react";
import { Dialog, Portal } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  FaAngleRight,
  FaDoorOpen,
  FaMinus,
  FaPlus,
  FaWalking,
} from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { IoIosArrowRoundBack, IoMdHome } from "react-icons/io";
import { MdInsertComment } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCard } from "react-icons/io5";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";
import { GiCardPickup } from "react-icons/gi";
import Select from "react-select";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  LoadScript,
} from "@react-google-maps/api";
import { BASE_URL, googleApiKey } from "@/utilities/URL";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "@/utilities/Toaster";
import { useRouter } from "next/navigation";
import { PostAPI } from "@/utilities/PostAPI";
import Loader from "@/components/ui/Loader";
import ErrorHandler from "@/utilities/ErrorHandler";
import { FaLocationCrosshairs } from "react-icons/fa6";

const page = () => {
  if (typeof window !== "undefined") {
    var addressId = localStorage.getItem("addressId") || "";
    var address = localStorage.getItem("address") || "";
    var userId = localStorage.getItem("userID") || "";
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  }
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [order, setOrder] = useState({
    totalBill: "",
    subTotal: "",
    discountPrice: 0,
    discountPercentage: 0,
    itemsPrice: "",
    vat: "",
    totalWeight: "",
    note: "",
    paymentMethod: "",
    poNumber: "PO12345678",
    orderFrequency: "just-onces", //  'just-onces','weekly','every-two-weeks','every-four-weeks',
    addressId: "",
    userId: "",
  });
  const [activeResData, setActiveResData] = useState([]);
  const [existingCartItems, setExistingCartItems] = useState([]);

  const totalPrice = existingCartItems?.reduce((a, b) => {
    return a + b?.price * b?.qty;
  }, 0);

  const totalWeight = existingCartItems?.reduce((a, b) => {
    return a + b?.weight;
  }, 0);

  let getProfile = [];
  const [coupon, setCoupon] = useState("");
  const [feeWorks, setFeeWorks] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [deliveryData, setDeliveryData] = useState({
    how: 1,
    where: 1,
    when: 1,
    howShow: false,
    whereShow: false,
    whenShow: false,
    schedule: "",
  });

  const [schedule, setSchedule] = useState({
    day: "",
    time: "",
    date: "",
  });
  const [days, setDays] = useState([]);
  const [timeChunks, setTimeChunks] = useState([]);

  const [tip, setTip] = useState({
    tip: undefined,
    other: false,
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    id: "",
    lat: "",
    lng: "",
    building: "",
    city: "",
    AddressType: "",
    locationType: "",
    state: "",
    streetAddress: "",
    zipCode: "",
    entrance: "",
    door: "",
    instructions: "",
    other: false,
  });
  const [deliveryCharges, setDeliveryCharges] = useState({
    distance: "",
    distanceUnit: "",
    currencyUnit: "",
    packingFee: "",
    deliveryCharges: "",
    serviceCharges: "",
    VAT: "",
    updatedDeliveryCharges: null,
  });

  const [leaveAtDoor, setLeaveAtDoor] = useState(0);

  const handleLeaveAtDoor = () => {
    setLeaveAtDoor((prev) => (prev === 0 ? 1 : 0));
  };

  const navigateTo = () => {
    router.push("/product");
  };

  const normalizeTimeFormat = (time) => {
    return time.toLowerCase().replace("am", " AM").replace("pm", " PM");
  };

  const generateTimeChunks = (startTime, endTime, date) => {
    const currentDate = dayjs(date, "DD-MM-YYYY");
    const now = dayjs();
    const start = currentDate
      .hour(dayjs(normalizeTimeFormat(startTime.trim()), "h:mm").hour())
      .minute(dayjs(normalizeTimeFormat(startTime.trim()), "h:mm").minute())
      .second(0);
    const end = currentDate
      .hour(dayjs(normalizeTimeFormat(endTime.trim()), "h:mm").hour())
      .minute(dayjs(normalizeTimeFormat(endTime.trim()), "h:mm").minute())
      .second(0);
    let currentTime;
    if (currentDate.isSame(now, "day")) {
      const roundedMinutes = Math.ceil(now.minute() / 5) * 5;
      currentTime = now.minute(roundedMinutes).second(0);
      if (currentTime.isBefore(now)) {
        currentTime = currentTime.add(5, "minute");
      }
      if (currentTime.isBefore(start)) {
        currentTime = start;
      }
    } else {
      currentTime = start;
    }
    const times = [];
    let index = 1;
    let time = currentTime.isBefore(start) ? start : currentTime;
    while (time.isBefore(end) || time.isSame(end)) {
      times.push({ label: time.format("HH:mm"), value: index.toString() });
      time = time.add(5, "minute");
      index++;
    }
    if (time.isBefore(end.add(5, "minute"))) {
      times.push({ label: end.format("HH:mm"), value: index.toString() });
    }
    setTimeChunks(times);
  };

  const origin = {
    lat: parseFloat(activeResData?.lat || 0),
    lng: parseFloat(activeResData?.lng || 0),
  };

  const destination = {
    lat: 31.52037 || 0,
    lng: 74.358749 || 0,
  };

  const checkCoupon = async () => {
    if (coupon === "") {
      info_toaster("Please enter Coupon Code");
    } else {
      let res = await PostAPI("users/applyvoucher", {
        code: coupon,
        userId: localStorage.getItem("userID"),
        restaurantId: localStorage.getItem("resId"),
      });
      if (res?.data?.status === "1") {
        success_toaster(res?.data?.message);
      } else {
        error_toaster(res?.data?.message);
      }
    }
  };
  const PayM = [];
  const paymentMethods = [
    ...(PayM.data?.data?.simplifiedPaymentMethods || []),
    { name: "COD", type: "cod" }, // New COD payment method
    { name: "Cheque", type: "cheque" }, // New Cheque payment method
  ];

  useEffect(() => {
    const activeRes = JSON.parse(localStorage.getItem("activeResData")) || [];
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const paymentMethod =
      JSON.parse(localStorage.getItem("paymentMethod")) || {};

    setActiveResData(activeRes);
    setExistingCartItems(cartItems);
  }, []);

  const createOrder = async () => {
    if (totalPrice === "") {
      info_toaster("Total Price cannot be empty");
    } else if (totalWeight === "") {
      info_toaster("Total Weight cannot be empty");
    } else if (order?.note.trim() === "") {
      info_toaster("Note cannot be empty");
    } else if (order.paymentMethod.trim() === "") {
      info_toaster("Select payment Method");
    } else {
      setLoader(true);
      try {
        const res = await PostAPI("api/v1/users/book-order", {
          order: {
            totalBill: totalPrice,
            subTotal: totalPrice,
            discountPrice: 0,
            discountPercentage: 0,
            itemsPrice: totalPrice,
            vat: 0,
            totalWeight: totalWeight,
            note: order?.note,
            paymentMethod: order.paymentMethod,
            poNumber: order?.poNumber,
            frequency: order?.orderFrequency, // 'just-onces', 'weekly', 'every-two-weeks', 'every-four-weeks'
            addressId: addressId,
            userId: userId,
          },
          items: cartItems,
        });
        if (res?.data?.status === "success") {
          router.push("/product");
          setLoader(false);
          localStorage.removeItem("cartItems");
          success_toaster("Order Created Successfully");
        } else {
          throw new Error(
            res?.data?.message || "An unexpected error occurred."
          );
        }
      } catch (error) {
        ErrorHandler(error);
        setLoader(false);
      }
    }
  };

  return (
    <>
      <div className="bg-theme font-satoshi">
        <section className="bg-theme-green font-satoshi">
          <div className="h-96 relative text-black hover:text-opacity-50">
            <div className="lg:hidden absolute z-10 bottom-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
            <LoadScript googleMapsApiKey={googleApiKey}>
              <GoogleMap
                key={`${deliveryData?.how}-${deliveryAddress?.lat}-${deliveryAddress?.lng}`}
                zoom={deliveryData?.how === 1 ? 12 : 16}
                center={deliveryData?.how === 1 ? destination : origin}
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                options={{
                  disableDefaultUI: true,
                }}
              >
                {/* <MarkerF
                position={origin}
                icon={{
                  url:
                    deliveryData.how === 1
                      ? "/images/restaurants/greenDot.svg"
                      : iconUrl,
                  scaledSize: new window.google.maps.Size(
                    deliveryData.how === 1 ? 25 : 100,
                    deliveryData.how === 1 ? 30 : 100
                  ),
                }}
              />

              {deliveryData.how === 1 && (
                <MarkerF
                  position={destination}
                  icon={{
                    url: iconUrl,
                    scaledSize: new window.google.maps.Size(100, 100),
                  }}
                />
              )} */}

                {/* {directionsResponse && deliveryData?.how == 1 && (
                <DirectionsRenderer
                  directions={directionsResponse}
                  options={{
                    suppressMarkers: true,
                    polylineOptions: {
                      strokeColor: "#09820f",
                      strokeWeight: 5,
                    },
                  }}
                />
              )} */}
              </GoogleMap>
            </LoadScript>
            <div className="max-w-[1200px] px-[30px] mx-auto -mt-20 md:-mt-48 z-20 relative pointer-events-none">
              {/* <div
                onClick={() => {
                  window.history.back();
                }}
                className="absolute left-5 -top-56 md:-top-28 z-10 flex items-center gap-x-2 "
              >
                <IoIosArrowRoundBack className="ml-3 mt-2 text-3xl rounded-full bg-[#F4F5FA] hover:bg-[#e5e5e5] focus:outline-none focus:shadow-none text-black p-1 w-[40px] h-[40px] text-[14px] cursor-pointer duration-100 pointer-events-auto" />
                <p className="text-xl font-bold font-sf mt-2 pointer-events-auto">
                  Back
                </p>
              </div> */}
              <div className="!font-satoshi">
                <h3 className="text-4xl md:text-6xl font-bold">Checkout</h3>
                <p className="text-xl md:text-3xl font-semibold">
                  {activeResData?.name || "name"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {loader ? (
          <Loader />
        ) : (
          <section className="max-w-[1200px] px-4 sm:px-[30px] xl:pr-11 grid grid-cols-1 lg:grid-cols-5 lg:gap-x-[10%] gap-y-5  mx-auto mt-10 pb-10 font-sf">
            <div className="lg:max-w-[570px] lg:col-span-3">
              <div className="space-y-3">
                {/* <div className="h-12 p-1 rounded-[6.25rem] bg-themeLight grid grid-cols-2 mb-6">
                <button
                  onClick={() => {
                    setDeliveryData({ ...deliveryData, how: 1 });
                    localStorage.setItem("how", 1);
                  }}
                  className={`font-medium text-base flex items-center justify-center gap-x-2 rounded-[6.25rem] ${
                    deliveryData.how === 1
                      ? "bg-theme"
                      : "bg-transparent text-goldenLight"
                  }`}
                >
                  <CustomDeliveryIcon
                    size={20}
                    color={deliveryData.how === 2 ? "#F8E4BE" : "#fff"}
                  />
                  <span
                    className={
                      deliveryData.how === 1 ? "font-bold text-white" : ""
                    }
                  >
                    Delivery
                  </span>
                </button>
                <button
                  onClick={() => {
                    setDeliveryData({ ...deliveryData, how: 2 });
                    localStorage.setItem("how", 2);
                  }}
                  className={`font-medium text-base flex items-center justify-center gap-x-2 rounded-[6.25rem] ${
                    deliveryData.how === 2
                      ? "bg-theme"
                      : "bg-transparent text-goldenLight"
                  }`}
                >
                  <FaWalking
                    size={20}
                    color={deliveryData.how === 2 ? "#fff" : ""}
                  />
                  <span
                    className={
                      deliveryData.how === 2 ? "font-bold text-white" : ""
                    }
                  >
                    Pickup
                  </span>
                </button>
              </div> */}

                {/* {deliveryData.how === 1 && (
                <>
                  <div className="w-full flex justify-between items-center p-4 cursor-pointer !my-4 !mb-12 rounded-lg bg-themeLight">
                    <div className="flex items-center gap-x-4 p-2">
                      <CustomDeliveryIcon size={20} color="white" />
                      <div className=" font-sf">
                        <h4 className="leading-6 text-base font-semibold text-white">
                          Delivery in approximately{" "}
                          <span className="text-gray-400">
                            {activeResData?.deliveryTime}
                          </span>{" "}
                          {activeResData?.dropOffAddress?.streetAddress}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {true == false && (
                    <div className="flex gap-x-2 items-center p-4 bg-[#ffefee] rounded-lg [&>p]:text-sm !mb-10">
                      <FaCircleExclamation
                        className="text-[#f93a25]"
                        size="16"
                      />
                      <p>The address is outside of the delivery range. </p>
                    </div>
                  )}

                  <div className="">
                    <h1 className="font-semibold text-xl sm:text-[1.75rem] text-white">
                      Delivery location
                    </h1>
                  </div>
                </>
              )} */}

                {/* {deliveryData.how === 2 && (
                <>
                  <div className="w-full flex justify-between items-center p-4 cursor-pointer !my-4  !mb-12 rounded-lg bg-themeLight">
                    <div className="flex items-center gap-x-4 p-2">
                      <GiCardPickup size={24} color="white" />
                      <div className=" font-sf">
                        <h4 className="leading-6 text-base font-semibold text-white">
                          Pickup in approximately{" "}
                          <span className="text-gray-400">
                            {activeResData?.pickupTime}
                          </span>{" "}
                          {activeResData?.dropOffAddress?.streetAddress}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <h1 className="font-semibold text-xl sm:text-[1.75rem]">
                      Pickup location
                    </h1>
                  </div>
                </>
              )} */}
              </div>
              <div className="space-y-8">
                <h3 className="font-semibold text-xl sm:text-[1.75rem] text-white font-satoshi">
                  Delivery Details
                </h3>
                <div className="text-white rounded-lg bg-themeLight  my-4 mb-12">
                  {/* <div className="flex items-center justify-between gap-x-2 px-5 py-5">
                <div className="flex items-center gap-x-3">
                  <span>
                    <IoMdHome size={24} />
                  </span>
                  <div>
                    <div className="text-base font-semibold">
                      {deliveryData.how === 1 ? (
                        deliveryAddress?.id !== "" ? (
                          <span className="font-semibold">
                            {`${deliveryAddress?.AddressType}`}:{" "}
                            <span className="text-gray-400 font-light">
                              {" "}
                              {`${deliveryAddress.streetAddress}`}{" "}
                            </span>
                          </span>
                        ) : (
                          "Please add a delivery address"
                        )
                      ) : (
                        <>
                          <span className="font-semibold">
                            {` ${activeResData.location}`}
                          </span>{" "}
                          <span className="ms-2 text-gray-500">{`${deliveryCharges.distance} ${deliveryCharges.distanceUnit}`}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {deliveryData.how === 1 && (
                  <div className="bg-theme text-theme-green-2 font-semibold font-sf rounded-md px-3 py-1">
                    <button
                    //  onClick={() => setAddressModal(true)}
                    >
                      Change
                    </button>
                  </div>
                )}
              </div> */}

                  {deliveryData.how === 1 && (
                    <>
                      {/* <hr className="mx-5 " />
                  <div className="flex items-center justify-between gap-x-2 px-5 py-5">
                    <div className="flex items-center gap-x-3">
                      <span>
                        <FaDoorOpen size={24} />
                      </span>
                      <div>
                        <div className="text-base font-semibold">
                          Leave order at the door
                        </div>
                      </div>
                    </div>
                    <Switch
                      onChange={handleLeaveAtDoor}
                      checked={leaveAtDoor}
                      onColor="#379465"
                      offColor="#d9d9d9"
                      checkedIcon={false}
                      uncheckedIcon={false}
                      height={29}
                      width={52}
                      handleDiameter={23}
                    />
                  </div> */}
                      <div>
                        <div className="relative w-full group">
                          <div className="font-sf font-normal text-base text-theme-black-2 flex items-center gap-3 px-5 py-[5px] duration-300 border-2 border-white hover:border-goldenLight focus-within:border-goldenLight rounded-t-lg">
                            <FaLocationCrosshairs size={24} />
                            <div className="relative w-full">
                              <input
                                type="text"
                                id="courier-note"
                                disabled
                                className={`w-full h-full py-5 pt-7 pb-2 focus:outline-none bg-transparent peer placeholder-transparent`}
                                value={address}
                              />
                              <label
                                htmlFor="courier-note"
                                className={`absolute left-0 top-[5px] text-[13px] text-goldenLight`}
                              >
                                Delivery Address
                              </label>
                            </div>
                          </div>

                          <div className="font-sf font-normal text-base text-theme-black-2 flex items-center gap-3 px-5 py-[5px] duration-300 border-2 border-white hover:border-goldenLight focus-within:border-goldenLight rounded-b-lg">
                            <MdInsertComment size={24} />
                            <div className="relative w-full">
                              <input
                                type="text"
                                id="courier-note"
                                className={`w-full h-full py-5 pt-7 pb-2 focus:outline-none bg-transparent peer ${
                                  deliveryAddress?.instructions
                                    ? "placeholder-transparent"
                                    : ""
                                }`}
                                value={order?.note}
                                onChange={(e) =>
                                  setOrder({ ...order, note: e.target.value })
                                }
                              />
                              <label
                                htmlFor="courier-note"
                                className={`absolute left-0 top-4 text-gray-400 transition-all ${
                                  deliveryAddress?.instructions
                                    ? "top-[5px] text-[13px] peer-focus:text-goldenLight"
                                    : "peer-placeholder-shown:top-5 peer-placeholder-shown:text-goldenLight peer-focus:top-[7px] peer-focus:text-[13px] peer-focus:text-goldenLight"
                                }`}
                              >
                                Add note for the supplier
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* {deliveryData.how === 1 && (
              <>
                <div className="space-y-6">
                  <h1 className="font-semibold text-xl sm:text-[1.75rem] text-white font-satoshi">
                    Delivery Time
                  </h1>
                </div>
              </>
            )}

            {deliveryData.how === 2 && (
              <>
                <div className="space-y-6">
                  <h1 className="font-semibold text-xl sm:text-[1.75rem] ">
                    Pickup Time
                  </h1>
                </div>
              </>
            )} */}
              {/* <div
              className={`flex items-center space-x-4 px-4 py-3 mt-4 bg-themeLight text-white rounded-lg ${
                deliveryData.when === 1 && "border-theme-green-2"
              }`}
            >
              <CustomRadioBtn
                onChange={() =>
                  setDeliveryData({
                    ...deliveryData,
                    when: 1,
                    whenShow: false,
                    schedule: "",
                  })
                }
                type="radio"
                id="when-asap"
                name="when"
                checked={deliveryData.when === 1}
              />

              <label
                htmlFor="when-asap"
                className="w-full cursor-pointer flex items-center space-x-4"
              >
                <div>
                  <label className="font-sf font-semibold text-base">
                    Standard
                  </label>
                  <p className="text-sm font-light text-checkoutTextColor/65">
                    {deliveryData.how === 1
                      ? activeResData?.deliveryTime?.split(" ")[0] +
                        "-" +
                        (parseInt(activeResData?.deliveryTime) + 10)
                      : activeResData?.pickupTime?.split(" ")[0] +
                        "-" +
                        (parseInt(activeResData?.pickupTime) + 10)}{" "}
                    min
                  </p>
                </div>
              </label>
            </div> */}

              {/* <div
              className={`flex items-center space-x-4 px-4 py-3 mt-2 bg-themeLight text-white rounded-lg ${
                deliveryData.when === 2 && "border-theme-green-2"
              }`}
            >
              <CustomRadioBtn
                onChange={() =>
                  setDeliveryData({
                    ...deliveryData,
                    when: 2,
                  })
                }
                type="radio"
                id="when-later"
                name="when"
                checked={deliveryData.when === 2}
                className="custom-radio "
              />

              <label
                htmlFor="when-later"
                className="w-full cursor-pointer flex items-center space-x-4"
              >
                <div>
                  <label className="font-sf font-semibold text-base">
                    Schedule
                  </label>
                  <p className="text-sm font-light text-checkoutTextColor/65">
                    Choose a delivery time
                  </p>
                </div>
              </label>
            </div> */}

              {deliveryData.when === 2 && (
                <div className="flex  justify-between space-x-7 my-3">
                  <Select
                    value={schedule.day}
                    onChange={(e) => {
                      const day = JSON.parse(
                        localStorage.getItem("activeResData")
                      ).times.find((ele) => ele.name === e.value.toLowerCase());
                      generateTimeChunks(day.startAt, day.endAt, day.date);
                      setSchedule({
                        ...schedule,
                        day: e,
                        date: day.date,
                      });
                    }}
                    isClearable={true}
                    isDisabled={deliveryData.when === 1 ? true : false}
                    options={days}
                    placeholder="Select day"
                    className="rounded-xl font-sf w-full"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderRadius: "8px",

                        border: state.isFocused
                          ? "2px solid green-700"
                          : "2px solid #E4E4E5",
                        borderColor: state.isFocused ? "green-700" : "#E4E4E5",
                        boxShadow: state.isFocused ? "0 0 0 1px green" : "none",
                        padding: "6px 6px",
                        "&:hover": {
                          borderColor: "green",

                          cursor: "pointer",
                        },
                      }),
                    }}
                  />
                  <Select
                    value={schedule.time}
                    onChange={(e) =>
                      setSchedule({
                        ...schedule,
                        time: e,
                      })
                    }
                    isClearable={true}
                    isDisabled={deliveryData.when === 1 ? true : false}
                    options={timeChunks}
                    placeholder="Select time"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderRadius: "8px",
                        border: state.isFocused
                          ? "2px solid green-700"
                          : "2px solid #E4E4E5",
                        borderColor: state.isFocused ? "green-700" : "#E4E4E5",
                        boxShadow: state.isFocused ? "0 0 0 1px green" : "none",
                        padding: "6px 6px",
                        "&:hover": {
                          borderColor: "green",

                          cursor: "pointer",
                        },
                      }),
                    }}
                    className="rounded-xl font-sf w-full"
                  />
                </div>
              )}

              <div className="flex items-center font-semibold text-xl md:text-2xl gap-x-2 mt-12 mb-8">
                {true && (
                  <>
                    {/* <FaDoorOpen /> */}
                    <h3 className="font-semibold text-xl sm:text-[1.75rem] text-white font-satoshi">
                      Selected items
                    </h3>
                  </>
                )}
              </div>
              {true && (
                <div className="bg-theme text-white rounded-lg my-4 space-y-3">
                  {existingCartItems?.map((cart, index) => {
                    return (
                      <div key={index} className="flex justify-between gap-x-2">
                        <div className="flex gap-x-5">
                          <div className="border-2  border-gray-100 rounded-md sm:w-28 sm:h-20 w-6 h-6 ">
                            <img
                              className="w-full h-full object-cover rounded-md overflow-hidden"
                              src={BASE_URL + cart?.image}
                              alt={cart?.name}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-x-3 my-1">
                              <h5>
                                <span className="text-theme-green-2">
                                  {cart?.qty}x
                                </span>{" "}
                                <b className="font-medium">{cart?.name}</b>
                              </h5>
                            </div>
                            <div className="capitalize text-sm font-normal text-white text-opacity-60">
                              {cart?.qty * cart?.price} {cart?.unit}
                              {/* <ul>
                              {cart?.addOnsCat && cart?.addOnsCat?.length > 0
                                ? cart?.addOnsCat
                                    ?.filter(
                                      (ele) =>
                                        ele?.id ===
                                        cart?.addOns?.find(
                                          (fil) => fil?.collectionId === ele?.id
                                        )?.collectionId
                                    )
                                    ?.map((cat, key) => (
                                      <li key={key}>
                                        <span>{cat?.name}: </span>
                                        <br />
                                        {cart?.addOns
                                          ?.filter(
                                            (fil) =>
                                              fil?.collectionId === cat?.id
                                          )
                                          ?.map((add, addKey) => (
                                            <div
                                              key={addKey}
                                              className="ml-2 mt-1"
                                            >
                                              {`${add?.qty}x ${
                                                add?.name
                                              } ${
                                                add?.total > 0
                                                  ? `(${add?.total}.00)`
                                                  : ""
                                              }`}
                                            </div>
                                          ))}
                                      </li>
                                    ))
                                : cart?.addOns?.map((add, addKey) => (
                                    <li key={addKey}>
                                      <div className="ml-2 mt-1">
                                        {`${add?.qty}x ${add?.name} ${
                                          add?.total > 0
                                            ? `(${add?.total}.00)`
                                            : ""
                                        }`}
                                      </div>
                                    </li>
                                  ))}
                            </ul> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div
                className="flex items-center gap-x-2 mt-10 mb-16 cursor-pointer"
                onClick={navigateTo}
              >
                <AiOutlinePlus size={18} color="white" />
                <span className="text-sm font-medium text-white font-satoshi">
                  Add more items
                </span>
              </div>

              {/* ============Payment Method start============= */}

              <div className="flex items-center gap-x-2 mt-10 mb-8">
                {/* <MdOutlinePayment size={24} className="text-2xl" /> */}
                <h3 className="font-semibold text-xl sm:text-[1.75rem] text-white font-satoshi">
                  Payment Method
                </h3>
              </div>
              <div className="bg-themeLight text-white rounded-lg p-5 my-4 cursor-pointer duration-200 hover:shadow-discoveryCardShadow">
                {order?.paymentMethod ? (
                  <div
                    className="flex items-center gap-3 justify-between"
                    onClick={() => {
                      setPaymentModal(true);
                      setFeeWorks(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-between gap-x-4 w-full text-lg cursor-pointer"
                        onClick={() => {
                          setPaymentModal(true);
                          setFeeWorks(false);
                        }}
                      >
                        <img
                          src={`${
                            order?.paymentMethod?.includes("cheque")
                              ? "/images/cheque1.png"
                              : order?.paymentMethod?.includes("Apple")
                              ? "/images/epay.webp"
                              : order?.paymentMethod?.includes("Google")
                              ? "/images/gpay.webp"
                              : order?.paymentMethod?.includes("cod")
                              ? "/images/cashPay.png"
                              : ""
                          }`}
                          alt="payment-card"
                          className="w-9 h-9 object-contain"
                        />

                        <div>
                          <p className="text-theme-green-2 text-base">
                            {order?.paymentMethod}
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
                      setFeeWorks(false);
                      setPaymentModal(true);
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

              {/* =====Fomino points======= */}

              {getProfile?.data?.data?.creditPoints > 0 && (
                <div className=" pb-5">
                  <div className="flex justify-between items-center border rounded-md px-4 py-3 cursor-pointer mt-5 hover:shadow-discoveryCardShadow">
                    <div className="flex items-center gap-x-2">
                      <img
                        className="w-8"
                        src="/images/restaurants/fominopoints.png"
                        alt=""
                      />
                      <div className="">
                        <p className="text-lg font-medium">
                          Use Fomino credits
                        </p>
                        <p className="text-sm text-gray-500">
                          {getProfile?.data?.data?.creditPoints +
                            " " +
                            activeResData?.currencyUnit}
                        </p>
                      </div>
                    </div>{" "}
                    {/* <Switch
                    onChange={handleFominoCredits}
                    checked={fominoCredits}
                    onColor="#379465"
                    offColor="#d9d9d9"
                    checkedIcon={false}
                    uncheckedIcon={false}
                    height={29}
                    width={52}
                    handleDiameter={23}
                  /> */}
                  </div>
                </div>
              )}

              {deliveryData.how === 1 && (
                <>
                  {/* <div className="flex items-center gap-x-2 mt-10 mb-8">
                  <h3 className="font-semibold text-xl sm:text-[1.75rem] text-white font-satoshi">
                    Tip the courier
                  </h3>
                </div>
                <div className="bg-themeLight text-white rounded-lg  p-5 my-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-light text-checkoutTextColor/65 max-w-[70%]">
                        They'll get 100% of your tip after the delivery.
                      </p>
                      <p className="text-sm font-light text-checkoutTextColor/65 whitespace-nowrap">
                        {activeResData?.currencyUnit}{" "}
                        {parseFloat(tip?.tip) || "0.00"}
                      </p>
                    </div>

                    <div className="grid grid-cols-5 gap-2 mt-5 cursor-pointer ">
                      <button
                        onClick={() => setTip({ ...tip, other: false, tip: 0 })}
                        className={`h-8 font-medium text-sm text-white text-opacity-80 border-2 sm:px-5 rounded-full w-full hover:bg-theme-red hover:bg-opacity-20 hover:border-theme-red ${
                          tip.tip === 0
                            ? "border-theme-red"
                            : "border-checkoutGrayBorder text-checkoutTextColor/60"
                        }`}
                      >
                        0 CHF
                      </button>
                      <button
                        onClick={() => setTip({ ...tip, other: false, tip: 1 })}
                        className={`h-8 font-medium text-sm text-white text-opacity-80 border-2 sm:px-5 rounded-full w-full hover:bg-theme-red hover:bg-opacity-20 hover:border-theme-red ${
                          tip.tip === 1
                            ? "border-theme-red"
                            : "border-checkoutGrayBorder text-checkoutTextColor/60"
                        }`}
                      >
                        1 CHF
                      </button>
                      <button
                        onClick={() => setTip({ ...tip, other: false, tip: 2 })}
                        className={`h-8 font-medium text-sm text-white text-opacity-80 border-2 sm:px-5 rounded-full w-full hover:bg-theme-red hover:bg-opacity-20 hover:border-theme-red ${
                          tip.tip === 2
                            ? "border-theme-red"
                            : "border-checkoutGrayBorder text-checkoutTextColor/60"
                        }`}
                      >
                        2 CHF
                      </button>
                      <button
                        onClick={() => setTip({ ...tip, other: false, tip: 5 })}
                        className={`h-8 font-medium text-sm text-white text-opacity-80 border-2 sm:px-5 rounded-full w-full hover:bg-theme-red hover:bg-opacity-20 hover:border-theme-red ${
                          tip.tip === 5
                            ? "border-theme-red"
                            : "border-checkoutGrayBorder text-checkoutTextColor/60"
                        }`}
                      >
                        5 CHF
                      </button>
                      <button
                        onClick={() => setTip({ ...tip, other: true, tip: 10 })}
                        className={`h-8 font-medium text-sm text-white text-opacity-80 border-2 sm:px-5 rounded-full w-full hover:bg-theme-red hover:bg-opacity-20 hover:border-theme-red ${
                          tip.other
                            ? "border-theme-red"
                            : "border-checkoutGrayBorder text-checkoutTextColor/60"
                        }`}
                      >
                        Other
                      </button>
                    </div>
                    {tip.other && (
                      <div className="relative mt-4">
                        <input
                          value={tip.tip}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || /^[1-9]\d*$/.test(value)) {
                              setTip({ ...tip, tip: value });
                            }
                          }}
                          type="text"
                          min={1}
                          className="py-3 px-5 w-full rounded-lg font-normal text-base text-center bg-theme focus:outline-theme-red"
                        />
                        <button
                          onClick={() => setTip({ ...tip, tip: tip.tip - 1 })}
                          disabled={tip.tip === 1 ? true : false}
                          className={`p-1 rounded-full hover:bg-opacity-40 absolute top-1/2 left-5 -translate-y-1/2 ${
                            tip.tip === 1
                              ? "text-black bg-black bg-opacity-20 cursor-not-allowed"
                              : "text-theme-red bg-theme-red bg-opacity-20"
                          }`}
                        >
                          <FaMinus size={12} />
                        </button>
                        <button
                          onClick={() => setTip({ ...tip, tip: tip.tip + 1 })}
                          className={`p-1 rounded-full hover:bg-opacity-40 absolute top-1/2 right-5 -translate-y-1/2 text-theme-red bg-theme-red bg-opacity-20
                    }`}
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div> */}

                  {/* =====Redeem code======= */}

                  {/* <div className="flex items-center gap-x-2 mt-10 pb-5">
                  <h3 className="font-semibold text-xl sm:text-[1.75rem] text-white font-satoshi">
                    Redeem code
                  </h3>
                </div>
                <div className="">
                  <p className="text-sm font-light text-checkoutTextColor mb-4 text-white">
                    If you have a Fomino gift card or promo code, enter it below
                    to claim your benefits.
                  </p>

                  <div className="flex gap-x-4">
                    <FloatingLabelInput
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter code..."
                    />
                    <button
                      //   onClick={checkCoupon}
                      className="text-base text-center font-bold bg-themeDark rounded-lg h-[54px] text-white min-w-[115px] w-[40%] whitespace-nowrap"
                    >
                      Submit
                    </button>
                  </div>
                </div> */}
                  {/* order frequency */}
                  <div className="flex items-center gap-x-2 mt-10 pb-5">
                    <h3 className="font-semibold text-xl sm:text-[1.75rem] text-white">
                      Order Frequency
                    </h3>
                  </div>
                  <div className="flex gap-x-2 [&>button]:text-xs sm:[&>button]:text-base [&>button]:rounded-lg [&>button]:px-1 sm:[&>button]:px-4 [&>button]:py-2 [&>button]:bg-themeLight">
                    <button
                      className={`${
                        order?.orderFrequency === "just-onces"
                          ? "text-white"
                          : "text-theme"
                      }`}
                      onClick={() =>
                        setOrder({ ...order, orderFrequency: "just-onces" })
                      }
                    >
                      Just once
                    </button>
                    <button
                      className={`${
                        order?.orderFrequency === "weekly"
                          ? "text-white"
                          : "text-theme"
                      }`}
                      onClick={() =>
                        setOrder({ ...order, orderFrequency: "weekly" })
                      }
                    >
                      Weekly
                    </button>
                    <button
                      className={`${
                        order?.orderFrequency === "every-two-weeks"
                          ? "text-white"
                          : "text-theme"
                      }`}
                      onClick={() =>
                        setOrder({
                          ...order,
                          orderFrequency: "every-two-weeks",
                        })
                      }
                    >
                      Every two weeks
                    </button>
                    <button
                      className={`${
                        order?.orderFrequency === "every-four-weeks"
                          ? "text-white"
                          : "text-theme"
                      }`}
                      onClick={() =>
                        setOrder({
                          ...order,
                          orderFrequency: "every-four-weeks",
                        })
                      }
                    >
                      Every four weeks
                    </button>
                  </div>
                </>
              )}
            </div>
            <div
              className={`lg:bg-themeLight rounded-2xl text-white  relative xl:min-w-[399px] w-full lg:shadow-checkoutBoxShadow lg:p-6 lg:col-span-2 h-max space-y-6 lg:sticky lg:top-40 lg:right-7 lg:-mt-32`}
            >
              <div className="flex flex-col text-xl md:text-2xl text-white ">
                <h3 className="font-semibold">Prices in USD ($)</h3>
                <p className="text-sm font-light text-checkoutTextColor/65 pb-6">
                  incl. taxes (if applicable)
                </p>
                <p
                  onClick={() => {
                    setFeeWorks(true);
                    setPaymentModal(true);
                  }}
                  className="text-base font-normal text-theme-red-2 cursor-pointer"
                >
                  How fees work
                </p>
              </div>
              <div className="space-y-2.5 my-4">
                <div className="flex items-center justify-between gap-x-2">
                  <h5 className="text-base text-checkoutTextColor">Subtotal</h5>
                  <h6>$ {totalPrice.toFixed(2)}</h6>
                </div>
                {deliveryData.how === 1 && (
                  <>
                    <div className="flex items-center justify-between gap-x-2">
                      <h5 className="text-base md:text-md text-checkoutTextColor">
                        VAT
                      </h5>
                      <h6>5.00</h6>
                    </div>
                    <div className="flex items-center justify-between gap-x-2">
                      <h5 className="text-base md:text-md text-checkoutTextColor">
                        Total Weight
                      </h5>

                      <h6 className="flex gap-x-2">
                        {totalWeight.toFixed(2)} kg
                      </h6>
                    </div>

                    {tip?.tip >= 1 && (
                      <div className="flex items-center justify-between gap-x-2">
                        <h5 className="text-base md:text-md text-checkoutTextColor">
                          Tip the courier
                        </h5>
                        <h6>
                          {tip?.tip ? parseFloat(tip?.tip).toFixed(2) : 0} $
                        </h6>
                      </div>
                    )}
                  </>
                )}

                <div className="flex items-center justify-between gap-x-2 pb-4">
                  <h5 className="font-semibold text-checkoutTextColor text-base">
                    Total
                  </h5>
                  <h6 className="font-semibold text-checkoutTextColor text-base">
                    $ {totalPrice.toFixed(2)}
                  </h6>
                </div>
                <div className="border-dashed border" />
              </div>

              <div>
                <button
                  disabled={false ? true : false}
                  onClick={createOrder}
                  className="bg-themeLight lg:bg-theme w-full text-base font-bold text-white rounded-md h-[54px] flex justify-center items-center gap-x-2"
                >
                  {order?.paymentMethod == ""
                    ? "Select Payment Method"
                    : "Place Order"}
                  {/* {disabled && <RotatingLoader w="30" h="30" />} */}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      <Dialog.Root
        placement="center"
        size="md"
        open={paymentModal}
        onOpenChange={(e) => setPaymentModal(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content className="rounded-tl-xl rounded-bl-xl bg-theme text-white">
              {/* <Dialog.Header></Dialog.Header> */}
              <Dialog.Body>
                <>
                  <h4 className="text-3xl text-theme-black-2 font-omnes font-bold mt-16 mb-6">
                    Payment methods
                  </h4>

                  <div className="">
                    {paymentMethods?.map((itm) => (
                      <div
                        className={`py-2 cursor-pointer h-[76px] border-b flex items-center w-full`}
                        onClick={() => {
                          // handleSelect(itm?.name, itm.type);
                          setPaymentModal(false);
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
                                  : ""
                              }`}
                              alt="payment-card"
                              className="w-9 h-9 object-contain"
                            />
                            <span className="text-base font-sf font-medium text-theme-black-2">
                              {itm?.name}
                            </span>
                          </div>

                          {order?.paymentMethod !== itm?.type && (
                            <button
                              onClick={() => {
                                setOrder({
                                  ...order,
                                  paymentMethod: itm?.type,
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
    </>
  );
};

export default page;
