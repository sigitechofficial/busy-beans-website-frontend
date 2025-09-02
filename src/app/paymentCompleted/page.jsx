"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentCompleted() {
  const router = useRouter();
  const [orderId, setOrderId] = useState(null);
  const [invoiceUrl, setInvoiceUrl] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oid = params.get("orderId");
    const invUrl = params.get("invoiceUrl");
    if (oid) setOrderId(oid);
    if (invUrl) setInvoiceUrl(invUrl);
  }, []);

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
          maxWidth: "520px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle glow */}
        <div
          style={{
            position: "absolute",
            inset: "-40%",
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.08), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            fontSize: "60px",
            marginBottom: "10px",
            filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.2))",
            animation: "pop 300ms ease-out",
          }}
        >
          ✅
        </div>

        <h1 style={{ margin: 0, fontSize: "28px" }}>Payment Completed</h1>
        <p style={{ marginTop: "8px", opacity: 0.9 }}>
          Your invoice has been paid successfully. No further action is needed.
        </p>

        {orderId && (
          <p
            style={{
              marginTop: "14px",
              fontSize: "14px",
              opacity: 0.85,
              wordBreak: "break-word",
            }}
          >
            Order ID: <strong>{orderId}</strong>
          </p>
        )}

        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.12)",
            margin: "24px 0",
          }}
        />

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => router.push("/")}
            style={btnStyle}
            aria-label="Back to Home"
          >
            Back to Home
          </button>

          {/* <button
            onClick={() => router.push("/product")}
            style={{ ...btnStyle, backgroundColor: "transparent", border: "1px solid #8F5D46" }}
            aria-label="View Orders"
          >
            View Orders
          </button> */}

          {invoiceUrl && (
            <a
              href={invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...btnStyle, backgroundColor: "#2E7D32" }}
              aria-label="View Invoice"
            >
              View Invoice
            </a>
          )}
        </div>

        <p style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>
          A confirmation receipt has been sent to your email (if available).
        </p>

        <style>{`
          @keyframes pop {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          button:focus-visible, a:focus-visible {
            outline: 2px solid #D9C6BA; outline-offset: 2px;
          }
        `}</style>
      </div>
    </div>
  );
}

const btnStyle = {
  backgroundColor: "#8F5D46",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "transform 120ms ease, opacity 120ms ease",
  textDecoration: "none",
  display: "inline-block",
};
