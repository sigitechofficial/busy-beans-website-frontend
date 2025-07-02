"use client";
import CustomDeliveryIcon from "@/components/ui/CustomDeliveryIcon";
import CustomRadioBtn from "@/components/ui/CustomRadioBtn";
import { FaLocationDot } from "react-icons/fa6";
// import { Switch } from "@chakra-ui/react";
import { Dialog, Portal } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  FaAngleRight,
  FaArrowLeft,
  FaDoorOpen,
  FaMinus,
  FaPlus,
  FaWalking,
} from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { IoIosArrowRoundBack, IoMdHome } from "react-icons/io";
import { MdInsertComment, MdOutlineConfirmationNumber } from "react-icons/md";
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
  Autocomplete,
  Marker,
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
import { useCart } from "@/utilities/cartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCardForm from "@/components/ui/StripeCardForm";
import GetAPI from "@/utilities/GetAPI";
import { drawerSelectStyles } from "@/utilities/SelectStyle";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import BackButton from "@/components/ui/BackButton";
import Head from "next/head";

const stripePromise = loadStripe(
  "pk_live_51HGqhQECVLSM4sc2wb1g4dx3lUe61VcK3BMjnUPk28Y5qaRC9sDQ6X6Ar5OZHmVoAIVe2rXncVOxHUax10qb4d8L00KCAdXpd5"
);
// const stripePromise = loadStripe(
//   "pk_test_51RPXZNCxTuXimvwHkvKO6MrVTckQ45X3JC2AkCVyV9fxLCK442YPbG8yM2NOexEqnD3wNAXdKfrOyEH2dTSzYKpt00WTyK7kzl"
// );

