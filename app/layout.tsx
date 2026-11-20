import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

export const viewport: Viewport = {
  themeColor: "#222222",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Phabulous by Mitthat | Fine Jewellery & Modern Collections",
    template: "%s | Phabulous by Mitthat",
  },
  description: "Phabulous by Mitthat - Discover exquisite handcrafted jewellery, occasion pieces, rings, necklaces, earrings, and statement designs with modern elegance.",
  keywords: [
    "phabulous by mitthat",
    "fine jewellery",
    "rings",
    "necklaces",
    "earrings",
    "bangles",
    "pendants",
    "alukas theme",
  ],
  metadataBase: new URL("https://phabulousbymitthat.com"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black antialiased selection:bg-black selection:text-white">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
