"use client";
import { useState, useEffect } from "react";
import { Mail, Lock, User, LogOut } from "lucide-react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state
  useEffect(() => {
    const user = localStorage.getItem("muneem_user");
    if (user) {
      setIsLoggedIn(true);
      const parsed = JSON.parse(user);
      setName(parsed.name || parsed.email);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email aur password dono enter karein!");
      return;
    }

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin ? { email, password } : { email, password, name };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert("❌ Error: " + (data.error || "Authentication failed"));
        return;
      }

      localStorage.setItem("muneem_user", JSON.stringify(data.user));
      setIsLoggedIn(true);
      setName(data.user.name);

      alert(isLogin ? "✅ Login Successful! Redirecting..." : "✅ Account Created Successfully! Redirecting...");
      
      if (data.user.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      console.error("Auth submit error:", err);
      alert("❌ Technical error occurred: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("muneem_user");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setName("");
    alert("👋 Logged out successfully!");
  };

  if (isLoggedIn) {
    return (
      <div className="w-full text-center py-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-[#0D1B2A]">
          Namaste, {name}!
        </h3>
        <p className="text-xs text-[#64748B]">
          Aap successfully logged in hain. Apne dashboard par metrics track karein.
        </p>
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => window.location.href = "/dashboard"}
            className="w-full bg-[#1251A3] text-white py-3 rounded-lg hover:bg-[#0A3578] font-bold text-sm transition"
          >
            Dashboard par Chalein
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-slate-100 hover:bg-slate-200 text-[#0D1B2A] py-3 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Logout Karein
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-[26px] font-extrabold text-[#0D1B2A] font-[var(--font-syne)]">
          Muneem Timber
        </h2>
        <p className="text-[13px] text-[#64748B] mt-1.5 font-[var(--font-dm-sans)]">
          {isLogin ? "Apne account me Sign In karein" : "Naya account register karein"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
              Poora Naam (Full Name)
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="naam likhein"
                className="w-full bg-slate-50/50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full bg-slate-50/50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-50/50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1251A3] hover:bg-[#0A3578] text-white py-[13px] rounded-xl font-bold transition text-sm shadow-sm"
        >
          {isLogin ? "Sign In" : "Register Account"}
        </button>
      </form>

      <div className="text-center mt-6">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-xs font-bold text-[#1251A3] hover:underline"
        >
          {isLogin ? "Naya account banana hai? Register Karein" : "Pehle se account hai? Sign In"}
        </button>
      </div>
    </div>
  );
}
