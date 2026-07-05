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
      const workersRes = await fetch("/api/workers");
      if (workersRes.ok) {
        const workersData = await workersRes.json();
        setWorkers(workersData);
      }

      const bookingsRes = await fetch("/api/service-requests");
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setServiceRequests(bookingsData);
      }

      const ordersRes = await fetch("/api/orders");
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOnlineOrders(ordersData);
      }

      const invoicesRes = await fetch("/api/invoices");
      if (invoicesRes.ok) {
        const invoicesData = await invoicesRes.json();
        setInvoices(invoicesData);
      }

      const notificationsRes = await fetch("/api/notifications?limit=5");
      if (notificationsRes.ok) {
        const notificationsData = await notificationsRes.json();
        setNotifications(notificationsData);
      }

      const loginsRes = await fetch("/api/auth/login-log");
      if (loginsRes.ok) {
        const loginsData = await loginsRes.json();
        setCustomerLogins(loginsData);
      }

      const activityRes = await fetch("/api/activity-logs?limit=5");
      if (activityRes.ok) {
        const activityData = await activityRes.json();
        setActivityLogs(activityData.slice(0, 5));
      }

      const customersRes = await fetch("/api/customers");
      if (customersRes.ok) {
        const customersData = await customersRes.json();
        setCustomers(customersData);
      }
    } catch (e) {
      console.error("Dashboard data load error:", e);
    }
  };

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

  const walkins = invoices.filter(i => i.type === "Walk-In");
  const totalRevenueVal = 
    onlineOrders.reduce((acc, o) => acc + parseCurrency(o.total), 0) + 
    walkins.reduce((acc, w) => acc + parseCurrency(w.total), 0);

  const newOrdersCount = onlineOrders.filter(o => o.status === "New Order").length;

  return (
    <div>Dashboard Code Backup</div>
  );
}
