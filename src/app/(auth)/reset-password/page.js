"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { IoCheckmark } from "react-icons/io5";
import { info_toaster, success_toaster } from "@/utilities/Toaster";
import { PostAPI } from "@/utilities/PostAPI";
import ErrorHandler from "@/utilities/ErrorHandler";
import MiniLoader from "@/components/ui/MiniLoader";
import Head from "next/head";

export default function ResetPassword() {
  if (typeof window !== "undefined") {
    var userID = localStorage.getItem("userID") ?? "";
  }
  const router = useRouter();
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords?.newPassword.trim() === "") {
      info_toaster("Enter new password");
    } else if (passwords?.confirmPassword.trim() === "") {
      info_toaster("Confirm new password");
    } else if (
      passwords?.newPassword.trim() !== passwords?.confirmPassword.trim()
    ) {
      info_toaster("Password and Confirm password not matched");
    } else {
      setLoader(true);
      try {
        const res = await PostAPI("api/v1/users/reset-password", {
          userId: userID,
          password: passwords?.newPassword,
        });
        if (res?.data?.status === "success") {
          setModal(true);
          setLoader(false);
          localStorage.setItem("accessToken", res?.data?.data?.token);
          localStorage.setItem("loginStatus", true);
          localStorage.setItem("userName", res?.data?.data?.user?.name);
          localStorage.setItem(
            "phoneNumber",
            res?.data?.data?.user?.phoneNumber
          );
          localStorage.setItem("userEmail", res?.data?.data?.user?.email);
          localStorage.setItem(
            "phoneNumber",
            res?.data?.data?.user?.phoneNumber
          );
          localStorage.setItem(
            "saleTaxNumber",
            res?.data?.data?.user?.saleTaxNumber
          );
          localStorage.setItem("registerBy", res?.data?.data?.user?.registerBy);
          localStorage.setItem("userID", res?.data?.data?.user?.id);
          localStorage.setItem("addressId", res?.data?.data?.user?.address?.id);
          localStorage.removeItem("userID");
          success_toaster("Password Reset Sucessfully");
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
          name: "How do I reset my Busy Bean Coffee password?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enter and confirm your new password on the reset page after verifying your identity with an OTP.",
          },
        },
        {
          "@type": "Question",
          name: "What if I didn’t request a password reset?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If you receive a password reset email you didn’t request, ignore the email and your password will remain unchanged.",
          },
        },
        {
          "@type": "Question",
          name: "Is my new password active immediately?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, once reset, your new password is effective immediately and can be used to sign in to your account.",
          },
        },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Reset Password | Busy Bean Coffee</title>
        <meta
          name="description"
          content="Enter and confirm your new Busy Bean Coffee password to securely complete your password reset process."
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
              Reset Password
            </p>
            {loader ? (
              <MiniLoader />
            ) : (
              <div className="font-satoshi space-y-4">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex flex-col gap-y-2">
                      <label className="text-white font-medium">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            newPassword: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="Enter Confirm Password"
                        className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="font-medium rounded-xl bg-theme text-white w-full py-3"
                    >
                      Done
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        <Dialog
          visible={modal}
          // style={{ width: "70vw" }}
          breakpoints={{
            "1496px": "35vw",
            "1024px": "40vw",
            "768px": "80vw",
            "200px": "40vw",
          }}
          // onHide={() => setModal(false)}
          closeIcon
          header={
            <div className="text-white bg-[#28922E] size-16 rounded-full flex items-center justify-center mx-auto mt-5">
              <IoCheckmark size={50} />
            </div>
          }
        >
          <div className="space-y-4 p-5 flex flex-col items-center">
            {/* header */}
            <p className="font-inter font-bold text-xl text-center">
              Password Reset Successfully!
            </p>

            {/* body */}
            <button
              onClick={() => {
                success_toaster("Login Successfully");
                router.push("/");
              }}
              className="py-3 max-w-[500px] rounded-lg border border-theme text-white bg-theme font-satoshi w-full"
            >
              Login
            </button>
          </div>
        </Dialog>
      </div>
    </>
  );
}
