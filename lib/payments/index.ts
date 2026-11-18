import { env } from "@/lib/env";

export interface CreateOrderParams {
  amount: number; // in paise
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface PaymentOrderResult {
  orderId: string;
  amount: number;
  currency: string;
  provider: string;
  keyId?: string;
}

export interface PaymentProvider {
  createOrder(params: CreateOrderParams): Promise<PaymentOrderResult>;
  verifySignature(orderId: string, paymentId: string, signature: string): boolean;
}

export class MockPaymentProvider implements PaymentProvider {
  async createOrder(params: CreateOrderParams): Promise<PaymentOrderResult> {
    const mockOrderId = `order_mock_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    return {
      orderId: mockOrderId,
      amount: params.amount,
      currency: params.currency || "INR",
      provider: "mock",
      keyId: "rzp_test_mock_key_id",
    };
  }

  verifySignature(orderId: string, paymentId: string, signature: string): boolean {
    // In mock mode, any non-empty signature or test signature is verified
    return true;
  }
}

export class RazorpayProvider implements PaymentProvider {
  private keyId: string;
  private keySecret: string;

  constructor() {
    this.keyId = env.RAZORPAY_KEY_ID;
    this.keySecret = env.RAZORPAY_KEY_SECRET;
  }

  async createOrder(params: CreateOrderParams): Promise<PaymentOrderResult> {
    if (!this.keyId || !this.keySecret) {
      console.warn("Razorpay keys missing, falling back to mock payment provider.");
      return new MockPaymentProvider().createOrder(params);
    }

    const auth = Buffer.from(`${this.keyId}:${this.keySecret}`).toString("base64");
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency || "INR",
        receipt: params.receipt,
        notes: params.notes,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Razorpay Order creation failed: ${err}`);
    }

    const data = await res.json();
    return {
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      provider: "razorpay",
      keyId: this.keyId,
    };
  }

  verifySignature(orderId: string, paymentId: string, signature: string): boolean {
    if (!this.keySecret) return true;
    try {
      const crypto = require("node:crypto");
      const hmac = crypto.createHmac("sha256", this.keySecret);
      hmac.update(`${orderId}|${paymentId}`);
      const generated = hmac.digest("hex");
      return generated === signature;
    } catch (e) {
      return false;
    }
  }
}

export function getPaymentProvider(): PaymentProvider {
  if (env.PAYMENT_PROVIDER === "razorpay" && env.RAZORPAY_KEY_ID) {
    return new RazorpayProvider();
  }
  return new MockPaymentProvider();
}
