"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  FolderTree,
  Warehouse,
  ShoppingBag,
  Users,
  Megaphone,
  BarChart3,
  Settings,
  ShieldAlert,
  ArrowUpRight,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export interface AdminLayoutProps {
  children: React.ReactNode;
}

const ADMIN_NAV = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Collections", href: "/admin/collections", icon: Layers },
  { name: "Inventory", href: "/admin/inventory", icon: Warehouse },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Marketing & CMS", href: "/admin/marketing", icon: Megaphone },
  { name: "Reports & GST", href: "/admin/reports", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Audit Log", href: "/admin/audit", icon: ShieldAlert },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-warm-white text-espresso flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[#E7DCC6] sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-espresso hover:bg-soft-cream"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="relative w-28 h-8">
            <Image
              src="/brand/newlogo.png"
              alt="Phabulous Admin"
              fill
              className="object-contain object-left"
            />
          </div>
        </div>
        <span className="text-[11px] font-sans font-semibold text-antique-gold bg-[#FAF1D9] px-2 py-0.5 rounded-full">
          Super Admin
        </span>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 bg-soft-cream/70 border-r border-[#E7DCC6] flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo & Role Badge */}
          <div className="p-6 border-b border-[#E7DCC6]/80 flex flex-col items-start gap-2">
            <Link href="/admin" className="relative w-36 h-10 block">
              <Image
                src="/brand/newlogo.png"
                alt="Phabulous Admin"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
            <div className="flex items-center justify-between w-full pt-1">
              <span className="text-[10px] font-sans uppercase tracking-widest text-brown-text font-bold">
                Operations Portal
              </span>
              <span className="text-[10px] font-sans font-bold text-antique-gold bg-white border border-gold/40 px-2 py-0.5 rounded-full">
                Super Admin
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 flex-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-xs font-sans font-medium transition-colors ${
                    isActive
                      ? "bg-espresso text-white shadow-xs"
                      : "text-brown-text hover:bg-white hover:text-espresso"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-gold" : "text-antique-gold"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Storefront Link & Logout */}
          <div className="p-4 border-t border-[#E7DCC6] space-y-2 text-xs font-sans">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E7DCC6] text-brown-text hover:text-espresso hover:border-gold transition-colors"
            >
              <span>View Storefront</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-antique-gold" />
            </Link>
            <div className="flex items-center justify-between p-2 text-brown-text/70">
              <span className="truncate">admin@phabulous.com</span>
              <Link href="/admin/login" className="hover:text-red-700" title="Logout">
                <LogOut className="w-4 h-4 text-brown-text/60" />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <main className="flex-1 min-w-0 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
