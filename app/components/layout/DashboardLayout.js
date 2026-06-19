"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingCart, 
  History, 
  Users, 
  Bell, 
  DollarSign, 
  Settings, 
  Home,
  Menu,
  X,
  UserCheck,
  Calculator,
  FileText,
  BarChart2
} from "lucide-react";

export default function DashboardLayout({ 
  children, 
  isAdmin = false 
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  useEffect(() => {
    if (!isAdmin) return;

    const checkNewOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          const count = data.filter(o => o.status === "New Order").length;
          setNewOrdersCount(count);
        }
      } catch (err) {
        console.error("Error checking new orders:", err);
      }
    };

    checkNewOrders();
    const interval = setInterval(checkNewOrders, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [isAdmin]);

  // Define Links based on role
  const adminLinks = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { label: "Customers", href: "/admin/manage-users", icon: Users },
    { label: "Products", href: "/admin/manage-products", icon: Package },
    { label: "Manage Workers", href: "/admin/manage-workers", icon: UserCheck },
    { label: "Service Bookings", href: "/admin/service-requests", icon: Layers },
    { label: "Walk-In Billing", href: "/admin/walkin-billing", icon: Calculator },
    { label: "Invoices Log", href: "/admin/invoices", icon: FileText },
    { label: "Reports", href: "/admin/reports", icon: BarChart2 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const userLinks = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Orders", href: "/my-orders", icon: ShoppingCart },
    { label: "Rental History", href: "/rental-history", icon: History },
    { label: "Alerts & updates", href: "/notifications", icon: Bell },
    { label: "Account Settings", href: "/settings", icon: Settings },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 💻 DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0A3578] text-white flex-shrink-0 border-r border-[#1251A3]/20">
        {/* Brand Area */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="block">
            <h2 className="font-heading text-lg font-extrabold tracking-wide uppercase">
              Muneem Store
            </h2>
            <span className="text-[10px] font-mono text-[#90CAF9] uppercase tracking-widest block mt-0.5">
              {isAdmin ? "Admin Console" : "User Portal"}
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-4 space-y-1">
          <div className="text-[9px] font-mono text-[#90CAF9] opacity-60 uppercase tracking-widest px-4 mb-3">
            Core Menu
          </div>
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            const showBadge = isAdmin && link.label === "Orders" && newOrdersCount > 0;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition ${
                  active 
                    ? "bg-white/10 text-white border-l-4 border-[#90CAF9] pl-3" 
                    : "text-[#E8F0FE]/75 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span>{link.label}</span>
                </div>
                {showBadge && (
                  <span className="bg-rose-500 text-white font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-full animate-pulse mr-1">
                    {newOrdersCount}
                  </span>
                )}
              </Link>
            );
          })}
          
          <div className="pt-6">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-[#90CAF9] hover:bg-white/5 hover:text-white transition"
            >
              <Home size={16} />
              <span>Wapas to Website</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* 📱 MOBILE SIDEBAR DRAWER OVERLAY */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-[#0A3578]/55 backdrop-blur-sm z-50 md:hidden flex">
          <div className="w-64 bg-[#0A3578] text-white flex flex-col h-full shadow-2xl animate-in slide-in-from-left duration-250">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="font-heading text-base font-extrabold uppercase">Muneem</h2>
                <span className="text-[9px] text-[#90CAF9] font-mono">{isAdmin ? "Admin Drawer" : "User Drawer"}</span>
              </div>
              <button 
                onClick={() => setMobileOpen(false)}
                className="text-white hover:bg-white/10 p-1 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
              {links.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;
                const showBadge = isAdmin && link.label === "Orders" && newOrdersCount > 0;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition ${
                      active 
                        ? "bg-white/10 text-white border-l-4 border-[#90CAF9] pl-3" 
                        : "text-[#E8F0FE]/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} />
                      <span>{link.label}</span>
                    </div>
                    {showBadge && (
                      <span className="bg-rose-500 text-white font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                        {newOrdersCount}
                      </span>
                    )}
                  </Link>
                );
              })}
              
              <div className="pt-6">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-[#90CAF9]"
                >
                  <Home size={16} />
                  <span>Wapas to Website</span>
                </Link>
              </div>
            </nav>
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)}></div>
        </div>
      )}

      {/* 📄 MAIN CONTENT PANEL */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Mobile Navbar Header */}
        <header className="md:hidden bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-slate-800 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
          >
            <Menu size={20} />
          </button>
          
          <h2 className="font-heading text-sm font-extrabold text-[#0D1B2A] tracking-wide uppercase">
            Muneem Store
          </h2>

          <div className="w-8"></div> {/* Spacer for symmetry */}
        </header>

        {/* Content body */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
