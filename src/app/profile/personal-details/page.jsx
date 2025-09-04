"use client";
import Select from "react-select";
import api from "@/utilities/StatusErrorHandler";
import { BASE_URL } from "@/utilities/URL";
import ErrorHandler from "@/utilities/ErrorHandler";
import MiniLoader from "@/components/ui/MiniLoader";
import { PutAPI } from "@/utilities/PutAPI";
import GetAPI from "@/utilities/GetAPI";
import { useEffect, useState } from "react";
import { info_toaster, success_toaster } from "@/utilities/Toaster";
import { FaCircleUser } from "react-icons/fa6";
import { drawerSelectStyles2 } from "@/utilities/SelectStyle";
import Head from "next/head";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const personalDetails = () => {
  const [model, setModel] = useState({ type: "", open: false });
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState(null);
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const [profile, setProfile] = useState({
    userId: "",
    name: "",
    phoneNumber: "",
    saleTaxNumber: "",
    emailToSendInvoices: "",
    companyName: "",
    addressId: "",
    companyaddress: "",
    shipping: {
      addressLineOne: "",
      addressLineTwo: "",
      town: "",
      zipCode: "",
      country: "",
      state: "",
    },
    billing: {
      addressLineOne: "",
      addressLineTwo: "",
      town: "",
      zipCode: "",
      country: "",
      state: "",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userID"));
    }
  }, []);

  const { data: customerDetail } = GetAPI(
    userId ? `api/v1/users/view-customer-detail/${userId}` : null
  );
  
  const areAddressesSame = (shipping, billing) => {
    if (!shipping || !billing) return false;
    const keys = ["addressLineOne", "addressLineTwo", "country", "state", "town", "zipCode"];
    return keys.every((k) => (shipping?.[k] || "").trim() === (billing?.[k] || "").trim());
  };

  useEffect(() => {
    if (customerDetail?.status === "success") {
      const customer = customerDetail.data.customer;
      const shipping = {
        addressLineOne: customer.addresses?.[0]?.addressLineOne || "",
        addressLineTwo: customer.addresses?.[0]?.addressLineTwo || "",
        town: customer.addresses?.[0]?.town || "",
        zipCode: customer.addresses?.[0]?.zipCode || "",
        country: customer.addresses?.[0]?.country || "",
        state: customer.addresses?.[0]?.state || "",
      };
      const billing = {
        id: customer.billingAddresses?.[0]?.id || null,
        addressLineOne: customer.billingAddresses?.[0]?.addressLineOne || "",
        addressLineTwo: customer.billingAddresses?.[0]?.addressLineTwo || "",
        town: customer.billingAddresses?.[0]?.town || "",
        zipCode: customer.billingAddresses?.[0]?.zipCode || "",
        country: customer.billingAddresses?.[0]?.country || "",
        state: customer.billingAddresses?.[0]?.state || "",
      };

      setProfile({
        userId: customer.id,
        name: customer.name || "",
        phoneNumber: customer.phoneNumber || "",
        saleTaxNumber: customer.saleTaxNumber || "",
        emailToSendInvoices: customer.emailToSendInvoices || "",
        companyName: customer.companyName || "",
        companyaddress: customer.addresses?.[0]?.companyaddress || "",
        addressId: customer.addresses?.[0]?.id || "",
        shipping,
        billing,
      });

      setSameAsShipping(areAddressesSame(shipping, billing));
    }
  }, [customerDetail]);

  const formatAddress = (addr) => (
    <>
      {addr.addressLineOne && <div>{addr.addressLineOne}</div>}
      {addr.addressLineTwo && <div>{addr.addressLineTwo}</div>}
      <div>
        {addr.town}, {addr.state} {addr.zipCode}
      </div>
      <div>{addr.country}</div>
    </>
  );

  const handleProfileUpdate = async (type) => {
    let data = {};

    if (type === "address") {
      // Shipping
      const shipping = {
        addressId: profile?.addressId,
        addressData: {
          companyaddress: profile.companyaddress || "",
          addressLineOne: profile.shipping.addressLineOne,
          addressLineTwo: profile.shipping.addressLineTwo,
          town: profile.shipping.town,
          zipCode: profile.shipping.zipCode,
          country: profile.shipping.country,
          state: profile.shipping.state,
        },
      };

      // Billing
      const billing = {
        billingAddressId: profile?.billing?.id || null,
        billingAddressData: sameAsShipping
          ? { ...shipping.addressData } 
          : {
            companyaddress: profile.companyaddress || "",
            addressLineOne: profile.billing.addressLineOne,
            addressLineTwo: profile.billing.addressLineTwo,
            town: profile.billing.town,
            zipCode: profile.billing.zipCode,
            country: profile.billing.country,
            state: profile.billing.state,
          },
      };

      data = {
        ...shipping,
        ...billing,
      };
    } else {
      data = {
        userId: profile?.userId,
        userData: { [type]: profile?.[type] },
      };
    }

    setLoader(true);
    let res = await PutAPI("api/v1/users/drawer/update-profile", data);

    if (res?.data?.status === "success") {
      setLoader(false);
      setModel({ ...model, type: "" });
      if (type === "address" && sameAsShipping) {
        setProfile((prev) => ({
          ...prev,
          billing: { ...prev.shipping },
        }));
      }
      success_toaster("Profile Updated");
    } else {
      setLoader(false);
      info_toaster("Failed to update");
    }
  };

  const [showPwForm, setShowPwForm] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pw, setPw] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [vis, setVis] = useState({ old: false, next: false, confirm: false });

  const passwordErrors = [];
  if (!pw.oldPassword) passwordErrors.push("Current password is required");
  if (!pw.newPassword) passwordErrors.push("New password is required");
  if (pw.newPassword && pw.newPassword.length < 8)
    passwordErrors.push("New password must be at least 8 characters");
  if (pw.newPassword && !/[A-Za-z]/.test(pw.newPassword))
    passwordErrors.push("New password must include a letter");
  if (pw.newPassword && !/\d/.test(pw.newPassword))
    passwordErrors.push("New password must include a number");
  if (pw.confirmPassword !== pw.newPassword)
    passwordErrors.push("Confirm password does not match");

  const handleChangePassword = async () => {
    if (passwordErrors.length) {
      info_toaster(passwordErrors[0]);
      return;
    }
    setPwLoading(true);
    try {
      const res = await PutAPI("api/v1/users/drawer/update-profile", {
        userData: {
          userId: profile?.userId,
          oldPassword: pw.oldPassword,
          newPassword: pw.newPassword,
        },
      });

      if (res?.data?.status === "success") {
        success_toaster("Password updated successfully");
        setShowPwForm(false);
        setPw({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } finally {
      setPwLoading(false);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Account Details",
    url: "https://www.busybeancoffee.com/personal-details",
    description:
      "Manage your profile information like name, company details, billing email, address, phone number, and tax information on Busy Bean Coffee.",
    isPartOf: {
      "@type": "WebSite",
      name: "Busy Bean Coffee",
      url: "https://www.busybeancoffee.com",
    },
  };

  return (
    <>
      <Head>
        <title>Account Details | Busy Bean Coffee</title>
        <meta
          name="description"
          content="Update and manage your personal details like name, email, phone number, company name, and tax ID."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="w-full ">
        <div className=" bg-theme pt-32 sm:pt-[180px] pb-10 relative">
          <div className="w-full h-full absolute top-0 left-0 z-10 [&>img]:opacity-[0.05] bg-gradient-to-b from-[#00000097] to-transparent pointer-events-none"></div>

          {!profile?.userId ? (
            <div className="h-[50vh] flex justify-center items-center">
              <MiniLoader />
            </div>
          ) : (
            <div className="w-[90%] md:w-[75%] mx-auto bg-themeLight border-theme border text-white rounded-xl shadow-md pb-10 relative z-20">
              {/* Header */}
              <div className="flex justify-between items-center mx-6 md:mx-14 border-b border-theme py-3 sm:py-6">
                <div className="space-y-2 font-satoshi">
                  <h4 className="font-bold text-xl sm:text-3xl">
                    Account details
                  </h4>
                  <p className="text-sm opacity-60">
                    Upload your info and find how it’s used.
                  </p>
                </div>
                <FaCircleUser size={50} />
              </div>

              {/* Name */}
              <Section
                label="Name"
                field="name"
                profile={profile}
                setProfile={setProfile}
                model={model}
                setModel={setModel}
                handleUpdate={handleProfileUpdate}
              />

              {/* Company Name */}
              <Section
                label="Company Name"
                field="companyName"
                profile={profile}
                setProfile={setProfile}
                model={model}
                setModel={setModel}
                handleUpdate={handleProfileUpdate}
              />

              {/* Email to send invoice */}
              <Section
                label="Email to send invoice"
                field="emailToSendInvoices"
                profile={profile}
                setProfile={setProfile}
                model={model}
                setModel={setModel}
                handleUpdate={handleProfileUpdate}
              />

              {/* Phone Number */}
              <Section
                label="Phone Number"
                field="phoneNumber"
                profile={profile}
                setProfile={setProfile}
                model={model}
                setModel={setModel}
                handleUpdate={handleProfileUpdate}
              />

              {/* Sales Tax Number */}
              <Section
                label="Sales Tax Number"
                field="saleTaxNumber"
                profile={profile}
                setProfile={setProfile}
                model={model}
                setModel={setModel}
                handleUpdate={handleProfileUpdate}
              />

              {/* Address */}
              <AddressSection
                profile={profile}
                setProfile={setProfile}
                model={model}
                setModel={setModel}
                sameAsShipping={sameAsShipping}
                setSameAsShipping={setSameAsShipping}
                handleUpdate={handleProfileUpdate}
                formatAddress={formatAddress}
              />

              {/* Password */}
              <PasswordSection
                showPwForm={showPwForm}
                setShowPwForm={setShowPwForm}
                pw={pw}
                setPw={setPw}
                vis={vis}
                setVis={setVis}
                passwordErrors={passwordErrors}
                handleChangePassword={handleChangePassword}
                pwLoading={pwLoading}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ---------------- Reusable Sub Components ------------------

const Section = ({ label, field, profile, setProfile, model, setModel, handleUpdate }) => (
  <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
    <p className="text-sm sm:text-lg font-medium max-lg:col-span-2">{label}</p>
    {model.type === field ? (
      <input
        className="w-full p-2 rounded-lg bg-transparent outline-none border border-theme/50"
        type="text"
        value={profile?.[field] || ""}
        onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
      />
    ) : (
      <p className="text-sm sm:text-base font-light opacity-60">{profile?.[field]}</p>
    )}
    {model.type === field ? (
      <button
        className="text-sm sm:text-lg font-medium flex justify-end w-max bg-red-50 text-black ml-auto p-1 rounded-md"
        onClick={() => handleUpdate(field)}
      >
        Save
      </button>
    ) : (
      <p
        onClick={() => setModel({ ...model, type: field })}
        className="text-sm sm:text-lg font-medium flex justify-end cursor-pointer"
      >
        Edit
      </p>
    )}
  </div>
);

const AddressSection = ({
  profile,
  setProfile,
  model,
  setModel,
  handleUpdate,
  formatAddress,
  sameAsShipping,
  setSameAsShipping,
}) => {
  const { data: countriesData } = GetAPI("api/v1/admin/address-management/country");
  const [allStates, setAllStates] = useState([]);
  const [billingStates, setBillingStates] = useState([]);

  const allCountriesData =
    countriesData?.data?.data?.map((c) => ({
      value: c?.id,
      label: c?.name,
      iso: c?.isoCode,
    })) || [];

  const fetchStates = async (countryId, type) => {
    try {
      const res = await api.get(`${BASE_URL}api/v1/admin/address-management/state?countryInSystemId=${countryId}`);
      if (res?.data?.status === "success") {
        const tempStates = res?.data?.data?.data?.map((s) => ({
          value: s?.id,
          label: s?.name,
        }));
        if (type === "shipping") setAllStates(tempStates);
        else setBillingStates(tempStates);
      }
    } catch (err) {
      ErrorHandler(err);
    }
  };
  useEffect(() => {
    if (profile.shipping?.country) {
      const selectedCountry = allCountriesData.find(
        (c) => c.label === profile.shipping.country
      );
      if (selectedCountry) {
        fetchStates(selectedCountry.value, "shipping");
      }
    }
    if (profile.billing?.country) {
      const selectedCountry = allCountriesData.find(
        (c) => c.label === profile.billing.country
      );
      if (selectedCountry) {
        fetchStates(selectedCountry.value, "billing");
      }
    }
  }, [profile.shipping?.country, profile.billing?.country, countriesData]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 mx-6 md:mx-14 border-b border-theme py-6 font-inter">
      <p className="text-sm sm:text-lg font-medium col-span-2 lg:col-span-3 mb-4">
        Address
      </p>

      {model.type === "address" ? (
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping */}
          <div className="space-y-1">
            <h5 className="font-semibold mb-2">Shipping Address</h5>

            <label>Address Line 1</label>
            <input
              value={profile.shipping.addressLineOne}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  shipping: { ...profile.shipping, addressLineOne: e.target.value },
                })
              }
              className="w-full p-2 rounded-lg border border-theme/50 bg-transparent"
            />

            <label>Address Line 2</label>
            <input
              value={profile.shipping.addressLineTwo}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  shipping: { ...profile.shipping, addressLineTwo: e.target.value },
                })
              }
              className="w-full p-2 rounded-lg border border-theme/50 bg-transparent"
            />

            <label>Country</label>
            <Select
              options={allCountriesData}
              value={allCountriesData.find((c) => c.label === profile.shipping.country) || null}
              onChange={(val) => {
                setProfile({
                  ...profile,
                  shipping: { ...profile.shipping, country: val.label, state: "" },
                });
                fetchStates(val.value, "shipping");
              }}
              styles={drawerSelectStyles2}
            />

            <label>State</label>
            <Select
              options={allStates}
              value={allStates.find((s) => s.label === profile.shipping.state) || null}
              onChange={(val) =>
                setProfile({
                  ...profile,
                  shipping: { ...profile.shipping, state: val.label },
                })
              }
              styles={drawerSelectStyles2}
            />

            <label>Town</label>
            <input
              value={profile.shipping.town}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  shipping: { ...profile.shipping, town: e.target.value },
                })
              }
              className="w-full p-2 rounded-lg border border-theme/50 bg-transparent"
            />

            <label>Zip Code</label>
            <input
              value={profile.shipping.zipCode}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  shipping: { ...profile.shipping, zipCode: e.target.value },
                })
              }
              className="w-full p-2 rounded-lg border border-theme/50 bg-transparent"
            />
          </div>

          {/* Billing */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h5 className="font-semibold mb-2">Billing Address</h5>
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                />
                Same as Shipping
              </label>
            </div>

            <label>Address Line 1</label>
            <input
              value={profile.billing.addressLineOne}
              disabled={sameAsShipping}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  billing: { ...profile.billing, addressLineOne: e.target.value },
                })
              }
              className={`w-full p-2 rounded-lg border border-theme/50 bg-transparent ${sameAsShipping ? "opacity-50 cursor-not-allowed" : ""}`}
            />

            <label>Address Line 2</label>
            <input
              value={profile.billing.addressLineTwo}
              disabled={sameAsShipping}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  billing: { ...profile.billing, addressLineTwo: e.target.value },
                })
              }
              className={`w-full p-2 rounded-lg border border-theme/50 bg-transparent ${sameAsShipping ? "opacity-50 cursor-not-allowed" : ""}`}
            />

            <label>Country</label>
            <Select
              options={allCountriesData}
              value={allCountriesData.find((c) => c.label === profile.billing.country) || null}
              onChange={(val) => {
                setProfile({
                  ...profile,
                  billing: { ...profile.billing, country: val.label, state: "" },
                });
                fetchStates(val.value, "billing");
              }}
              styles={drawerSelectStyles2}
              isDisabled={sameAsShipping}
            />

            <label>State</label>
            <Select
              options={billingStates}
              value={billingStates.find((s) => s.label === profile.billing.state) || null}
              onChange={(val) =>
                setProfile({
                  ...profile,
                  billing: { ...profile.billing, state: val.label },
                })
              }
              styles={drawerSelectStyles2}
              isDisabled={sameAsShipping}
            />

            <label>Town</label>
            <input
              value={profile.billing.town}
              disabled={sameAsShipping}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  billing: { ...profile.billing, town: e.target.value },
                })
              }
              className={`w-full p-2 rounded-lg border border-theme/50 bg-transparent ${sameAsShipping ? "opacity-50 cursor-not-allowed" : ""}`}
            />

            <label>Zip Code</label>
            <input
              value={profile.billing.zipCode}
              disabled={sameAsShipping}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  billing: { ...profile.billing, zipCode: e.target.value },
                })
              }
              className={`w-full p-2 rounded-lg border border-theme/50 bg-transparent ${sameAsShipping ? "opacity-50 cursor-not-allowed" : ""}`}
            />
          </div>
        </div>
      ) : (
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base font-light opacity-80">
          <div>
            <h5 className="font-semibold">SHIPPING</h5>
            {formatAddress(profile.shipping)}
          </div>
          <div>
            <h5 className="font-semibold">BILLING</h5>
            {formatAddress(profile.billing)}
          </div>
        </div>
      )}

      {model.type === "address" ? (
        <div className="flex items-center justify-end col-span-2 lg:col-span-3 mt-4">
          <button
            className="text-sm sm:text-lg font-medium w-max bg-red-50 text-black px-4 py-2 rounded-md"
            onClick={() => handleUpdate("address")}
          >
            Save
          </button>
        </div>
      ) : (
        <p
          onClick={() => setModel({ ...model, type: "address" })}
          className="text-sm sm:text-lg font-medium flex justify-end cursor-pointer self-center col-span-2 lg:col-span-3 mt-4"
        >
          Edit
        </p>
      )}
    </div>
  );
};

