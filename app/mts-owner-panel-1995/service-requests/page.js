"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Layers, 
  Calendar, 
  User, 
  MapPin, 
  Phone, 
  Check, 
  X, 
  Wrench, 
  ChevronRight, 
  Trash2,
  AlertCircle
} from "lucide-react";

export default function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Track assigning state
  const [assigningId, setAssigningId] = useState(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch bookings
      const reqRes = await fetch("/api/service-requests");
      const reqData = await reqRes.json();
      
      // Fetch workers (to allow assign mapping)
      const wRes = await fetch("/api/workers");
      const wData = await wRes.json();

      if (reqRes.ok && wRes.ok) {
        setRequests(reqData);
        setWorkers(wData);
      }
    } catch (e) {
      console.error("Failed to load requests:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update request status directly
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch("/api/service-requests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });

      if (res.ok) {
        alert("✅ Status updated successfully!");
        loadData();
      } else {
        alert("❌ Failed to update status.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Worker Assignment
  const handleAssignWorkerSubmit = async (reqId) => {
    try {
      const res = await fetch("/api/service-requests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: reqId,
          assignedWorkerId: selectedWorkerId,
          status: "Worker Assigned"
        })
      });

      if (res.ok) {
        alert("✅ Worker assigned successfully!");
        setAssigningId(null);
        setSelectedWorkerId("");
        loadData();
      } else {
        alert("❌ Assignment failed.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Request
  const handleDeleteRequest = async (id) => {
    if (!confirm("Are you sure you want to delete/cancel this booking request?")) return;

    try {
      const res = await fetch(`/api/service-requests?id=${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        alert("✅ Booking deleted successfully!");
        loadData();
      } else {
        alert("❌ Failed to delete booking.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-[#0D1B2A] tracking-tight">
            Service Booking Requests
          </h1>
          <p className="text-gray-500 text-xs mt-1">
            Review incoming marketplace requests, assign workers, and coordinate site jobs.
          </p>
        </div>

        {/* Content list */}
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center border animate-pulse">
            <p className="text-xs text-gray-500 font-semibold">Loading bookings registry...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Layers size={40} className="text-gray-300 mx-auto mb-2" />
            <h3 className="font-heading font-bold text-sm text-[#0D1B2A]">No bookings recorded</h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1">
              Grahak jab website ke service pages se request submit karenge, wo yahan show hogi.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map((req) => {
              // Filter available workers that match this request category
              const matchingWorkers = workers.filter(
                w => w.category === req.serviceType && w.availability
              );

              return (
                <div 
                  key={req._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 hover:border-[#1251A3] transition duration-300 relative"
                >
                  {/* Status Indicator */}
                  <div className="absolute top-6 right-6">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono border ${
                      req.status === "Pending" ? "bg-amber-50 text-amber-600 border-amber-200" :
                      req.status === "Worker Assigned" ? "bg-blue-50 text-blue-600 border-blue-200" :
                      req.status === "Completed" ? "bg-green-50 text-green-700 border-green-200" :
                      "bg-rose-50 text-rose-600 border-rose-200"
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  {/* Customer Information Header */}
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1251A3] bg-blue-50 px-2 py-0.5 rounded">
                      {req.serviceType} Booking
                    </span>
                    <h3 className="font-heading font-bold text-base text-[#0D1B2A] mt-2 flex items-center gap-1.5">
                      <User size={16} className="text-[#64748B]" />
                      {req.customerName}
                    </h3>
                  </div>

                  {/* Booking parameters details */}
                  <div className="text-xs space-y-1.5 text-gray-600 border-y py-3 border-slate-100">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" />
                      <span><strong>Mobile:</strong> {req.customerPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400" />
                      <span><strong>Address:</strong> {req.customerAddress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      <span><strong>Required Date:</strong> {req.bookingDate}</span>
                    </div>
                    {req.notes && (
                      <div className="flex items-start gap-2 bg-slate-50 p-2 rounded-xl border mt-2">
                        <AlertCircle size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                        <span className="text-[11px]"><strong>Notes:</strong> {req.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Assigned Worker Profile Detail */}
                  <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">Assigned Partner</p>
                      {req.assignedWorker ? (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 font-heading">
                            {req.assignedWorker.name[0]}
                          </div>
                          <span className="text-xs font-bold text-[#0D1B2A]">{req.assignedWorker.name}</span>
                          <span className="text-[10px] text-gray-500">({req.assignedWorker.experience})</span>
                        </div>
                      ) : (
                        <p className="text-xs text-rose-500 font-bold mt-0.5">Not Assigned Yet</p>
                      )}
                    </div>

                    {!req.assignedWorker && req.status !== "Cancelled" && (
                      <button 
                        onClick={() => {
                          setAssigningId(req._id);
                          setSelectedWorkerId("");
                        }}
                        className="bg-[#1251A3] hover:bg-[#0A3578] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition"
                      >
                        Assign Worker
                      </button>
                    )}
                  </div>

                  {/* Assign Worker Inline Form Drawer */}
                  {assigningId === req._id && (
                    <div className="p-3 bg-blue-50/50 border border-[#1251A3]/20 rounded-xl space-y-3 animate-fade-in">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[11px] font-bold text-[#1251A3] uppercase tracking-wide">Assign Available Provider</h4>
                        <button onClick={() => setAssigningId(null)} className="text-gray-400 hover:text-gray-600">
                          <X size={14} />
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <select 
                          value={selectedWorkerId}
                          onChange={(e) => setSelectedWorkerId(e.target.value)}
                          className="flex-grow border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:border-[#1251A3]"
                        >
                          <option value="">Choose Worker...</option>
                          {matchingWorkers.map(w => (
                            <option key={w._id} value={w._id}>
                              {w.name} ({w.experience} | ₹{w.dailyRate}/day)
                            </option>
                          ))}
                        </select>
                        
                        <button 
                          onClick={() => handleAssignWorkerSubmit(req._id)}
                          disabled={!selectedWorkerId}
                          className="bg-[#1251A3] hover:bg-[#0A3578] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition disabled:opacity-50"
                        >
                          Assign
                        </button>
                      </div>
                      {matchingWorkers.length === 0 && (
                        <p className="text-[9px] text-amber-600 leading-none">
                          No active {req.serviceType} workers are currently available in the database registry.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Action row */}
                  <div className="flex gap-2 pt-2 justify-between items-center">
                    <div className="flex gap-2">
                      {req.status === "Pending" && (
                        <button 
                          onClick={() => handleUpdateStatus(req._id, "Cancelled")}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-[10px] font-bold transition border"
                        >
                          Cancel Booking
                        </button>
                      )}
                      
                      {req.status === "Worker Assigned" && (
                        <button 
                          onClick={() => handleUpdateStatus(req._id, "Completed")}
                          className="bg-[#0F9D58] hover:bg-[#0C8449] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center gap-1 shadow-sm"
                        >
                          <Check size={10} />
                          Mark Completed
                        </button>
                      )}
                    </div>

                    <button 
                      onClick={() => handleDeleteRequest(req._id)}
                      className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition border border-slate-100"
                      title="Delete log"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
