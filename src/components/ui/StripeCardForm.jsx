// components/StripeCardForm.jsx
import React, { useState } from "react";
import { CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      "::placeholder": { color: "#aab7c4" },
    },
    invalid: {
      color: "#fa755a",
    },
  },
};

const StripeCardForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      setSuccess(true);
      setError(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md p-4 border rounded-2xl shadow"
    >
      {/* <CardElement options={CARD_OPTIONS} /> */}
       <PaymentElement />
      {error && <p className="text-red-500">{error}</p>}
      {success ? (
        <p className="text-green-500">Payment successful!</p>
      ) : (
        <button type="submit" disabled={!stripe || processing} className="bg-themeDark py-3 px-5 rounded-md">
          {processing ? "Processing..." : "Pay Now"}
        </button>
      )}
    </form>
  );
};

export default StripeCardForm;
