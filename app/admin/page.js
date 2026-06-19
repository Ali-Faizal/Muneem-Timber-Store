"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 font-sans px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <span className="bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Control Panel
          </span>
          <h2 className="font-heading text-3xl font-bold text-brand-dark mt-3 tracking-tight">
            Muneem Admin Portal
          </h2>
          <p className="text-sm text-gray-500 mt-1">Authorized Access Only</p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-5">
          <Input
            label="Admin Email"
            type="email"
            placeholder="admin@muneemtimber.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Secure Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" className="w-full py-3 bg-brand-dark hover:bg-black">
            Secure Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
