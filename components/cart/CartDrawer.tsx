"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";

export interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartCount?: number;
}

export function CartDrawer({ open, onClose, cartCount = 0 }: CartDrawerProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EEEEEE]">
          <h2 className="text-base font-medium text-[#222222]">
            Your Cart ({cartCount})
          </h2>
          <button
            onClick={onClose}
            className="text-sm font-medium text-[#222222] hover:text-[#777777] flex items-center gap-1 transition-colors"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          {cartCount === 0 ? (
            <>
              {/* Minimal Cart Icon */}
              <div className="w-20 h-20 mb-6 text-[#999999] flex items-center justify-center border-2 border-dashed border-[#E5E5E5] rounded-full">
                <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
              </div>

              <p className="text-base font-normal text-[#555555] mb-8">
                Shopping cart is empty!
              </p>

              <button
                onClick={onClose}
                className="w-full max-w-[260px] py-3.5 px-6 bg-[#222222] text-white text-xs uppercase tracking-wider font-semibold rounded-none hover:bg-black transition-colors"
              >
                Continue Shopping
              </button>
            </>
          ) : (
            <div className="w-full text-left space-y-4">
              <p className="text-sm text-[#555555]">Items ready for checkout.</p>
              <Link
                href="/cart"
                onClick={onClose}
                className="block text-center w-full py-3.5 px-6 bg-[#222222] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
              >
                View Cart & Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
