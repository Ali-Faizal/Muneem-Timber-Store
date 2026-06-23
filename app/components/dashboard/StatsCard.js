"use client";
import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

export default function StatsCard({ title, value, icon: Icon, trend, type }) {
  const [displayVal, setDisplayVal] = useState(0);
  const cleanVal = typeof value === "string" ? value.replace(/[^\d.]/g, "") : value;
  const isNumeric = typeof cleanVal === "number" || (!isNaN(cleanVal) && !isNaN(parseFloat(cleanVal)));

  useEffect(() => {
    if (isNumeric) {
      const numVal = parseFloat(cleanVal);
      const controls = animate(0, numVal, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate(v) {
          setDisplayVal(Math.round(v * 10) / 10);
        }
      });
      return () => controls.stop();
    }
  }, [cleanVal, isNumeric]);

  // Determine colors based on type
  let accentColor = "rgba(18, 81, 163, 0.08)";
  let textColor = "text-slate-800";
  let iconColor = "text-slate-400";
  if (type === "success") {
    accentColor = "rgba(16, 185, 129, 0.08)";
    textColor = "text-emerald-700";
    iconColor = "text-emerald-500";
  } else if (type === "warning") {
    accentColor = "rgba(245, 158, 11, 0.08)";
    textColor = "text-amber-700";
    iconColor = "text-amber-500";
  } else if (type === "info") {
    accentColor = "rgba(59, 130, 246, 0.08)";
    textColor = "text-blue-700";
    iconColor = "text-blue-500";
  }

  const prefix = typeof value === "string" && value.includes("₹") ? "₹" : "";

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02, boxShadow: "0 12px 30px rgba(18,81,163,0.08)" }}
      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-28 transition-colors hover:border-[#1251A3]/30 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-12 h-12 rounded-bl-full pointer-events-none opacity-45" style={{ backgroundColor: accentColor }} />
      
      <div className="flex items-center justify-between z-10">
        <h4 className="font-heading text-[10px] font-bold text-gray-400 uppercase tracking-wider">{title}</h4>
        {Icon ? <Icon className={`w-4.5 h-4.5 ${iconColor}`} /> : null}
      </div>
      
      <div className="mt-2 z-10">
        <div className={`text-xl font-extrabold tracking-tight ${textColor}`}>
          {isNumeric ? `${prefix}${displayVal.toLocaleString()}` : value}
        </div>
        {trend ? (
          <div className="text-[9px] text-gray-400 mt-0.5 font-mono font-bold uppercase tracking-wide">{trend}</div>
        ) : null}
      </div>
    </motion.div>
  );
}
