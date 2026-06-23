"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Filter, RefreshCw, Calendar, Clock, User, ClipboardList } from "lucide-react";

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("");

  // Action options for filter dropdown
  const actionOptions = [
    "Customer Registration",
    "Customer Login",
    "New Booking",
    "Booking Assigned",
    "Booking Completed",
    "Booking Cancelled",
    "Owner Login",
    "Owner Logout",
    "Settings Changes",
    "Worker Added",
    "Worker Edited",
    "Worker Deleted"
  ];

  useEffect(() => {
    fetchLogs();
  }, [search, actionFilter]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/activity-logs?search=${encodeURIComponent(search)}&action=${encodeURIComponent(actionFilter)}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      } else {
        console.error("Failed to load logs");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-6">
        {/* Header Title */}
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-[#0D1B2A]">
            Owner Activity Registry
          </h1>
          <p className="text-gray-500 text-xs mt-1">Real-time audit log of database operations, login security, and user actions.</p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-brand-blue/10 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search user, action, record..."
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex w-full md:w-auto items-center gap-3 justify-end">
            <div className="relative flex-grow md:flex-grow-0">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <select
                className="bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-6 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition appearance-none cursor-pointer font-sans font-semibold text-[#334155]"
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
              >
                <option value="">All Actions</option>
                {actionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchLogs}
              className="bg-slate-50 hover:bg-slate-100 p-2.5 rounded-xl border border-slate-200 text-slate-700 transition"
              title="Refresh logs"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-brand-blue/10 shadow-sm overflow-hidden">
          {loading && logs.length === 0 ? (
            <div className="p-16 text-center text-xs font-semibold text-gray-500 flex items-center justify-center gap-2">
              <RefreshCw className="animate-spin text-[#1251A3]" size={16} />
              Syncing activity registry...
            </div>
          ) : logs.length === 0 ? (
            <div className="p-16 text-center text-xs italic text-gray-400">
              No matching activity logs registered in the database.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[#1251A3] font-mono text-[10px] uppercase tracking-wider font-bold border-b border-slate-100">
                    <th className="p-4 pl-6">Action</th>
                    <th className="p-4">User</th>
                    <th className="p-4">Affected Record / Details</th>
                    <th className="p-4 pr-6">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {logs.map((log) => (
                    <tr key={log._id} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 pl-6">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          log.action.includes("Login") ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                          log.action.includes("New") ? "bg-sky-50 text-sky-700 border border-sky-100" :
                          log.action.includes("Delete") ? "bg-rose-50 text-rose-700 border border-rose-100" :
                          log.action.includes("Change") || log.action.includes("Settings") ? "bg-amber-50 text-amber-700 border border-amber-100" :
                          "bg-slate-50 text-slate-700 border border-slate-100"
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-[#0D1B2A]">
                        <div className="flex items-center gap-1.5">
                          <User size={12} className="text-gray-400" />
                          {log.user}
                        </div>
                      </td>
                      <td className="p-4 text-gray-500 italic max-w-xs truncate" title={log.affectedRecord}>
                        {log.affectedRecord || "-"}
                      </td>
                      <td className="p-4 pr-6 text-gray-500 font-mono">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {log.date}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {log.time}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
