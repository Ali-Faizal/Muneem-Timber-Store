"use client";
import React, { useState, useEffect } from "react";
import { CreditCard, QrCode, Coins, CheckCircle, ArrowLeft, Calendar, FileText, Check } from "lucide-react";
import Link from "next/link";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PaymentPage() {
  const [cart, setCart] = useState([]);
  const [checkoutDetails, setCheckoutDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [showSuccess, setShowSuccess] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  useEffect(() => {
    const items = localStorage.getItem("muneem_cart");
    if (items) setCart(JSON.parse(items));

    const details = localStorage.getItem("muneem_checkout");
    if (details) setCheckoutDetails(JSON.parse(details));
  }, []);

  const calculateDays = () => {
    if (!checkoutDetails.startDate || !checkoutDetails.endDate) return 5;
    const start = new Date(checkoutDetails.startDate);
    const end = new Date(checkoutDetails.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const durationDays = calculateDays();
  const transportCost = 200;
  const dailyTotal = cart.reduce((acc, item) => acc + item.quantity * item.dailyRate, 0);
  const itemsSubtotal = dailyTotal * durationDays;
  const grandTotal = itemsSubtotal + transportCost;

  const handlePay = async (e) => {
    e.preventDefault();

    const orderPayload = {
      customer: checkoutDetails.fullName || "Grahak Bhai",
      phone: checkoutDetails.phone || "",
      email: checkoutDetails.email || "",
      address: `${checkoutDetails.address || ""}, ${checkoutDetails.city || ""}, ${checkoutDetails.state || ""} - ${checkoutDetails.pincode || ""}`,
      projectLocation: checkoutDetails.projectLocation || "Hardoi",
      startDate: checkoutDetails.startDate || "",
      endDate: checkoutDetails.endDate || "",
      total: `₹${grandTotal.toLocaleString()}`,
      duration: `${durationDays} Days`,
      itemsCount: cart.length,
      method: paymentMethod.toUpperCase(),
      items: cart
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert("❌ Error: " + (data.error || "Failed to save order"));
        return;
      }

      // Clear cart
      localStorage.removeItem("muneem_cart");
      
      // Show popup
      setShowSuccess(true);
    } catch (err) {
      console.error("Payment save error:", err);
      alert("❌ Technical error: " + err.message);
    }
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-[#F0F6FF] min-h-screen py-12 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6 print:hidden">
            <Link
              href="/get-rent"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1251A3] hover:underline"
            >
              <ArrowLeft size={16} />
              Form wapas check karein
            </Link>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Payment selector */}
            <div className="md:col-span-7 bg-white rounded-3xl border border-[rgba(18,81,163,0.12)] p-6 md:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="font-heading text-xl font-extrabold text-[#0D1B2A]">
                  Choose Payment Method
                </h2>
                <p className="text-xs text-[#64748B] mt-1">Virtual demo gateways — koi asli paise nahi lagenge.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod("upi")}
                  className={`border p-4 rounded-2xl cursor-pointer transition text-center flex flex-col items-center justify-center gap-2 ${
                    paymentMethod === "upi"
                      ? "border-[#1251A3] bg-[#F0F6FF]"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <QrCode size={28} className={paymentMethod === "upi" ? "text-[#1251A3]" : "text-gray-500"} />
                  <span className="text-xs font-bold text-[#0D1B2A]">UPI Scanner</span>
                </div>

                {/* Card Option */}
                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`border p-4 rounded-2xl cursor-pointer transition text-center flex flex-col items-center justify-center gap-2 ${
                    paymentMethod === "card"
                      ? "border-[#1251A3] bg-[#F0F6FF]"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <CreditCard size={28} className={paymentMethod === "card" ? "text-[#1251A3]" : "text-gray-500"} />
                  <span className="text-xs font-bold text-[#0D1B2A]">Debit / Credit Card</span>
                </div>

                {/* Cash Option */}
                <div
                  onClick={() => setPaymentMethod("cash")}
                  className={`border p-4 rounded-2xl cursor-pointer transition text-center flex flex-col items-center justify-center gap-2 col-span-2 ${
                    paymentMethod === "cash"
                      ? "border-[#1251A3] bg-[#F0F6FF]"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Coins size={28} className={paymentMethod === "cash" ? "text-[#1251A3]" : "text-gray-500"} />
                  <span className="text-xs font-bold text-[#0D1B2A]">Nayd Cash on Store Delivery</span>
                </div>
              </div>

              {/* Dynamic Subforms */}
              <form onSubmit={handlePay} className="space-y-4">
                {paymentMethod === "upi" && (
                  <div className="bg-slate-50 rounded-2xl p-6 text-center border border-dashed border-slate-200 space-y-4">
                    <div className="bg-white p-4 rounded-xl inline-block shadow-inner">
                      {/* Fake QR Code */}
                      <div className="w-40 h-40 bg-[#0A3578] flex items-center justify-center text-white font-mono text-[9px] font-bold rounded-lg relative overflow-hidden">
                        <div className="absolute inset-2 border-2 border-white opacity-20"></div>
                        <span>M.T.S VIRTUAL UPI QR</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0D1B2A]">Scan with PhonePe, GPay, or Paytm</p>
                      <p className="text-xs text-[#64748B] mt-1">Virtual billing code: muneemtimber@upi</p>
                    </div>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-[#1251A3] to-[#0A3578] text-white p-6 rounded-2xl space-y-6 shadow-md">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs opacity-75 font-semibold">Virtual Card Mock</span>
                        <span className="text-sm italic font-bold">Muneem Bank</span>
                      </div>
                      <div className="font-mono text-lg tracking-widest py-2">
                        {cardNumber || "•••• •••• •••• ••••"}
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div>
                          <p className="opacity-50 text-[9px] uppercase font-bold">Holder Name</p>
                          <p className="font-bold">{cardName.toUpperCase() || "CUSTOMER NAME"}</p>
                        </div>
                        <div>
                          <p className="opacity-50 text-[9px] uppercase font-bold">Expiry</p>
                          <p className="font-mono font-bold">{cardExpiry || "MM/YY"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Card Holder Name"
                        className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Card Number (16 digits)"
                        maxLength={19}
                        className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-mono"
                        value={cardNumber}
                        onChange={(e) => {
                          const formatted = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                          setCardNumber(formatted);
                        }}
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-mono"
                          value={cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "");
                            if (val.length > 2) val = val.substring(0, 2) + "/" + val.substring(2);
                            setCardExpiry(val);
                          }}
                          required
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          maxLength={3}
                          className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-mono"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="bg-slate-50 rounded-2xl p-5 border border-[rgba(18,81,163,0.06)]">
                    <p className="text-xs text-[#334155] leading-relaxed">
                      🤝 **Pay On Delivery**: Aapke site location par samaan pahunchne ke baad cash ya UPI se pay karein. Physical signature aur verification site par delivery ke dauran hogi.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#1251A3] hover:bg-[#0A3578] text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm shadow-md mt-6"
                >
                  Pay & Complete Rental Booking
                </button>
              </form>
            </div>

            {/* Right Column: Order and Rent Summary */}
            <div className="md:col-span-5 bg-white rounded-3xl border border-[rgba(18,81,163,0.12)] p-6 shadow-sm space-y-5">
              <div>
                <h3 className="font-heading font-bold text-base text-[#0D1B2A]">Order & Rent Summary</h3>
                <p className="text-[10px] text-[#64748B] uppercase tracking-wider font-mono mt-0.5">Booking confirmation preview</p>
              </div>

              {/* Delivery meta block */}
              <div className="bg-[#F0F6FF] rounded-xl p-4 text-xs text-[#334155] border border-[rgba(18,81,163,0.04)] space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase text-[9px]">Customer Name</span>
                  <span className="font-semibold text-right">{checkoutDetails.fullName || "Walk-in Grahak"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase text-[9px]">Site Address</span>
                  <span className="font-semibold text-right max-w-[150px] truncate">{checkoutDetails.projectLocation || "Hardoi UP"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase text-[9px]">Rental Window</span>
                  <span className="font-semibold text-right font-mono">{durationDays} Days</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="max-h-48 overflow-y-auto space-y-2.5 text-xs text-[#334155] pr-1">
                  {cart.map((item) => (
                    <div key={item.slug} className="flex justify-between items-center">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="font-mono">₹{(item.quantity * item.dailyRate * durationDays).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-2 text-xs text-[#64748B]">
                  <div className="flex justify-between">
                    <span>Transport Charges</span>
                    <span className="font-mono">₹{transportCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#0D1B2A] text-sm pt-2">
                    <span>Grand Total</span>
                    <span className="font-mono text-[#1251A3]">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal Popup Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-5 border border-slate-100 shadow-2xl animate-in scale-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle size={36} />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-xl font-extrabold text-[#0D1B2A]">
                Booking Successful!
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Ram Ram! Aapka rental order book ho gaya hai. Ab aap dashboard me status aur booking check kar sakte hain.
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full bg-[#1251A3] hover:bg-[#0A3578] text-white py-3 rounded-xl font-bold text-sm transition"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
