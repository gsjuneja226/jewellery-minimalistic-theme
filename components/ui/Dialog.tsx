import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
}: DialogProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative z-50 w-full max-w-lg rounded-[14px] border border-[#E7DCC6] bg-warm-white p-6 shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between pb-4 border-b border-[#F1E8D8]">
          <div>
            {title && (
              <h2 className="font-serif text-2xl font-normal text-espresso">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm font-sans text-brown-text">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-brown-text hover:bg-soft-cream hover:text-espresso focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}
