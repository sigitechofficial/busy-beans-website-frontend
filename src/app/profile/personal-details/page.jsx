"use client";
import MiniLoader from "@/components/ui/MiniLoader";
import { PostAPI } from "@/utilities/PostAPI";
import { PutAPI } from "@/utilities/PutAPI";
import { info_toaster, success_toaster } from "@/utilities/Toaster";
import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

const personalDetails = () => {
  const [model, setModel] = useState({
    type: "",
    open: false,
  });
  const [loader, setLoader] = useState(false);
  const [profile, setProfile] = useState({
    userId: 1,
    name: "John Doe",
    phoneNumber: "123-456-7890",
    saleTaxNumber: "TX1234567890",
    emailToSendInvoices: "invoicedss@company.com",
    companyName: null,
    addressId: "",
    companyaddress: "",
    addressLineOne: "123as Business St",
    addressLineTwo: "Suasite 100",
    town: "",
    zipCode: "12312",
    country: "Pakistan",
    state: "Punjab",
  });

  let userData = {
    addressId: "",
    address: "",
    phoneNumber: "",
    registerBy: "",
    saleTaxNumber: "",
    userEmail: "",
    userId: "",
    name: "",
    emailToSendInvoices: "",
    companyName: "",
    companyaddress: "",
    addressLineOne: "",
    addressLineTwo: "",
    town: "",
    zipCode: "",
    country: "",
    state: "",
  };

  if (typeof window !== "undefined") {
    userData = {
      addressId: localStorage.getItem("addressId") || "",
      address: localStorage.getItem("address") || "",
      phoneNumber: localStorage.getItem("phoneNumber") || "",
      registerBy: localStorage.getItem("registerBy") || "",
      saleTaxNumber: localStorage.getItem("saleTaxNumber") || "",
      userEmail: localStorage.getItem("userEmail") || "",
      userId: localStorage.getItem("userID") || "",
      name: localStorage.getItem("userName") || "",
      emailToSendInvoices: localStorage.getItem("emailToSendInvoices") || "",
      companyName: localStorage.getItem("companyName") || "",
      companyaddress: localStorage.getItem("address")?.split(",")[0] || "",
      addressLineOne: localStorage.getItem("address")?.split(",")[1] || "",
      addressLineTwo: localStorage.getItem("address")?.split(",")[2] || "",
      town: localStorage.getItem("address")?.split(",")[3] || "",
      zipCode: localStorage.getItem("address")?.split(",")[4] || "",
      country: localStorage.getItem("address")?.split(",")[5] || "",
      state: localStorage.getItem("address")?.split(",")[6] || "",
    };
  }

  const handleProfileUpdate = async (type) => {
    let data = {};
    if (type === "address") {
      data = {
        addressId: profile.addressId,
        addressData: {
          companyaddress: profile.companyaddress,
          addressLineOne: profile.addressLineOne,
          addressLineTwo: profile.addressLineTwo,
          town: profile.town,
          zipCode: profile.zipCode,
          country: profile.country,
          state: profile.state,
        },
      };
    }
    setLoader(true);

    let res = await PutAPI("api/v1/users/drawer/update-profile", data);
    console.log("🚀 ~ handleProfileUpdate ~ res:", res);

    if (res?.data?.status === "success") {
      setLoader(false);
      localStorage.setItem(
        "address",
        `${profile?.companyaddress},
        ${profile?.addressLineOne}, 
        ${profile?.addressLineTwo}, 
        ${profile?.town}, 
        ${profile?.zipCode}, 
        ${profile?.country}, 
        ${profile?.state}`
      );
      success_toaster("Profile Updated");
    } else {
      setLoader(false);
      info_toaster("failed !");
    }
  };

  return (
    <div className="w-full ">
      <div className=" bg-theme pt-32 sm:pt-[180px] pb-10 relative">
        {/* overlay */}
        <div className="w-full h-full absolute top-0 left-0 z-10 [&>img]:opacity-[0.05] bg-gradient-to-b from-[#00000097] to-transparent pointer-events-none"></div>
        {/* content */}
        {!userData?.userEmail ? (
          <div className="h-[50vh] flex justify-center items-center">
            <MiniLoader />
          </div>
        ) : (
          <div className="w-[90%] md:w-[75%] mx-auto bg-themeLight border-theme border text-white rounded-xl shadow-md pb-10 relative z-20">
            <div className="flex justify-between items-center mx-6 md:mx-14 border-b  border-theme py-3 sm:py-6">
              <div className="space-y-2 font-satoshi">
                <h4 className="font-bold text-xl sm:text-3xl">
                  Personal details
                </h4>
                <p className="text-sm opacity-60">
                  Upload your info and find how it’s used.
                </p>
              </div>
              <div>
                <FaCircleUser size={50} />
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
              <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
                Name
              </p>{" "}
              {model.type === "name" ? (
                <input
                  className="w-full p-2 rounded-lg bg-transparent outline-none border border-theme/50"
                  type="text"
                  name="name"
                  id="name"
                  value={profile?.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              ) : (
                <p className="text-sm sm:text-base font-light opacity-60">
                  {userData?.name}
                </p>
              )}
              <p
                onClick={() => setModel({ ...model, type: "name" })}
                className="text-sm sm:text-lg font-medium flex justify-end"
              >
                Edit
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
              <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
                Company Name
              </p>
              <p className="text-sm sm:text-base font-light opacity-60">
                {userData?.companyName}
              </p>
              <p
                onClick={() => setModel({ ...model, type: "companyName" })}
                className="text-sm sm:text-lg font-medium flex justify-end"
              >
                Edit
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 py-3 sm:py-6 font-inter max-lg:border-b border-theme ">
              <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
                Email address
              </p>
              <div className="text-lg font-light space-y-2">
                <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2 opacity-60">
                  {userData?.userEmail}
                </p>
                <p className="text-xs opacity-60">
                  This is the email address you can to sign in.
                </p>
              </div>
              <p
                onClick={() => setModel({ ...model, type: "email" })}
                className="text-sm sm:text-lg font-medium flex justify-end"
              >
                Edit
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
              <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
                Email to send invoice
              </p>{" "}
              <div className="text-lg font-light space-y-2">
                <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2 opacity-60">
                  {userData?.emailToSendInvoices}
                </p>
                <p className="text-xs opacity-60">
                  This email use to send Invoice
                </p>
              </div>
              <p
                onClick={() => setModel({ ...model, type: "invoice" })}
                className="text-sm sm:text-lg font-medium flex justify-end"
              >
                Edit
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
              <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
                Phone Number
              </p>{" "}
              <p className="text-sm sm:text-base font-light opacity-60">
                {userData?.phoneNumber}
              </p>{" "}
              <p
                onClick={() => setModel({ ...model, type: "phone" })}
                className="text-sm sm:text-lg font-medium flex justify-end"
              >
                Edit
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
              <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
                Sales Tax Number
              </p>{" "}
              <p className="text-sm sm:text-base font-light opacity-60">
                {" "}
                {userData?.saleTaxNumber}
              </p>
              <p
                onClick={() => setModel({ ...model, type: "tax" })}
                className="text-sm sm:text-lg font-medium flex justify-end"
              >
                Edit
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
              <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
                Address
              </p>{" "}
              {model.type === "address" ? (
                <div className="w-full space-y-2">
                  <div>
                    <label htmlFor="country">Country</label>
                    <input
                      className="w-full p-2 rounded-lg bg-transparent outline-none border border-theme/50"
                      type="text"
                      name="country"
                      id="country"
                      value={profile?.country}
                      onChange={(e) =>
                        setProfile({ ...profile, country: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="addressLineOne">Address 1</label>
                    <input
                      className="w-full p-2 rounded-lg bg-transparent outline-none border border-theme/50"
                      type="text"
                      name="addressLineOne"
                      id="addressLineOne"
                      value={profile?.addressLineOne}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          addressLineOne: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="state">State</label>
                    <input
                      className="w-full p-2 rounded-lg bg-transparent outline-none border border-theme/50"
                      type="text"
                      name="state"
                      id="state"
                      value={profile?.state}
                      onChange={(e) =>
                        setProfile({ ...profile, state: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-x-4 w-full">
                    <div>
                      <label htmlFor="town">City</label>
                      <input
                        className="w-full p-2 rounded-lg bg-transparent outline-none border border-theme/50"
                        type="text"
                        name="town"
                        id="town"
                        value={profile?.town}
                        onChange={(e) =>
                          setProfile({ ...profile, town: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode">Zip Code</label>
                      <input
                        className="w-full p-2 rounded-lg bg-transparent outline-none border border-theme/50"
                        type="text"
                        name="zipCode"
                        id="zipCode"
                        value={profile?.zipCode}
                        onChange={(e) =>
                          setProfile({ ...profile, zipCode: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm sm:text-base font-light opacity-60">
                  {userData?.address?.split(",").join("")}
                </p>
              )}
              {model.type === "address" ? (
                <button
                  className="text-sm sm:text-lg font-medium flex justify-end w-max bg-red-50 text-black ml-auto h-max p-1 rounded-md"
                  onClick={() => {
                    handleProfileUpdate("address");
                    setModel({ ...model, type: "" });
                  }}
                >
                  Save
                </button>
              ) : (
                <p
                  className="text-sm sm:text-lg font-medium flex justify-end"
                  onClick={() => {
                    setProfile({
                      ...profile,
                      addressLineOne: userData.addressLineOne.trim(),
                      addressLineTwo: userData.addressLineTwo.trim(),
                      town: userData.town.trim(),
                      zipCode: userData.zipCode.trim(),
                      country: userData.country.trim(),
                      state: userData.state.trim(),
                      addressId: userData.addressId,
                    });
                    setModel({ ...model, type: "address" });
                  }}
                >
                  Edit
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
              <p className="text-sm sm:text-lg font-medium max-lg:col-span-2 max-md:mb-2">
                Password
              </p>{" "}
              <p className="text-sm sm:text-base font-light opacity-60">
                ********
              </p>{" "}
              <p className="text-sm sm:text-lg font-medium flex justify-end">
                Change Password
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default personalDetails;
