"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/utils";
import { generateInvoicePdf, type InvoiceData } from "@/lib/invoice/generateInvoice";
import {
  CheckCircle2,
  Package,
  FileText,
  Truck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function OrderConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const { showToast } = useToast();
  const orderId = params.id;
  const [downloading, setDownloading] = React.useState(false);

  const invoiceData: InvoiceData = {
    orderNumber: orderId,
    orderDate: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    customerName: "Simran Kaur",
    customerPhone: "+91 98765 43210",
    customerEmail: "simran.kaur@example.com",
    shippingAddress: {
      line1: "Flat 402, Golden Heritage Residency",
      line2: "Mall Road",
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
      {
        title: "AD Solitaire Statement Ring",
        sku: "PH-RNG-001-S7",
        hsn: "7117",
        quantity: 1,
        unitPrice: 129900,
        taxRate: 300,
        subtotal: 129900,
      },
    ],
    subtotal: 479800,
    discount: 47980,
    shippingFee: 0,
    taxAmount: 13975, // 3%
    totalAmount: 431820,
    paymentMethod: "Razorpay / UPI",
  };

  const handleDownloadInvoice = async () => {
    try {
      setDownloading(true);
      const pdfBytes = await generateInvoicePdf(invoiceData);
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("Invoice PDF downloaded successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Could not generate PDF.", "error");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <Header isOverHero={false} />

      <main className="flex-1 max-w-4xl mx-auto px-4 md:px-8 py-12 w-full">
        {/* Success Card */}
        <div className="rounded-[18px] border border-gold/40 bg-white p-6 sm:p-10 shadow-card text-center space-y-6">
          <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-sm animate-in zoom-in">
            <CheckCircle2 className="w-9 h-9 stroke-[1.8]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-sans tracking-widest text-antique-gold uppercase font-semibold">
              Thank You for Your Order!
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso">
              Order #{orderId} Confirmed
            </h1>
            <p className="text-xs sm:text-sm text-brown-text/80 font-sans max-w-md mx-auto">
              We&apos;ve sent an order confirmation receipt and live tracking link to{" "}
              <strong>simran.kaur@example.com</strong>.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="default"
              disabled={downloading}
              onClick={handleDownloadInvoice}
              className="w-full sm:w-auto"
            >
              <FileText className="w-4 h-4 mr-2" />
              {downloading ? "Generating PDF..." : "Download Tax Invoice (PDF)"}
            </Button>
            <Link href="/track-order" className="w-full sm:w-auto">
              <Button variant="outline" size="default" className="w-full">
                <Truck className="w-4 h-4 mr-2 text-antique-gold" />
                Track Order
              </Button>
            </Link>
          </div>

          {/* Order Details Breakdown */}
          <div className="pt-6 border-t border-[#F1E8D8] text-left space-y-4">
            <h3 className="font-serif text-xl text-espresso">Ordered Items</h3>

            <div className="divide-y divide-[#F1E8D8]">
              {invoiceData.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs font-sans">
                  <div className="space-y-0.5">
                    <p className="font-medium text-espresso">{item.title}</p>
                    <p className="text-[11px] text-brown-text/70">
                      SKU: {item.sku} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-espresso">{formatPrice(item.subtotal)}</span>
                </div>
              ))}
            </div>

            <div className="bg-soft-cream/40 rounded-[12px] p-4 space-y-2 text-xs font-sans border border-[#E7DCC6]/60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(invoiceData.subtotal)}</span>
              </div>
              <div className="flex justify-between text-emerald-800">
                <span>Discount</span>
                <span>-{formatPrice(invoiceData.discount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="border-t border-[#E7DCC6] pt-2 flex justify-between font-bold text-sm text-espresso">
                <span>Total Paid</span>
                <span className="text-antique-gold">{formatPrice(invoiceData.totalAmount)}</span>
              </div>
            </div>

            {/* Delivery Timeline Card */}
            <div className="rounded-[12px] border border-gold/40 p-4 bg-[#FAF1D9]/40 text-xs font-sans space-y-1">
              <span className="font-semibold text-espresso flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-antique-gold" /> Delivery Estimate
              </span>
              <p className="text-brown-text">
                Expected delivery within 2 to 4 business days to <strong>Amritsar, Punjab (143001)</strong>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
