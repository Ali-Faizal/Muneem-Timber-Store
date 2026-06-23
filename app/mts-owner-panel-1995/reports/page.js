"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { DollarSign, FileText, ShoppingBag, TrendingUp } from "lucide-react";

export default function ReportsPage() {
  const [onlineOrders, setOnlineOrders] = useState([]);
  const [walkinBills, setWalkinBills] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    loadReportsData();
  }, []);

  const loadReportsData = async () => {
    try {
      const ordersRes = await fetch("/api/orders");
      const ordersData = await ordersRes.json();

      const invoicesRes = await fetch("/api/invoices");
      const invoicesData = await invoicesRes.json();

      if (ordersRes.ok && invoicesRes.ok) {
        setOnlineOrders(ordersData);
        
        const walkins = invoicesData.filter(i => i.type === "Walk-In");
        setWalkinBills(walkins);

        // Merge transactions
        const merged = [
          ...ordersData.map(o => ({
            id: o.invoiceNumber || `MTS-LEG-${o.id}`,
            customer: o.customer,
            date: o.bookingDate || o.date,
            total: o.total,
            type: "Online",
            status: o.status
          })),
          ...walkins.map(w => ({
            id: w.invoiceNumber,
            customer: w.customer,
            date: w.bookingDate,
            total: w.total,
            type: "Walk-In",
            status: w.status
          }))
        ];
        // Sort by date descending
        merged.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAllTransactions(merged);
      }
    } catch (e) {
      console.error("Failed to load reports data", e);
    }
  };

  const parseCurrency = (val) => {
    if (!val) return 0;
    return parseFloat(String(val).replace(/[^\d.]/g, "")) || 0;
  };

  // Date filters
  const todayStr = new Date().toISOString().split("T")[0];
  const currentMonthStr = new Date().toISOString().substring(0, 7); // e.g. "2026-06"

  const todayRevenue = allTransactions
    .filter(t => t.date === todayStr)
    .reduce((acc, t) => acc + parseCurrency(t.total), 0);

  const monthRevenue = allTransactions
    .filter(t => t.date && t.date.substring(0, 7) === currentMonthStr)
    .reduce((acc, t) => acc + parseCurrency(t.total), 0);

  // Chart data extraction (mock group by day for last 7 days)
  const getLast7Days = () => {
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("en-US", { weekday: "short" });
      
      const dayTotal = allTransactions
        .filter(t => t.date === dateStr)
        .reduce((acc, t) => acc + parseCurrency(t.total), 0);

      result.push({ label, amount: dayTotal, dateStr });
    }
    return result;
  };

  const chartData = getLast7Days();
  const maxVal = Math.max(...chartData.map(d => d.amount), 1000);

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8 font-sans">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#0D1B2A]">Business & Revenue Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Cross-channel billing intelligence ledgers.</p>
        </div>

        {/* Aggregates row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-heading">
          <StatsCard title="Today's Revenue" value={`₹${todayRevenue.toLocaleString()}`} icon={DollarSign} type="success" />
          <StatsCard title="This Month Revenue" value={`₹${monthRevenue.toLocaleString()}`} icon={TrendingUp} type="success" />
          <StatsCard title="Total Walk-In Invoices" value={walkinBills.length} icon={FileText} type="info" />
          <StatsCard title="Total Online Rentals" value={onlineOrders.length} icon={ShoppingBag} type="info" />
        </div>

        {/* Chart + Transaction List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Chart block */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-brand-blue/10 shadow-sm space-y-6">
            <div>
              <h3 className="font-heading text-base font-bold text-[#0D1B2A]">Last 7 Days Revenue Trend</h3>
              <p className="text-xs text-gray-500 mt-1">Daily billing summaries on both online and offline receipts.</p>
            </div>

            {/* Custom Responsive SVG Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-4 pt-4 px-2 relative font-heading">
              {chartData.map((bar, idx) => {
                const heightPercent = Math.min(100, (bar.amount / maxVal) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[9px] font-mono px-1.5 py-0.5 rounded absolute -translate-y-12 shadow">
                      ₹{bar.amount}
                    </span>
                    
                    <div
                      className="w-full bg-[#1251A3] group-hover:bg-[#FF6B2B] transition-colors rounded-t-lg duration-300 min-h-[4px]"
                      style={{ height: `${heightPercent || 4}%` }}
                    />
                    
                    <span className="text-[10px] font-bold text-[#64748B] font-mono">
                      {bar.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Combined Transaction Ledger list */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-brand-blue/10 shadow-sm space-y-4">
            <div>
              <h3 className="font-heading text-base font-bold text-[#0D1B2A]">Cross-Channel Settlement Ledger</h3>
              <p className="text-xs text-gray-500 mt-1">Audit log of all registered transactions.</p>
            </div>

            {allTransactions.length === 0 ? (
              <p className="text-xs text-gray-400 italic text-center py-12">Koi transactions registers nahi hain.</p>
            ) : (
              <div className="overflow-x-auto max-h-[300px] overflow-y-auto font-sans">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead className="bg-slate-50 text-[#1251A3] font-mono uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-3">Invoice No</th>
                      <th className="p-3 font-heading">Customer</th>
                      <th className="p-3 text-center font-heading">Type</th>
                      <th className="p-3 text-right">Amount</th>
                      <th className="p-3 text-center font-heading">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {allTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-3 font-mono font-bold text-[#1251A3]">{tx.id}</td>
                        <td className="p-3 font-semibold">{tx.customer}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            tx.type === "Online" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" : "bg-teal-50 text-teal-700 border border-teal-100"
                          }`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900">{tx.total}</td>
                        <td className="p-3 text-center">
                          <span className={`px-1.5 py-0.5 rounded font-mono text-[8px] font-bold uppercase ${
                            tx.status === "New Order" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                            tx.status === "Confirmed" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                            tx.status === "Active Rental" ? "bg-sky-50 text-sky-700 border border-sky-100" :
                            tx.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                            "bg-rose-50 text-rose-700 border border-rose-100"
                          }`}>
                            {tx.status || "Confirmed"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
