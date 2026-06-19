"use client";
import React, { useState, useEffect } from "react";
import { Trash2, ArrowRight, ArrowLeft, RefreshCw, Calculator, ShoppingBag } from "lucide-react";
import Link from "next/link";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RentSummaryPage() {
  const [cart, setCart] = useState([]);
  const [durationDays, setDurationDays] = useState(5);
  const [transportCost, setTransportCost] = useState(200);

  // Load cart from localStorage
  useEffect(() => {
    const items = localStorage.getItem("muneem_cart");
    if (items) {
      setCart(JSON.parse(items));
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("muneem_cart", JSON.stringify(newCart));
  };

  const handleQtyChange = (slug, val) => {
    const newQty = Math.max(1, val);
    const newCart = cart.map(item => item.slug === slug ? { ...item, quantity: newQty } : item);
    saveCart(newCart);
  };

  const handleRemove = (slug) => {
    const newCart = cart.filter(item => item.slug !== slug);
    saveCart(newCart);
  };

  const handleClear = () => {
    if (confirm("Kya aap sach me saare items remove karna chahte hain?")) {
      saveCart([]);
    }
  };

  // Calculations
  const dailyTotal = cart.reduce((acc, item) => acc + item.quantity * item.dailyRate, 0);
  const grandTotal = dailyTotal * durationDays + transportCost;

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-[#F0F6FF] min-h-screen py-12 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#1251A3] bg-[#E3F0FF] px-4 py-1 rounded-full font-bold">
                Rental Cart System
              </span>
              <h1 className="mt-4 text-[28px] md:text-[34px] font-extrabold text-[#0D1B2A] font-[var(--font-syne)]">
                Rent Summary & <span className="text-[#1251A3]">Calculator</span>
              </h1>
              <p className="text-[#64748B] mt-2 text-sm max-w-xl font-[var(--font-dm-sans)]">
                Samaan ki quantity aur rental duration change karke live calculations check karein.
              </p>
            </div>
            
            {cart.length > 0 && (
              <button
                onClick={handleClear}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-4 py-2.5 rounded-xl border border-rose-100 transition self-center md:self-end flex items-center gap-1.5"
              >
                <Trash2 size={14} />
                Clear Cart
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[rgba(18,81,163,0.12)] p-12 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
              <div className="w-20 h-20 rounded-full bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mx-auto">
                <ShoppingBag size={36} />
              </div>
              <h2 className="text-xl font-heading font-extrabold text-[#0D1B2A]">
                Rental cart bilkul khali hai!
              </h2>
              <p className="text-sm text-[#64748B] max-w-md mx-auto">
                Shuttering, Balli, Patra, Chali aur baaki saare construction support items ko cart me add karein.
              </p>
              <Link
                href="/items"
                className="inline-flex items-center justify-center bg-[#1251A3] hover:bg-[#0A3578] text-white px-6 py-3.5 rounded-xl font-bold transition text-sm shadow-sm"
              >
                ← Samaan Add Karein
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-8 bg-white rounded-3xl border border-[rgba(18,81,163,0.12)] p-6 md:p-8 space-y-6 shadow-sm">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#0D1B2A]">Selected Rental Items</h3>
                  <p className="text-xs text-[#64748B] mt-1">Item rates per day standard catalog se prefilled hain.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead>
                      <tr className="border-b border-[rgba(18,81,163,0.1)] text-[#1251A3] uppercase font-mono tracking-wider">
                        <th className="pb-4 font-bold">Item Name</th>
                        <th className="pb-4 text-center font-bold">Quantity</th>
                        <th className="pb-4 text-right font-bold">Daily Price</th>
                        <th className="pb-4 text-right font-bold">Daily Subtotal</th>
                        <th className="pb-4 text-center font-bold">Remove</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {cart.map((item) => {
                        const lineDailyTotal = item.quantity * item.dailyRate;
                        return (
                          <tr key={item.slug} className="hover:bg-slate-50/50">
                            <td className="py-4 font-bold text-[#0D1B2A]">{item.name}</td>
                            <td className="py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleQtyChange(item.slug, item.quantity - 50)}
                                  className="w-8 h-8 rounded bg-slate-100 hover:bg-slate-200 text-[#0D1B2A] font-bold transition active:scale-95"
                                >
                                  -
                                </button>
                                <span className="font-mono font-bold w-12 text-center text-xs">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQtyChange(item.slug, item.quantity + 50)}
                                  className="w-8 h-8 rounded bg-slate-100 hover:bg-slate-200 text-[#0D1B2A] font-bold transition active:scale-95"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="py-4 text-right font-mono text-xs">₹{item.dailyRate.toFixed(2)}</td>
                            <td className="py-4 text-right font-mono font-bold text-[#1251A3]">
                              ₹{lineDailyTotal.toFixed(2)}/day
                            </td>
                            <td className="py-4 text-center">
                              <button
                                onClick={() => handleRemove(item.slug)}
                                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg transition"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[rgba(18,81,163,0.1)] text-xs text-[#64748B]">
                  <Link href="/items" className="inline-flex items-center gap-1 font-bold text-[#1251A3] hover:underline">
                    <ArrowLeft size={14} />
                    Aur Samaan Add Karein
                  </Link>
                  <span>Muneem Timber Store certified materials guarantee.</span>
                </div>
              </div>

              {/* Calculator Summary Column */}
              <div className="lg:col-span-4 bg-white rounded-3xl border border-[rgba(18,81,163,0.12)] p-6 md:p-8 space-y-6 shadow-sm">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#0D1B2A] flex items-center gap-2">
                    <Calculator size={20} className="text-[#1251A3]" />
                    Calculation Parameters
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">Configure duration settings below.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                      Rental Duration (Days)
                    </label>
                    <input
                      type="number"
                      min={1}
                      className="w-full bg-slate-50 border border-slate-200 text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-[var(--font-mono)]"
                      value={durationDays}
                      onChange={(e) => setDurationDays(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                      Transport Charge (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      className="w-full bg-slate-50 border border-slate-200 text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-[var(--font-mono)]"
                      value={transportCost}
                      onChange={(e) => setTransportCost(Math.max(0, parseInt(e.target.value) || 0))}
                    />
                  </div>
                </div>

                <hr className="border-[rgba(18,81,163,0.08)]" />

                <div className="space-y-2.5 text-xs text-[#334155]">
                  <div className="flex justify-between items-center">
                    <span>Rent per Day</span>
                    <span className="font-mono font-semibold">₹{dailyTotal.toFixed(2)}/day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Rent ({durationDays} days)</span>
                    <span className="font-mono font-semibold">₹{(dailyTotal * durationDays).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-2.5">
                    <span>Transport cost</span>
                    <span className="font-mono font-semibold">₹{transportCost.toFixed(2)}</span>
                  </div>

                  {/* Grand Total banner */}
                  <div className="bg-[#1251A3] text-white rounded-xl p-4 flex justify-between items-center shadow-inner mt-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider block opacity-75 font-semibold">
                        Grand Total
                      </span>
                      <span className="text-xs opacity-60">All calculations included</span>
                    </div>
                    <span className="font-heading text-2xl font-extrabold">
                      ₹{grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/get-rent"
                  className="w-full bg-[#FF6B2B] hover:bg-[#E55A1F] text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm shadow-md text-center"
                >
                  Confirm and Book Rent
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
