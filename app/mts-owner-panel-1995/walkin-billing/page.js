"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Plus, Trash2, Printer, Save, FileText, CheckCircle, Calculator } from "lucide-react";
import { toast } from "react-toastify";

export default function WalkInBillingPage() {
  // Form Fields
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // Database Products
  const [productsList, setProductsList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentQty, setCurrentQty] = useState(100);

  // Settings
  const [gstApplied, setGstApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [manualDiscount, setManualDiscount] = useState("");
  const [notes, setNotes] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedInvoice, setSavedInvoice] = useState(null);

  // Load products & generate invoice number
  useEffect(() => {
    // 1. Fetch products
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProductsList(data);
        if (data.length > 0) setCurrentItemIndex(0);
      })
      .catch(err => console.error("Error fetching products", err));

    // 2. Fetch invoice count to pre-fill invoice number
    fetch("/api/invoices")
      .then(res => res.json())
      .then(data => {
        const nextSeq = String(data.length + 1).padStart(4, "0");
        setInvoiceNo(`MTS-2026-${nextSeq}`);
      })
      .catch(err => console.error("Error fetching invoices count", err));
  }, []);

  const handleAddItem = () => {
    if (productsList.length === 0) return;
    const prod = productsList[currentItemIndex];
    const existingIndex = selectedItems.findIndex(item => item.slug === prod.slug);
    if (existingIndex > -1) {
      const updated = [...selectedItems];
      updated[existingIndex].quantity += currentQty;
      setSelectedItems(updated);
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          id: prod.id || prod._id,
          name: prod.name,
          slug: prod.slug,
          dailyRate: prod.dailyRate,
          quantity: currentQty
        }
      ]);
    }
  };

  const handleQtyEdit = (index, qty) => {
    const updated = [...selectedItems];
    updated[index].quantity = Math.max(1, parseInt(qty) || 1);
    setSelectedItems(updated);
  };

  const handleRemoveItem = (index) => {
    setSelectedItems(selectedItems.filter((_, idx) => idx !== index));
  };

  // Calculations
  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  };

  const rentalDays = calculateDays();
  const subtotal = selectedItems.reduce((acc, item) => acc + (item.quantity * item.dailyRate * rentalDays), 0);
  
  // Discount Math
  let discountAmount = 0;
  if (manualDiscount !== "") {
    discountAmount = Math.max(0, parseFloat(manualDiscount) || 0);
  } else {
    discountAmount = (subtotal * discountPercent) / 100;
  }

  const baseAfterDiscount = Math.max(0, subtotal - discountAmount);
  const gstAmount = gstApplied ? (baseAfterDiscount * 5) / 100 : 0;
  const grandTotal = baseAfterDiscount + gstAmount;

  // Save Record to MongoDB
  const handleSaveBill = async (e) => {
    if (e) e.preventDefault();
    if (!customerName || !mobileNumber) {
      toast.warn("⚠️ Grahak ka naam aur mobile number mandatory hain!");
      return;
    }
    if (selectedItems.length === 0) {
      toast.warn("⚠️ Kam se kam ek product select karein!");
      return;
    }

    const payload = {
      customer: customerName,
      phone: mobileNumber,
      address: address,
      projectLocation: projectLocation,
      startDate: startDate,
      endDate: endDate,
      duration: `${rentalDays} Days`,
      items: selectedItems,
      subtotal: subtotal,
      discountAmount: discountAmount,
      gstAmount: gstAmount,
      total: `₹${grandTotal.toLocaleString()}`,
      gstApplied: gstApplied,
      discountOption: manualDiscount !== "" ? "manual" : String(discountPercent),
      manualDiscountVal: manualDiscount,
      notes: notes,
      status: "Confirmed",
      method: "CASH"
    };

    try {
      const res = await fetch("/api/walkin-billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error("❌ Error: " + (data.error || "Failed to save walkin invoice"));
        return;
      }
      setSavedInvoice(data.bill);
      setShowSuccess(true);
      toast.success("💾 Bill saved successfully to MongoDB!");
    } catch (err) {
      console.error("Walk-in save error:", err);
      toast.error("❌ Technical error: " + err.message);
    }
  };

  const handleEmailInvoice = async (inv) => {
    const emailInput = prompt("📧 Customer ka Email Address enter karein:", "");
    if (!emailInput) return;
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      toast.error("❌ Invalid email format!");
      return;
    }

    try {
      toast.info("⏳ Email send ho raha hai...");
      const res = await fetch("/api/invoices/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNumber: inv.invoiceNumber,
          email: emailInput
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Email successfully sent!");
      } else {
        toast.error("❌ Email fail: " + data.error);
      }
    } catch (err) {
      console.error("Email send error:", err);
      toast.error("❌ Technical error: " + err.message);
    }
  };

  const handleWhatsAppInvoice = (inv) => {
    const phone = inv.phone || mobileNumber || "";
    const cleanedPhone = phone.replace(/\D/g, "");
    const formattedPhone = cleanedPhone.length === 10 ? "91" + cleanedPhone : (cleanedPhone.length > 10 ? cleanedPhone : "");

    const itemsText = inv.items.map(item => `• ${item.name} (${item.quantity} units x ₹${item.dailyRate}/day)`).join("\n");
    const textMessage = `*Muneem Timber Store - Bill Receipt*\n\n*Invoice No:* ${inv.invoiceNumber}\n*Customer:* ${inv.customer}\n*Rental Period:* ${inv.duration} (${inv.startDate} to ${inv.endDate})\n\n*Materials:*\n${itemsText}\n\n*Total Rent:* ${inv.total}\n\nThank you for choosing Muneem Timber Store!`;

    const waUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(textMessage)}`;
    window.open(waUrl, "_blank");
    toast.success("📲 WhatsApp sharing link opened!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const originalTitle = document.title;
    document.title = `${invoiceNo || "Invoice"}_Muneem_Timber_Store`;
    window.print();
    document.title = originalTitle;
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSavedInvoice(null);
    // Reset forms
    setCustomerName("");
    setMobileNumber("");
    setAddress("");
    setProjectLocation("");
    setStartDate("");
    setEndDate("");
    setSelectedItems([]);
    setNotes("");
    setManualDiscount("");
    setDiscountPercent(0);
    setGstApplied(false);
    
    // Refresh invoice count
    fetch("/api/invoices")
      .then(res => res.json())
      .then(data => {
        const nextSeq = String(data.length + 1).padStart(4, "0");
        setInvoiceNo(`MTS-2026-${nextSeq}`);
      });
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-6 print:hidden">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#0D1B2A]">Walk-In Bill Generator</h1>
          <p className="text-gray-500 text-sm mt-1">Manual offline billing portal for walk-in store visitors.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Customer details */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-brand-blue/10 shadow-sm space-y-4">
            <h3 className="font-heading text-md font-bold text-[#0D1B2A] border-b pb-2 flex items-center gap-2">
              <FileText size={18} className="text-[#1251A3]" />
              1. Customer Details
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="Ram Kumar"
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="9580XXXXXX"
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                  Billing Address
                </label>
                <textarea
                  placeholder="Radha Nagar, Hardoi"
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 h-14 resize-none focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-sans"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                  Project Site Location
                </label>
                <input
                  type="text"
                  placeholder="Cinema Road, Hardoi"
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                  value={projectLocation}
                  onChange={(e) => setProjectLocation(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-2 py-2 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-mono"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-2 py-2 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-mono"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                  Extra Remarks / Notes
                </label>
                <textarea
                  placeholder="e.g. Transport extra, Advance received ₹1000..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 h-14 resize-none focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-sans"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Middle Column: Items selection and current bill */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Add Products block */}
            <div className="bg-white p-5 rounded-3xl border border-brand-blue/10 shadow-sm space-y-4">
              <h3 className="font-heading text-md font-bold text-[#0D1B2A] border-b pb-2 flex items-center gap-2">
                <Plus size={18} className="text-[#1251A3]" />
                2. Select Product
              </h3>
              
              <div className="flex items-end gap-3 font-sans">
                <div className="flex-grow">
                  <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1 font-heading">
                    Select Material Item
                  </label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-medium"
                    value={currentItemIndex}
                    onChange={(e) => setCurrentItemIndex(parseInt(e.target.value))}
                  >
                    {productsList.map((item, idx) => (
                      <option key={item.slug} value={idx}>
                        {item.name} (₹{item.dailyRate.toFixed(2)} / piece / day)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-24">
                  <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1 font-heading">
                    Qty (Pcs)
                  </label>
                  <input
                    type="number"
                    min={1}
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition text-center font-bold"
                    value={currentQty}
                    onChange={(e) => setCurrentQty(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddItem}
                  className="bg-[#1251A3] hover:bg-[#0A3578] text-white px-4 py-2.5 rounded-xl font-bold text-xs transition h-[38px] flex items-center gap-1 active:scale-95 font-heading"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>

            {/* List of active items */}
            <div className="bg-white p-5 rounded-3xl border border-brand-blue/10 shadow-sm space-y-4">
              <h3 className="font-heading text-md font-bold text-[#0D1B2A] border-b pb-2">
                Selected Billing Table
              </h3>

              {selectedItems.length === 0 ? (
                <p className="text-xs text-gray-400 italic text-center py-6 font-sans">Koi product select nahi kiya gaya hai.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[350px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-[#1251A3] uppercase font-mono font-bold tracking-wide">
                        <th className="pb-2">Material</th>
                        <th className="pb-2 text-center">Qty (Pcs)</th>
                        <th className="pb-2 text-right">Rate/Day</th>
                        <th className="pb-2 text-right">Total</th>
                        <th className="pb-2 text-center"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {selectedItems.map((item, idx) => {
                        const totalCost = item.quantity * item.dailyRate * rentalDays;
                        return (
                          <tr key={item.slug} className="hover:bg-slate-50/50">
                            <td className="py-2.5 font-bold text-slate-800">{item.name}</td>
                            <td className="py-2.5 text-center">
                              <input
                                type="number"
                                min={1}
                                className="w-16 bg-slate-50 border border-slate-200 text-center font-mono rounded-lg py-0.5 text-xs focus:outline-none focus:border-[#1251A3]"
                                value={item.quantity}
                                onChange={(e) => handleQtyEdit(idx, e.target.value)}
                              />
                            </td>
                            <td className="py-2.5 text-right font-mono">₹{item.dailyRate.toFixed(2)}</td>
                            <td className="py-2.5 text-right font-mono font-bold text-[#1251A3]">
                              ₹{totalCost.toFixed(2)}
                            </td>
                            <td className="py-2.5 text-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(idx)}
                                className="text-rose-600 hover:bg-rose-50 p-1 rounded transition"
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Calculation summary and triggers */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-brand-blue/10 shadow-sm space-y-4">
              <div>
                <h3 className="font-heading text-md font-bold text-[#0D1B2A]">Invoice Meta Summary</h3>
                <span className="text-[10px] font-mono font-bold text-[#1251A3] bg-[#E3F0FF] px-2 py-0.5 rounded mt-1 inline-block">
                  INVOICE NO: {invoiceNo}
                </span>
              </div>

              <hr className="border-slate-100" />

              {/* Calculator items list */}
              <div className="space-y-3 text-xs text-slate-700 font-sans">
                <div className="flex justify-between">
                  <span>Subtotal ({rentalDays} days)</span>
                  <span className="font-mono font-bold">₹{subtotal.toFixed(2)}</span>
                </div>

                {/* GST toggle */}
                <div className="flex items-center justify-between py-1 bg-slate-50 px-2 rounded-lg border border-slate-100">
                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-[#0D1B2A] font-heading">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#1251A3] focus:ring-[#1251A3]"
                      checked={gstApplied}
                      onChange={(e) => setGstApplied(e.target.checked)}
                    />
                    Apply GST (5%)
                  </label>
                  <span className="font-mono font-bold text-gray-600">
                    {gstApplied ? `₹${gstAmount.toFixed(2)}` : "₹0.00"}
                  </span>
                </div>

                {/* Discount Select */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-heading">
                    Select Discount
                  </label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-2 py-1.5 focus:outline-none focus:border-[#1251A3] font-semibold"
                    value={discountPercent}
                    disabled={manualDiscount !== ""}
                    onChange={(e) => setDiscountPercent(parseInt(e.target.value))}
                  >
                    <option value={0}>No Discount</option>
                    <option value={5}>5% Off</option>
                    <option value={10}>10% Off</option>
                    <option value={15}>15% Off</option>
                    <option value={20}>20% Off</option>
                  </select>
                </div>

                {/* Manual discount */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-heading">
                    Or Manual Discount (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="e.g. ₹200"
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#1251A3] font-mono"
                    value={manualDiscount}
                    onChange={(e) => {
                      setManualDiscount(e.target.value);
                      if (e.target.value !== "") setDiscountPercent(0);
                    }}
                  />
                </div>

                {/* Total amount bar */}
                <div className="bg-[#0A3578] text-white rounded-xl p-3 flex justify-between items-center shadow-inner mt-4 font-heading">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider block opacity-75 font-semibold">Grand Total</span>
                    <span className="text-[9px] opacity-60">Inclusive GST & Disc</span>
                  </div>
                  <span className="font-heading text-lg font-extrabold">
                    ₹{grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Triggers */}
              <div className="space-y-2 pt-2 font-heading">
                <button
                  type="button"
                  onClick={handleSaveBill}
                  className="w-full bg-[#1251A3] hover:bg-[#0A3578] text-white py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Save size={15} /> Save Invoice Record
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="bg-slate-100 hover:bg-slate-200 text-[#0D1B2A] py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1 border border-slate-200 active:scale-95"
                    title="Save current invoice as PDF"
                  >
                    Download PDF
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="bg-slate-100 hover:bg-slate-200 text-[#0D1B2A] py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1 border border-slate-200 active:scale-95"
                    title="Send current invoice to printer"
                  >
                    Print Invoice
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* PRINT-ONLY INVOICE LAYOUT CONTAINER */}
      <div className="hidden print:block bg-white text-black p-8 font-sans max-w-[800px] mx-auto text-xs">
        
        {/* Header Block */}
        <div className="flex justify-between items-start border-b pb-6 mb-6">
          <div>
            <h1 className="font-heading text-2xl font-extrabold uppercase text-[#0A3578]">Muneem Timber Store</h1>
            <p className="text-[10px] text-gray-500 font-mono mt-1">Radha Nagar, Bilgram Road, Hardoi, UP | Since 1998</p>
            <p className="text-[10px] text-gray-500 font-mono">Email: aaqilmansoorias@gmail.com | Phone: +91 9580716752</p>
          </div>
          <div className="text-right font-sans">
            <h2 className="text-lg font-bold text-gray-800 font-heading">RENTAL INVOICE</h2>
            <div className="mt-2 space-y-1 font-mono text-[10px] text-gray-600">
              <div><span className="font-bold">INVOICE NO:</span> {invoiceNo}</div>
              <div><span className="font-bold">DATE:</span> {new Date().toISOString().split("T")[0]}</div>
              <div><span className="font-bold">RENTAL DAYS:</span> {rentalDays} Days</div>
            </div>
          </div>
        </div>

        {/* Customer Information Block */}
        <div className="grid grid-cols-2 gap-8 bg-slate-50 p-4 rounded-xl border mb-6">
          <div>
            <h3 className="font-bold text-[10px] text-gray-500 uppercase tracking-wider mb-2 font-heading">Billing Details</h3>
            <div className="space-y-1 text-slate-800">
              <div className="font-bold text-sm">{customerName || "Walk-In Grahak"}</div>
              <div>Mobile: {mobileNumber || "Not Provided"}</div>
              <div className="max-w-[250px]">{address || "Hardoi, UP"}</div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-[10px] text-gray-500 uppercase tracking-wider mb-2 font-heading">Delivery / Site Info</h3>
            <div className="space-y-1 text-slate-800 font-mono">
              <div><span className="font-bold">Project Site:</span> {projectLocation || "Hardoi, UP"}</div>
              <div><span className="font-bold">Start Date:</span> {startDate || "Immediate"}</div>
              <div><span className="font-bold">End Date:</span> {endDate || "TBD"}</div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-left text-xs mb-6">
          <thead>
            <tr className="border-b-2 border-slate-300 text-slate-800 uppercase font-bold font-heading">
              <th className="pb-2">Material Description</th>
              <th className="pb-2 text-center">Qty (Pcs)</th>
              <th className="pb-2 text-right">Daily Rate</th>
              <th className="pb-2 text-center">Days</th>
              <th className="pb-2 text-right">Line Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {selectedItems.map((item) => {
              const lineTotal = item.quantity * item.dailyRate * rentalDays;
              return (
                <tr key={item.slug}>
                  <td className="py-2.5 font-bold text-slate-800">{item.name}</td>
                  <td className="py-2.5 text-center font-mono">{item.quantity}</td>
                  <td className="py-2.5 text-right font-mono">₹{item.dailyRate.toFixed(2)}</td>
                  <td className="py-2.5 text-center font-mono">{rentalDays}</td>
                  <td className="py-2.5 text-right font-mono font-bold">₹{lineTotal.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Totals Summary */}
        <div className="grid grid-cols-12 gap-4 border-t pt-6 mb-12">
          
          {/* Notes column */}
          <div className="col-span-7 bg-slate-50 p-4 rounded-xl border h-fit">
            <h4 className="font-bold text-[9px] text-gray-500 uppercase mb-1 font-heading">Remarks & Special Instructions</h4>
            <p className="text-[10px] text-slate-700 italic leading-relaxed whitespace-pre-line">{notes || "No extra remarks added to this billing session."}</p>
          </div>

          {/* Math calculation column */}
          <div className="col-span-5 space-y-2 text-right text-xs font-mono">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Discount ({manualDiscount !== "" ? "Manual" : `${discountPercent}%`}):</span>
              <span>-₹{discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600 border-b pb-2">
              <span>GST (5%):</span>
              <span>₹{gstAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#0A3578] pt-1 font-heading">
              <span>Grand Total:</span>
              <span className="font-mono">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

        </div>

        {/* Footer print block */}
        <div className="flex justify-between items-end border-t pt-10 mt-16 font-mono text-[9px] text-gray-500">
          <div>
            <p>1. Shuttering materials should be returned in original condition.</p>
            <p>2. Any damage or missing materials will be charged extra.</p>
            <p>3. Thank you for doing business with Muneem Timber Store!</p>
          </div>
          <div className="text-center w-48 border-t border-dashed pt-4 font-heading">
            <p className="font-bold text-slate-800 font-heading">Authorized Signature</p>
            <p className="mt-1">Muneem Timber Store</p>
          </div>
        </div>

      </div>

      {/* Success Modal Popup Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-5 border border-slate-100 shadow-2xl animate-in scale-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle size={36} />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-xl font-extrabold text-[#0D1B2A]">
                Invoice Saved!
              </h3>
              {savedInvoice && (
                <p className="text-xs font-mono font-bold text-[#1251A3] bg-blue-50 py-1 rounded border border-brand-blue/10">
                  {savedInvoice.invoiceNumber}
                </p>
              )}
              <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                Walk-in customer ka billing record MongoDB me successfully store kar diya gaya hai.
              </p>
            </div>

            {savedInvoice && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleEmailInvoice(savedInvoice)}
                  className="bg-purple-50 text-purple-700 hover:bg-purple-100 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1 border border-purple-200"
                  title="Email invoice to customer"
                >
                  ✉️ Email
                </button>
                <button
                  onClick={() => handleWhatsAppInvoice(savedInvoice)}
                  className="bg-green-50 text-green-700 hover:bg-green-100 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1 border border-green-200"
                  title="Share invoice on WhatsApp"
                >
                  💬 WhatsApp
                </button>
              </div>
            )}

            <button
              onClick={handleSuccessClose}
              className="w-full bg-[#1251A3] hover:bg-[#0A3578] text-white py-3 rounded-xl font-bold text-sm transition font-heading"
            >
              Naya Bill Banao
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
