"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const ctaData = {
    phone: "+919580716752",
  };

  useEffect(() => {
    const session = localStorage.getItem("muneem_user");
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (e) {
        console.error("Auth session parse error", e);
      }
    }
  }, []);

  return (
    <nav className="bg-white shadow-md z-40 relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LEFT - LOGO */}
        <div className="text-black font-[Syne]">
          <Link href="/">
            <h1 className="text-[17px] font-extrabold text-[#0D1B2A]">
              Muneem Timber
            </h1>
            <p className="font-mono text-[10px] text-[#64748B] tracking-[0.06em]">
              Hardoi, UP · Since 1998
            </p>
          </Link>
        </div>

        {/* CENTER MENU (DESKTOP) */}
        <div className="hidden md:flex gap-8 text-black font-semibold text-xs uppercase tracking-wider items-center">
          <Link href="/items" className="hover:text-[#1251A3] transition">Items</Link>
          <Link href="/services" className="hover:text-[#1251A3] transition">Services</Link>
          <Link href="/billing" className="hover:text-[#1251A3] transition">Bill Banao</Link>
          <Link href="/contact" className="hover:text-[#1251A3] transition">Contact</Link>
          <Link href="/location" className="hover:text-[#1251A3] transition">Location</Link>
          <Link href="/rent-summary" className="hover:text-[#1251A3] transition">Cart / Summary</Link>
        </div>

        {/* RIGHT (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link
              href="/dashboard"
              className="bg-[#1251A3] hover:bg-[#0A3578] text-white px-4 py-2 rounded-lg font-bold text-xs transition"
            >
              Namaste, {user.name || "Dashboard"}
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-black hover:bg-neutral-800 text-white px-4 py-2 rounded-lg font-bold text-xs transition"
            >
              Go to Login
            </Link>
          )}

          <a
            href={`tel:${ctaData.phone}`}
            className="bg-[#FF6B2B] hover:bg-[#E55A1F] text-white px-4 py-2 rounded-lg font-bold text-xs transition"
          >
            📞 Call Us
          </a>
        </div>

        {/* MOBILE RIGHT */}
        <div className="md:hidden flex items-center gap-3 text-xs font-bold">
          {user ? (
            <Link href="/dashboard" className="text-[#1251A3]">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="text-black">
              Login
            </Link>
          )}

          <a
            href={`tel:${ctaData.phone}`}
            className="text-black"
          >
            Call
          </a>

          {/* MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="text-black text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 text-black z-50 text-xs font-bold uppercase tracking-wide border-t border-slate-100 pt-2">
          <Link href="/items" className="block py-1">Items</Link>
          <Link href="/services" className="block py-1">Services</Link>
          <Link href="/billing" className="block py-1">Bill Banao</Link>
          <Link href="/contact" className="block py-1">Contact</Link>
          <Link href="/location" className="block py-1">Location</Link>
          <Link href="/rent-summary" className="block py-1">Cart / Calculator</Link>

          <a
            href={`tel:${ctaData.phone}`}
            className="w-full bg-[#FF6B2B] text-white py-2 rounded-lg mt-2 block text-center font-bold"
          >
            📞 Call Now
          </a>
        </div>
      )}
    </nav>
  );
}