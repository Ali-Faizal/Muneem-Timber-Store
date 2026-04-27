"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const ctaData = {
    phone: "+919580716752",
    whatsapp: "919580716752",
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LEFT - LOGO */}
        <div className="text-black font-[Syne]">
          <h1 className="text-[17px] font-extrabold">
            Muneem Timber
          </h1>
          <p className="font-mono text-[10px] text-[#64748B] tracking-[0.06em]">
            Hardoi, UP · Since 1998
          </p>
        </div>

        {/* CENTER MENU (DESKTOP) */}
        <div className="hidden md:flex gap-8 text-black font-medium">
          <a href="/items">Items</a>
          <a href="/services">Services</a>
          <Link href="/contact">Contact</Link>
          <a href="#location">Location</a>
        </div>

        {/* RIGHT (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">
          
          <Link href="/login">
            <button className="bg-black text-white px-4 py-2 rounded-lg">
              Go to Login
            </button>
          </Link>

          {/* ✅ FIXED CALL BUTTON */}
          <a
            href={`tel:${ctaData.phone}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold inline-block"
          >
            📞 Call Us
          </a>
        </div>

        {/* MOBILE RIGHT */}
        <div className="md:hidden flex items-center gap-3">
          
          <Link href="/login">
            <button className="text-black">Login</button>
          </Link>

          {/* ✅ FIXED MOBILE CALL */}
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
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 text-black z-50">
          
          <a href="/items" className="block">Items</a>
          <a href="/services" className="block">Services</a>
          <Link href="/contact" className="block">Contact</Link>
          <a href="#location" className="block">Location</a>

          {/* ✅ CALL BUTTON */}
          <a
            href={`tel:${ctaData.phone}`}
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 block text-center font-semibold"
          >
            📞 Call Now
          </a>
        </div>
      )}
    </nav>
  );
}