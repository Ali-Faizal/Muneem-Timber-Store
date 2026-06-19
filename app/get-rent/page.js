"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, User, Phone, Mail, MapPin, Calendar, ClipboardList } from "lucide-react";
import Link from "next/link";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function GetRentPage() {
  const [cart, setCart] = useState([]);
  
  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Hardoi");
  const [state, setState] = useState("Uttar Pradesh");
  const [pincode, setPincode] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Retrieve cart
  useEffect(() => {
    const items = localStorage.getItem("muneem_cart");
    if (items) {
      setCart(JSON.parse(items));
    }
    
    // Autofill user name & email if logged in
    const user = localStorage.getItem("muneem_user");
    if (user) {
      const parsed = JSON.parse(user);
      setFullName(parsed.name || "");
      setEmail(parsed.email || "");
    }
  }, []);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Cart khali hai! Pehle items select karein.");
      window.location.href = "/items";
      return;
    }

    // Save details in localStorage
    const checkoutDetails = {
      fullName,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      projectLocation,
      startDate,
      endDate,
    };
    localStorage.setItem("muneem_checkout", JSON.stringify(checkoutDetails));
    
    // Redirect to Payment Gate UI
    window.location.href = "/payment";
  };

  const dailyTotal = cart.reduce((acc, item) => acc + item.quantity * item.dailyRate, 0);

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-[#F0F6FF] min-h-screen py-12 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/rent-summary"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1251A3] hover:underline"
            >
              <ArrowLeft size={16} />
              Rent calculator par wapas jayein
            </Link>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="md:col-span-8 bg-white rounded-3xl border border-[rgba(18,81,163,0.12)] p-6 md:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="font-heading text-xl font-extrabold text-[#0D1B2A] flex items-center gap-2">
                  <ClipboardList size={22} className="text-[#1251A3]" />
                  Rental Delivery Details
                </h2>
                <p className="text-xs text-[#64748B] mt-1">Ghar pe delivery and documentation ke liye details fill karein.</p>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Poora naam likhein"
                      className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-gray-450 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Mobile & Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        placeholder="9580XXXXXX"
                        className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-gray-450 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-gray-450 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                    Billing Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                    <textarea
                      placeholder="Billing address likhein"
                      className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 h-20 placeholder:text-gray-450 focus:outline-none focus:border-[#1251A3] focus:bg-white transition resize-none"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* City, State, Pin */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                      State
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                      Pincode
                    </label>
                    <input
                      type="text"
                      placeholder="241001"
                      maxLength={6}
                      className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-mono"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                      required
                    />
                  </div>
                </div>

                {/* Project Location */}
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                    Project Site / Operational Site Location Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="e.g. Cinema Road, Near Rumi Gate, Hardoi"
                      className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-gray-450 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Rental Start Date & End Date */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                      Rental Start Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="date"
                        className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-mono"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                      Rental End Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="date"
                        className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-mono"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1251A3] hover:bg-[#0A3578] text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm shadow-md mt-6"
                >
                  Proceed to Payment Selection
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

            {/* Sticky summary Sidebar */}
            <div className="md:col-span-4 bg-white rounded-3xl border border-[rgba(18,81,163,0.12)] p-6 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-base text-[#0D1B2A]">Booking Summary</h3>
              <div className="space-y-2.5 text-xs text-[#334155]">
                {cart.map((item) => (
                  <div key={item.slug} className="flex justify-between items-center">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-mono">₹{(item.quantity * item.dailyRate).toFixed(2)}/day</span>
                  </div>
                ))}
                <hr className="border-slate-100" />
                <div className="flex justify-between items-center font-bold text-[#0D1B2A]">
                  <span>Total Daily Rent</span>
                  <span className="font-mono text-[#1251A3]">₹{dailyTotal.toFixed(2)}/day</span>
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
