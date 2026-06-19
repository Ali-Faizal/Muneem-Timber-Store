"use client";
import React, { useState, useEffect } from "react";
import { ShoppingBag, Clock, ShieldCheck, User, LogOut, FileText, ChevronRight, Settings } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("my-rentals");
  
  // Profile Form Fields
  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("+91 9580716752");
  const [profileAddress, setProfileAddress] = useState("Cinema Road, Near Rumi Gate, Hardoi, UP");

  useEffect(() => {
    // Check auth
    const session = localStorage.getItem("muneem_user");
    if (!session) {
      alert("Pehle Sign In karein!");
      window.location.href = "/login";
      return;
    }
    const parsedUser = JSON.parse(session);
    setUser(parsedUser);
    setProfileName(parsedUser.name || parsedUser.email.split("@")[0]);

    // Load orders from API
    fetch(`/api/orders?email=${parsedUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Failed to load orders:", data);
        }
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("muneem_user");
    window.location.href = "/login";
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (user) {
      const updatedUser = { ...user, name: profileName };
      localStorage.setItem("muneem_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("✅ Profile updated successfully!");
    }
  };

  if (!user) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm font-semibold">Redirecting to Sign In...</div>;
  }

  // Filter rentals supporting both old mock and new MongoDB status values
  const activeRentals = orders.filter(o => 
    o.status === "Active" || 
    o.status === "Active Rental" || 
    o.status === "Confirmed" || 
    o.status === "Out For Delivery"
  );
  const completedRentals = orders.filter(o => o.status === "Completed");
  const pendingRentals = orders.filter(o => 
    o.status === "Pending" || 
    o.status === "New Order" || 
    o.status === "Pending Dispatch"
  );

  return (
    <DashboardLayout isAdmin={false}>
      <div className="space-y-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-brand-dark">
              Welcome, {profileName}!
            </h1>
            <p className="text-gray-500 text-sm mt-1">Apne current store metrics aur rentals track karein.</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 transition flex items-center gap-1.5 self-start md:self-center border border-rose-100"
          >
            <LogOut size={14} />
            Logout Account
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Orders" value={orders.length} icon={ShoppingBag} trend={`+1 added`} />
          <StatsCard title="Active Rentals" value={activeRentals.length} icon={Clock} type="warning" />
          <StatsCard title="Completed Rentals" value={completedRentals.length} icon={ShieldCheck} type="success" />
          <StatsCard title="Pending Requests" value={pendingRentals.length} icon={Clock} type="info" />
        </div>

        {/* Dashboard Tabs & Subviews */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Tabs */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-brand-blue/10 p-4 shadow-sm h-fit space-y-1">
            <button
              onClick={() => setActiveTab("my-rentals")}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-between transition ${
                activeTab === "my-rentals"
                  ? "bg-[#1251A3] text-white"
                  : "text-[#334155] hover:bg-slate-50"
              }`}
            >
              <span>My Rentals ({activeRentals.length})</span>
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => setActiveTab("pending-rentals")}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-between transition ${
                activeTab === "pending-rentals"
                  ? "bg-[#1251A3] text-white"
                  : "text-[#334155] hover:bg-slate-50"
              }`}
            >
              <span>Pending Requests ({pendingRentals.length})</span>
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => setActiveTab("completed-rentals")}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-between transition ${
                activeTab === "completed-rentals"
                  ? "bg-[#1251A3] text-white"
                  : "text-[#334155] hover:bg-slate-50"
              }`}
            >
              <span>Completed Rentals ({completedRentals.length})</span>
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-between transition ${
                activeTab === "profile"
                  ? "bg-[#1251A3] text-white"
                  : "text-[#334155] hover:bg-slate-50"
              }`}
            >
              <span>My Profile & Settings</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Subview Contents */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === "my-rentals" && (
              <div className="bg-white p-6 rounded-2xl border border-brand-blue/10 shadow-sm space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-brand-dark">Active Rentals Log</h3>
                  <p className="text-xs text-gray-500 mt-1">Ghar pe operational material check status.</p>
                </div>

                {activeRentals.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">Koi active rental items nahi hain.</p>
                ) : (
                  <div className="space-y-4">
                    {activeRentals.map(order => (
                      <div key={order._id || order.id} className="border border-slate-100 rounded-xl p-4 flex flex-col md:flex-row justify-between gap-4 bg-slate-50/50">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-[#1251A3] font-bold">ORDER ID: #{order.invoiceNumber || order.id || order._id}</span>
                          <h4 className="font-bold text-sm text-[#0D1B2A]">{order.itemsCount || (order.items ? order.items.length : 0)} Rental Items</h4>
                          <p className="text-xs text-gray-500">Order date: {order.bookingDate || order.date || (order.createdAt && new Date(order.createdAt).toISOString().split("T")[0])} · Duration: {order.duration}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 justify-center">
                          <span className="font-mono text-sm font-bold text-[#1251A3]">{order.total}</span>
                          <span className="font-mono text-[9px] uppercase tracking-wide bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-100 font-bold">
                            Active
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "pending-rentals" && (
              <div className="bg-white p-6 rounded-2xl border border-brand-blue/10 shadow-sm space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-brand-dark">Pending Rental Requests</h3>
                  <p className="text-xs text-gray-500 mt-1">Verification and dispatch load confirmation log.</p>
                </div>

                {pendingRentals.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">Koi pending requests nahi hain.</p>
                ) : (
                  <div className="space-y-4">
                    {pendingRentals.map(order => (
                      <div key={order._id || order.id} className="border border-slate-100 rounded-xl p-4 flex justify-between items-center bg-slate-50/50">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-[#1251A3] font-bold">ORDER ID: #{order.invoiceNumber || order.id || order._id}</span>
                          <h4 className="font-bold text-sm text-[#0D1B2A]">{order.itemsCount || (order.items ? order.items.length : 0)} Rental Items</h4>
                          <p className="text-xs text-gray-500">Order date: {order.bookingDate || order.date || (order.createdAt && new Date(order.createdAt).toISOString().split("T")[0])}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-mono text-sm font-bold text-[#1251A3]">{order.total}</span>
                          <span className="font-mono text-[9px] uppercase tracking-wide bg-sky-50 text-sky-700 px-2 py-0.5 rounded border border-sky-100 font-bold">
                            Pending Dispatch
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "completed-rentals" && (
              <div className="bg-white p-6 rounded-2xl border border-brand-blue/10 shadow-sm space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-brand-dark">Completed Rentals History</h3>
                  <p className="text-xs text-gray-500 mt-1">Successfully returned materials register index.</p>
                </div>

                {completedRentals.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">Koi completed history nahi hai.</p>
                ) : (
                  <div className="space-y-4">
                    {completedRentals.map(order => (
                      <div key={order._id || order.id} className="border border-slate-100 rounded-xl p-4 flex justify-between items-center bg-slate-50/50">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-[#1251A3] font-bold">ORDER ID: #{order.invoiceNumber || order.id || order._id}</span>
                          <h4 className="font-bold text-sm text-[#0D1B2A]">{order.itemsCount || (order.items ? order.items.length : 0)} Rental Items</h4>
                          <p className="text-xs text-gray-500">Returned on: {order.bookingDate || order.date || (order.createdAt && new Date(order.createdAt).toISOString().split("T")[0])}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-mono text-sm font-bold text-[#1251A3]">{order.total}</span>
                          <span className="font-mono text-[9px] uppercase tracking-wide bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100 font-bold">
                            Completed & Returned
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white p-6 rounded-2xl border border-brand-blue/10 shadow-sm space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-brand-dark">Mera Profile Details</h3>
                  <p className="text-xs text-gray-500 mt-1">Personal identity parameters adjustment console.</p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                      Email Address (Permanent)
                    </label>
                    <input
                      type="email"
                      className="w-full bg-slate-100 border border-slate-200 text-sm rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed"
                      value={user.email}
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                      Default Shipping Address
                    </label>
                    <textarea
                      className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#1251A3] focus:bg-white transition h-20 resize-none"
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#1251A3] hover:bg-[#0A3578] text-white px-6 py-3 rounded-xl font-bold text-xs transition shadow-sm"
                  >
                    Profile Save Karein
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
