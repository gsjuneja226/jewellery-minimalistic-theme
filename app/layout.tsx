import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Noto_Sans_Gurmukhi } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

const gurmukhi = Noto_Sans_Gurmukhi({
  subsets: ["gurmukhi"],
  weight: ["400", "500", "700"],
  variable: "--font-gurmukhi",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#BA9048",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Phabulous by Mitthat | Handpicked Jewellery, Simply Irresistible",
    template: "%s | Phabulous by Mitthat",
  },
  description: "Handpicked jewellery, simply irresistible. Exquisite imitation jewellery, Kundan sets, American Diamond (AD) pieces, and anti-tarnish daily wear across India.",
  keywords: [
    "artificial jewellery",
    "kundan jewellery",
    "american diamond",
    "ad jewellery",
    "jhumkas",
    "bridal jewellery sets",
    "anti tarnish jewellery",
    "phabulous by mitthat",
  ],
  metadataBase: new URL("https://phabulousbymitthat.com"),
  openGraph: {
    title: "Phabulous by Mitthat | Handpicked Jewellery, Simply Irresistible",
    description: "Handpicked jewellery, simply irresistible. Discover bridal, festive, and daily wear artificial jewellery.",
    url: "https://phabulousbymitthat.com",
    siteName: "Phabulous by Mitthat",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Phabulous by Mitthat",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
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
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${gurmukhi.variable}`}
    >
      <body className="min-h-screen bg-warm-white text-brown-text antialiased selection:bg-blush selection:text-espresso">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
