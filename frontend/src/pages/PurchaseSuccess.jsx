// src/pages/PurchaseSuccess.jsx
import { useEffect, useState } from "react";

const PurchaseSuccess = () => {
  const orderId = new URLSearchParams(window.location.search).get("orderId");

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Your order ID is: <strong>{orderId}</strong></p>
      <p>Thank you for shopping with us!</p>
    </div>
  );
};

export default PurchaseSuccess;
