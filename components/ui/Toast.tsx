"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const showToast = React.useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-center justify-between rounded-[14px] p-4 shadow-lg border text-sm font-sans transition-all animate-in slide-in-from-bottom-2",
              toast.type === "success" &&
                "bg-emerald-50 text-emerald-900 border-emerald-200",
              toast.type === "error" && "bg-red-50 text-red-900 border-red-200",
              toast.type === "info" &&
                "bg-warm-white text-espresso border-gold/40 shadow-card"
            )}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "success" && (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              )}
              {toast.type === "error" && (
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
              )}
              {toast.type === "info" && (
                <Info className="h-4 w-4 text-antique-gold flex-shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-espresso/60 hover:text-espresso"
              aria-label="Dismiss toast"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
