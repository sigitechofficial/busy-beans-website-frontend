"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { error_toaster } from "@/utilities/Toaster";

export default function Payment() {
  const router = useRouter();
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialized, setInitialized] = useState(false); 

  useEffect(() => {
    if (typeof window === "undefined") return; 
    const params = new URLSearchParams(window.location.search);
    const id = params.get("orderId");
    setOrderId(id);
    setInitialized(true);
  }, []);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(
          `https://backendbb.trimworldwide.com/api/v1/admin/order-management/fetch-invoice/${orderId}`,
          { method: "POST", headers: { "Content-Type": "application/json" } }
        );

        const result = await response.json();
        console.log("🚀 ~ fetchInvoice ~ result:", result);

        if (result?.status === "already-paid" || result?.data?.status === "already-paid") {
          router.replace(`/paymentCompleted?orderId=${orderId}`);
          return;
        }

        if (result?.status === "error" || result?.error) {
          const msg = result?.message || result?.error || "Something went wrong with payment.";
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

    if (!initialized) return;

    if (orderId) {
      fetchInvoice();
    } else {
      setLoading(false);
      const msg = "Invalid order request. Missing Order ID.";
      setErrorMessage(msg);
      error_toaster(msg);
    }
  }, [orderId, initialized, router]);

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
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>❌</div>
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
          </>
        )}
      </div>
    </div>
  );
}
