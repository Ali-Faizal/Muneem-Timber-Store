"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ShieldAlert, User, Lock, Mail, FileText, LogOut, CheckCircle } from "lucide-react";

export default function OwnerSettingsPage() {
  const [profile, setProfile] = useState({
    username: "",
    recoveryDetails: "",
    recoveryEmail: ""
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/auth/owner/settings");
      if (res.ok) {
        const data = await res.json();
        setProfile({
          username: data.username || "",
          recoveryDetails: data.recoveryDetails || "",
          recoveryEmail: data.recoveryEmail || ""
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword && newPassword !== confirmPassword) {
      setError("Confirm password matches properly nahi ho raha!");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        username: profile.username,
        recoveryDetails: profile.recoveryDetails,
        recoveryEmail: profile.recoveryEmail
      };
      if (newPassword) {
        payload.password = newPassword;
      }

      const res = await fetch("/api/auth/owner/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Update operation failed.");
      } else {
        setMessage("✅ Owner settings persisted successfully!");
        setNewPassword("");
        setConfirmPassword("");
        fetchProfile();
      }
    } catch (err) {
      setError("Technical error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (confirm("Logout check request confirm karein?")) {
      try {
        const res = await fetch("/api/auth/owner/settings", {
          method: "DELETE"
        });
        if (res.ok) {
          window.location.href = "/secure-owner";
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-[#0D1B2A]">
            Owner Control Settings
          </h1>
          <p className="text-gray-500 text-xs mt-1">Configure secure access credentials, administrative notifications, and recovery email mappings.</p>
        </div>

        {message && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-100 flex items-center gap-2">
            <CheckCircle size={16} />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* Settings Form */}
          <div className="md:col-span-2 bg-white rounded-3xl border border-brand-blue/10 shadow-sm p-6 md:p-8 space-y-6">
            <h3 className="font-heading text-sm font-extrabold text-[#0D1B2A] border-b pb-2 flex items-center gap-1.5">
              <ShieldAlert className="text-[#1251A3]" size={16} />
              Credentials Management
            </h3>

            <form onSubmit={handleUpdateSettings} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider font-mono">Owner Username</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider font-mono">New Password (Optional)</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider font-mono">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider font-mono">Recovery Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    type="email"
                    required
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                    value={profile.recoveryEmail}
                    onChange={(e) => setProfile({ ...profile, recoveryEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-[#334155] uppercase tracking-wider font-mono">Recovery Details / Notes</label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3 text-gray-400" size={14} />
                  <textarea
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#1251A3] focus:bg-white transition resize-none"
                    value={profile.recoveryDetails}
                    onChange={(e) => setProfile({ ...profile, recoveryDetails: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto px-6 py-2.5">
                  {loading ? "Saving parameters..." : "Save Settings Changes"}
                </Button>
              </div>
            </form>
          </div>

          {/* Quick actions Panel */}
          <div className="bg-white rounded-3xl border border-brand-blue/10 shadow-sm p-6 space-y-4">
            <h3 className="font-heading text-sm font-extrabold text-[#0D1B2A] border-b pb-2 flex items-center gap-1.5">
              Control Center Actions
            </h3>
            
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Muneem Timber Store security operations panel parameters change access logs and logouts.
            </p>

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 transition flex items-center justify-center gap-2 border border-rose-100 active:scale-95"
            >
              <LogOut size={14} />
              Owner Portal Logout
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