const PasswordSection = ({ showPwForm, setShowPwForm, pw, setPw, vis, setVis, passwordErrors, handleChangePassword, pwLoading }) => (
  <div className="mx-6 md:mx-14 border-b border-theme py-3 sm:py-6 font-inter">
    <div className="grid grid-cols-2 lg:grid-cols-3">
      <p className="text-sm sm:text-lg font-medium max-lg:col-span-2">Password</p>
      <p className="text-sm sm:text-base font-light opacity-60">********</p>
      <button
        onClick={() => setShowPwForm((s) => !s)}
        className="text-sm sm:text-lg font-medium flex justify-end"
      >
        {showPwForm ? "Close" : "Change Password"}
      </button>
    </div>

    {showPwForm && (
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {["oldPassword", "newPassword", "confirmPassword"].map((field, i) => (
          <div key={i}>
            <label className="text-xs opacity-70">
              {field === "oldPassword" ? "Current Password" : field === "newPassword" ? "New Password" : "Confirm Password"}
            </label>
            <div className="relative">
              <input
                type={vis[field] ? "text" : "password"}
                className="w-full p-2 rounded-lg bg-transparent outline-none border border-theme/50"
                value={pw[field]}
                onChange={(e) => setPw({ ...pw, [field]: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5"
                onClick={() => setVis((v) => ({ ...v, [field]: !v[field] }))}
              >
                {vis[field] ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
              </button>
            </div>
          </div>
        ))}

        {passwordErrors.length > 0 && (
          <div className="lg:col-span-3 text-xs text-red-300">
            <ul className="list-disc ml-5">{passwordErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
          </div>
        )}

        <div className="lg:col-span-3 flex justify-end mt-2">
          <button
            className="px-4 py-2 rounded-md bg-red-50 text-black disabled:opacity-60"
            onClick={handleChangePassword}
            disabled={pwLoading || passwordErrors.length > 0}
          >
            {pwLoading ? "Updating..." : "Save New Password"}
          </button>
        </div>
      </div>
    )}
  </div>
);

export default personalDetails;
