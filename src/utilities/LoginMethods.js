import {
  auth,
  generateToken,
  providerGoogle,
} from "../firebaseFile/FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { loginAPI } from "./PostAPI";
import { error_toaster, success_toaster } from "./Toaster";
import ErrorHandler from "./ErrorHandler";

export const handleGoogleLogin = async (router, setdisbale) => {
  try {
    setdisbale(true);
    const result = await signInWithPopup(auth, providerGoogle);
    const user = result.user;
    let email =
      user.email ||
      user.providerData.find((profile) => profile.providerId === "google.com")
        ?.email;

    if (!email) {
      console.log(
        "Unable to retrieve email. Make sure the user has granted permission to access their email."
      );
      setdisbale(false);
      return;
    }

    const dvToken = await generateToken();

    console.log("i am above the the api api/v1/users/login")
    const res = await loginAPI("api/v1/users/signup", {
      email: email,
      signedBy: "google",
      dvToken: dvToken,
    });
    console.log("🚀 ~ handleGoogleLogin ~ res:", res)

    if (res?.data?.status === "1") {
      setdisbale(false);
      localStorage.setItem("userTypeId", res?.data?.data?.userTypeId);
      localStorage.setItem("userID", res?.data?.data?.userId);
      localStorage.setItem("accessToken", res?.data?.data?.accessToken);
      localStorage.setItem("loginStatus", true);
      localStorage.setItem(
        "userName",
        res?.data?.data?.firstName + res?.data?.data?.lastName
      );
      // localStorage.setItem("lastName", res?.data?.data?.lastName);
      localStorage.setItem("email", res?.data?.data?.email);
      localStorage.setItem("joinedOn", res?.data?.data?.joinedOn);
      localStorage.setItem("phoneNum", res?.data?.data?.phoneNum);
      router.push("/product");
      success_toaster(res?.data?.message);
    }
  } catch (error) {
    error_toaster(error);
  } finally {
    setdisbale(false);
  }
};
