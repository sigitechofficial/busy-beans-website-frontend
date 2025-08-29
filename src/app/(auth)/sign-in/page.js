"use client";
import MiniLoader from "@/components/ui/MiniLoader";
import { loginSchema } from "@/schema";
import ErrorHandler from "@/utilities/ErrorHandler";
// import { handleGoogleLogin } from "@/utilities/LoginMethods";
import { loginAPI } from "@/utilities/PostAPI";
import { error_toaster, success_toaster } from "@/utilities/Toaster";
import { getMessagingInstance, onMessage } from "@/utilities/firebase";
import { requestDeviceToken } from "@/utilities/requestFCMToken";
import { useFormik } from "formik";
import Link from "next/link";
import { info_toaster } from "@/utilities/Toaster";
import { useRouter } from "next/navigation";
import { Checkbox } from "primereact/checkbox";
import { useState, useEffect} from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Head from "next/head";

export default function SignIn() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [disable, setdisbale] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    info_toaster("If you are logging in for the first time, please use password 123456");
    getMessagingInstance().then((messaging) => {
      if (messaging) {
        onMessage(messaging, (payload) => {
          console.log("📩 Foreground message:", payload);

          success_toaster("Firebase Notification here");
        });
      }
    });

    // Request Device Token
    requestDeviceToken();
  }, []);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        setLoader(true);
        try {
          let res = await loginAPI("api/v1/users/login", {
            email: values.email,
            password: values.password,
            tokenId: localStorage.getItem("devToken"),
          });
          if (res?.data?.status === "success") {
            router.push("/");
            setLoader(false);
            localStorage.setItem("accessToken", res?.data?.data?.token);
            localStorage.setItem("loginStatus", true);
            localStorage.setItem("userName", res?.data?.data?.user?.name);
            localStorage.setItem(
              "phoneNumber",
              res?.data?.data?.user?.phoneNumber
            );
            localStorage.setItem(
              "emailToSendInvoices",
              res?.data?.data?.user?.emailToSendInvoices
            );
            localStorage.setItem(
              "companyName",
              res?.data?.data?.user?.companyName
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
            localStorage.setItem(
              "registerBy",
              res?.data?.data?.user?.registerBy
            );
            localStorage.setItem("userID", res?.data?.data?.user?.id);
            localStorage.setItem(
              "addressId",
              res?.data?.data?.user?.address?.id
            );
            const addressObj = res?.data?.data?.user?.address ?? {};
            const addressParts = [
              addressObj.companyaddress,
              // addressObj.addressLineOne,
              // addressObj.addressLineTwo,
              addressObj.town,
              addressObj.state,
              addressObj.zipCode,
              addressObj.country,
            ].filter((part) => part && part !== "null" && part.trim() !== "");
            localStorage.setItem("address", addressParts.join(", "));
            // localStorage.setItem(
            //   "address",
            //   `${res?.data?.data?.user?.address?.companyaddress},
            //   ${res?.data?.data?.user?.address?.addressLineOne},
            //   ${res?.data?.data?.user?.address?.addressLineTwo},
            //   ${res?.data?.data?.user?.address?.town},
            //   ${res?.data?.data?.user?.address?.zipCode},
            //   ${res?.data?.data?.user?.address?.country},
            //   ${res?.data?.data?.user?.address?.state}`
            // );
            // setLoginStatus(true);
            success_toaster("Login Successfully");
          } 

          else if (
            res?.data?.status === "verification-required" ||
            res?.data?.message.toLowerCase().includes("otp sent")
          ) {
            localStorage.setItem("otpStatus", "login");
            localStorage.setItem("userEmail", res?.data?.data?.email || values.email);
            localStorage.setItem("userID", res?.data?.data?.id);

            setLoader(false);

            router.push("/verify-email");
          } 

          else {
            throw new Error(
              res?.data?.message || "An unexpected error occurred."
            );
          }
        } catch (error) {
          ErrorHandler(error);
          setLoader(false);
        }
        action.resetForm();
      },
    });

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
          name: "How do I sign in to my Busy Bean Coffee account?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Visit the Busy Bean Coffee Sign In page and enter your registered email and password to access your account.",
          },
        },
        {
          "@type": "Question",
          name: "What if I forgot my password?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Click on the 'Forgot Password?' link on the Sign In page to receive an OTP and reset your password securely.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use my Google account to sign in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Busy Bean Coffee supports Google Sign-In. Just click on the 'Continue with Google' button if available.",
          },
        },
      ],
    },
  ];
  return (
    <>
      <Head>
        <title>Sign In | Busy Bean Coffee</title>
        <meta
          name="description"
          content="Sign in to your Busy Bean Coffee account to manage your orders, subscriptions, and preferences."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="bg-themeLight min-h-screen flex items-center justify-center">
        <div className="md:grid md:grid-cols-2 w-11/12 sm:w-4/6 md:w-4/5 xl:w-3/5 bg-themeDark rounded-lg border border-theme [&>div]:px-4 md:[&>div]:px-6 xl:[&>div]:px-14">
          {/* left side */}
          <div className="hidden md:flex flex-col justify-center">
            <div className="h-4/5 w-full flex items-center justify-center">
              <img
                src="/images/logocoffee.png"
                alt="logo"
                className="object-contain w-full h-36"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col py-14 lg:py-16 md:border-l-2 border-theme gap-y-8 lg:gap-y-10">
            <h1 className="hidden md:block font-satoshi font-black text-white text-2xl lg:text-3xl">
              Sign In to Busy Bean
            </h1>
            
            <div className="bg-[#6F4E37] text-white p-6 rounded-lg max-w-xl mx-auto text-left">
              <p className="text-base leading-relaxed">
                Welcome to our new customer portal! <br />
                If you are logging in for the first time, please use the default password{" "}
                <span className="font-semibold">123456</span>.
              </p>
            </div>

            <div className="md:hidden">
              <img
                src="/images/logocoffee.png"
                alt="logo"
                className="h-full object-contain w-80  mx-auto"
              />
            </div>

            {loader ? (
              <MiniLoader />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="flex flex-col gap-y-2 sm:gap-y-4">
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium font-satoshi">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Email"
                      className="border border-inputBorder rounded-lg outline-none px-3 py-2"
                    />
                    <div className={errors.email && touched.email}>
                      {errors.email && touched.email && (
                        <div className=" text-red-600 space-y-1 pb-1">
                          <hr className="border-none h-0.5 bg-white bg-opacity-20" />
                          <p>{errors.email}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2 relative">
                    <label className="text-white font-medium font-satoshi">
                      Password
                    </label>
                    <input
                    autoComplete="none"
                      type={visible ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="password"
                      className="border border-inputBorder rounded-lg outline-none px-3 py-2"
                    />
                    <button
                      onClick={() => setVisible(!visible)}
                      type="button"
                      className="text-labelColor absolute right-4 top-10"
                    >
                      {visible ? (
                        <AiOutlineEye size={24} color="#ffffff" />
                      ) : (
                        <AiOutlineEyeInvisible size={24} color="#ffffff" />
                      )}
                    </button>
                    <div className={errors.password && touched.password}>
                      {" "}
                      {errors.password && touched.password && (
                        <div className="text-red-600 space-y-1 pb-1">
                          <hr className="border-none h-0.5 bg-white bg-opacity-20" />
                          <p>{errors.password}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-white text-sm text-end font-normal">
                      <Link href={"/forgot-password"}>Forgot Password?</Link>
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-theme font-satoshi text-white py-2.5 rounded-lg w-full font-medium outline-none "
                  >
                    Sign In
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-white text-opacity-60 text-center">
                    Or continue with
                  </p>
                  {/* <div className="flex gap-x-2 justify-center items-center">
                  <button
                    type="button"
                    className="bg-white w-full rounded-3xl py-2.5 text-center flex items-center justify-center gap-x-2 font-robotoSerif font-semibold text-black text-lg"
                    disabled={disable}
                    onClick={async () => {
                      if (typeof window !== undefined) {
                        await handleGoogleLogin(router, setdisbale);
                      }
                    }}
                  >
                    <FcGoogle size={"28px"} /> Continue with Google
                  </button>
                </div> */}
                </div>
                <p className="font-switzer">
                  <span className="text-opacity-70 text-white">
                    New Customer?
                  </span>{" "}
                  <Link href={"/sign-up"}>
                    <u className="text-white">Signup</u>
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
