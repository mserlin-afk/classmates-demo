import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLANS: Record<string, { priceId: string; couponId: string }> = {
  "3month": {
    priceId: process.env["3_MONTH_PLAN_PRICE_ID"]!,
    couponId: process.env["3_MONTHS_SIGN_UP_DISCOUNT_COUPON_ID"]!,
  },
  "1year": {
    priceId: process.env["YEARLY_PLAN_PRICE_ID"]!,
    couponId: process.env["YEARLY_PLAN_SIGN_UP_DISCOUNT_COUPON_ID"]!,
  },
  "2year": {
    priceId: process.env["2_YEAR_PLAN_PRICE_ID"]!,
    couponId: process.env["2_YEAR_PLAN_SIGN_UP_DISCOUNT_COUPON_ID"]!,
  },
};

export async function POST(req: Request) {
  const { plan = "3month" } = await req.json();

  const planConfig = PLANS[plan];
  if (!planConfig) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? `https://${req.headers.get("host")}`;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: planConfig.priceId, quantity: 1 }],
    discounts: [{ coupon: planConfig.couponId }],
    success_url: `${origin}/?checkout=success`,
    cancel_url: `${origin}/`,
  });

  return NextResponse.json({ url: session.url });
}
