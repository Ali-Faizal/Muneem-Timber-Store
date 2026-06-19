"use client";
import React, { use, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Calendar, Info, Shield, Truck } from "lucide-react";
import Link from "next/link";
import AnnouncementBar from "../../components/AnnouncementBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import items from "../../data/items";

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const item = items.find((i) => i.slug === slug);

  const [qty, setQty] = useState(100);

  if (!item) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0F6FF]">
          <h2 className="text-xl font-bold text-[#0D1B2A] mb-4">Samaan nahi mila!</h2>
          <Link href="/items" className="text-[#1251A3] hover:underline font-bold">
            ← Hamare saare samaan dekhein
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const handleQtyChange = (val) => {
    setQty(Math.max(1, val));
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("muneem_cart") || "[]");
    const existingIndex = cart.findIndex((i) => i.slug === item.slug);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        slug: item.slug,
        quantity: qty,
        dailyRate: item.dailyRate,
      });
    }
    localStorage.setItem("muneem_cart", JSON.stringify(cart));
    alert(`✅ ${qty} x ${item.name} cart me add kar diya gaya hai!`);
  };

  const handleGetRent = () => {
    // Add to cart first
    const cart = JSON.parse(localStorage.getItem("muneem_cart") || "[]");
    const existingIndex = cart.findIndex((i) => i.slug === item.slug);
    if (existingIndex > -1) {
      cart[existingIndex].quantity = qty; // Update to specified qty
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        slug: item.slug,
        quantity: qty,
        dailyRate: item.dailyRate,
      });
    }
    localStorage.setItem("muneem_cart", JSON.stringify(cart));
    window.location.href = "/get-rent";
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-[#F0F6FF] min-h-screen py-12 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link
              href="/items"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1251A3] hover:underline"
            >
              <ArrowLeft size={16} />
              Samaan list par wapas jayein
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-[rgba(18,81,163,0.12)] overflow-hidden grid md:grid-cols-12 gap-8 p-6 md:p-10 shadow-lg">
            {/* Left Column: Image placeholder */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div className="bg-[#E3F0FF] rounded-2xl aspect-square flex items-center justify-center text-[#1251A3] border border-[rgba(18,81,163,0.06)] shadow-inner">
                {/* Product illustrative vector placeholder */}
                <div className="text-center p-6 space-y-4">
                  <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center mx-auto shadow-md">
                    <span className="font-heading text-3xl font-extrabold text-[#1251A3]">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase bg-[#1251A3] text-white px-3 py-1 rounded-full">
                    M.T.S Certified
                  </span>
                </div>
              </div>

              {/* Informational banners */}
              <div className="mt-6 space-y-3 hidden md:block text-xs text-[#334155]">
                <div className="flex items-center gap-3 bg-[#FFF0E8] text-[#FF6B2B] p-3 rounded-xl border border-orange-100">
                  <Truck size={18} />
                  <span>Hardoi region me Fast delivery and pickup service available</span>
                </div>
                <div className="flex items-center gap-3 bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100">
                  <Shield size={18} />
                  <span>Quality and damage checking support on site delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#1251A3] bg-[#E3F0FF] px-3.5 py-1 rounded-full font-bold">
                  Premium Kiraya Item
                </span>
                <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0D1B2A] tracking-tight">
                  {item.name}
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-bold text-[#1251A3]">
                    ₹{item.dailyRate.toFixed(2)}
                  </span>
                  <span className="text-xs text-[#64748B]">per piece/day rate</span>
                </div>
                
                <hr className="border-[rgba(18,81,163,0.08)]" />

                <p className="text-sm text-[#334155] leading-relaxed font-sans">
                  {item.desc}
                </p>
                
                <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs text-[#64748B] border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Info size={14} className="text-[#1251A3]" />
                    <span>Lana aur lejana facility direct rates standard setup.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#1251A3]" />
                    <span>Minimum booking duration 3 din standard penalty system application.</span>
                  </div>
                </div>
              </div>

              {/* Quantity selector & Action Buttons */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                    Select Quantity (Pcs)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQtyChange(qty - 50)}
                      className="w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl flex items-center justify-center text-lg active:scale-95 transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      className="w-32 h-12 bg-slate-50 border border-slate-200 text-center font-bold text-[#0D1B2A] font-[var(--font-mono)] rounded-xl text-lg focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                      value={qty}
                      onChange={(e) => handleQtyChange(parseInt(e.target.value) || 1)}
                    />
                    <button
                      onClick={() => handleQtyChange(qty + 50)}
                      className="w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl flex items-center justify-center text-lg active:scale-95 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-[#1251A3] py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm border border-[rgba(18,81,163,0.1)]"
                  >
                    <ShoppingCart size={18} />
                    Add To Cart
                  </button>
                  <button
                    onClick={handleGetRent}
                    className="w-full bg-[#FF6B2B] hover:bg-[#E55A1F] text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    Get Rent Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
