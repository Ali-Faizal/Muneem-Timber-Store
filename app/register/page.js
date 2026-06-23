"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SocialLogins from "@/components/auth/SocialLogins";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !name || !password) {
      alert("Saare fields enter karein!");
      return;
    }
    const userData = { email, name };
    localStorage.setItem("muneem_user", JSON.stringify(userData));
    alert("✅ Account Created Successfully! Redirecting...");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light font-sans px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-brand-blue/10 p-8">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl font-bold text-brand-dark tracking-tight">
            Register Account
          </h2>
          <p className="text-sm text-gray-500 mt-2">Muneem Timber platform se judiye</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <Input
            label="Poora Naam (Full Name)"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" className="w-full py-3 text-base">
            Create Account
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or sign up with</span></div>
        </div>

        <SocialLogins />

        <p className="text-center text-sm text-gray-600 mt-8">
          Pehle se account hai?{" "}
          <Link href="/login" className="text-brand-blue font-semibold hover:underline">
            Sign In Karein
          </Link>
        </p>
      </div>
    </div>
  );
}
