"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PLAN_AMOUNTS: Record<string, number> = {
  "3month": 1080,
  "1year": 3000,
  "2year": 4800,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #e0e0e0",
  borderRadius: 4,
  fontSize: 14,
  color: "#333",
  backgroundColor: "#fff",
  boxSizing: "border-box",
  outline: "none",
};

function PaymentForm({ plan }: { plan: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    elements?.update({ amount: PLAN_AMOUNTS[plan] ?? 1080 });
  }, [plan, elements]);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setErrorMessage(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/create-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, plan }),
    });
    const { clientSecret, error: apiError } = await res.json();

    if (apiError || !clientSecret) {
      setErrorMessage(apiError ?? "Failed to create subscription.");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: window.location.href,
        payment_method_data: {
          billing_details: { name, email },
        },
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", fontSize: 13, color: "#444", marginBottom: 4 }}>Full name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Smith"
          style={inputStyle}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", fontSize: 13, color: "#444", marginBottom: 4 }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
          style={inputStyle}
        />
      </div>
      <PaymentElement options={{ fields: { billingDetails: { name: "never", email: "never" } } }} />
      {errorMessage && (
        <p style={{ color: "#dc3545", fontSize: 13, marginTop: 8 }}>
          {errorMessage}
        </p>
      )}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!stripe || loading}
        style={{
          width: "100%",
          backgroundColor: loading ? "#7fb3d3" : "#005fa3",
          color: "#fff",
          fontWeight: "bold",
          padding: "12px",
          borderRadius: 4,
          fontSize: 15,
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        {loading ? "Processing..." : "Start Membership"}
      </button>
      <p style={{ fontSize: 11, color: "#666", textAlign: "center", margin: 0 }}>
        Cancel anytime. All state and local taxes will be added.
      </p>
    </div>
  );
}

export default function CheckoutForm({ plan }: { plan: string }) {
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("redirect_status") === "succeeded") {
      setSucceeded(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  if (succeeded) {
    return (
      <div style={{
        border: "1px solid #0e8893",
        borderRadius: 4,
        padding: "20px 24px",
        backgroundColor: "#f0faf9",
        textAlign: "center",
        marginBottom: 20,
      }}>
        <p style={{ color: "#0e8893", fontWeight: "bold", fontSize: 16, margin: "0 0 6px" }}>
          ✓ Payment successful!
        </p>
        <p style={{ color: "#555", fontSize: 13, margin: 0 }}>
          Welcome to Classmates+. You&apos;ll receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "subscription",
        amount: PLAN_AMOUNTS[plan] ?? 1080,
        currency: "usd",
        appearance: { theme: "stripe" },
      }}
    >
      <PaymentForm plan={plan} />
    </Elements>
  );
}
