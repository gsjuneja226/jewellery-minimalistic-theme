import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: "left" | "right";
  children: React.ReactNode;
}

export function Sheet({
  open,
  onClose,
  title,
  side = "right",
  children,
}: SheetProps) {
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
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex w-full max-w-md flex-col bg-warm-white shadow-2xl transition-transform duration-300",
          side === "right" ? "right-0 border-l border-[#E7DCC6]" : "left-0 border-r border-[#E7DCC6]"
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-[#F1E8D8] px-6 py-4">
          {title ? (
            <h2 className="font-serif text-2xl font-normal text-espresso">{title}</h2>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="rounded-full p-2 text-brown-text hover:bg-soft-cream hover:text-espresso focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
