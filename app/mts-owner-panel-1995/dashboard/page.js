"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import DataTable from "@/components/dashboard/DataTable";
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  Activity, 
  FileText, 
  Bell, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  Smartphone,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OwnerDashboard() {
  const [workers, setWorkers] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [onlineOrders, setOnlineOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [customerLogins, setCustomerLogins] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // 1. Fetch Workers
      const workersRes = await fetch("/api/workers");
      if (workersRes.ok) {
        const workersData = await workersRes.json();
        setWorkers(workersData);
      }

      // 2. Fetch Service Bookings
      const bookingsRes = await fetch("/api/service-requests");
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setServiceRequests(bookingsData);
      }

      // 3. Fetch online orders
      const ordersRes = await fetch("/api/orders");
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOnlineOrders(ordersData);
      }

      // 4. Fetch all invoices
      const invoicesRes = await fetch("/api/invoices");
      if (invoicesRes.ok) {
        const invoicesData = await invoicesRes.json();
        setInvoices(invoicesData);
      }

      // 5. Fetch dashboard alerts / notifications
      const notificationsRes = await fetch("/api/notifications?limit=5");
      if (notificationsRes.ok) {
        const notificationsData = await notificationsRes.json();
        setNotifications(notificationsData);
      }

      // 6. Fetch recent customer logins
      const loginsRes = await fetch("/api/auth/login-log");
      if (loginsRes.ok) {
        const loginsData = await loginsRes.json();
        setCustomerLogins(loginsData);
      }

      // 7. Fetch recent audit logs
      const activityRes = await fetch("/api/activity-logs?limit=5");
      if (activityRes.ok) {
        const activityData = await activityRes.json();
        setActivityLogs(activityData.slice(0, 5));
      }

      // 8. Fetch all customers
      const customersRes = await fetch("/api/customers");
      if (customersRes.ok) {
        const customersData = await customersRes.json();
        setCustomers(customersData);
      }
    } catch (e) {
      console.error("Dashboard data load error:", e);
    }
  };

  // Helper to mark a notification as read
  const markNotificationRead = async (id) => {
    try {
      const res = await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setNotifications(prev => prev.filter(n => n._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Helper to mark all notifications as read
  const markAllNotificationsRead = async () => {
    try {
      const res = await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true })
      });
      if (res.ok) {
        setNotifications([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Calculations
  const totalWorkers = workers.length;
  const availableWorkers = workers.filter(w => w.availability).length;

  const totalBookings = serviceRequests.length;
  const pendingBookings = serviceRequests.filter(s => s.status === "Pending").length;
  const completedBookings = serviceRequests.filter(s => s.status === "Completed").length;

  const totalCustomers = customers.length;
  const todayStr = new Date().toISOString().split("T")[0];
  const newCustomersToday = customers.filter(c => {
    if (!c.createdAt) return false;
    return new Date(c.createdAt).toISOString().split("T")[0] === todayStr;
  }).length;

  const totalOrders = onlineOrders.length;
  const pendingOrders = onlineOrders.filter(o => o.status !== "Completed" && o.status !== "Cancelled").length;
  const completedOrders = onlineOrders.filter(o => o.status === "Completed").length;

  const parseCurrency = (val) => {
    if (!val) return 0;
    return parseFloat(String(val).replace(/[^\d.]/g, "")) || 0;
  };

  // Combined offline walkin billing + online orders total
  const walkins = invoices.filter(i => i.type === "Walk-In");
  const totalRevenueVal = 
    onlineOrders.reduce((acc, o) => acc + parseCurrency(o.total), 0) + 
    walkins.reduce((acc, w) => acc + parseCurrency(w.total), 0);

  const newOrdersCount = onlineOrders.filter(o => o.status === "New Order").length;

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        
        {/* Banner with Legacy Logo Clickable Reference */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-slate-100">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-[#0D1B2A] flex items-center gap-2">
              Muneem Store Dashboard
            </h1>
            <p className="text-gray-500 text-xs mt-1">
              Serving Hardoi since 1995 • Carrying forward the legacy of Mr. Anees Mansoori.
            </p>
          </div>
          <div className="bg-[#E3F0FF] text-[#1251A3] border border-[#1251A3]/10 px-4 py-2 rounded-xl text-xs font-mono font-semibold self-start md:self-center">
            Owner Access
          </div>
        </div>

        {/* Real-time Alerts (🔔 Unread Notifications) */}
        <AnimatePresence>
          {notifications.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#FFF8E1] border border-[#FFE082] rounded-3xl p-5 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-800">
                  <Bell size={18} className="animate-bounce" />
                  <h3 className="font-heading text-xs font-extrabold uppercase tracking-wider">
                    Critical Panel Alerts ({notifications.length})
                  </h3>
                </div>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-[10px] text-amber-800 font-bold bg-[#FFEBAA] border border-[#FFE082] px-3 py-1 rounded-xl hover:bg-[#FFD54F] transition"
                >
                  Clear All Alerts
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notifications.map(notif => (
                  <div key={notif._id} className="bg-white border border-[#FFE082] p-4 rounded-2xl shadow-sm relative group flex flex-col justify-between hover:border-[#FF6B2B] transition">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                          notif.type === "registration" ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700"
                        }`}>
                          {notif.type.toUpperCase()}
                        </span>
                        <button
                          onClick={() => markNotificationRead(notif._id)}
                          className="text-[9px] text-gray-400 hover:text-[#1251A3] font-bold"
                          title="Mark read"
                        >
                          ✕
                        </button>
                      </div>
                      <h4 className="font-bold text-xs text-slate-800 mt-2 flex items-center gap-1">
                        {notif.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-1 font-medium font-sans leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                    <div className="text-[8px] text-gray-400 mt-3 font-mono font-semibold text-right">
                      {new Date(notif.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Grid: Upgraded with requested metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Customers" value={totalCustomers} icon={Users} />
          <StatsCard title="New Customers Today" value={newCustomersToday} icon={Sparkles} type="info" />
          <StatsCard title="Total Workers" value={totalWorkers} icon={Users} />
          <StatsCard title="Available Workers" value={availableWorkers} icon={CheckCircle} type="success" />
          <StatsCard title="Total Orders" value={totalOrders} icon={ShoppingBag} />
          <StatsCard title="Pending Orders" value={pendingOrders} icon={Clock} type="warning" />
          <StatsCard title="Completed Orders" value={completedOrders} icon={CheckCircle} type="success" />
          <StatsCard title="Revenue Placeholder" value={`₹${totalRevenueVal.toLocaleString()}`} icon={DollarSign} type="success" />
        </div>

        {/* Operations Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Recent User Logins (Customer Tracking) */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-brand-blue/10 shadow-sm space-y-4">
            <h3 className="font-heading text-sm font-extrabold text-[#0D1B2A] border-b pb-2 flex items-center gap-1.5">
              <Smartphone size={16} className="text-[#1251A3]" />
              Recent Customer Logins
            </h3>
            
            {customerLogins.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-8 text-center">No active logins recorded.</p>
            ) : (
              <div className="space-y-3.5">
                {customerLogins.map((login) => (
                  <div key={login._id} className="border-b border-slate-50 pb-3 flex justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-[#0D1B2A]">{login.name}</h4>
                      <p className="text-[10px] text-gray-400 font-medium">{login.email}</p>
                      <p className="text-[10px] text-[#1251A3] font-bold">📱 {login.phone}</p>
                      <p className="text-[9px] text-gray-400 font-mono italic">Device: {login.deviceInfo.slice(0, 30)}...</p>
                    </div>
                    <div className="text-right flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-gray-400 font-bold">
                        {new Date(login.loginTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                      </span>
                      <span className="bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1.5 py-0.5 rounded border border-emerald-100 self-end font-mono">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Audit Logs Preview */}
          <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-brand-blue/10 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-heading text-sm font-extrabold text-[#0D1B2A] flex items-center gap-1.5">
                <FileText size={16} className="text-[#1251A3]" />
                Recent Audit Operations Log
              </h3>
              <Link 
                href="/mts-owner-panel-1995/activity-logs" 
                className="text-[#1251A3] hover:text-[#0A3578] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5"
              >
                View Registry
                <ArrowRight size={12} />
              </Link>
            </div>

            {activityLogs.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-8 text-center">No audit records synced.</p>
            ) : (
              <div className="space-y-3.5 text-xs">
                {activityLogs.map((log) => (
                  <div key={log._id} className="flex justify-between items-center border-b border-slate-50 pb-3 gap-4">
                    <div className="space-y-0.5">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold font-mono uppercase tracking-wider ${
                        log.action.includes("Login") ? "bg-emerald-50 text-emerald-700" :
                        log.action.includes("New") ? "bg-sky-50 text-sky-700" :
                        log.action.includes("Delete") ? "bg-rose-50 text-rose-700" :
                        "bg-slate-50 text-slate-600"
                      }`}>
                        {log.action}
                      </span>
                      <p className="text-[10px] text-gray-500 mt-1">Performed by: <strong className="text-slate-700">{log.user}</strong></p>
                      <p className="text-[10px] text-gray-400 font-medium">Record: {log.affectedRecord}</p>
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 font-bold whitespace-nowrap">
                      {log.date} {log.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
