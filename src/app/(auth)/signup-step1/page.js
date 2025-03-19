'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpStep1() {
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
            <p className="font-black text-2xl text-white">1. Company Address</p>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-y-2">
                  <label className="text-white font-medium">
                    Company Address
                  </label>
                  <input
                    type="text"
                    name=""
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
                    name=""
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
                    name=""
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
                      name=""
                      placeholder="Enter Town / City"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium">Zip Code</label>
                    <input
                      type="text"
                      name=""
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
                      name=""
                      placeholder="Enter Country"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-white font-medium">State</label>
                    <input
                      type="text"
                      name=""
                      placeholder="Enter State"
                      className="border border-inputBorder rounded-xl outline-none px-3 py-2"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button onClick={() => router.push("/signup-step2")} className="font-medium rounded-xl bg-theme text-white w-full py-3">
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
