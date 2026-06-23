"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { auth } from "../components/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setError("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("❌ Reset failed. Please check the email address and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-brand-blue/10 p-8">
        <div className="text-center mb-6">
          <h2 className="font-heading text-2xl font-bold text-brand-dark tracking-tight">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {!submitted ? "Apna registered email dalein, hum reset link bhejenge." : "Email bhej diya gaya hai!"}
          </p>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl border border-rose-100 mb-4 text-center">
            {error}
          </div>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Button type="submit" variant="primary" disabled={loading} className="w-full">
              {loading ? "Sending reset link..." : "Reset Link Bhein"}
            </Button>
          </form>
        ) : (
          <div className="bg-emerald-50 text-emerald-800 text-sm p-4 rounded-xl border border-emerald-100 text-center mb-4">
            Agar yeh email register hoga to password reset instructions email par mil jayengi.
          </div>
        )}

        <div className="text-center mt-6">
          <Link href="/login" className="text-sm text-brand-blue font-medium hover:underline">
            Wapas Login Par Chalein
          </Link>
        </div>
      </div>
    </div>
  );
}
