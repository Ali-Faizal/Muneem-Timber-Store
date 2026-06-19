"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light font-sans px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-brand-blue/10 p-8">
        <div className="text-center mb-6">
          <h2 className="font-heading text-2xl font-bold text-brand-dark tracking-tight">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {!submitted ? "Apna registered email dalein, hum reset link bhejenge." : "Email bhej diya gaya hai!"}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" className="w-full">
              Reset Link Bhein
            </Button>
          </form>
        ) : (
          <div className="bg-emerald-50 text-emerald-800 text-sm p-4 rounded-xl border border-emerald-100 text-center mb-4">
            Agar yeh email register hoga to password reset instructions mil jayengi.
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
