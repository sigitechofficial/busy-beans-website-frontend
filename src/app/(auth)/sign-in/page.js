"use client";
import MiniLoader from "@/components/ui/MiniLoader";
import { loginSchema } from "@/schema";
import { loginAPI } from "@/utilities/PostAPI";
import { error_toaster, success_toaster } from "@/utilities/Toaster";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        setLoader(true);
        let res = await loginAPI("api/v1/users/login", {
          email: values.email,
          password: values.password,
        });
        console.log("🚀 ~ onSubmit: ~ res:", res?.data);
        if (res?.data?.status === "success") {
          setLoader(false);
          router.push("/");
          localStorage.setItem("accessToken", res?.data?.data?.token);
          localStorage.setItem("loginStatus", true);
          localStorage.setItem("userName", res?.data?.data?.user?.name);
          localStorage.setItem("userEmail", res?.data?.data?.user?.email);
          localStorage.setItem("userID", res?.data?.data?.user?.id);
          // setLoginStatus(true);
          success_toaster("Login Successfully");
        } else if (res?.data?.status === "error") {
          setLoader(false);
          error_toaster(res?.data?.message);
        }
        action.resetForm();
      },
    });

  return (
    <div className="bg-themeLight min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 w-3/5 bg-themeDark rounded-lg border border-theme [&>div]:px-14">
        {/* left side */}
        <div className=" flex flex-col justify-center">
          <div className="h-4/5 w-full flex items-center justify-center">
            <img
              src="/images/logocoffee.png"
              alt="logo"
              className="object-contain w-full h-36"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col py-16 border-l-2 border-theme gap-y-10">
          <h1 className="font-satoshi font-black text-white text-3xl">
            Sign In to Busy Bean
          </h1>

          {loader ? (
            <MiniLoader />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-y-4">
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
                <div className="flex flex-col gap-y-2">
                  <label className="text-white font-medium font-satoshi">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="password"
                    className="border border-inputBorder rounded-lg outline-none px-3 py-2"
                  />
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
                    Forgot Password?
                  </p>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-theme font-satoshi text-white py-2 rounded-lg w-full font-medium outline-none "
                >
                  Sign In
                </button>
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
  );
}