const page = () => {
  const { setCartItems } = useCart();
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
    poNumber: "",
    orderFrequency: "just-onces", //  'just-onces','weekly','every-two-weeks','every-four-weeks',
    addressId: "",
    userId: "",
    shippingCharges: "",
  });
  console.log("🚀 ~ page ~ order:", order);

  const [activeResData, setActiveResData] = useState([]);
  const inputRef = useRef();
  const autocompleteRef = useRef();
  const mapRef = useRef(null);
  const [center, setCenter] = useState({
    lat: "",
    lng: "",
  });

  const { data: addressData, reFetch: reFetchAddresses } = GetAPI(
    `api/v1/users/address/view-all?userId=${userId}`
  );

  const { data: countriesData } = GetAPI(
    "api/v1/admin/address-management/country"
  );

  const allCountriesData = [];
  countriesData?.data?.data?.map((country) =>
    allCountriesData.push({
      value: country?.isoCode,
      label: country?.name,
    })
  );

  const totalPrice = cartItems?.reduce((a, b) => {
    return a + b?.price * b?.qty;
  }, 0);
  console.log("🚀 ~ totalPrice ~ totalPrice:", totalPrice);

  const totalWeight = cartItems?.reduce((a, b) => {
    return a + b?.weight;
  }, 0);

  let getProfile = [];
  const [paymentModal, setPaymentModal] = useState(false);
  const [stripeModal, setStripeModal] = useState(false);
  const [addressModal, setAddressModal] = useState(""); // open, addNewAddress, map

  const [deliveryData, setDeliveryData] = useState({
    how: 1,
    where: 1,
    when: 1,
    howShow: false,
    whereShow: false,
    whenShow: false,
    schedule: "",
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState("PK");
  const [selectedCountryCities, setSelectedCountryCities] = useState([]);
  const [clientSecret, setClientSecret] = useState("");

  const [deliveryAddress, setDeliveryAddress] = useState({
    companyaddress: "",
    addressLineOne: "",
    addressLineTwo: "",
    town: "",
    country: "",
    state: "",
    countryInSystemId: "",
    stateInSystemId: "",
    cityInSystemId: "",
    zipCode: "",
    lat: "",
    lng: "",
    status: true,
  });

  const navigateTo = () => {
    router.push("/product");
  };

  const PayM = [];
  const paymentMethods = [
    { name: "COD", type: "cod" }, // New COD payment method
    { name: "Cheque", type: "cheque" }, // New Cheque payment method
    { name: "Card", type: "card" }, // New Cheque payment method
  ];

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  const handleChooseAddress = (address) => {
    localStorage.setItem(
      "address",
      `${address?.companyaddress},
              ${address?.town}, 
              ${address?.zipCode}, 
              ${address?.country}, 
              ${address?.state}`
    );
    localStorage.setItem("addressId", address?.id);
    success_toaster("Address updated successfully");
    setAddressModal("");
  };

  const handleNewAddress = () => {
    setAddressModal("addNewAddress");
  };

  const handleSelectedCountryCities = async (countryName) => {
    const selectedCountry = countriesData?.data?.data?.find(
      (country) => country?.name === countryName
    );
    try {
      const res = await axios.get(
        BASE_URL +
          `api/v1/admin/address-management/city?countryInSystemId=${selectedCountry?.id}`
      );
      if (res?.data?.status === "success") {
        setSelectedCountryCities([...res?.data?.data?.data]);
      }
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const createOrder = async () => {
    if (totalPrice === "") {
      info_toaster("Total Price cannot be empty");
    } else if (totalWeight === "") {
      info_toaster("Total Weight cannot be empty");
    }
    //  else if (order?.note.trim() === "") {
    //   info_toaster("Note cannot be empty");
    // }
    else if (order.paymentMethod.trim() === "") {
      info_toaster("Select payment Method");
    } else {
      if (order?.paymentMethod?.includes("card")) {
        setStripeModal(true);
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
              paymentMethod: order?.paymentMethod,
              poNumber: order?.poNumber,
              frequency: order?.orderFrequency, // 'just-onces', 'weekly', 'every-two-weeks', 'every-four-weeks'
              addressId: addressId,
              userId: userId,
              shippingCharges: order?.shippingCharges,
            },
            items: cartItems,
          });
          console.log("🚀 ~ createOrder ~ res:", res?.data?.data?.id);
          if (res?.data?.status === "success") {
            setCartItems([]);
            setLoader(false);
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("orderId", res?.data?.data?.id);
            router.push("/timeline");
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
    }
  };

  const handleModalBackButton = () => {
    addressModal === "map"
      ? setAddressModal("addNewAddress")
      : addressModal === "addNewAddress"
      ? setAddressModal("open")
      : "";
  };

  const calculateRoute = () => {
    const place = autocompleteRef.current.getPlace();
    if (!autocompleteRef.current) {
      console.warn("Autocomplete not loaded yet");
      return;
    }

    if (!place) {
      console.warn("No place returned from getPlace()");
      return;
    }

    const formattedAddress = place.formatted_address;
    const addressComponents = place.address_components || [];
    const getAddressComponent = (type) =>
      addressComponents.find((component) => component.types.includes(type))
        ?.long_name || "";
    const countryName = getAddressComponent("country");
    const countryShortName =
      addressComponents.find((c) => c.types.includes("country"))?.short_name ||
      "";
    const city =
      getAddressComponent("locality") ||
      getAddressComponent("administrative_area_level_2");
    const state = getAddressComponent("administrative_area_level_1");
    const postalCode = getAddressComponent("postal_code");

    if (!place.geometry || !place.geometry.location) {
      info_toaster("Please select an address");
      return;
    }

    // const latLng = {
    //   lat: place.geometry.location.lat(),
    //   lng: place.geometry.location.lng(),
    // };

    setDeliveryAddress({
      ...deliveryAddress,
      country: countryName,
      zipCode: postalCode,
      state: state,
      town: city,
      companyaddress: formattedAddress,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    setCenter({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  };

  const handleAddAddress = async () => {
    let cityStatus = selectedCountryCities.find(
      (city) => city?.name === deliveryAddress?.town
    );
    if (cityStatus) {
      try {
        const res = await PostAPI(`api/v1/users/address/add-new/${userId}`, {
          address: {
            companyaddress: deliveryAddress?.companyaddress,
            addressLineOne: "",
            addressLineTwo: "",
            town: deliveryAddress?.town,
            country: deliveryAddress?.country,
            state: deliveryAddress?.state,
            countryInSystemId: cityStatus?.countryInSystemId,
            stateInSystemId: cityStatus?.stateInSystemId,
            cityInSystemId: cityStatus?.id,
            zipCode: deliveryAddress?.zipCode,
            lat: deliveryAddress?.lat,
            lng: deliveryAddress?.lng,
            status: true,
          },
        });
        if (res?.data?.status === "success") {
          success_toaster("Address added successfully");
          setAddressModal("");
          reFetchAddresses();
          cityStatus = {};
        } else {
          throw new Error(
            res?.data?.message || "An unexpected error occurred."
          );
        }
      } catch (error) {
        ErrorHandler(error);
      }
    } else {
      info_toaster("Service not operational here");
    }
  };

  const handleDragEnd = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      const lat = newCenter.lat();
      const lng = newCenter.lng();

      setCenter({ lat, lng });

      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const addressComponents = results[0].address_components;

          const cityComponent = addressComponents.find((component) =>
            component.types.includes("locality")
          );

          const stateComponent = addressComponents.find((component) =>
            component.types.includes("administrative_area_level_1")
          );

          const city = cityComponent ? cityComponent.long_name : "Unknown";
          const state = stateComponent ? stateComponent.long_name : "Unknown";

          setDeliveryAddress({
            ...deliveryAddress,
            lat,
            lng,
            town: city,
            state: state,
          });
        } else {
          console.error("Geocoder failed:", status);
        }
      });
    }
  };

  const fetchCharges = async () => {
    try {
      const res = await PostAPI("api/v1/admin/shipping-charges-on-weight", {
        weight: totalWeight,
      });
      console.log("🚀 ~ fetchCharges ~ res:", res?.data?.data?.charges);
      if (res?.data?.status === "success") {
        success_toaster("Charges Added Successfully");
        setOrder({ ...order, shippingCharges: res?.data?.data?.charges });
      } else {
        throw new Error(res?.data?.message || "An unexpected error occurred.");
      }
    } catch (error) {
      ErrorHandler(error);
    }
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await PostAPI("api/v1/users/create-payment-intent", {
          amount: totalPrice,
        });
        if (res?.data?.status === "success") {
          setClientSecret(res?.data?.data?.clientSecret);
        } else {
          throw new Error(
            res?.data?.message || "An unexpected error occurred."
          );
        }
      } catch (err) {
        error_toaster("Failed to fetch client secret", err);
      }
    };
    fetchClientSecret();
    fetchCharges();
  }, []);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Secure Checkout",
      url: "https://www.busybeancoffee.com/checkout", // Change if different
      description:
        "Complete your order for premium coffee beans, creamers, and syrups. Fast shipping and easy checkout with Busy Bean Coffee.",
      isPartOf: {
        "@type": "WebSite",
        name: "Busy Bean Coffee",
        url: "https://www.busybeancoffee.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.busybeancoffee.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: "https://www.busybeancoffee.com/products",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Checkout",
          item: "https://www.busybeancoffee.com/checkout",
        },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Secure Checkout | Busy Bean Coffee</title>
        <meta
          name="description"
          content="Securely complete your Busy Bean Coffee order with premium wholesale products for cafés, restaurants, and stores."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="bg-theme font-satoshi">
        <section className="bg-theme-green font-satoshi">
          <div className="h-96 relative text-black hover:text-opacity-50">
            <LoadScript googleMapsApiKey={googleApiKey} libraries={["places"]}>
              <GoogleMap
                zoom={14}
                center={{
                  lat: 31.4711,
                  lng: 74.24192,
                }}
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                options={{
                  disableDefaultUI: true,
                  draggable: false,
                  scrollwheel: false,
                  disableDoubleClickZoom: true,
                  zoomControl: false,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                  }}
                  className="customMarkF"
                >
                  {/* <img src="/images/pin-location.svg" alt="Fixed Marker" /> */}
                </div>
              </GoogleMap>
            </LoadScript>
            <div className="lg:hidden absolute z-10 bottom-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>

            <div className="max-w-[1200px] px-[30px] mx-auto -mt-20 md:-mt-48 z-20 relative pointer-events-none">
              {/* <div
                onClick={() => {
                  router.back();
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
              <div className="space-y-8">
                <h3 className="font-semibold text-xl sm:text-[1.75rem] text-white font-satoshi">
                  Delivery Details
                </h3>
                <div className="text-white rounded-lg bg-themeLight  my-4 mb-12">
                  {deliveryData.how === 1 && (
                    <>
                      <div>
                        <div className="relative w-full group">
                          <div className="font-sf font-normal text-base text-theme-black-2 flex items-center gap-3 px-5 py-[5px] duration-300 border-2 border-white hover:border-goldenLight focus-within:border-goldenLight rounded-t-lg">
                            <FaLocationCrosshairs size={24} />
                            <div className="relative w-full">
                              <div className="flex justify-between items-center w-full">
                                <div
                                  type="text"
                                  id="courier-note"
                                  disabled
                                  className={`w-full h-full py-5 pt-7 pb-2 focus:outline-none bg-transparent peer placeholder-transparent`}
                                >
                                  {address}
                                </div>
                                <button
                                  onClick={() => setAddressModal("open")}
                                  type="button"
                                  className="px-3 py-1 h-10 rounded-md font-semibold text-themeGreen bg-[#40875D24]"
                                >
                                  Change
                                </button>
                              </div>
                              <label
                                htmlFor="courier-note"
                                className={`absolute left-0 top-[5px] text-[13px] text-goldenLight`}
                              >
                                Delivery Address
                              </label>
                            </div>
                          </div>

                          <div className="font-sf font-normal text-base text-theme-black-2 flex items-center gap-3 px-5 py-[5px] duration-300 border-2 border-white hover:border-goldenLight focus-within:border-goldenLight">
                            <MdInsertComment size={24} />
                            <div className="relative w-full">
                              <input
                                type="text"
                                id="courier-note"
                                className={`w-full h-full py-5 pt-7 pb-2 focus:outline-none bg-transparent peer ${
                                  order?.note ? "placeholder-transparent" : ""
                                }`}
                                value={order?.note}
                                onChange={(e) =>
                                  setOrder({ ...order, note: e.target.value })
                                }
                              />
                              <label
                                htmlFor="courier-note"
                                className={`absolute left-0 top-4 text-gray-400 transition-all ${
                                  order?.note
                                    ? "top-[5px] text-[13px] peer-focus:text-goldenLight"
                                    : "peer-placeholder-shown:top-5 peer-placeholder-shown:text-goldenLight peer-focus:top-[7px] peer-focus:text-[13px] peer-focus:text-goldenLight"
                                }`}
                              >
                                {order?.note
                                  ? "Note for the supplier"
                                  : "Add note for the supplier (optional)"}
                              </label>
                            </div>
                          </div>
                          <div className="font-sf font-normal text-base text-theme-black-2 flex items-center gap-3 px-5 py-[5px] duration-300 border-2 border-white hover:border-goldenLight focus-within:border-goldenLight rounded-b-lg">
                            <MdOutlineConfirmationNumber size={24} />
                            <div className="relative w-full">
                              <input
                                type="text"
                                id="poNumber"
                                className={`w-full h-full py-5 pt-7 pb-2 focus:outline-none bg-transparent peer ${
                                  order?.poNumber
                                    ? "placeholder-transparent"
                                    : ""
                                }`}
                                value={order?.poNumber}
                                onChange={(e) =>
                                  setOrder({
                                    ...order,
                                    poNumber: e.target.value,
                                  })
                                }
                              />
                              <label
                                htmlFor="poNumber"
                                className={`absolute left-0 top-4 text-gray-400 transition-all ${
                                  order?.poNumber
                                    ? "top-[5px] text-[13px] peer-focus:text-goldenLight"
                                    : "peer-placeholder-shown:top-5 peer-placeholder-shown:text-goldenLight peer-focus:top-[7px] peer-focus:text-[13px] peer-focus:text-goldenLight"
                                }`}
                              >
                                {order?.poNumber
                                  ? "Purchase Order Number"
                                  : "Add Purchase Order Number (optional)"}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

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
                  {cartItems?.map((cart, index) => {
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
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-between gap-x-4 w-full text-lg cursor-pointer"
                        onClick={() => {
                          setPaymentModal(true);
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
                              : order?.paymentMethod?.includes("card")
                              ? "/images/credit-card.webp"
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
                  </div>
                </div>
              )}

              {deliveryData.how === 1 && (
                <>
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
                      Once
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
                  <h6>$ {totalPrice?.toFixed(2)}</h6>
                </div>
                <div className="flex items-center justify-between gap-x-2">
                  <h5 className="text-base text-checkoutTextColor">
                    Shipping Charges
                  </h5>
                  <h6>$ {order?.shippingCharges}</h6>
                </div>
                {deliveryData.how === 1 && (
                  <>
                    <div className="flex items-center justify-between gap-x-2">
                      <h5 className="text-base md:text-md text-checkoutTextColor">
                        VAT
                      </h5>
                      <h6>0.00 %</h6>
                    </div>
                    {/* <div className="flex items-center justify-between gap-x-2">
                      <h5 className="text-base md:text-md text-checkoutTextColor">
                        Total Weight
                      </h5>

                      <h6 className="flex gap-x-2">
                        {totalWeight?.toFixed(2)} kg
                      </h6>
                    </div> */}
                  </>
                )}

                <div className="flex items-center justify-between gap-x-2 pb-4">
                  <h5 className="font-semibold text-checkoutTextColor text-base">
                    Total
                  </h5>
                  <h6 className="font-semibold text-checkoutTextColor text-base">
                    ${" "}
                    {(
                      Number(totalPrice) + Number(order?.shippingCharges)
                    )?.toFixed(2)}
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
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      <Dialog.Root
        placement="center"
        size={stripeModal ? "md" : "lg"}
        open={
          paymentModal ||
          stripeModal ||
          addressModal === "open" ||
          addressModal === "addNewAddress" ||
          addressModal === "map"
        }
        onOpenChange={(e) => {
          if (!e.open) {
            setPaymentModal(false);
            setStripeModal(false);
            setAddressModal(null);
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
              <div
                className={`${
                  addressModal === "map" || addressModal === "addNewAddress"
                    ? "flex justify-between items-center"
                    : "flex justify-end"
                }  w-full`}
              >
                <button
                  className={`${
                    addressModal === "map" || addressModal === "addNewAddress"
                      ? "flex"
                      : "hidden"
                  } justify-center items-center p-1 size-7 text-black rounded-full hover:bg-black hover:text-white duration-200`}
                  onClick={handleModalBackButton}
                >
                  <FaArrowLeft size={30} />
                </button>

                <button
                  onClick={() => {
                    setPaymentModal(false);
                    setAddressModal("");
                    setStripeModal(false);
                  }}
                >
                  <RxCross2
                    size={30}
                    className="cursor-pointer border border-white text-themeDark hover:text-white hover:bg-themeDark rounded-md"
                  />
                </button>
              </div>
              <Dialog.Body className="pt-4">
                {stripeModal ? (
                  <div className="w-full">
                    <h2 className="text-2xl font-semibold mb-4">Payment</h2>
                    {clientSecret && (
                      <Elements stripe={stripePromise} options={options}>
                        <StripeCardForm
                          cartItems={cartItems}
                          addressId={addressId}
                          userId={userId}
                          order={order}
                          totalPrice={totalPrice}
                          setStripeModal={setStripeModal}
                          clientSecret={clientSecret}
                          setCartItems={setCartItems}
                          setLoader={setLoader}
                          router={router}
                        />
                      </Elements>
                    )}
                  </div>
                ) : paymentModal ? (
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
                                    : itm?.name.includes("Card")
                                    ? "/images/credit-card.webp"
                                    : ""
                                }`}
                                alt="payment-card"
                                className="w-9 h-9 object-contain"
                              />
                              <span className="text-base font-sf font-medium text-theme-black-2">
                                {itm?.name.includes("Cheque")
                                  ? "Bank Cheque"
                                  : itm?.name}
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
                ) : addressModal === "open" ? (
                  <div className="space-y-4">
                    <p className="text-3xl text-theme-black-2 font-inter font-bold">
                      Where To ?
                    </p>
                    {/* 
                    {addressData?.data?.data?.map((address, i) => (
                      <div key={i} className="flex items-center gap-x-2 min-h-10">
                        <div className="flex items-start">
                          <FaLocationDot size={30} />
                        </div>
                        <div className="min-h-12 w-full flex flex-col justify-between">
                          <div className="flex justify-between items-center gap-y-6 w-full">
                            <p className="text-sm font-normal text-white font-sf ellipsis6">
                              {address?.companyaddress}, {address?.town},{" "}
                              {address?.zipCode}, {address?.country},{" "}
                              {address?.state}
                            </p>
                            {addressId != address?.id && (
                              <button
                                onClick={() => handleChooseAddress(address)}
                                className="bg-white text-themeDark bg-opacity-20 flex justify-center items-center text-end rounded-md py-2 px-4 font-semibold"
                              >
                                Choose
                              </button>
                            )}
                          </div>
                          <hr className="h-[1px] bg-white w-full" />
                        </div>
                      </div>
                    ))} */}

                    {addressData?.data?.data?.map((address, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-x-2 [&>div]:pb-4 min-h-14"
                      >
                        <div>
                          <FaLocationDot size={30} />
                        </div>
                        <div className="w-full flex justify-between items-center border-b-[1px] border-white">
                          <p
                            className={`${addressId == address?.id && "py-2"}`}
                          >
                            {" "}
                            {address?.companyaddress}, {address?.town},{" "}
                            {address?.zipCode}, {address?.country},{" "}
                            {address?.state}
                          </p>
                          {addressId != address?.id && (
                            <button
                              onClick={() => handleChooseAddress(address)}
                              className="bg-white text-themeDark bg-opacity-20 flex justify-center items-center text-end rounded-md py-2 px-4 font-semibold"
                            >
                              Choose
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* <div className="flex">
                      <div>
                        <FaPlus size={30} />
                      </div>
                      <div className="w-full space-y-4">
                        <div className="">
                          <button
                            onClick={handleNewAddress}
                            type="button"
                            className="text-sm font-normal text-white font-sf ellipsis6"
                          >
                            Add New Address
                          </button>
                          <hr className="h-[1px] bg-white w-full pt-4" />
                        </div>
                      </div>
                    </div> */}

                    <div className="flex items-center gap-x-2 [&>div]:pb-4">
                      <div>
                        <FaPlus size={30} />
                      </div>
                      <div className="w-full flex justify-between items-center border-b-[1px] border-white">
                        <button
                          onClick={handleNewAddress}
                          type="button"
                          className="py-2"
                        >
                          Add New Address
                        </button>
                      </div>
                    </div>
                  </div>
                ) : addressModal === "addNewAddress" ? (
                  <div className="space-y-6">
                    <p className="text-3xl text-theme-black-2 font-inter font-bold">
                      Add New Address
                    </p>

                    <div className="space-y-4">
                      <Select
                        placeholder="Select Country"
                        className="w-full"
                        styles={drawerSelectStyles}
                        options={allCountriesData}
                        onChange={(e) => {
                          setDeliveryAddress({
                            ...deliveryAddress,
                            country: e.label,
                          });
                          setSelectedCountryCode(e.value);
                          handleSelectedCountryCities(e.label);
                        }}
                      />

                      <div className="space-y-2 w-full">
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          options={{
                            componentRestrictions: {
                              country: [selectedCountryCode],
                            },
                          }}
                          onPlaceChanged={calculateRoute}
                        >
                          <input
                            ref={inputRef}
                            type="text"
                            placeholder="Choose a delivery address"
                            className="w-full rounded-md border border-themeLight bg-white placeholder:text-themeLight text-themeLight outline-none px-3 py-3"
                          />
                        </Autocomplete>
                      </div>

                      <div className="md:grid md:grid-cols-2 gap-x-4 max-md:space-y-4">
                        <div className="flex flex-col gap-y-2">
                          <label className="text-white font-medium">
                            Country
                          </label>
                          <input
                            type="text"
                            name="country"
                            // onChange={handleAddress}
                            value={deliveryAddress?.country}
                            placeholder="Enter Country"
                            className="w-full rounded-md border border-themeLight bg-white placeholder:text-themeLight text-themeLight outline-none px-3 py-3"
                          />
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <label className="text-white font-medium">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            // onChange={handleAddress}
                            value={deliveryAddress?.state}
                            placeholder="Enter State"
                            className="w-full rounded-md border border-themeLight bg-white placeholder:text-themeLight text-themeLight outline-none px-3 py-3"
                          />
                        </div>
                      </div>

                      <div className="md:grid md:grid-cols-2 gap-x-4 max-md:space-y-4">
                        <div className="flex flex-col gap-y-2">
                          <label className="text-white font-medium">
                            Town / City
                          </label>
                          <input
                            type="text"
                            name="town"
                            // onChange={handleAddress}
                            value={deliveryAddress?.town}
                            placeholder="Enter Town / City"
                            className="w-full rounded-md border border-themeLight bg-white placeholder:text-themeLight text-themeLight outline-none px-3 py-3"
                          />
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <label className="text-white font-medium">
                            Zip Code
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            // onChange={handleAddress}
                            value={deliveryAddress?.zipCode}
                            placeholder="Enter Zip Code"
                            className="w-full rounded-md border border-themeLight bg-white placeholder:text-themeLight text-themeLight outline-none px-3 py-3"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setAddressModal("map")}
                        className="bg-white w-full text-base font-bold text-themeDark rounded-md h-[54px]"
                      >
                        Select from Map
                      </button>
                      <button
                        type="button"
                        onClick={handleAddAddress}
                        className="bg-themeDark w-full text-base font-bold text-white rounded-md h-[54px]"
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                ) : addressModal === "map" ? (
                  <div className="space-y-6">
                    <div className="space-y-4 [&>div]:space-y-2">
                      <div>
                        <p className="capitalize text-3xl text-white font-bold font-inter">
                          Address Details
                        </p>
                        <p className="text-base font-serif font-normal text-theme-black-2 text-opacity-60 ">
                          Giving exact address details helps us deliver your
                          order faster.
                        </p>
                      </div>
                      <div>
                        <p className="capitalize text-xl text-themeLight font-semibold font-inter">
                          Address
                        </p>
                        <p className="text-sm font-normal text-theme-black-2 text-opacity-60">
                          {deliveryAddress?.companyaddress}
                        </p>
                      </div>
                    </div>
                    <GoogleMap
                      zoom={14}
                      center={center}
                      mapContainerStyle={{
                        width: "100%",
                        height: "200px",
                      }}
                      onLoad={(map) => (mapRef.current = map)}
                      onDragEnd={handleDragEnd}
                      options={{
                        disableDefaultUI: true,
                        draggable: true,
                        scrollwheel: true,
                        disableDoubleClickZoom: true,
                        zoomControl: true,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -100%)",
                          pointerEvents: "none",
                        }}
                      >
                        <img
                          src="/images/pin-location.svg"
                          alt="center marker"
                          width={40}
                          height={40}
                        />
                      </div>
                    </GoogleMap>

                    <button
                      type="button"
                      onClick={handleAddAddress}
                      className="bg-themeDark w-full text-base font-bold text-white rounded-md h-[54px]"
                    >
                      Save Address
                    </button>
                  </div>
                ) : (
                  <></>
                )}
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
