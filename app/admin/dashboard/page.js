"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import DataTable from "@/components/dashboard/DataTable";
import { Users, ShoppingBag, DollarSign, Clock, Activity, FileText } from "lucide-react";

export default function AdminDashboard() {
  const [onlineOrders, setOnlineOrders] = useState([]);
  const [walkinBills, setWalkinBills] = useState([]);
  const [combinedOrders, setCombinedOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // 1. Fetch online orders
      const ordersRes = await fetch("/api/orders");
      const ordersData = await ordersRes.json();
      
      // 2. Fetch all invoices
      const invoicesRes = await fetch("/api/invoices");
      const invoicesData = await invoicesRes.json();

      if (ordersRes.ok && invoicesRes.ok) {
        setOnlineOrders(ordersData);
        setInvoices(invoicesData);

        const walkins = invoicesData.filter(i => i.type === "Walk-In");
        setWalkinBills(walkins);

        // Combine for recent listings
        const combined = [
          ...ordersData.map(o => ({ ...o, type: "Online" })),
          ...walkins.map(w => ({ ...w, type: "Walk-In", id: w.invoiceNumber }))
        ];
        // Sort by booking date descending
        combined.sort((a, b) => new Date(b.bookingDate || b.date) - new Date(a.bookingDate || a.date));
        setCombinedOrders(combined);
      }
    } catch (e) {
      console.error("Dashboard data fetch error:", e);
    }
  };

  // Calculation parameters
  const totalOrdersCount = onlineOrders.length + walkinBills.length;
  
  const newOrdersCount = onlineOrders.filter(o => o.status === "New Order").length;
  
  const activeRentalsCount = 
    onlineOrders.filter(o => o.status === "Active Rental").length + 
    walkinBills.filter(w => w.status === "Active Rental" || w.status === "Confirmed").length;
    
  const completedRentalsCount = 
    onlineOrders.filter(o => o.status === "Completed").length + 
    walkinBills.filter(w => w.status === "Completed").length;

  const parseCurrency = (val) => {
    if (!val) return 0;
    return parseFloat(String(val).replace(/[^\d.]/g, "")) || 0;
  };

  const totalRevenueVal = 
    onlineOrders.reduce((acc, o) => acc + parseCurrency(o.total), 0) + 
    walkinBills.reduce((acc, w) => acc + parseCurrency(w.total), 0);

  const tableColumns = [
    { header: "Invoice No", accessor: "invoiceNumber" },
    { header: "Customer Name", accessor: "customer" },
    { header: "Order Type", accessor: "type" },
    { header: "Total Amount", accessor: "total" },
    { 
      header: "Status", 
      accessor: "status",
      render: (val) => (
        <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase ${
          val === "New Order" ? "bg-blue-50 text-blue-700 border border-blue-100" :
          val === "Confirmed" ? "bg-amber-50 text-amber-700 border border-amber-100" :
          val === "Active Rental" ? "bg-sky-50 text-sky-700 border border-sky-100" :
          val === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
          "bg-rose-50 text-rose-700 border border-rose-100"
        }`}>
          {val || "Confirmed"}
        </span>
      )
    },
    { header: "Date", accessor: "bookingDate" }
  ];

  // Map accessor parameters for combined listing
  const tableData = combinedOrders.slice(0, 5).map(o => ({
    invoiceNumber: o.invoiceNumber || `MTS-LEG-${o.id}`,
    customer: o.customer,
    type: o.type,
    total: o.total,
    status: o.status,
    bookingDate: o.bookingDate || o.date
  }));

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#0D1B2A]">Muneem Store Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Real-time statistics tracker for Hardoi store operations.</p>
        </div>

        {/* New Online Orders Alerts */}
        {newOrdersCount > 0 && (
          <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-3xl p-5 shadow-sm space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                <h3 className="font-heading text-xs font-bold text-[#5D4037] uppercase tracking-wider">
                  New Online Orders Awaiting Confirmation ({newOrdersCount})
                </h3>
              </div>
              <span className="text-[9px] text-amber-800 bg-[#FFF3CD] font-mono font-bold px-2 py-0.5 rounded border border-[#FFEBAA]">
                Requires Action
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {onlineOrders
                .filter(o => o.status === "New Order")
                .map(order => (
                  <div key={order._id || order.id} className="bg-white border border-[#FFE082] p-4 rounded-2xl shadow-sm space-y-3 relative hover:border-[#FF6B2B] transition group">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-[#1251A3] bg-blue-50 px-2 py-0.5 rounded">
                          {order.invoiceNumber}
                        </span>
                        <h4 className="font-heading font-bold text-xs text-slate-800 mt-1.5">
                          {order.customer}
                        </h4>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {order.total}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 space-y-0.5 font-sans">
                      <p>📱 {order.phone || "N/A"}</p>
                      <p>📍 {order.projectLocation || order.address || "Hardoi"}</p>
                      <p>📅 {order.startDate} to {order.endDate} ({order.duration})</p>
                    </div>
                    <div className="flex gap-2 pt-1 font-heading">
                      <button
                        onClick={async () => {
                          try {
                            const res = await fetch("/api/orders", {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ id: order._id, status: "Confirmed" })
                            });
                            if (res.ok) {
                              alert("✅ Order Confirmed!");
                              loadDashboardData();
                            } else {
                              const data = await res.json();
                              alert("❌ Error: " + data.error);
                            }
                          } catch (err) {
                            console.error(err);
                            alert("❌ Confirmation failed: " + err.message);
                          }
                        }}
                        className="flex-1 bg-[#1251A3] hover:bg-[#0A3578] text-white py-1.5 rounded-xl text-[10px] font-bold transition text-center active:scale-95"
                      >
                        Confirm Order
                      </button>
                      <Link
                        href="/admin/orders"
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 rounded-xl text-[10px] font-bold transition text-center flex items-center justify-center border"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Real-time stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatsCard title="Total Orders" value={totalOrdersCount} icon={ShoppingBag} />
          <StatsCard title="New Orders" value={newOrdersCount} icon={Activity} type="info" />
          <StatsCard title="Active Rentals" value={activeRentalsCount} icon={Clock} type="warning" />
          <StatsCard title="Completed Rentals" value={completedRentalsCount} icon={Clock} type="success" />
          <StatsCard title="Total Revenue" value={`₹${totalRevenueVal.toLocaleString()}`} icon={DollarSign} type="success" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Latest Transactions list */}
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-brand-blue/10 shadow-sm overflow-hidden space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-heading text-base font-bold text-[#0D1B2A]">Recent Operations Log</h3>
              <span className="text-[10px] text-gray-400 font-mono">Last 5 entries</span>
            </div>
            
            {tableData.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-8 text-center">Koi orders registered nahi hain.</p>
            ) : (
              <DataTable columns={tableColumns} data={tableData} />
            )}
          </div>

          {/* Quick System Framework metrics */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-brand-blue/10 shadow-sm space-y-4">
              <h3 className="font-heading text-md font-bold text-[#0D1B2A] border-b pb-2 flex items-center gap-2">
                <FileText size={16} className="text-[#1251A3]" />
                Operational Status
              </h3>
              <div className="space-y-3.5 text-xs text-gray-600">
                <div className="flex justify-between font-sans">
                  <span>Online Orders Placed</span>
                  <span className="font-mono font-bold text-[#1251A3]">{onlineOrders.length}</span>
                </div>
                <div className="flex justify-between font-sans">
                  <span>Walk-In Invoices Billed</span>
                  <span className="font-mono font-bold text-[#1251A3]">{walkinBills.length}</span>
                </div>
                <div className="flex justify-between font-sans">
                  <span>Total Active Inventory load</span>
                  <span className="font-mono font-bold text-slate-800">76% active</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
