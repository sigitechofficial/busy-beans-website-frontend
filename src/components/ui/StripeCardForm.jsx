// components/StripeCardForm.jsx
import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import ErrorHandler from "@/utilities/ErrorHandler";
import { success_toaster } from "@/utilities/Toaster";
import { ProgressSpinner } from "primereact/progressspinner";
import { PostAPI } from "@/utilities/PostAPI";
import { useRouter } from "next/router";

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

const StripeCardForm = ({
  cartItems,
  addressId,
  userId,
  order,
  totalWeight,
  totalPrice,
  setStripeModal,
  setCartItems,
  setLoader,
  router,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCreateOrder = async (id, payment_method) => {
    setLoader(true);
    try {
      const res = await PostAPI("api/v1/users/book-order", {
        order: {
          totalBill: totalPrice,
          subTotal: totalPrice,
          discountPrice: 0,
          discountPercentage: 0,
          itemsPrice: totalPrice,
          vat: 0,
          totalWeight: totalWeight,
          note: order?.note,
          paymentMethod: order.paymentMethod,
          poNumber: order?.spoNumber,
          frequency: order?.orderFrequency, // 'just-onces', 'weekly', 'every-two-weeks', 'every-four-weeks'
          addressId: addressId,
          userId: userId,
          paymentMethodId: payment_method,
          paymentIntentId: id,
          paymentStatus: "done",
        },
        items: cartItems,
      });
      if (res?.data?.status === "success") {
        setCartItems([]);
        router.push("/product");
        localStorage.setItem("cartItems", JSON.stringify([]));
        success_toaster("Order Created Successfully");
      } else {
        throw new Error(res?.data?.message || "An unexpected error occurred.");
      }
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setLoader(false);
      setStripeModal(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // optional: return_url: "https://yourdomain.com/checkout/complete"
      },
      redirect: "if_required", // or "always" if you expect 3D Secure
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent?.status === "succeeded") {
      handleCreateOrder(paymentIntent?.id, paymentIntent?.payment_method);
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
      <PaymentElement options={CARD_OPTIONS} />
      {error && <p className="text-red-500">{error}</p>}
      {success ? (
        <p className="text-green-500 text-center font-semibold">
          Payment successful!
        </p>
      ) : (
        <div className="flex justify-end gap-x-2">
          <button
            type="button"
            onClick={() => setStripeModal(false)}
            className="hover:bg-themeDark hover:text-white text-themeDark bg-white duration-150 border border-themeDark py-3 px-5 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || processing}
            className="bg-themeDark hover:text-themeDark hover:bg-white duration-150 border border-themeDark py-3 px-5 rounded-md text-center"
          >
            {processing ? (
              <div className="flex items-center gap-x-2">
                <span>Processing </span>
                <ProgressSpinner
                  style={{
                    width: "20px",
                    height: "20px",
                    borderColor: "#86644C",
                    backgroundColor: "white",
                  }}
                  strokeWidth="8"
                  fill={"#ffffff"}
                  animationDuration=".5s"
                />
              </div>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      )}
    </form>
  );
};

export default StripeCardForm;
