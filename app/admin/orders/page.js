"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Eye, Check, Truck, CheckCircle, Trash2, X, AlertCircle, Edit2 } from "lucide-react";

export default function ManageOrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Selected Order for Details Modal
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Edit Order State
  const [editOrder, setEditOrder] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCustomer, setEditCustomer] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editProjectLocation, setEditProjectLocation] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [editTotal, setEditTotal] = useState("");

  const handleOpenEdit = (ord) => {
    setEditOrder(ord);
    setEditCustomer(ord.customer);
    setEditPhone(ord.phone || "");
    setEditAddress(ord.address || "");
    setEditProjectLocation(ord.projectLocation || "");
    setEditStartDate(ord.startDate || "");
    setEditEndDate(ord.endDate || "");
    setEditTotal(ord.total || "");
    setIsEditMode(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editOrder._id,
          customer: editCustomer,
          phone: editPhone,
          address: editAddress,
          projectLocation: editProjectLocation,
          startDate: editStartDate,
          endDate: editEndDate,
          total: editTotal
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Order details updated successfully!");
        setIsEditMode(false);
        setEditOrder(null);
        loadOrders();
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error("Save edit error:", err);
      alert("❌ Technical error: " + err.message);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (res.ok) {
        setOrders(data);
      } else {
        console.error("Failed to load orders", data.error);
      }
    } catch (e) {
      console.error("Orders load error:", e);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus })
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ Status updated to: ${newStatus}`);
        loadOrders();
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("❌ Error: " + err.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (confirm(`⚠️ WARNING: Order ID #${orderId} ko delete karna chahte hain?`)) {
      try {
        const res = await fetch(`/api/orders?id=${orderId}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (res.ok) {
          alert("✅ Order successfully deleted!");
          setSelectedOrder(null);
          loadOrders();
        } else {
          alert("❌ Error: " + data.error);
        }
      } catch (err) {
        console.error("Delete order error:", err);
        alert("❌ Error: " + err.message);
      }
    }
  };

  const filteredOrders = orders.filter(ord => {
    const matchesSearch = 
      ord.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ord.invoiceNumber && ord.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ord.phone && ord.phone.includes(searchTerm));
    
    if (statusFilter === "All") return matchesSearch;
    return matchesSearch && ord.status === statusFilter;
  });

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#0D1B2A]">Rental Order Management</h1>
          <p className="text-gray-500 text-sm mt-1">Confirm, dispatch, and track active construction rental orders.</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-5 rounded-3xl border border-brand-blue/10 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center font-sans">
          <div className="w-full md:w-1/2 flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by Invoice No, Customer, or Phone..."
              className="w-full text-xs bg-transparent border-0 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 font-heading">
            {["All", "New Order", "Confirmed", "Out For Delivery", "Active Rental", "Completed", "Cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  statusFilter === status
                    ? "bg-[#1251A3] text-white"
                    : "bg-slate-50 text-[#334155] hover:bg-slate-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table list */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-brand-blue/10 max-w-xl mx-auto space-y-4 shadow-sm">
            <AlertCircle size={44} className="text-gray-300 mx-auto" />
            <h3 className="font-heading text-base font-bold text-[#0D1B2A]">Koi Orders Nahi Mile</h3>
            <p className="text-xs text-gray-500 font-sans">Filter parameters adjust karein ya customer bookings verify karein.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-brand-blue/10 shadow-sm overflow-hidden font-sans">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[900px]">
                <thead className="bg-slate-50 text-[#1251A3] font-mono uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Invoice No</th>
                    <th className="p-4 font-heading">Customer</th>
                    <th className="p-4">Mobile</th>
                    <th className="p-4">Address / Site</th>
                    <th className="p-4">Rental Items</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4 font-heading">Status</th>
                    <th className="p-4 text-center font-heading">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredOrders.map((ord) => (
                    <tr key={ord._id} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 font-mono font-bold text-[#1251A3]">{ord.invoiceNumber || `MTS-LEG-${ord.id}`}</td>
                      <td className="p-4 font-semibold text-slate-900">{ord.customer}</td>
                      <td className="p-4 font-mono">{ord.phone || "N/A"}</td>
                      <td className="p-4 max-w-[150px] truncate" title={ord.address}>
                        {ord.projectLocation || ord.address || "Hardoi"}
                      </td>
                      <td className="p-4 truncate max-w-[150px]">
                        {ord.items ? ord.items.map(i => `${i.name} (${i.quantity})`).join(", ") : `${ord.itemsCount} items`}
                      </td>
                      <td className="p-4 font-mono font-bold text-slate-900">{ord.total}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase ${
                          ord.status === "New Order" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                          ord.status === "Confirmed" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                          ord.status === "Out For Delivery" ? "bg-purple-50 text-purple-700 border border-purple-100" :
                          ord.status === "Active Rental" ? "bg-sky-50 text-sky-700 border border-sky-100" :
                          ord.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                          "bg-rose-50 text-rose-700 border border-rose-100"
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-1.5 font-heading">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="bg-sky-50 text-[#1251A3] hover:bg-sky-100 p-2 rounded-xl transition"
                            title="View Details"
                          >
                            <Eye size={13} />
                          </button>

                          <button
                            onClick={() => handleOpenEdit(ord)}
                            className="bg-amber-50 text-amber-700 hover:bg-[#FFE082]/30 p-2 rounded-xl transition"
                            title="Edit Order"
                          >
                            <Edit2 size={13} />
                          </button>
                          
                          {ord.status === "New Order" && (
                            <button
                              onClick={() => handleStatusChange(ord._id, "Confirmed")}
                              className="bg-amber-50 text-amber-700 hover:bg-amber-100 p-2 rounded-xl transition"
                              title="Confirm Order"
                            >
                              <Check size={13} />
                            </button>
                          )}

                          {ord.status === "Confirmed" && (
                            <button
                              onClick={() => handleStatusChange(ord._id, "Out For Delivery")}
                              className="bg-purple-50 text-purple-700 hover:bg-purple-100 p-2 rounded-xl transition"
                              title="Dispatch"
                            >
                              <Truck size={13} />
                            </button>
                          )}

                          {(ord.status === "Out For Delivery" || ord.status === "Confirmed") && (
                            <button
                              onClick={() => handleStatusChange(ord._id, "Active Rental")}
                              className="bg-sky-50 text-sky-700 hover:bg-sky-100 p-2 rounded-xl transition"
                              title="Mark Rented Active"
                            >
                              <Truck size={13} />
                            </button>
                          )}

                          {ord.status === "Active Rental" && (
                            <button
                              onClick={() => handleStatusChange(ord._id, "Completed")}
                              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 p-2 rounded-xl transition"
                              title="Complete & Return"
                            >
                              <CheckCircle size={13} />
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteOrder(ord._id)}
                            className="bg-rose-50 text-rose-600 hover:bg-rose-100 p-2 rounded-xl transition"
                            title="Delete Order"
                          >
                            <Trash2 size={13} />
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

      {/* DETAIL MODAL OVERLAY */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 border shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:bg-slate-100 p-1.5 rounded-lg transition"
            >
              <X size={18} />
            </button>

            <div>
              <span className="text-[9px] font-mono font-bold text-[#1251A3] bg-blue-50 px-2.5 py-0.5 rounded border border-brand-blue/10">
                Order detail panel
              </span>
              <h2 className="font-heading text-lg font-bold text-[#0D1B2A] mt-2 font-mono">
                {selectedOrder.invoiceNumber || `MTS-LEG-${selectedOrder.id}`}
              </h2>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border">
                <div>
                  <h4 className="text-[10px] text-gray-400 uppercase font-bold mb-1 font-heading">Customer Info</h4>
                  <p className="font-bold text-slate-800">{selectedOrder.customer}</p>
                  <p className="font-mono mt-0.5">{selectedOrder.phone || "N/A"}</p>
                  <p className="mt-0.5">{selectedOrder.email || "N/A"}</p>
                  <p className="text-gray-500 mt-1 max-w-[200px] truncate" title={selectedOrder.address}>{selectedOrder.address || "Hardoi"}</p>
                </div>
                <div>
                  <h4 className="text-[10px] text-gray-400 uppercase font-bold mb-1 font-heading">Site & Dates</h4>
                  <p><span className="font-bold text-slate-600">Site:</span> {selectedOrder.projectLocation || "Hardoi"}</p>
                  <p className="mt-0.5 font-mono"><span className="font-bold text-slate-600">Duration:</span> {selectedOrder.duration || "N/A"}</p>
                  <p className="mt-0.5 font-mono text-[10px]">{selectedOrder.startDate} to {selectedOrder.endDate}</p>
                  <p className="mt-1 font-mono text-[9px] text-gray-400">Booked: {selectedOrder.bookingDate || "N/A"}</p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 font-heading">
                <h4 className="font-bold text-[#0D1B2A] border-b pb-1">Ordered Materials</h4>
                <div className="max-h-36 overflow-y-auto space-y-2 pr-1 font-mono text-slate-700">
                  {selectedOrder.items && selectedOrder.items.map((item) => (
                    <div key={item.slug} className="flex justify-between items-center bg-slate-50/50 p-2 rounded-xl text-[11px]">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="font-semibold text-[#1251A3]">
                        ₹{item.dailyRate.toFixed(2)}/day
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-3 font-semibold text-slate-800">
                <span>Payment Method:</span>
                <span className="font-mono uppercase bg-slate-100 px-2 py-0.5 rounded text-[10px]">{selectedOrder.method || "UPI"}</span>
              </div>

              <div className="flex justify-between items-center bg-[#0A3578] text-white p-3 rounded-xl font-heading">
                <div>
                  <span className="text-[9px] uppercase tracking-wider block opacity-75">Rental Total</span>
                  <span className="text-[9px] opacity-60">Calculated aggregates</span>
                </div>
                <span className="font-heading text-base font-extrabold">{selectedOrder.total}</span>
              </div>
            </div>

            {/* Status updates action bar */}
            <div className="border-t pt-4 space-y-2 font-heading">
              <h4 className="font-bold text-xs text-[#0D1B2A] mb-2 font-heading">Workflow Status Update:</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleStatusChange(selectedOrder._id, "Confirmed")}
                  className="bg-amber-50 hover:bg-amber-100 text-amber-800 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  Confirm Order
                </button>
                <button
                  onClick={() => handleStatusChange(selectedOrder._id, "Out For Delivery")}
                  className="bg-purple-50 hover:bg-purple-100 text-purple-800 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  Out For Delivery
                </button>
                <button
                  onClick={() => handleStatusChange(selectedOrder._id, "Active Rental")}
                  className="bg-sky-50 hover:bg-sky-100 text-sky-800 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  Active Rental
                </button>
                <button
                  onClick={() => handleStatusChange(selectedOrder._id, "Completed")}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  Completed
                </button>
              </div>

              <button
                onClick={() => {
                  handleDeleteOrder(selectedOrder._id);
                }}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 mt-2"
              >
                <Trash2 size={14} /> Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT ORDER MODAL OVERLAY */}
      {isEditMode && editOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:hidden font-sans">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full space-y-5 border shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in scale-in duration-200">
            <button
              onClick={() => {
                setIsEditMode(false);
                setEditOrder(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:bg-slate-100 p-1.5 rounded-lg transition"
            >
              <X size={18} />
            </button>

            <div>
              <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                Edit Order Mode
              </span>
              <h2 className="font-heading text-lg font-bold text-[#0D1B2A] mt-2 font-mono">
                {editOrder.invoiceNumber || `MTS-LEG-${editOrder.id}`}
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
                  value={editCustomer}
                  onChange={(e) => setEditCustomer(e.target.value)}
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
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 h-14 resize-none focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
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
                  value={editProjectLocation}
                  onChange={(e) => setEditProjectLocation(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1 font-heading">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-2 py-2 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-mono"
                    value={editStartDate}
                    onChange={(e) => setEditStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1 font-heading">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-2 py-2 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-mono"
                    value={editEndDate}
                    onChange={(e) => setEditEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider mb-1 font-heading">
                  Total Amount String
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition font-mono"
                  value={editTotal}
                  onChange={(e) => setEditTotal(e.target.value)}
                  required
                />
              </div>

              <div className="pt-2 flex gap-3 font-heading">
                <button
                  type="submit"
                  className="flex-1 bg-[#1251A3] hover:bg-[#0A3578] text-white py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditMode(false);
                    setEditOrder(null);
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
