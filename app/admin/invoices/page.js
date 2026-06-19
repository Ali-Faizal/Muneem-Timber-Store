"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Eye, Edit2, Trash2, Printer, X, Save, AlertCircle } from "lucide-react";

export default function InvoicesLogPage() {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Selected Invoice for View/Edit Modals
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewInvoice, setViewInvoice] = useState(null);

  // Edit fields state
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editSite, setEditSite] = useState("");
  const [editNotes, setEditNotes] = useState("");

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const res = await fetch("/api/invoices");
      const data = await res.json();
      if (res.ok) {
        setInvoices(data);
      } else {
        console.error("Failed to load invoices", data.error);
      }
    } catch (e) {
      console.error("Invoices load error:", e);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInvoices = invoices.filter(inv => 
    inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inv.phone && inv.phone.includes(searchTerm))
  );

  const handleDelete = async (invoiceNo) => {
    if (confirm(`⚠️ Kya aap invoice ${invoiceNo} ko delete karna chahte hain?`)) {
      try {
        const res = await fetch(`/api/invoices?invoiceNumber=${invoiceNo}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (res.ok) {
          alert("✅ Invoice successfully deleted!");
          loadInvoices();
        } else {
          alert("❌ Error: " + data.error);
        }
      } catch (err) {
        console.error("Delete error:", err);
        alert("❌ Error: " + err.message);
      }
    }
  };

  const handleOpenView = (inv) => {
    setViewInvoice(inv);
  };

  const handleOpenEdit = (inv) => {
    setSelectedInvoice(inv);
    setEditName(inv.customer);
    setEditPhone(inv.phone || "");
    setEditAddress(inv.address || "");
    setEditSite(inv.projectLocation || "");
    setEditNotes(inv.notes || "");
    setIsEditMode(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const payload = {
      invoiceNumber: selectedInvoice.invoiceNumber,
      customer: editName,
      phone: editPhone,
      address: editAddress,
      projectLocation: editSite,
      notes: editNotes
    };

    try {
      const res = await fetch("/api/invoices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Invoice updated successfully!");
        setIsEditMode(false);
        setSelectedInvoice(null);
        loadInvoices();
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error("Save edit error:", err);
      alert("❌ Error: " + err.message);
    }
  };

  const handlePrint = (inv) => {
    const printWindow = window.open("", "_blank");
    
    const itemsRows = inv.items.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.dailyRate.toFixed(2)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${inv.duration}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">
          ₹${(item.quantity * item.dailyRate * (parseInt(inv.duration) || 1)).toFixed(2)}
        </td>
      </tr>
    `).join("");

    const printHtml = `
      <html>
        <head>
          <title>Invoice - ${inv.invoiceNumber}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; line-height: 1.5; font-size: 13px; }
            .flex-between { display: flex; justify-content: space-between; }
            .border-b { border-bottom: 1px solid #ddd; padding-bottom: 20px; margin-bottom: 20px; }
            .bg-slate { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #eee; margin-bottom: 20px; }
            .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th { border-bottom: 2px solid #ddd; padding: 8px; text-align: left; }
            .text-right { text-align: right; }
            .grand-total { font-size: 16px; font-weight: bold; color: #0A3578; }
            .footer-sig { border-top: 1px dashed #ccc; width: 200px; margin-top: 50px; padding-top: 8px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="flex-between border-b">
            <div>
              <h1 style="color: #0A3578; margin: 0; font-size: 24px;">MUNEEM TIMBER STORE</h1>
              <p style="margin: 5px 0 0 0; color: #666; font-size: 11px;">Radha Nagar, Bilgram Road, Hardoi, UP | Since 1998</p>
              <p style="margin: 2px 0 0 0; color: #666; font-size: 11px;">Email: aaqilmansoorias@gmail.com | Phone: +91 9580716752</p>
            </div>
            <div class="text-right">
              <h2 style="margin: 0; font-size: 18px;">RENTAL INVOICE</h2>
              <p style="margin: 5px 0 0 0; font-family: monospace;">INVOICE NO: ${inv.invoiceNumber}</p>
              <p style="margin: 2px 0 0 0; font-family: monospace;">DATE: ${inv.bookingDate || "N/A"}</p>
            </div>
          </div>

          <div class="grid-2 bg-slate">
            <div>
              <h3 style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; color: #666;">Customer Info</h3>
              <strong>Name: ${inv.customer}</strong><br/>
              Mobile: ${inv.phone || "N/A"}<br/>
              Address: ${inv.address || "Hardoi, UP"}
            </div>
            <div>
              <h3 style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; color: #666;">Site Info</h3>
              Project Site: ${inv.projectLocation || "Hardoi"}<br/>
              Duration: ${inv.duration}<br/>
              Dates: ${inv.startDate || "TBD"} to ${inv.endDate || "TBD"}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Rate/Day</th>
                <th style="text-align: center;">Days</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
          </table>

          <div class="grid-2" style="margin-top: 30px;">
            <div style="background: #fdfdfd; border: 1px solid #f0f0f0; border-radius: 8px; padding: 10px 15px;">
              <strong style="font-size: 10px; color: #666; display: block; margin-bottom: 5px;">Remarks:</strong>
              <p style="margin: 0; font-style: italic; font-size: 11px; color: #555;">${inv.notes || "No notes added."}</p>
            </div>
            <div class="text-right" style="font-size: 12px; font-family: monospace;">
              Subtotal: ₹${inv.subtotal ? inv.subtotal.toFixed(2) : "0.00"}<br/>
              Discount: -₹${inv.discountAmount ? inv.discountAmount.toFixed(2) : "0.00"}<br/>
              GST (5%): ₹${inv.gstAmount ? inv.gstAmount.toFixed(2) : "0.00"}<br/>
              <span class="grand-total">GRAND TOTAL: ${inv.total}</span>
            </div>
          </div>

          <div class="flex-between" style="margin-top: 80px;">
            <div style="font-size: 10px; color: #777;">
              1. Materials should be returned in original condition.<br/>
              2. Thank you for doing business with Muneem Timber Store!
            </div>
            <div class="footer-sig">
              <strong>Authorized Signature</strong>
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printHtml);
    printWindow.document.close();
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#0D1B2A]">Invoices Register Log</h1>
            <p className="text-gray-500 text-sm mt-1">Lookup directory for all walk-in client receipts.</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-brand-blue/10 shadow-sm flex items-center gap-3">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by Invoice No, Customer Name or Phone..."
            className="w-full text-xs bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-sans"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Invoice Grid / Table */}
        {filteredInvoices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-brand-blue/10 max-w-xl mx-auto space-y-4 shadow-sm">
            <AlertCircle size={44} className="text-gray-300 mx-auto" />
            <h3 className="font-heading text-base font-bold text-[#0D1B2A]">Koi Invoices Nahi Mili</h3>
            <p className="text-xs text-gray-500 font-sans">Pehle walk-in billing dashboard se invoices create karein.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-brand-blue/10 shadow-sm overflow-hidden font-sans">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-slate-50 text-[#1251A3] font-mono uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Invoice No</th>
                    <th className="p-4 font-heading">Customer Name</th>
                    <th className="p-4">Mobile</th>
                    <th className="p-4 font-heading">Type</th>
                    <th className="p-4">Items Count</th>
                    <th className="p-4">Rental Duration</th>
                    <th className="p-4">Grand Total</th>
                    <th className="p-4 text-center font-heading">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.invoiceNumber} className="hover:bg-slate-50/50 transition duration-150">
                      <td className="p-4 font-mono font-bold text-[#1251A3]">{inv.invoiceNumber}</td>
                      <td className="p-4 font-semibold text-slate-900">{inv.customer}</td>
                      <td className="p-4 font-mono">{inv.phone || "N/A"}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          inv.type === "Online" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" : "bg-teal-50 text-teal-700 border border-teal-100"
                        }`}>
                          {inv.type || "Walk-In"}
                        </span>
                      </td>
                      <td className="p-4">{inv.items ? inv.items.length : 0} items</td>
                      <td className="p-4 font-mono">{inv.duration}</td>
                      <td className="p-4 font-mono font-bold text-slate-900">{inv.total}</td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenView(inv)}
                            className="bg-sky-50 text-[#1251A3] hover:bg-sky-100 p-2 rounded-xl transition"
                            title="View Details"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(inv)}
                            className="bg-amber-50 text-amber-700 hover:bg-amber-100 p-2 rounded-xl transition"
                            title="Edit Invoice"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handlePrint(inv)}
                            className="bg-green-50 text-green-700 hover:bg-green-100 p-2 rounded-xl transition"
                            title="Print / PDF Again"
                          >
                            <Printer size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(inv.invoiceNumber)}
                            className="bg-rose-50 text-rose-600 hover:bg-rose-100 p-2 rounded-xl transition"
                            title="Delete Invoice"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* VIEW DETAILS MODAL */}
      {viewInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 border shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setViewInvoice(null)}
              className="absolute top-4 right-4 text-gray-400 hover:bg-slate-100 p-1.5 rounded-lg transition"
            >
              <X size={18} />
            </button>

            <div>
              <span className="text-[9px] font-mono font-bold text-[#1251A3] bg-blue-50 px-2.5 py-0.5 rounded border border-brand-blue/10">
                Invoice Lookup Frame
              </span>
              <h2 className="font-heading text-lg font-bold text-[#0D1B2A] mt-2 font-mono">
                {viewInvoice.invoiceNumber}
              </h2>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border">
                <div>
                  <h4 className="text-[10px] text-gray-400 uppercase font-bold mb-1 font-heading">Customer Info</h4>
                  <p className="font-bold text-slate-800">{viewInvoice.customer}</p>
                  <p className="font-mono mt-0.5">{viewInvoice.phone || "N/A"}</p>
                  <p className="text-gray-500 mt-1 max-w-[200px] truncate" title={viewInvoice.address}>{viewInvoice.address || "Hardoi"}</p>
                </div>
                <div>
                  <h4 className="text-[10px] text-gray-400 uppercase font-bold mb-1 font-heading">Site & Dates</h4>
                  <p><span className="font-bold text-slate-600">Site:</span> {viewInvoice.projectLocation || "Hardoi"}</p>
                  <p className="mt-0.5 font-mono"><span className="font-bold text-slate-600">Days:</span> {viewInvoice.duration}</p>
                  <p className="mt-0.5 font-mono text-[10px]">{viewInvoice.startDate} to {viewInvoice.endDate}</p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 font-heading">
                <h4 className="font-bold text-[#0D1B2A] border-b pb-1 font-heading">Items Log</h4>
                <div className="max-h-36 overflow-y-auto space-y-2 pr-1 font-sans">
                  {viewInvoice.items && viewInvoice.items.map((item) => (
                    <div key={item.slug} className="flex justify-between items-center text-slate-700 bg-slate-50/50 p-2 rounded-xl text-xs">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="font-mono font-semibold text-[#1251A3]">
                        ₹{(item.quantity * item.dailyRate * (parseInt(viewInvoice.duration) || 1)).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-2 text-right">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold">₹{viewInvoice.subtotal ? viewInvoice.subtotal.toFixed(2) : "0.00"}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Discount:</span>
                  <span className="font-mono font-bold">-₹{viewInvoice.discountAmount ? viewInvoice.discountAmount.toFixed(2) : "0.00"}</span>
                </div>
                <div className="flex justify-between text-slate-500 border-b pb-2">
                  <span>GST:</span>
                  <span className="font-mono font-bold">₹{viewInvoice.gstAmount ? viewInvoice.gstAmount.toFixed(2) : "0.00"}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#1251A3] pt-1 font-heading">
                  <span>GRAND TOTAL:</span>
                  <span className="font-mono text-base">{viewInvoice.total}</span>
                </div>
              </div>

              {viewInvoice.notes && (
                <div className="bg-slate-50 p-3 rounded-xl border italic text-slate-600">
                  <span className="font-bold uppercase text-[9px] text-gray-400 not-italic block mb-1 font-heading">Notes Remarks</span>
                  {viewInvoice.notes}
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col gap-2 font-heading">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handlePrint(viewInvoice);
                    setViewInvoice(null);
                  }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#0D1B2A] py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1 border"
                  title="Download invoice as a PDF file"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => {
                    handlePrint(viewInvoice);
                    setViewInvoice(null);
                  }}
                  className="flex-1 bg-[#1251A3] hover:bg-[#0A3578] text-white py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1 shadow-sm"
                  title="Print invoice document"
                >
                  Print Invoice
                </button>
              </div>
              <button
                onClick={() => setViewInvoice(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs transition border"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT INVOICE MODAL */}
      {isEditMode && selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full space-y-5 border shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsEditMode(false);
                setSelectedInvoice(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:bg-slate-100 p-1.5 rounded-lg transition"
            >
              <X size={18} />
            </button>

            <div>
              <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                Edit Invoice Mode
              </span>
              <h2 className="font-heading text-lg font-bold text-[#0D1B2A] mt-2 font-mono">
                {selectedInvoice.invoiceNumber}
              </h2>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1 font-heading">
                  Customer Name
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1 font-heading">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                  maxLength={10}
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value.replace(/\D/g, ""))}
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1 font-heading">
                  Billing Address
                </label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 h-14 resize-none focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-sans"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1 font-heading">
                  Project Site Location
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-sans"
                  value={editSite}
                  onChange={(e) => setEditSite(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1 font-heading">
                  Remarks / Notes
                </label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 h-14 resize-none focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-sans"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                />
              </div>

              <div className="pt-2 flex gap-3 font-heading">
                <button
                  type="submit"
                  className="flex-1 bg-[#1251A3] hover:bg-[#0A3578] text-white py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Save size={14} /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditMode(false);
                    setSelectedInvoice(null);
                  }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs transition border"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
