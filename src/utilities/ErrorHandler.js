import { error_toaster } from "./Toaster";

const ErrorHandler = (error) => {
  console.log("🚀 ~ ErrorHandler ~ error:", error)
  if (error.response) {
    console.error("Error Response:", error.response);
  } else {
    console.error("Error Details:", error.message || error);
  }
  error_toaster(error.message || "An error occurred while creating the order.");
};

export default ErrorHandler;
