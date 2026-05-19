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
  const { name, email, plan = "3month" } = await req.json();

  const planConfig = PLANS[plan];
  if (!planConfig) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const customer = await stripe.customers.create({ name, email });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: planConfig.priceId }],
    discounts: [{ coupon: planConfig.couponId }],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice", "latest_invoice.confirmation_secret"],
  });

  const invoice = subscription.latest_invoice as Stripe.Invoice;
  const clientSecret = invoice.confirmation_secret?.client_secret;

  return NextResponse.json({ clientSecret });
}
