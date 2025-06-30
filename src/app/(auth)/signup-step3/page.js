'use client'
import Link from "next/link";
 import Head from "next/head";
import { useRouter } from "next/navigation";

export default function SignUpStep3() {
  const router =  useRouter()

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
      "https://www.linkedin.com/company/busy-bean-coffee"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: "+1-833-843-2326",
      email: "info@busybeancoffee.com"
    },
    foundingDate: "2014",
    address: {
      "@type": "PostalAddress",
      addressCountry: "USA"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.busybeancoffee.com/",
    name: "Busy Bean Coffee",
    description: "Wholesale specialty coffee beans, creamers, syrups and support for cafés, hotels, stores & bakeries. High-margin products delivered fresh."
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
          text: "To register, provide your business address, company details, and user credentials. You’ll then verify your email before signing in."
        }
      },
      {
        "@type": "Question",
        name: "What information is needed to sign up?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You’ll need to provide company address, contact number, tax ID (if applicable), and your email with a secure password."
        }
      },
      {
        "@type": "Question",
        name: "Do I need to verify my email after registration?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, after signing up, you’ll receive an OTP to verify your email address and activate your account."
        }
      }
    ]
  }
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

    <div className="min-h-screen bg-themeLight py-5">
      {/* main section start */}
      <div className="border border-theme rounded-xl bg-themeDark w-2/4 py-6 mx-auto flex flex-col items-center gap-y-4">
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
          <div className="font-satoshi space-y-4">
            <p className="font-black text-2xl text-white">3. User Details</p>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-y-2">
                  <label className="text-white font-medium">Your Name</label>
                  <input
                    type="text"
                    name=""
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
                    name=""
                    placeholder="Enter email "
                    className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="text-white font-medium">Password</label>
                  <input
                    type="password"
                    name=""
                    placeholder="Enter Password"
                    className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="text-white font-medium">Confirm Password</label>
                  <input
                    type="password"
                    name=""
                    placeholder="Enter password again"
                    className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <button onClick={() => router.push("/")} className="font-medium rounded-xl bg-theme text-white w-full py-3">
                  Signup
                </button>
              </div>
            </div>
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
    </div>

    </>
  );
}
