"use client";
import { SignupAPI } from "@/utilities/PostAPI";
import { error_toaster, success_toaster } from "@/utilities/Toaster";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function SignUpStep1() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    info: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      status: true,
      phoneNumber: "",
      saleTaxNumber: "",
      emailToSendInvoices: "",
    },
    address: {
      companyaddress: "",
      addressLineOne: "",
      addressLineTwo: "",
      town: "",
      zipCode: "",
      country: "",
      state: "",
      status: true,
    },
  });
  // console.log("🚀 ~ SignUpStep1 ~ userData:", userData);

  const handleAddress = (e) => {
    setUserData({
      ...userData,
      address: {
        ...userData?.address,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleInfo = (e) => {
    setUserData({
      ...userData,
      info: {
        ...userData?.info,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await SignupAPI("api/v1/users/signup", {
      info: {
        name: userData?.info?.name,
        email: userData?.info?.email,
        password: userData?.info?.password,
        status: true,
        phoneNumber: userData?.info?.phoneNumber,
        saleTaxNumber: userData?.info?.saleTaxNumber,
        emailToSendInvoices: userData?.info?.emailToSendInvoices,
      },
      address: {
        companyaddress: userData?.address?.companyaddress,
        addressLineOne: userData?.address?.addressLineOne,
        addressLineTwo: userData?.address?.addressLineTwo,
        town: userData?.address?.town,
        zipCode: userData?.address?.zipCode,
        country: userData?.address?.country,
        state: userData?.address?.state,
        status: true,
      },
    });
    if (res?.data?.status === "success") {
      success_toaster("Signup successfully");
      router.push("/");
      localStorage.setItem("accessToken", res?.data?.data?.token);
      localStorage.setItem("loginStatus", true);
      localStorage.setItem("userName", res?.data?.data?.user?.name);
      localStorage.setItem("userEmail", res?.data?.data?.user?.email);
      localStorage.setItem("userID", res?.data?.data?.user?.id);
    } else if (res?.data?.status === "error") {
      error_toaster(res?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-themeLight py-5">
      {/* main section start */}

      <div className="relative border border-theme rounded-xl bg-themeDark w-2/4 py-6 mx-auto flex flex-col items-center gap-y-4">
        {(step === 2 || step === 3) && (
          <button
            onClick={() => setStep(step - 1)}
            className="absolute left-10 top-20 flex justify-center items-center w-8 h-8 text-white rounded-full hover:bg-white hover:text-theme duration-200"
          >
            <FaLongArrowAltLeft size={30} />
          </button>
        )}
        <div className="w-80">
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="space-y-6">
          <p className="font-satoshi text-white font-black text-3xl">
            Welcome to Busy Bean Coffee
          </p>
          {step === 1 && (
            <div className="font-satoshi space-y-4">
              <p className="font-black text-2xl text-white">
                1. Company Address
              </p>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium">
                      Company Address
                    </label>
                    <input
                      type="text"
                      name="companyaddress"
                      onChange={handleAddress}
                      value={userData?.address?.companyaddress}
                      placeholder="Enter company address"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      name="addressLineOne"
                      onChange={handleAddress}
                      value={userData?.address?.addressLineOne}
                      placeholder="Enter address line 1"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="addressLineTwo"
                      onChange={handleAddress}
                      value={userData?.address?.addressLineTwo}
                      placeholder="Enter address line 2"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="flex flex-col gap-y-2">
                      <label className="text-white font-medium">
                        Town / City
                      </label>
                      <input
                        type="text"
                        name="town"
                        onChange={handleAddress}
                        value={userData?.address?.town}
                        placeholder="Enter Town / City"
                        className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label className="text-white font-medium">Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        onChange={handleAddress}
                        value={userData?.address?.zipCode}
                        placeholder="Enter Zip Code"
                        className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="flex flex-col gap-y-2">
                      <label className="text-white font-medium">Country</label>
                      <input
                        type="text"
                        name="country"
                        onChange={handleAddress}
                        value={userData?.address?.country}
                        placeholder="Enter Country"
                        className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label className="text-white font-medium">State</label>
                      <input
                        type="text"
                        name="state"
                        onChange={handleAddress}
                        value={userData?.address?.state}
                        placeholder="Enter State"
                        className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setStep(2)}
                    className="font-medium rounded-xl bg-theme text-white w-full py-3"
                  >
                    Signup
                  </button>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="font-satoshi space-y-4">
              <p className="font-black text-2xl text-white flex items-center justify-between gap-x-2">
                2. Company Details
              </p>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phoneNumber"
                      onChange={handleInfo}
                      value={userData?.info?.phoneNumber}
                      placeholder="Enter Phone Number"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium">
                      Sale Tax Number <span>(if applicable)</span>
                    </label>
                    <input
                      type="text"
                      name="saleTaxNumber"
                      onChange={handleInfo}
                      value={userData?.info?.saleTaxNumber}
                      placeholder="Enter sale tax number"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium">
                      Email to send invoices
                    </label>
                    <input
                      type="email"
                      name="emailToSendInvoices"
                      onChange={handleInfo}
                      value={userData?.info?.emailToSendInvoices}
                      placeholder="Enter Email"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setStep(3)}
                    className="font-medium rounded-xl bg-theme text-white w-full py-3"
                  >
                    Signup
                  </button>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="font-satoshi space-y-4">
              <p className="font-black text-2xl text-white">3. User Details</p>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleInfo}
                      value={userData?.info?.name}
                      placeholder="Enter Name"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInfo}
                      value={userData?.info?.email}
                      placeholder="Enter email"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium">Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleInfo}
                      value={userData?.info?.password}
                      placeholder="Enter Password"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={handleInfo}
                      value={userData?.info?.confirmPassword}
                      placeholder="Enter password again"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="font-medium rounded-xl bg-theme text-white w-full py-3"
                  >
                    Signup
                  </button>
                </div>
              </div>
            </form>
          )}
          <p className="font-switzer text-center">
            <span className="text-opacity-70 text-white">
              I have an account?
            </span>{" "}
            <Link href={"/sign-in"}>
              <u className="text-white">Sign in</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
