"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/verify-email");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("otpStatus", "forgotPassword");
  };

  return (
    <div className="min-h-screen bg-themeLight py-5 flex items-center justify-center">
      {/* main section start */}
      <div className="border border-theme rounded-xl bg-themeDark w-2/4 py-6 flex flex-col items-center gap-y-4">
        <div className="w-80">
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="space-y-6 w-3/5">
          <p className="font-satoshi text-white font-black text-3xl text-center">
            Forgot Password
          </p>
          <p className="font-normal text-center text-white/60 font-satoshi">
            Add your email and we will send you a one time password (OTP)
          </p>
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
        </div>
      </div>
    </div>
  );
}
