'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpStep3() {
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
  );
}
