"use client";

import { useEffect, useState } from "react";

export default function CheckoutForm({ plan }: { plan: string }) {
  const [succeeded, setSucceeded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
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

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMessage(null);

    const res = await fetch("/api/create-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const { url, error } = await res.json();

    if (error || !url) {
      setErrorMessage(error ?? "Failed to start checkout.");
      setLoading(false);
      return;
    }

    window.location.href = url;
  };

  return (
    <div>
      {errorMessage && (
        <p style={{ color: "#dc3545", fontSize: 13, marginBottom: 8 }}>
          {errorMessage}
        </p>
      )}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
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
          marginBottom: 8,
        }}
      >
        {loading ? "Redirecting..." : "Start Membership"}
      </button>
      <p style={{ fontSize: 11, color: "#666", textAlign: "center", margin: 0 }}>
        Cancel anytime. All state and local taxes will be added.
      </p>
    </div>
  );
}
