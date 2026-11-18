import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
function formatPdfCurrency(paise: number): string {
  const rupees = (paise / 100).toFixed(2);
  return `Rs. ${rupees}`;
}

export interface InvoiceItem {
  title: string;
  sku: string;
  hsn: string;
  quantity: number;
  unitPrice: number; // paise
  taxRate: number; // basis points (300 = 3%)
  subtotal: number; // paise
}

export interface InvoiceData {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: InvoiceItem[];
  subtotal: number; // paise
  discount: number; // paise
  shippingFee: number; // paise
  taxAmount: number; // paise
  totalAmount: number; // paise
  paymentMethod: string;
}

export async function generateInvoicePdf(data: InvoiceData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]); // A4 dimensions in points
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique);

  const { width, height } = page.getSize();
  const margin = 50;
  let y = height - margin;

  // Header Title
  page.drawText("PHABULOUS BY MITTHAT", {
    x: margin,
    y,
    size: 20,
    font: fontBold,
    color: rgb(0.165, 0.078, 0.031), // Espresso #2A1408
  });

  page.drawText("TAX INVOICE / PACKING SLIP", {
    x: width - margin - 180,
    y,
    size: 12,
    font: fontBold,
    color: rgb(0.729, 0.565, 0.282), // Gold #BA9048
  });

  y -= 18;
  page.drawText("Handpicked jewellery, simply irresistible.", {
    x: margin,
    y,
    size: 10,
    font: fontItalic,
    color: rgb(0.54, 0.37, 0.06),
  });

  y -= 30;
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: rgb(0.73, 0.56, 0.28),
  });

  y -= 25;
  // Order & Customer Details (2 columns)
  page.drawText(`Invoice No: INV-${data.orderNumber}`, { x: margin, y, size: 9, font: fontBold });
  page.drawText(`Customer: ${data.customerName}`, { x: width / 2, y, size: 9, font: fontBold });

  y -= 14;
  page.drawText(`Order Date: ${data.orderDate}`, { x: margin, y, size: 9, font });
  page.drawText(`Email: ${data.customerEmail}`, { x: width / 2, y, size: 9, font });

  y -= 14;
  page.drawText(`Payment: ${data.paymentMethod.toUpperCase()}`, { x: margin, y, size: 9, font });
  page.drawText(`Phone: ${data.customerPhone}`, { x: width / 2, y, size: 9, font });

  y -= 14;
  page.drawText(`State: ${data.shippingAddress.state} (${data.shippingAddress.pincode})`, {
    x: width / 2,
    y,
    size: 9,
    font,
  });

  y -= 30;
  // Line Items Table Header
  page.drawRectangle({
    x: margin,
    y: y - 5,
    width: width - margin * 2,
    height: 22,
    color: rgb(0.98, 0.96, 0.92), // Soft cream
  });

  page.drawText("Description", { x: margin + 8, y, size: 9, font: fontBold });
  page.drawText("HSN", { x: margin + 220, y, size: 9, font: fontBold });
  page.drawText("Qty", { x: margin + 270, y, size: 9, font: fontBold });
  page.drawText("Unit Price", { x: margin + 310, y, size: 9, font: fontBold });
  page.drawText("GST", { x: margin + 380, y, size: 9, font: fontBold });
  page.drawText("Total", { x: width - margin - 55, y, size: 9, font: fontBold });

  y -= 22;

  // Items
  data.items.forEach((item) => {
    page.drawText(item.title.slice(0, 32), { x: margin + 8, y, size: 8.5, font });
    page.drawText(item.hsn, { x: margin + 220, y, size: 8.5, font });
    page.drawText(String(item.quantity), { x: margin + 275, y, size: 8.5, font });
    page.drawText(formatPdfCurrency(item.unitPrice), { x: margin + 310, y, size: 8.5, font });
    page.drawText(`${item.taxRate / 100}%`, { x: margin + 380, y, size: 8.5, font });
    page.drawText(formatPdfCurrency(item.subtotal), { x: width - margin - 55, y, size: 8.5, font: fontBold });
    y -= 18;
  });

  y -= 15;
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 0.5,
    color: rgb(0.8, 0.8, 0.8),
  });

  // Totals Section
  y -= 20;
  const rightColX = width - margin - 180;
  const rightValX = width - margin - 55;

  page.drawText("Subtotal:", { x: rightColX, y, size: 9, font });
  page.drawText(formatPdfCurrency(data.subtotal), { x: rightValX, y, size: 9, font });

  if (data.discount > 0) {
    y -= 14;
    page.drawText("Promotional Discount:", { x: rightColX, y, size: 9, font });
    page.drawText(`-${formatPdfCurrency(data.discount)}`, { x: rightValX, y, size: 9, font });
  }

  y -= 14;
  page.drawText("Shipping Fee:", { x: rightColX, y, size: 9, font });
  page.drawText(data.shippingFee === 0 ? "FREE" : formatPdfCurrency(data.shippingFee), {
    x: rightValX,
    y,
    size: 9,
    font,
  });

  y -= 14;
  page.drawText("GST (Included):", { x: rightColX, y, size: 9, font });
  page.drawText(formatPdfCurrency(data.taxAmount), { x: rightValX, y, size: 9, font });

  y -= 18;
  page.drawText("Grand Total:", { x: rightColX, y, size: 11, font: fontBold });
  page.drawText(formatPdfCurrency(data.totalAmount), {
    x: rightValX,
    y,
    size: 11,
    font: fontBold,
    color: rgb(0.66, 0.47, 0.11), // Antique Gold
  });

  // Footer & Disclaimer
  const footY = margin + 35;
  page.drawLine({
    start: { x: margin, y: footY + 15 },
    end: { x: width - margin, y: footY + 15 },
    thickness: 0.5,
    color: rgb(0.8, 0.8, 0.8),
  });

  page.drawText(
    "Declaration: This is imitation/fashion jewellery with gold-tone / silver-tone finish. HSN 7117. No precious metal content claimed.",
    { x: margin, y: footY, size: 7.5, font, color: rgb(0.4, 0.4, 0.4) }
  );

  page.drawText(
    "Thank you for choosing Phabulous by Mitthat! For assistance, contact care@phabulousbymitthat.com.",
    { x: margin, y: footY - 12, size: 7.5, font: fontItalic, color: rgb(0.4, 0.4, 0.4) }
  );

  return doc.save();
}
