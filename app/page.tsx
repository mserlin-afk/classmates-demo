"use client";

import { useState } from "react";
import CheckoutForm from "./components/CheckoutForm";

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState("3month");

  const PLAN_BILLING: Record<string, { today: string; interval: string; standard: string }> = {
    "3month": { today: "$10.80", interval: "3 months",  standard: "$21.60" },
    "1year":  { today: "$30.00", interval: "year",      standard: "$60.00" },
    "2year":  { today: "$48.00", interval: "2 years",   standard: "$96.00" },
  };
  const billing = PLAN_BILLING[selectedPlan];
  return (
    <div style={{ backgroundColor: "rgb(242, 242, 235)", minHeight: "100vh" }}>

      {/* Header — from actual HTML: height 50px, padding 0 15px, "No Thanks" is black button */}
      <div style={{ background: "white", borderBottom: "1px solid rgb(219, 218, 218)" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          width: "100%",
          height: 50,
          padding: "0px 15px",
        }}>
          <img src="https://www.classmates.com/seoassets/images/svg/cm-logo-desktop-black.svg" alt="classmates" />
          <button style={{
            color: "black",
            fontSize: 12,
            fontWeight: 500,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            textAlign: "right",
          }}>
            No Thanks. Take me back &raquo;
          </button>
        </div>
      </div>

      {/* Main container */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 32px" }}>

        {/* H1 — teal, from FlFd771yeFLlRpcYTblKmA== class which uses --cyan-color: #0e8893 */}
        <h1 style={{ color: "#0e8893", fontSize: 22, fontWeight: "bold", marginTop: 0, marginBottom: 16 }}>
          Marshall, special introductory offer! <span style={{ fontSize: 18 }}>🔒</span>
        </h1>

        {/* cV9BorAji00cW25f3wLM+g== row: col-lg-10 + col-lg-2 */}
        <div style={{ display: "flex", marginBottom: 12 }}>

          {/* _9GgaJSNehYdhMrKF3VX8xg== col-lg-10 */}
          <div style={{ flex: "0 0 83.333%", maxWidth: "83.333%" }}>
            {/* cKdoz572XADnMUIiHMmxSw== visible slide */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="https://c.cmcdn.com/J/A/d/y/1442444506623.png" alt="" style={{ width: 44, flexShrink: 0 }} />
              <div style={{ fontSize: 15 }}>
                See <span style={{ fontWeight: "bold" }}>all of the people</span> who remembered you!
              </div>
            </div>
          </div>

          {/* qZ6KLO5-n9GBaXSjC+Kkfg== col-lg-2 — person photo omitted (hotlink protected) */}
          <div style={{ flex: "0 0 16.667%", maxWidth: "16.667%", display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
            <img src="https://c.cmcdn.com/v/O/w/N/1594314492592.png" alt="Introductory Offer 50% OFF" style={{ width: 180 }} />
          </div>

        </div>

        {/* Billing terms — q1lsXhZbvOWLFBjJdk9U2Q== */}
        <div style={{
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: "18px 20px",
          backgroundColor: "#fafafa",
          marginBottom: 20,
        }}>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
            <b>Billing Terms:</b> You will be billed {billing.today} today and then your Classmates+
            subscription plan will renew automatically every {billing.interval} unless you choose to
            cancel before the renewal date. Your payment method will be charged the full
            standard price of {billing.standard}{" "}for each renewal. If you want to cancel your
            subscription, log in to your account and follow the prompts on the Account &amp;
            Billing page. No portion of any subscription fee is refundable.
          </p>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.6, margin: "10px 0 0", fontStyle: "italic" }}>
            All applicable state and local taxes will be added to the subscription fee.
          </p>
        </div>

        {/* Plan heading — _1fImrJUpql0MN4KxNJWxtQ== (teal) */}
        <div style={{ color: "#0e8893", fontWeight: "bold", fontSize: 20, marginBottom: 12 }}>
          Select your plan below:
        </div>

        {/* Plan cards — 3 columns matching NCrpkeexu3uThPj04o9Juw== layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
          marginBottom: 8,
        }}>

          {/* 3 Month */}
          <div
            onClick={() => setSelectedPlan("3month")}
            style={{
              border: selectedPlan === "3month" ? "2px solid #005fa3" : "1px solid #ccc",
              borderRadius: 4,
              overflow: "hidden",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}>
            <div style={{ backgroundColor: "#cfe7e9", padding: "6px 12px", textAlign: "center" }}>
              <span style={{ color: "#42362f", fontSize: 13, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>
                3 month Plan
              </span>
            </div>
            <div style={{ padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: "bold", color: "#333" }}>
                $3.60<span style={{ fontSize: 15, fontWeight: "normal", color: "#666" }}>/month</span>
              </div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
                <span><strong style={{ textDecoration: "line-through", fontWeight: "normal" }}>$21.60</strong>&nbsp;$10.80</span> for 3 month term*
              </div>
              <img
                src="https://secure.classmates.com/cmsgraphics/f/9/Q/r/1460133141646.png"
                alt="Lowest Commitment"
                style={{ maxWidth: 110, marginTop: 8 }}
              />
            </div>
          </div>

          {/* 1 Year */}
          <div
            onClick={() => setSelectedPlan("1year")}
            style={{
              border: selectedPlan === "1year" ? "2px solid #005fa3" : "1px solid #ccc",
              borderRadius: 4,
              overflow: "hidden",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}>
            <div style={{ backgroundColor: "#cfe7e9", padding: "6px 12px", textAlign: "center" }}>
              <span style={{ color: "#42362f", fontSize: 13, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>
                1 year Plan
              </span>
            </div>
            <div style={{ padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: "bold", color: "#333" }}>
                $2.50<span style={{ fontSize: 15, fontWeight: "normal", color: "#666" }}>/month</span>
              </div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
                <span><strong style={{ textDecoration: "line-through", fontWeight: "normal" }}>$60.00</strong>&nbsp;$30.00</span> for 1 year term*
              </div>
            </div>
          </div>

          {/* 2 Year */}
          <div
            onClick={() => setSelectedPlan("2year")}
            style={{
              border: selectedPlan === "2year" ? "2px solid #005fa3" : "1px solid #ccc",
              borderRadius: 4,
              overflow: "hidden",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}>
            <div style={{ backgroundColor: "#cfe7e9", padding: "6px 12px", textAlign: "center" }}>
              <span style={{ color: "#42362f", fontSize: 13, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>
                2 year Plan
              </span>
            </div>
            <div style={{ padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: "bold", color: "#333" }}>
                $2.00<span style={{ fontSize: 15, fontWeight: "normal", color: "#666" }}>/month</span>
              </div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
                <span><strong style={{ textDecoration: "line-through", fontWeight: "normal" }}>$96.00</strong>&nbsp;$48.00</span> for 2 year term*
              </div>
              <img
                src="https://secure.classmates.com/cmsgraphics/x/w/J/X/1460133110394.png"
                alt="Best Value"
                style={{ maxWidth: 110, marginTop: 8 }}
              />
            </div>
          </div>

        </div>

        {/* w8cEwtfI3f+rgQriqYSj8Q== */}
        <div style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>* Billed in one easy payment</div>

        <CheckoutForm plan={selectedPlan} />

      </div>
    </div>
  );
}
