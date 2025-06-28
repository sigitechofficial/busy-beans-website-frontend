"use client";
import MiniLoader from "@/components/ui/MiniLoader";
import ErrorHandler from "@/utilities/ErrorHandler";
import { PostAPI } from "@/utilities/PostAPI";
import { info_toaster, success_toaster } from "@/utilities/Toaster";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Head from "next/head";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === 0) {
      info_toaster("email cannot be empty");
    } else {
      setLoader(true);
      try {
        const res = await PostAPI("api/v1/users/forgot-password", {
          email: email,
        });
        if (res?.data?.status === "success") {
          setLoader(false);
          router.push("/verify-email");
          localStorage.setItem("userEmail", res?.data?.data?.email);
          localStorage.setItem("userID", res?.data?.data?.id);
          localStorage.setItem("otpStatus", "forgotPassword");
          success_toaster("OTP send successfully");
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
          name: "How do I recover my Busy Bean Coffee account?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enter your email on the Forgot Password page to receive a one-time password (OTP) for account recovery.",
          },
        },
        {
          "@type": "Question",
          name: "What if I don’t receive the OTP?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If you don’t receive the OTP, please check your spam folder or request it again after a few minutes.",
          },
        },
        {
          "@type": "Question",
          name: "Is my account secure after password reset?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, resetting your password with OTP ensures your account remains secure and accessible only to you.",
          },
        },
      ],
    },
  ];
  return (
    <>
      <Head>
        <title>Forgot Password | Busy Bean Coffee</title>
        <meta
          name="description"
          content="Forgot your Busy Bean Coffee password? Enter your email to receive a one-time password (OTP) and recover your account securely."
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
          <div className="space-y-6 w-11/12 md:w-[70%] lg:w-3/5">
            <p className="font-satoshi text-white font-black text-2xl lg:text-3xl text-center">
              Forgot Password
            </p>
            <p className="font-normal text-center text-white/60 font-satoshi">
              Add your email and we will send you a one time password (OTP)
            </p>
            {loader ? (
              <MiniLoader />
            ) : (
              <div className="font-satoshi space-y-4">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      //   onClick={handleSubmit}
                      className="font-medium rounded-xl bg-theme text-white w-full py-3"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
