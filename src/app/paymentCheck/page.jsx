"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { error_toaster } from "@/utilities/Toaster";

export default function Payment() {
  const router = useRouter();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get("orderId"));
  }, []);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(
          `http://192.168.18.34:8011/api/v1/admin/order-management/fetch-invoice/${orderId}`,
          { method: "POST", headers: { "Content-Type": "application/json" } }
        );

        const result = await response.json();
        console.log("🚀 ~ fetchInvoice ~ result:", result);

        if (result?.data?.status === "already-complete") {
          router.push("/paymentCompleted");
          return;
        }

        if (result?.status === "error") {
          const msg = result?.message || "Something went wrong with payment.";
          setErrorMessage(msg);
          error_toaster(msg);
          return;
        }

        if (result?.data?.order?.hostedInvoiceUrl) {
          window.location.href = result.data.order.hostedInvoiceUrl;
        } else {
          const msg = "Unable to generate invoice. Please try again later.";
          setErrorMessage(msg);
          error_toaster(msg);
        }
      } catch (error) {
        console.error("❌ Error fetching invoice:", error);
        const msg = "Something went wrong while processing your payment.";
        setErrorMessage(msg);
        error_toaster(msg);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchInvoice();
    } else {
      setLoading(false);
      const msg = "Invalid order request. Missing Order ID.";
      setErrorMessage(msg);
      error_toaster(msg);
    }
  }, [orderId, router]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#8F5D46",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#3E342C",
          borderRadius: "12px",
          padding: "40px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        }}
      >
        {loading ? (
          <h3>Processing your payment request...</h3>
        ) : errorMessage ? (
          <>
            <div
              style={{
                fontSize: "48px",
                marginBottom: "20px",
              }}
            >
              ❌
            </div>
            <h2>Payment Error</h2>
            <p style={{ margin: "15px 0" }}>{errorMessage}</p>
            <button
              onClick={() => router.push("/")}
              style={{
                backgroundColor: "#8F5D46",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Back to Home
            </button>
          </>
        ) : (
          <>
            <h1>Complete Your Payment</h1>
            <p>
              Your order ID is <strong>{orderId}</strong>
            </p>
            {/* <button
              style={{
                marginTop: "20px",
                backgroundColor: "#8F5D46",
                color: "white",
                border: "none",
                padding: "15px 30px",
                fontSize: "18px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Pay Now
            </button> */}
          </>
        )}
      </div>
    </div>
  );
}
