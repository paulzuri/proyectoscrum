import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import './Paypal.css'
import PaypalPayment from "./PaypalPayment";
function Paypal({ totalPrice, onSuccessfulPayment }) {
  const initialOptions = {
    clientId: "ARjfsLiPwSo2sW0bMpGUVWEqv3vdWMgf4YgOgU4-kgymrTKkPUNTpHiP2FDlfncwVQAUA8qQV8A3-v3r",
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PaypalPayment
        totalPrice={totalPrice}
        onSuccessfulPayment={onSuccessfulPayment}
      />

      {/* <PayPalButtons /> */}
    </PayPalScriptProvider>
  );
}

export default Paypal;