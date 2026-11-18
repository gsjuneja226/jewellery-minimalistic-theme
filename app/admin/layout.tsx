import * as React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const metadata = {
  title: "Admin Portal | Phabulous by Mitthat",
  description: "Operations, inventory, orders, and marketing management.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
