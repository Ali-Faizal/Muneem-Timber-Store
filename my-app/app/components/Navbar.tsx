"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LEFT - LOGO */}
        <div className="text-xl font-bold text-black">
          Muneem Timber
          <p className="text-xs text-gray-500">Hardoi, UP · Since 2010</p>
        </div>

        {/* CENTER MENU (DESKTOP) */}
        <div className="hidden md:flex gap-8 text-black font-medium">
          <a href="#">Items</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
          <a href="#">Location</a>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-black font-medium">Login</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Call Now
          </button>
        </div>

        {/* MOBILE RIGHT */}
        <div className="md:hidden flex items-center gap-3">
          <button className="text-black">Login</button>

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
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 text-black">
          <a href="#" className="block">Items</a>
          <a href="#" className="block">Services</a>
          <a href="#" className="block">Contact</a>
          <a href="#" className="block">Location</a>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2">
            Call Now
          </button>
        </div>
      )}
    </nav>
  );
}