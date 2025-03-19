'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpStep2() {
     const router =  useRouter()
  return (
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
            <p className="font-black text-2xl text-white">2. Company Details</p>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-y-2">
                  <label className="text-white font-medium">Phone Number</label>
                  <input
                    type="text"
                    name=""
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
                    name=""
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
                    name=""
                    placeholder="Enter Email"
                    className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <button onClick={() => router.push("/signup-step3")} className="font-medium rounded-xl bg-theme text-white w-full py-3">
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
  );
}
