"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { IoCheckmark } from "react-icons/io5";

export default function ResetPassword() {
  const router = useRouter();
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [modal, setModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setModal(true);
    //   router.push("/sign-in");
    //   localStorage.setItem("userEmail", email);
    //   localStorage.setItem("otpStatus", "forgotPassword");
  };

  return (
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
          <div className="font-satoshi space-y-4">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex flex-col gap-y-2">
                  <label className="text-white font-medium">New Password</label>
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
        </div>
      </div>

      <Dialog
        visible={modal}
        // style={{ width: "70vw" }}
        breakpoints={{ "1496px": "35vw", "1024px": "40vw", "768px": "80vw", "200px":"40vw" }}
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
            onClick={() => router.push("/sign-in")}
            className="py-3 max-w-[500px] rounded-lg border border-theme text-white bg-theme font-satoshi w-full"
          >
            Login
          </button>
        </div>
      </Dialog>
    </div>
  );
}
