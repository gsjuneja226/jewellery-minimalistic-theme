import * as React from "react";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BrandDivider } from "@/components/layout/BrandDivider";
import { ShieldCheck, Sparkles, Heart, HelpCircle, Mail, Phone } from "lucide-react";

interface CmsPageContent {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

const CMS_PAGES: Record<string, CmsPageContent> = {
  about: {
    title: "Our Story — By Mitthat",
    subtitle: "A legacy of warmth, sweetness, and handpicked luxury.",
    content: (
      <div className="space-y-6 text-sm font-sans text-brown-text leading-relaxed">
        <p className="text-base font-serif italic text-espresso">
          The Punjabi word <strong>ਮਿੱਠਤ (Mitthat)</strong> translates to warmth, sweetness of tone,
          and genuine heartfelt hospitality.
        </p>
        <p>
          We founded <em>Phabulous by Mitthat</em> with a vibrant conviction: that exquisite jewellery
          should be worn with joyful abandon, not hidden away in a bank locker. The name Phabulous is playful,
          spirited, and celebratory, while every piece is handpicked with connoisseur-grade discernment.
        </p>
        <h3 className="font-serif text-2xl text-espresso pt-4">Artisanal Craft & Ethical Curation</h3>
        <p>
          We collaborate with master artisans from Amritsar, Jaipur, and Rajkot. From classical uncut
          Kundan-style choker sets to micro-faceted American Diamond (AD) solitaires, our creations offer
          the look and weight of royal heirloom treasures with modern anti-tarnish comfort.
        </p>
        <p>
          Every jewel arrives nestled inside a bespoke blush velvet pouch and keepsake box, carrying our
          trademark touch of sweet affection.
        </p>
      </div>
    ),
  },
  "care-guide": {
    title: "Jewellery Care Guide",
    subtitle: "How to keep your fashion jewellery scintillating for years.",
    content: (
      <div className="space-y-6 text-sm font-sans text-brown-text leading-relaxed">
        <div className="rounded-[14px] border border-gold/40 bg-soft-cream/60 p-4 space-y-1">
          <p className="font-serif text-lg font-medium text-espresso">The Golden Rule: Last On, First Off</p>
          <p className="text-xs text-brown-text/80">
            Put your jewellery on last after makeup, perfume, and hairspray have dried. Take it off first before washing or sleeping.
          </p>
        </div>

        <h3 className="font-serif text-xl text-espresso pt-2">Essential Daily Care Tips</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Keep Completely Dry:</strong> Never wear while showering, swimming, or exercising. Water and sweat can accelerate oxidation of artificial finishes.</li>
          <li><strong>Avoid Direct Chemicals:</strong> Perfumes, deodorants, hand sanitizers, and body lotions contain alcohols and acids that strip protective anti-tarnish coatings.</li>
          <li><strong>Clean Gently:</strong> After wearing, gently wipe metal and stones with a soft microfibre or flannel cloth to remove residual body oils.</li>
          <li><strong>Airtight Storage:</strong> Store each piece separately in its provided Phabulous velvet pouch or zip-lock bag. Never keep fashion jewellery in damp bathrooms.</li>
        </ul>
      </div>
    ),
  },
  shipping: {
    title: "Shipping & Delivery Policy",
    subtitle: "Fast express delivery to over 25,000+ pincodes across India.",
    content: (
      <div className="space-y-6 text-sm font-sans text-brown-text leading-relaxed">
        <h3 className="font-serif text-xl text-espresso">Shipping Rates & Thresholds</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Orders Above ₹1,499:</strong> 100% FREE express shipping anywhere across India.</li>
          <li><strong>Orders Below ₹1,499:</strong> Flat shipping fee of ₹99.</li>
          <li><strong>Cash on Delivery (COD):</strong> Available on orders up to ₹10,000 with a ₹99 handling fee.</li>
        </ul>

        <h3 className="font-serif text-xl text-espresso pt-4">Estimated Delivery Timelines</h3>
        <p>
          All confirmed orders are quality checked and dispatched from our Amritsar hub within 24 hours (excluding Sundays).
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Metro Cities (Delhi, Mumbai, Bengaluru, Chandigarh): 2 to 3 business days</li>
          <li>Tier 2 & 3 Cities: 3 to 5 business days</li>
          <li>Northeast & Remote Regions: 5 to 7 business days</li>
        </ul>
      </div>
    ),
  },
  returns: {
    title: "Returns & Exchange Policy",
    subtitle: "7 days of complete peace of mind.",
    content: (
      <div className="space-y-6 text-sm font-sans text-brown-text leading-relaxed">
        <h3 className="font-serif text-xl text-espresso">Hassle-Free 7-Day Window</h3>
        <p>
          If a ring or bangle size doesn&apos;t fit, or you would prefer a different finish, you may request
          a return or exchange within 7 days of receiving your order.
        </p>

        <h3 className="font-serif text-xl text-espresso pt-2">Eligibility Conditions</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>The jewellery piece must be unused, unworn, and unwashed.</li>
          <li>Original brand security tags, barcodes, and velvet keepsake packaging must remain intact.</li>
          <li>Earrings and nose pins are non-returnable once opened due to strict hygiene regulations.</li>
        </ul>

        <h3 className="font-serif text-xl text-espresso pt-2">Refund Processing</h3>
        <p>
          Once our warehouse inspects the returned parcel, prepaid refunds are credited back to the original
          payment method (UPI / Bank / Card) within 3 to 5 business days via Razorpay.
        </p>
      </div>
    ),
  },
  privacy: {
    title: "Privacy Policy (DPDP Act Aligned)",
    subtitle: "How we collect, protect, and respect your personal data.",
    content: (
      <div className="space-y-6 text-sm font-sans text-brown-text leading-relaxed">
        <p>
          Phabulous by Mitthat is committed to protecting your privacy in full compliance with the Digital
          Personal Data Protection Act (DPDP Act) of India.
        </p>
        <h3 className="font-serif text-xl text-espresso pt-2">Data We Collect</h3>
        <p>
          We only collect information necessary to fulfill your purchases: your name, shipping address, mobile
          number, email address, and order history. We never store credit card or debit card numbers on our servers.
        </p>
        <h3 className="font-serif text-xl text-espresso pt-2">Customer Data Rights</h3>
        <p>
          Under Indian data privacy regulations, you have the right to request a complete copy of your stored
          personal data or request deletion of your account by contacting privacy@phabulousbymitthat.com.
        </p>
      </div>
    ),
  },
  terms: {
    title: "Terms of Service",
    subtitle: "Clear conditions and material specifications.",
    content: (
      <div className="space-y-6 text-sm font-sans text-brown-text leading-relaxed">
        <div className="p-4 rounded-[12px] bg-soft-cream border border-gold/40 text-xs">
          <strong>Legal Material Notice:</strong> All products sold under the Phabulous brand are fashion
          artificial jewellery manufactured with brass, copper, alloy metals, gold-tone electroplating, synthetic
          gemstones, and American Diamonds (AD). No claims of precious real gold, pure silver, or mined diamonds are made.
          HSN Code: 7117.
        </div>
        <p>
          By accessing or purchasing from our platform, you agree to our standard terms of sale, accurate
          information provision, and warranty limitations.
        </p>
      </div>
    ),
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Common questions about materials, sizing, and shipping.",
    content: (
      <div className="space-y-6 text-sm font-sans text-brown-text leading-relaxed">
        <div className="space-y-2">
          <h4 className="font-serif text-lg text-espresso">Is this real gold or diamond?</h4>
          <p className="text-xs">No. All our collections are high-grade artificial fashion jewellery created with gold-tone plating and cubic zirconia / American Diamond stones.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-serif text-lg text-espresso">Will the metal tarnish or turn black?</h4>
          <p className="text-xs">All our pieces feature an anti-tarnish protective lacquer. If you follow our care guide (keep dry, store in airtight pouch), the lustre lasts for years.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-serif text-lg text-espresso">How do I choose ring and bangle sizes?</h4>
          <p className="text-xs">We provide standard Indian size charts on every ring and bangle product page (Rings: Size 6 to 8; Bangles: 2.4 to 2.8).</p>
        </div>
      </div>
    ),
  },
  contact: {
    title: "Contact Us",
    subtitle: "We love hearing from you.",
    content: (
      <div className="space-y-6 text-sm font-sans text-brown-text leading-relaxed">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-[14px] border border-[#E7DCC6] bg-white space-y-2">
            <Mail className="w-5 h-5 text-antique-gold" />
            <h4 className="font-serif text-lg text-espresso">Email Concierge</h4>
            <p className="text-xs text-brown-text/80">care@phabulousbymitthat.com</p>
            <p className="text-[11px] text-brown-text/60">Response within 4 hours</p>
          </div>
          <div className="p-5 rounded-[14px] border border-[#E7DCC6] bg-white space-y-2">
            <Phone className="w-5 h-5 text-antique-gold" />
            <h4 className="font-serif text-lg text-espresso">WhatsApp Hotline</h4>
            <p className="text-xs text-brown-text/80">+91 (0) 98765 43210</p>
            <p className="text-[11px] text-brown-text/60">Mon-Sat, 10 AM to 7 PM IST</p>
          </div>
        </div>
      </div>
    ),
  },
};

export async function generateStaticParams() {
  return Object.keys(CMS_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = CMS_PAGES[params.slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.subtitle,
  };
}

export default function CmsPage({ params }: { params: { slug: string } }) {
  const page = CMS_PAGES[params.slug];
  if (!page) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <Header isOverHero={false} />

      <main className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-8 w-full">
        <Breadcrumbs items={[{ label: page.title }]} className="mb-6" />

        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="font-serif text-3xl md:text-5xl text-espresso font-normal tracking-tight">
            {page.title}
          </h1>
          <p className="text-sm text-brown-text/80 max-w-md mt-2 font-sans">
            {page.subtitle}
          </p>
        </div>

        <div className="rounded-[16px] border border-[#E7DCC6] bg-white p-6 sm:p-10 shadow-card">
          {page.content}
        </div>
      </main>

      <Footer />
    </div>
  );
}
