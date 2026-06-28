"use client";

import { useState, useEffect } from "react";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import items from "../data/items";

interface SelectedItem {
  id: number | string;
  name: string;
  quantity: number;
  rate: number;
}

export default function BillingPage() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [referral, setReferral] = useState("");
  const [address, setAddress] = useState("");
  const [durationDays, setDurationDays] = useState(3);
  const [transportCost, setTransportCost] = useState(200);
  const [includeGst, setIncludeGst] = useState(false);

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          const mapped = data.map((item: any) => ({
            id: item.id || String(item._id),
            name: item.name,
            quantity: 0,
            rate: item.dailyRate || 10
          }));
          setSelectedItems(mapped);
        } else {
          setSelectedItems(items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: 0,
            rate: item.dailyRate || 10
          })));
        }
      } catch (err) {
        console.error("Failed to load products in BillingPage:", err);
        setSelectedItems(items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: 0,
          rate: item.dailyRate || 10
        })));
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleQtyChange = (id: number | string, qty: number) => {
    setSelectedItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: Math.max(0, qty) } : item))
    );
  };

  const handleRateChange = (id: number | string, rate: number) => {
    setSelectedItems(prev =>
      prev.map(item => (item.id === id ? { ...item, rate: Math.max(0, rate) } : item))
    );
  };

  // Calculations
  const activeItems = selectedItems.filter(item => item.quantity > 0);
  const itemsSubtotal = activeItems.reduce(
    (acc, item) => acc + item.quantity * item.rate * durationDays,
    0
  );

  const discount = referral.trim() !== "" ? Math.round(itemsSubtotal * 0.1) : 0;
  const subtotalAfterDiscount = itemsSubtotal - discount;
  const gstAmount = includeGst ? Math.round(subtotalAfterDiscount * 0.18) : 0;
  const grandTotal = subtotalAfterDiscount + gstAmount + transportCost;

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // WhatsApp sharing message builder
  const handleWhatsAppShare = () => {
    let message = `*MUNEEM TIMBER STORE, HARDOI*\n`;
    message += `*Bill Invoice Summary*\n`;
    message += `-----------------------------\n`;
    message += `*Customer:* ${customerName || "N/A"}\n`;
    if (customerPhone) message += `*Phone:* +91 ${customerPhone}\n`;
    if (address) message += `*Address:* ${address}\n`;
    message += `*Duration:* ${durationDays} Days\n`;
    message += `-----------------------------\n`;
    
    activeItems.forEach(item => {
      const lineTotal = item.quantity * item.rate * durationDays;
      message += `- ${item.name} x ${item.quantity} (Rate: ₹${item.rate}/day): ₹${lineTotal}\n`;
    });
    
    message += `-----------------------------\n`;
    message += `*Subtotal:* ₹${itemsSubtotal}\n`;
    if (discount > 0) message += `*10% Referral Discount:* -₹${discount}\n`;
    if (transportCost > 0) message += `*Transport Charge:* ₹${transportCost}\n`;
    if (includeGst) message += `*GST (18%):* ₹${gstAmount}\n`;
    message += `*Grand Total:* ₹${grandTotal}\n\n`;
    message += `*Thank you for choosing Muneem Timber Store!* 🤝\n`;
    message += `For inquiries, call 9580716752`;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/919580716752?text=${encodedText}`, "_blank");
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-[#F0F6FF] min-h-screen py-10 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <span className="font-[var(--font-dm-mono)] text-[11px] tracking-[0.14em] uppercase text-[#1251A3] bg-[#E3F0FF] px-4 py-1 rounded-full">
              Bill Calculator
            </span>
            <h1 className="mt-4 text-[28px] md:text-[34px] font-extrabold text-[#0D1B2A] font-[var(--font-syne)]">
              Online Bill <span className="text-[#1251A3]">Banao</span>
            </h1>
            <p className="text-[#64748B] mt-2 text-sm max-w-xl font-[var(--font-dm-sans)]">
              Apne items select karein, rate aur quantity dalein aur turant PDF bill generate ya WhatsApp par share karein.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Input Form Area */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[rgba(18,81,163,0.12)] p-6 md:p-8 space-y-6">
              <div>
                <h2 className="font-[var(--font-syne)] text-[18px] font-extrabold text-[#0D1B2A] mb-2">
                  Customer & Order Details
                </h2>
                <p className="text-xs text-[#64748B]">Customer ki primary details aur duration fill karein.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    placeholder="naam likhein"
                    className="w-full bg-slate-50/50 border border-slate-200 text-sm rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="9580XXXXXX"
                    className="w-full bg-slate-50/50 border border-slate-200 text-sm rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200"
                    maxLength={10}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                    Referral / Reference Name <span className="text-[10px] text-[#1251A3] font-mono lowercase">(10% off)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="kisi purane customer ka naam"
                    className="w-full bg-slate-50/50 border border-slate-200 text-sm rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200"
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    placeholder="Hardoi operational location address"
                    className="w-full bg-slate-50/50 border border-slate-200 text-sm rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    min={1}
                    className="w-full bg-slate-50/50 border border-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200 font-[var(--font-mono)]"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                    Transport Charges (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    className="w-full bg-slate-50/50 border border-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200 font-[var(--font-mono)]"
                    value={transportCost}
                    onChange={(e) => setTransportCost(Math.max(0, parseInt(e.target.value) || 0))}
                  />
                </div>
              </div>

              <hr className="border-[rgba(18,81,163,0.12)] my-6" />

              <div>
                <h2 className="font-[var(--font-syne)] text-[18px] font-extrabold text-[#0D1B2A] mb-2">
                  Select Items & Rates
                </h2>
                <p className="text-xs text-[#64748B]">Items choose karein, quantity aur daily rate specify karein.</p>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1251A3]"></div>
                  </div>
                ) : (
                  selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-[rgba(18,81,163,0.06)]"
                    >
                      <div className="flex-1">
                        <span className="text-[14px] font-bold text-[#0D1B2A]">{item.name}</span>
                        <p className="text-[11px] text-[#64748B]">
                          M.T.S standard rate prefilled
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Qty field */}
                        <div className="w-24">
                          <label className="block text-[10px] text-[#64748B] uppercase font-bold mb-1">Qty</label>
                          <input
                            type="number"
                            min={0}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-center text-sm font-semibold font-[var(--font-mono)]"
                            value={item.quantity === 0 ? "" : item.quantity}
                            placeholder="0"
                            onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value) || 0)}
                          />
                        </div>
                        
                        {/* Rate field */}
                        <div className="w-28">
                          <label className="block text-[10px] text-[#64748B] uppercase font-bold mb-1">Rate/Day (₹)</label>
                          <input
                            type="number"
                            min={0}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-center text-sm font-semibold text-[#1251A3] font-[var(--font-mono)]"
                            value={item.rate}
                            onChange={(e) => handleRateChange(item.id, parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bill Preview Area */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-[rgba(18,81,163,0.12)] overflow-hidden shadow-lg print:border-none print:shadow-none print:bg-white print:p-0">
                {/* Bill Header */}
                <div className="bg-[#1251A3] text-white p-6 text-center print:bg-white print:text-black print:border-b print:border-gray-200">
                  <h3 className="font-[var(--font-syne)] text-[20px] font-extrabold uppercase tracking-wide">
                    Muneem Timber Store
                  </h3>
                  <p className="text-[11px] text-[#90CAF9] mt-1 print:text-gray-500">
                    Radha Nagar, Bilgram Road, Hardoi, UP
                  </p>
                  <p className="text-[9px] text-[#90CAF9] opacity-75 mt-1 font-[var(--font-mono)] print:text-gray-400">
                    Proprietor: Aaqil Mansoori · Since 1995
                  </p>
                </div>

                {/* Bill Body */}
                <div className="p-6 space-y-6 print:p-0">
                  {/* Customer Block */}
                  <div className="bg-[#F0F6FF] rounded-xl p-4 border border-[rgba(18,81,163,0.06)] print:bg-transparent print:border-none print:p-0 print:mb-4">
                    <span className="font-[var(--font-dm-mono)] text-[9px] uppercase tracking-wider text-[#1251A3] block mb-1">
                      INVOICE TO
                    </span>
                    <h4 className="font-bold text-[#0D1B2A] text-sm">
                      {customerName || "Walk-in Customer"}
                    </h4>
                    {customerPhone && (
                      <p className="text-xs text-[#64748B] font-[var(--font-dm-mono)] mt-1">
                        +91 {customerPhone}
                      </p>
                    )}
                    {address && (
                      <p className="text-[11px] text-[#64748B] mt-1 leading-relaxed">
                        {address}
                      </p>
                    )}
                    <p className="text-[10px] text-[#64748B] mt-2 font-semibold">
                      Rental Days: <span className="text-[#1251A3] font-bold">{durationDays} Days</span>
                    </p>
                  </div>

                  {/* Items Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-[rgba(18,81,163,0.12)]">
                          <th className="pb-3 font-[var(--font-dm-mono)] text-[10px] text-[#1251A3] font-bold uppercase">
                            Item
                          </th>
                          <th className="pb-3 text-center font-[var(--font-dm-mono)] text-[10px] text-[#1251A3] font-bold uppercase">
                            Qty
                          </th>
                          <th className="pb-3 text-right font-[var(--font-dm-mono)] text-[10px] text-[#1251A3] font-bold uppercase">
                            Rate
                          </th>
                          <th className="pb-3 text-right font-[var(--font-dm-mono)] text-[10px] text-[#1251A3] font-bold uppercase">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {activeItems.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-8 text-center text-[#64748B] italic">
                              No items selected yet. Enter quantity to build bill.
                            </td>
                          </tr>
                        ) : (
                          activeItems.map((item) => {
                            const lineTotal = item.quantity * item.rate * durationDays;
                            return (
                              <tr key={item.id} className="hover:bg-slate-50/50">
                                <td className="py-3 font-semibold text-[#0D1B2A]">{item.name}</td>
                                <td className="py-3 text-center font-[var(--font-mono)]">{item.quantity}</td>
                                <td className="py-3 text-right font-[var(--font-mono)]">₹{item.rate}/d</td>
                                <td className="py-3 text-right font-[var(--font-mono)] font-bold text-[#0D1B2A]">
                                  ₹{lineTotal}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary Rows */}
                  <div className="border-t border-[rgba(18,81,163,0.12)] pt-4 space-y-2">
                    <div className="flex justify-between items-center text-xs text-[#64748B]">
                      <span>Items Subtotal</span>
                      <span className="font-[var(--font-mono)]">₹{itemsSubtotal}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between items-center text-xs text-emerald-600 font-semibold">
                        <span>Referral Discount (10% off)</span>
                        <span className="font-[var(--font-mono)]">-₹{discount}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-xs text-[#64748B]">
                      <span>Transportation Charge</span>
                      <span className="font-[var(--font-mono)]">₹{transportCost}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs text-[#64748B] py-1 border-b border-dashed border-slate-200">
                      <div className="flex items-center gap-2">
                        <span>Include GST (18%)</span>
                        <div
                          className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${
                            includeGst ? "bg-[#1251A3]" : "bg-slate-300"
                          }`}
                          onClick={() => setIncludeGst(!includeGst)}
                        >
                          <span
                            className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.25 left-0.25 transition-transform ${
                              includeGst ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                      <span className="font-[var(--font-mono)]">₹{gstAmount}</span>
                    </div>

                    {/* Grand Total */}
                    <div className="bg-[#1251A3] text-white rounded-xl p-4 flex justify-between items-center print:bg-black print:text-black print:border print:border-black">
                      <span className="text-xs font-bold uppercase tracking-wide">Grand Total</span>
                      <span className="font-[var(--font-syne)] text-[22px] font-extrabold">
                        ₹{grandTotal}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrint}
                  disabled={activeItems.length === 0}
                  className="flex-1 bg-[#1251A3] hover:bg-[#0A3578] disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
                  </svg>
                  Print / Save PDF
                </button>
                
                <button
                  onClick={handleWhatsAppShare}
                  disabled={activeItems.length === 0}
                  className="flex-1 bg-[#25D366] hover:bg-[#1C8D44] disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Share via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
