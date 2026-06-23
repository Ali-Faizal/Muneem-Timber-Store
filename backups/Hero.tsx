"use client";
import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle, Sparkles, Calculator, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  
  const ctaData = {
    phone: "+919580716752",
    whatsapp: "919580716752"
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!gridRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      gridRef.current.style.backgroundPosition = `${x * 0.05}px ${y * 0.05}px`;
      gridRef.current.style.opacity = "0.9";
    };
    
    const handleLeave = () => {
      if (!gridRef.current) return;
      gridRef.current.style.opacity = "0.2";
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-[#1251A3] via-[#0A3578] to-slate-900 text-white overflow-hidden py-20 md:py-28 px-6">
      
      {/* GRID BACKGROUND */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-20 transition-all duration-300 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* Decorative floating blurred bubbles */}
      <motion.div 
        animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 15, 0], scale: [1, 0.95, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-[#FF6B2B]/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md text-[#E3F0FF]">
            <Sparkles size={14} className="text-[#FF6B2B]" />
            Hardoi, UP — Online aur Offline Centering Kiraya
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.08] tracking-tight font-heading">
            Timber Kiraya <br />
            <span className="text-[#90CAF9]">Ghar Baithke Book Karein</span>
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-white/80 max-w-lg">
            Chali, Balli, Shuttering Patra aur construction ke saare centering materials ab online rate par paayein. Transporters + Expert Mistri — sab kuch ek hi legacy platform se!
          </p>

          {/* BUTTONS: Upgraded with hover scaling and glows */}
          <div className="flex flex-wrap gap-4 pt-2">
            <motion.a
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(255,107,43,0.4)" }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${ctaData.phone}`}
              className="bg-[#FF6B2B] text-white px-7 py-3.5 rounded-xl text-sm font-extrabold flex items-center gap-2.5 transition duration-200"
            >
              <Phone size={16} />
              Call Now Support
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(37,211,102,0.3)" }}
              whileTap={{ scale: 0.98 }}
              href={`https://wa.me/${ctaData.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-7 py-3.5 rounded-xl text-sm font-extrabold flex items-center gap-2.5 transition duration-200"
            >
              <MessageCircle size={16} />
              WhatsApp Orders
            </motion.a>
          </div>

          {/* STATS: Animated Counters */}
          <div className="flex gap-10 pt-6 border-t border-white/10 max-w-md">
            <div>
              <motion.h2 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                className="text-3xl font-extrabold font-heading text-white"
              >
                500+
              </motion.h2>
              <p className="text-xs text-white/60 font-semibold mt-1">Happy Customers</p>
            </div>
            <div>
              <motion.h2 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                className="text-3xl font-extrabold font-heading text-white"
              >
                8+
              </motion.h2>
              <p className="text-xs text-white/60 font-semibold mt-1">Rent Items</p>
            </div>
            <div>
              <motion.h2 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                className="text-3xl font-extrabold font-heading text-[#90CAF9]"
              >
                30+ Yr
              </motion.h2>
              <p className="text-xs text-white/60 font-semibold mt-1">Trust Legacy</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CARD: Glassmorphic SaaS style UI */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-5 bg-white/10 border border-white/15 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-2xl space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-[-20%] right-[-20%] w-36 h-36 bg-[#FF6B2B]/10 rounded-full blur-2xl pointer-events-none" />
          
          <h3 className="text-lg font-bold flex items-center gap-2 font-heading border-b border-white/10 pb-4">
            <Calculator size={18} className="text-[#90CAF9]" />
            Centering Kiraya Estimate (12 Din)
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3.5">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="w-5 h-5 bg-white/20 rounded-md border border-white/10 flex items-center justify-center text-white">
                  ✓
                </div>
                <span className="text-[13.5px] font-semibold text-white/90">Bamboo Balli (50 pcs)</span>
              </label>
              <span className="text-[13.5px] font-bold font-mono">₹60 / day</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/5 pb-3.5">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="w-5 h-5 bg-white/20 rounded-md border border-white/10 flex items-center justify-center text-white">
                  ✓
                </div>
                <span className="text-[13.5px] font-semibold text-white/90">Shuttering Patra (20 pcs)</span>
              </label>
              <span className="text-[13.5px] font-bold font-mono">₹96 / day</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/5 pb-3.5">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="w-5 h-5 bg-white/20 rounded-md border border-white/10 flex items-center justify-center text-white">
                  ✓
                </div>
                <span className="text-[13.5px] font-semibold text-white/90">Iron Chali (Plates)</span>
              </label>
              <span className="text-[13.5px] font-bold font-mono">₹108 / day</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center mt-6">
            <div>
              <p className="text-[10px] text-white/60">Estimated Cost for 12 days</p>
              <p className="text-[10px] text-[#90CAF9] font-semibold mt-0.5">Loading & Return support included</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-extrabold font-heading text-white">₹5,920</h2>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}