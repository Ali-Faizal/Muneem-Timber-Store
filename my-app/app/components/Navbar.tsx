"use client";
import { useState } from "react";
import Link from 'next/link';
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ctaData = {
      phone: "+919580716752",
      whatsapp: "919580716752"
    };

  return (
    <nav className="bg-white shadow-md  ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LEFT - LOGO */}
        <div className="text-xl font-bold text-black">
          Muneem Timber
          <p className="text-xs text-gray-500">Hardoi, UP · Since 1998</p>
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
          <div className=" flex items-center justify-center">
            <Link href="/login">
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                Go to Login
              </button>
            </Link>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          <a
                        href={`tel:${ctaData.phone}`}
                        className="text-black px-5 py-3 rounded-lg font-semibold text-center"
                      >
                        📞 Call Us
                      </a>
          </button>
        </div>

        {/* MOBILE RIGHT */}
        <div className="md:hidden flex items-center gap-3 ">
            <div className=" flex items-center justify-center">
            <Link href="/login">
              <button className=" text-black ">
                Go to Login
              </button>
            </Link>
          </div>
          <button className="text-black">     <a
                        href={`tel:${ctaData.phone}`}
                        className="text-black rounded-lg text-center"
                      >
                        Call Us
                      </a>
                      </button>

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
          <a href="#" className="block">
            Items
          </a>
          <a href="#" className="block">
            Services
          </a>
          <a href="#" className="block">
            Contact
          </a>
          <a href="#" className="block">
            Location
          </a>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2">
            Call Now
          </button>
        </div>
      )}
    </nav>
  );
}
