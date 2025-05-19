// "use client";
// import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import StripeCardForm from "@/components/ui/StripeCardForm";
// import { BASE_URL } from "@/utilities/URL";

// const stripePromise = loadStripe(
//   "pk_test_51QwUMCCmsFtCbz25F30vy7aCrxw8swscrpB2phj4tUOUimhYltvrCXZoZIsmzwWOYdn3qUh4GNjVql9o4KNQcNHb009BpHlDAA"
// );

// export default function CardPayment() {
//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     // Call your backend to create a PaymentIntent and return the client secret
//     fetch(BASE_URL + "api/v1/users/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: 1000 }), // amount in cents
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("🚀 ~ useEffect ~ data:", data);
//         console.log("🚀 ~ .then ~ clientSecret:", clientSecret);
//         return setClientSecret(data?.data?.clientSecret);
//       });
//   }, []);

//   const appearance = { theme: "stripe" };
//   const options = { clientSecret, appearance };

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
//       {clientSecret && (
//         <Elements stripe={stripePromise} options={options}>
//           <StripeCardForm clientSecret={clientSecret} />
//         </Elements>
//       )}
//     </div>
//   );
// }
