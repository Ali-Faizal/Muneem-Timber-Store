"use client";
import { useState, useEffect } from "react";
import { Mail, Lock, User, LogOut, Phone, AlertCircle, CheckCircle2 } from "lucide-react";
import { auth } from "./lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  updateProfile,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Listen to Firebase Auth state for persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        if (firebaseUser.emailVerified) {
          setIsLoggedIn(true);
          setCurrentUser(firebaseUser);
          
          // Sync state to localStorage for legacy compatibility
          const userData = {
            name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Customer",
            email: firebaseUser.email,
            role: "customer"
          };
          localStorage.setItem("muneem_user", JSON.stringify(userData));
        } else {
          // If unverified, keep them signed out in our app state
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email aur password enter karein!");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // --- 1. FIREBASE EMAIL/PASSWORD LOGIN ---
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        if (!firebaseUser.emailVerified) {
          // Unverified - restrict access and sign out from firebase session
          await signOut(auth);
          localStorage.removeItem("muneem_user");
          setError("❌ Email verification pending! Please check your inbox and verify your email before logging in.");
          setLoading(false);
          return;
        }

        // Verified - Save user metadata to MongoDB Login Log (Device tracking)
        const userAgent = navigator.userAgent;
        await fetch("/api/auth/login-log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: firebaseUser.email,
            deviceInfo: userAgent
          })
        });

        // Set session
        const userData = {
          name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Customer",
          email: firebaseUser.email,
          role: "customer"
        };
        localStorage.setItem("muneem_user", JSON.stringify(userData));

        setMessage("✅ Login Successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);

      } else {
        // --- 2. FIREBASE SIGNUP ---
        if (!name || !phone) {
          setError("Name aur Mobile number enter karein!");
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Set Display Name in Firebase Profile
        await updateProfile(firebaseUser, { displayName: name });

        // Send Email Verification
        await sendEmailVerification(firebaseUser);

        // Save Customer details to MongoDB (Saves phone, sends alerts, logs activity)
        await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: firebaseUser.email,
            name,
            phone,
            password: "firebase_auth"
          })
        });

        // Sign out immediately so they must verify email first
        await signOut(auth);

        setMessage("✉️ Verification link sent! Please check your email inbox and verify your email before signing in.");
        setIsLogin(true);
        setPassword("");
      }
    } catch (err: any) {
      console.error(err);
      setError("❌ Authentication failed: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("muneem_user");
      setIsLoggedIn(false);
      setCurrentUser(null);
      setEmail("");
      setPassword("");
      setName("");
      setPhone("");
      setMessage("👋 Logged out successfully!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err: any) {
      console.error("Logout error:", err);
    }
  };

  if (isLoggedIn && currentUser) {
    return (
      <div className="w-full text-center py-6 space-y-4 font-[var(--font-dm-sans)]">
        <h3 className="font-heading text-lg font-bold text-[#0D1B2A]">
          Namaste, {currentUser.displayName || currentUser.email?.split("@")[0]}!
        </h3>
        <p className="text-xs text-[#64748B]">
          Aap successfully logged in hain. Apne rentals track karne ke liye dashboard open karein.
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
    <div className="w-full font-[var(--font-dm-sans)]">
      <div className="text-center mb-6">
        <h2 className="text-[26px] font-extrabold text-[#0D1B2A] font-[var(--font-syne)]">
          Muneem Timber Store
        </h2>
        <p className="text-[13px] text-[#64748B] mt-1.5 font-medium">
          {isLogin ? "Sign in to access rentals" : "Register a new customer account"}
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-xl text-xs font-bold mb-4 bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl text-xs font-bold mb-4 bg-rose-50 text-rose-600 border border-rose-100 flex items-center gap-2">
          <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                Poora Naam (Full Name)
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="naam likhein"
                  disabled={loading}
                  className="w-full bg-slate-50/50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#334155] mb-2 uppercase tracking-wide">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  disabled={loading}
                  className="w-full bg-slate-50/50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </>
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
              disabled={loading}
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
              disabled={loading}
              className="w-full bg-slate-50/50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#1251A3] focus:bg-white transition-all duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {isLogin && (
          <div className="text-right">
            <a href="/forgot-password" className="text-xs font-bold text-[#1251A3] hover:underline">
              Forgot Password?
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1251A3] hover:bg-[#0A3578] text-white py-[13px] rounded-xl font-bold transition text-sm shadow-sm flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
        >
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Register Account"}
        </button>
      </form>

      <div className="text-center mt-6">
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setMessage("");
          }}
          className="text-xs font-bold text-[#1251A3] hover:underline"
        >
          {isLogin ? "Naya account banana hai? Register Karein" : "Pehle se account hai? Sign In"}
        </button>
      </div>
    </div>
  );
}
