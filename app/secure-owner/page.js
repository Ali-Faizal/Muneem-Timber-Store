"use client";
import React, { useState, useEffect } from "react";
import { ShieldCheck, User, Lock, Loader2, RefreshCw, KeyRound, Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function SecureOwnerLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Cooldown Lock state
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  // OTP Verification states
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    // Check lockouts
    const lockedUntil = localStorage.getItem("owner_locked_until");
    if (lockedUntil) {
      const remaining = new Date(lockedUntil).getTime() - Date.now();
      if (remaining > 0) {
        setIsLocked(true);
        setLockoutTime(Math.ceil(remaining / 1000));
      } else {
        localStorage.removeItem("owner_locked_until");
      }
    }

    // Parse query params for errors or verification
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");
    const emailParam = params.get("email");
    const userParam = params.get("username");

    if (errorParam === "unauthorized") {
      setError("Unauthorized Owner Account");
    } else if (errorParam === "unverified") {
      setRequiresVerification(true);
      if (emailParam) setOtpEmail(emailParam);
      if (userParam) setUsername(userParam);
      setVerificationError("Email verification pending! Code has been sent to your email.");
    }
  }, []);

  useEffect(() => {
    if (lockoutTime <= 0) {
      if (isLocked) {
        setIsLocked(false);
        setError("");
      }
      return;
    }

    const timer = setInterval(() => {
      setLockoutTime((prev) => {
        if (prev <= 1) {
          setIsLocked(false);
          setError("");
          localStorage.removeItem("owner_locked_until");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutTime, isLocked]);

  useEffect(() => {
    if (otpTimer <= 0) return;
    const timer = setInterval(() => {
      setOtpTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [otpTimer]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLocked) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/owner/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.status === 423) {
        // Locked
        const cooldownMs = data.remainingMs || 300000;
        const lockedTime = new Date(Date.now() + cooldownMs);
        localStorage.setItem("owner_locked_until", lockedTime.toISOString());
        setIsLocked(true);
        setLockoutTime(Math.ceil(cooldownMs / 1000));
        setError(data.error);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      if (data.requiresVerification) {
        setRequiresVerification(true);
        setOtpEmail(data.email || "");
        setVerificationError("Email verification pending! Enter the code sent to your email.");
        setLoading(false);
      } else {
        // Successful owner login
        window.location.href = data.redirect || "/mts-owner-panel-1995/dashboard";
      }
    } catch (err) {
      console.error(err);
      setError("Technical error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setVerificationError("");

    try {
      const res = await fetch("/api/auth/owner/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, otp })
      });

      const data = await res.json();
      if (!res.ok) {
        setVerificationError(data.error || "Verification failed!");
      } else {
        window.location.href = data.redirect || "/mts-owner-panel-1995/dashboard";
      }
    } catch (err) {
      setVerificationError("Technical error occurred.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (otpTimer > 0) return;
    setOtpTimer(60);
    setVerificationError("");

    try {
      const res = await fetch("/api/auth/owner/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });
      if (!res.ok) {
        const data = await res.json();
        setVerificationError(data.error || "Failed to resend code!");
      } else {
        setVerificationError("✉️ Verification code has been resent to your email.");
      }
    } catch (err) {
      setVerificationError("Failed to resend code.");
    }
  };

  const formatCooldown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans px-4 relative overflow-hidden">
      {/* Decorative premium glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#1251A3]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#FF6B2B]/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full bg-white rounded-3xl shadow-[0_10px_40px_rgba(18,81,163,0.06)] border border-[#1251A3]/10 p-8 md:p-10 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#E3F0FF] text-[#1251A3] flex items-center justify-center mx-auto mb-4 border border-[#1251A3]/10">
            <ShieldCheck size={26} />
          </div>
          <span className="bg-[#E3F0FF] text-[#1251A3] text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#1251A3]/15">
            Owner Control Portal
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-[#0D1B2A] mt-3.5 tracking-tight">
            Muneem Timber Store
          </h2>
          <p className="text-xs text-gray-400 mt-1.5 font-semibold">radha nagar, hardoi • established 1995</p>
        </div>

        {/* Global Error Notice */}
        {error && (
          <div className={`p-4 rounded-2xl text-xs font-bold mb-6 text-center border ${
            isLocked 
              ? "bg-rose-50 text-rose-600 border-rose-100 animate-pulse" 
              : "bg-rose-50 text-rose-600 border-rose-100"
          }`}>
            {error}
          </div>
        )}

        {/* OPT Verification Block */}
        {requiresVerification ? (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-xs font-semibold text-amber-700 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Mail size={14} />
                <span>Verification OTP Sent</span>
              </div>
              <p className="text-[11px] opacity-90 leading-relaxed font-normal">
                Recovery email target: <strong className="text-slate-800">{otpEmail}</strong>
              </p>
              {verificationError && <p className="text-[#1251A3] font-bold text-[11px] pt-1">{verificationError}</p>}
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-[11px] font-bold text-[#334155] mb-2 uppercase tracking-wider font-mono">
                  6-Digit Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    disabled={verifying}
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-11 pr-4 py-3.5 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="w-full bg-[#1251A3] hover:bg-[#0A3578] text-white py-3.5 rounded-xl font-bold transition text-xs shadow-sm flex items-center justify-center gap-1.5"
              >
                {verifying ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Checking Code...
                  </>
                ) : "Verify & Authenticate"}
              </button>
            </form>

            <div className="flex items-center justify-between text-xs pt-2">
              <button
                onClick={() => setRequiresVerification(false)}
                className="text-gray-500 hover:text-[#1251A3] font-bold flex items-center gap-1 transition"
              >
                <ArrowLeft size={14} />
                Back to Login
              </button>
              
              <button
                onClick={handleResendOtp}
                disabled={otpTimer > 0}
                className={`font-bold transition ${
                  otpTimer > 0 ? "text-gray-300 cursor-not-allowed" : "text-[#1251A3] hover:underline"
                }`}
              >
                {otpTimer > 0 ? `Resend Code (${otpTimer}s)` : "Resend OTP Code"}
              </button>
            </div>
          </div>
        ) : (
          /* Login Form Block */
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-[#334155] mb-2 uppercase tracking-wider font-mono">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Enter owner username"
                  disabled={loading || isLocked}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-11 pr-4 py-3.5 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#334155] mb-2 uppercase tracking-wider font-mono">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="password"
                  placeholder="••••••••"
                  disabled={loading || isLocked}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-11 pr-4 py-3.5 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {isLocked ? (
              <div className="w-full bg-slate-100 border border-slate-200 py-3 rounded-xl text-center text-xs font-bold text-slate-500 flex items-center justify-center gap-2">
                <RefreshCw size={14} className="animate-spin text-[#1251A3]" />
                Locked: Cooldown Timer {formatCooldown(lockoutTime)}
              </div>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1251A3] hover:bg-[#0A3578] text-white py-3.5 rounded-xl font-bold transition text-xs shadow-sm flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Verifying Security...
                  </>
                ) : "Authenticate Access"}
              </button>
            )}
          </form>
        )}

        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-[10px] text-gray-400 font-medium">
          Authorized personnel only. Legacy Mr. Anees Mansoori trust since 1995.
        </div>
      </motion.div>
    </div>
  );
}
