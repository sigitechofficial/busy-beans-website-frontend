"use client";
import MiniLoader from "@/components/ui/MiniLoader";
import ErrorHandler from "@/utilities/ErrorHandler";
import { PostAPI } from "@/utilities/PostAPI";
import { error_toaster, success_toaster } from "@/utilities/Toaster";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";

export default function VerifyEmail() {
  if (typeof window !== "undefined") {
    var userID = localStorage.getItem("userID") ?? "";
    var email = localStorage.getItem("userEmail") ?? "";
    var otpStatus = localStorage.getItem("otpStatus") ?? "";
  }

  const router = useRouter();

  const [timer, setTimer] = useState(30);
  const [loader, setLoader] = useState(false);
  const inputRefs = useRef([]);

  const handleResendOtp = async () => {
    setTimer(30);
    if (otpStatus === "forgotPassword") {
      // router.push("/forgot-password");
      try {
        const res = await PostAPI("api/v1/users/resend-otp/reset-password", {
          email: email,
        });
        if (res?.data?.status === "success") {
          success_toaster("OTP send successfully");
          setLoader(false);
        } else {
          throw new Error(
            res?.data?.message || "An unexpected error occurred."
          );
        }
      } catch (error) {
        ErrorHandler(error);
      }
    } else if (otpStatus === "signUp") {
      try {
        const res = await PostAPI("api/v1/users/resend-otp/signup", {
          email: email,
        });
        if (res?.data?.status === "success") {
          success_toaster("OTP send successfully");
          setLoader(false);
        } else {
          throw new Error(
            res?.data?.message || "An unexpected error occurred."
          );
        }
      } catch (error) {
        ErrorHandler(error);
      }
    }
  };

  const handleEdit = () => {
    // OTP: `${inputRefs.current[0].value}${inputRefs.current[1].value}${inputRefs.current[2].value}${inputRefs.current[3].value}`,
    if (otpStatus === "forgotPassword") {
      router.push("/forgot-password");
    } else if (otpStatus === "signUp") {
      router.push("/sign-up");
    }
  };

  const handleVerifyOTP = async () => {
    if (otpStatus === "forgotPassword") {
      setLoader(true);
      try {
        const res = await PostAPI("api/v1/users/otp/verfication", {
          id: userID,
          otp: `${inputRefs.current[0].value}${inputRefs.current[1].value}${inputRefs.current[2].value}${inputRefs.current[3].value}`,
          on: "forgotPassword",
        });
        if (res?.data?.status === "success") {
          router.push("/reset-password");
          localStorage.setItem("userID", res?.data?.data?.data?.userId);
          localStorage.removeItem("otpStatus");
          localStorage.removeItem("userEmail");
          setLoader(false);
          success_toaster("OTP verified Successfully");
        } else {
          throw new Error(
            res?.data?.message || "An unexpected error occurred."
          );
        }
      } catch (error) {
        ErrorHandler(error);
        setLoader(false);
      }
    } else if (otpStatus === "signUp") {
      setLoader(true);
      try {
        const res = await PostAPI("api/v1/users/otp/verfication", {
          id: userID,
          otp: `${inputRefs.current[0].value}${inputRefs.current[1].value}${inputRefs.current[2].value}${inputRefs.current[3].value}`,
          on: "signup",
        });
        console.log("🚀 ~ handleVerifyOTP ~ res:", res);
        if (res?.data?.status === "success") {
          router.push("/");
          setLoader(false);
          success_toaster("Login Successfully");
          localStorage.setItem("accessToken", res?.data?.data?.token);
          localStorage.setItem("loginStatus", true);
          localStorage.setItem("userName", res?.data?.data?.user?.name);
          localStorage.setItem("userID", res?.data?.data?.user?.id);
          localStorage.setItem("userEmail", res?.data?.data?.user?.email);
          localStorage.setItem("addressId", res?.data?.data?.user?.address?.id);
          localStorage.setItem("address", res?.data?.data?.user?.address?.id);
          localStorage.setItem(
            "address",
            `${res?.data?.data?.user?.address?.companyaddress},
            ${res?.data?.data?.user?.address?.addressLineOne}, 
            ${res?.data?.data?.user?.address?.addressLineTwo}, 
            ${res?.data?.data?.user?.address?.town}, 
            ${res?.data?.data?.user?.address?.zipCode}, 
            ${res?.data?.data?.user?.address?.country}, 
            ${res?.data?.data?.user?.address?.state}`
          );
          localStorage.setItem(
            "phoneNumber",
            res?.data?.data?.user?.phoneNumber
          );
          localStorage.setItem(
            "saleTaxNumber",
            res?.data?.data?.user?.saleTaxNumber
          );
          localStorage.setItem("registerBy", res?.data?.data?.user?.registerBy);
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

  const handleInput = (event, index) => {
    const value = event.target.value;
    if (value.length >= 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (
      inputRefs.current[0].value.length === 1 &&
      inputRefs.current[1].value.length === 1 &&
      inputRefs.current[2].value.length === 1 &&
      inputRefs.current[3].value.length === 1
    ) {
      handleVerifyOTP();
    }
  };

  const handleKeyDown = (event, index) => {
    const value = event.target.value;
    if (event.key === "Backspace" && value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
      inputRefs.current[index - 1].value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
    if (timer === 0) {
      clearTimeout(intervalId);
    }
    return () => clearTimeout(intervalId);
  }, [timer]);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Busy Bean Coffee",
      url: "https://www.busybeancoffee.com/",
      logo: "https://www.busybeancoffee.com/images/logowhite.png",
      sameAs: [
        "https://www.facebook.com/busybeancoffee",
        "https://www.instagram.com/busybean_coffee",
        "https://x.com/busybean_coffee",
        "https://www.youtube.com/channel/UC4b4PYax5H3jRSyw4r0MCjQ",
        "https://www.linkedin.com/company/busy-bean-coffee",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        telephone: "+1-833-843-2326",
        email: "info@busybeancoffee.com",
      },
      foundingDate: "2014",
      address: {
        "@type": "PostalAddress",
        addressCountry: "USA",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "https://www.busybeancoffee.com/",
      name: "Busy Bean Coffee",
      description:
        "Wholesale specialty coffee beans, creamers, syrups and support for cafés, hotels, stores & bakeries. High-margin products delivered fresh.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I create an account on Busy Bean Coffee?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To register, provide your business address, company details, and user credentials. You’ll then verify your email before signing in.",
          },
        },
        {
          "@type": "Question",
          name: "What information is needed to sign up?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You’ll need to provide company address, contact number, tax ID (if applicable), and your email with a secure password.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to verify my email after registration?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, after signing up, you’ll receive an OTP to verify your email address and activate your account.",
          },
        },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Sign Up | Busy Bean Coffee</title>
        <meta
          name="description"
          content="Create a Busy Bean Coffee account by entering your business and personal details to access wholesale ordering and premium services."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-themeLight py-5 flex items-center justify-center">
        {/* main section start */}
        <div className="border border-theme rounded-xl bg-themeDark w-11/12 sm:w-4/6 md:w-[70%] lg:w-3/5 xl:w-2/4 py-6 flex flex-col items-center gap-y-4">
          <div className="w-60 md:w-72 lg:w-80">
            <img
              src="/images/logocoffee.png"
              alt="logo"
              className="h-full w-full object-contain"
            />
          </div>
          {loader ? (
            <MiniLoader />
          ) : (
            <div className="space-y-6 w-11/12 md:w-[70%] lg:w-3/5">
              <p className="font-satoshi text-white font-black text-2xl lg:text-3xl text-center">
                Verify Your email
              </p>
              <p className="font-normal text-center text-white/60 font-satoshi">
                Please enter the 4 digit code sent to {email}{" "}
                <button className="text-white underline" onClick={handleEdit}>
                  Edit
                </button>
              </p>
              <div className="font-satoshi space-y-4">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 flex flex-col justify-between"
                >
                  <div className="flex justify-center items-center gap-x-2 sm:gap-x-4 md:gap-x-6 [&>input]:w-16 sm:[&>input]:w-20 [&>input]:h-[88px] [&>input]:rounded-lg [&>input]:border [&>input]:border-themePlaceholder [&>input]:border-opacity-60">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <input
                        key={index}
                        type="number"
                        inputMode="numeric"
                        min="0"
                        onInput={(e) => handleInput(e, index)}
                        onKeyDown={(e) => {
                          // Disallow "-", "e", and anything that is not a number
                          if (["e", "E", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                          }
                          handleKeyDown(e, index);
                        }}
                        onPaste={(e) => {
                          // Allow only digits to be pasted
                          const paste = e.clipboardData.getData("text");
                          if (!/^\d+$/.test(paste)) {
                            e.preventDefault();
                          }
                        }}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="input-code text-6xl text-center flex items-center justify-center pe-1.5"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="space-y-2 [&>p]:text-center flex justify-center flex-col items-center">
                      <p className="text-white/60">
                        00:{timer < 10 ? `0${timer}` : timer}
                      </p>
                      <button
                        disabled={timer === 0 ? false : true}
                        onClick={handleResendOtp}
                        className="text-lg text-theme disabled:cursor-not-allowed underline"
                      >
                        Resend Code
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
