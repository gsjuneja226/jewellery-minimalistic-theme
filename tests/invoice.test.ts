import { describe, it, expect } from "vitest";
import { generateInvoicePdf, type InvoiceData } from "@/lib/invoice/generateInvoice";

describe("Invoice PDF Generator", () => {
  it("generates a valid PDF byte array with HSN 7117 and order details", async () => {
    const mockData: InvoiceData = {
      orderNumber: "TEST-1234",
      orderDate: "19 Nov 2026",
      customerName: "Simran Kaur",
      customerPhone: "+91 98765 43210",
      customerEmail: "simran@example.com",
      shippingAddress: {
        line1: "Flat 402, Heritage Residency",
        city: "Amritsar",
        state: "Punjab",
        pincode: "143001",
      },
      items: [
        {
          title: "Kundan Jadau Choker Set",
          sku: "PH-KND-001",
          hsn: "7117",
          quantity: 1,
          unitPrice: 349900,
          taxRate: 300,
          subtotal: 349900,
        },
      ],
      subtotal: 349900,
      discount: 0,
      shippingFee: 0,
      taxAmount: 10191,
      totalAmount: 349900,
      paymentMethod: "Razorpay / UPI",
    };

    const pdfBytes = await generateInvoicePdf(mockData);
    expect(pdfBytes).toBeInstanceOf(Uint8Array);
    expect(pdfBytes.length).toBeGreaterThan(500);

    // Verify PDF header %PDF-
    const header = String.fromCharCode(...pdfBytes.slice(0, 5));
    expect(header).toBe("%PDF-");
  });
});
