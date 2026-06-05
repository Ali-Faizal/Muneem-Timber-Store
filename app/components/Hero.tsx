"use client";
import { useEffect, useRef } from "react";
import { Phone, MessageCircle } from "lucide-react";

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
    <section className="relative bg-blue-700 text-white overflow-hidden py-[72px]">
      
      {/* GRID BACKGROUND */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-20 transition-all duration-300"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <div className="bg-white/20 inline-block px-3 py-1 rounded-full text-xs mb-[18px] backdrop-blur">
            Hardoi, UP — Online aur Offline
          </div>

          <h1 className="text-[clamp(2.2rem,4vw,3.4rem)] font-extrabold leading-[1.08] mb-[18px]">
            Timber Kiraya Ghar Baithke Karein
          </h1>

          <p className="text-base leading-[1.7] max-w-[460px] mb-8">
            Chali, Balli, Patra aur construction ke saare samaan ab ghar baithe paayein. Delivery + Expert Mistri — sab kuch ek jagah se!
          </p>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-8 flex-wrap">
            <a
              href={`tel:${ctaData.phone}`}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-[13px] rounded-[10px] text-[15px] font-bold flex items-center gap-3 transition"
            >
              <Phone size={18} />
              Call Now
            </a>
            <a 
              href={`https://wa.me/${ctaData.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-[13px] rounded-[10px] text-[15px] font-bold flex items-center gap-3 transition"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>

          {/* STATS */}
          <div className="flex gap-8 mt-10">
            <div>
              <h2 className="text-[26px] font-extrabold">500+</h2>
              <p className="text-xs text-blue-200 opacity-55">Happy Customers</p>
            </div>
            <div>
              <h2 className="text-[26px] font-extrabold">8+</h2>
              <p className="text-xs text-blue-200 opacity-55">Items Available</p>
            </div>
            <div>
              <h2 className="text-[26px] font-extrabold">16yr</h2>
              <p className="text-xs text-blue-200 opacity-55">Experience</p>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white/10 backdrop-blur-md p-7 rounded-2xl shadow-xl border border-white/20">
          <h3 className="text-[18px] font-bold mb-6">Kiraya Calculator (12 Din)</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/20 pb-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-[13.5px]">Balli (50 pcs)</span>
              </label>
              <span className="text-[13.5px] font-semibold">₹60</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/20 pb-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-[13.5px]">Patra (20 pcs)</span>
              </label>
              <span className="text-[13.5px] font-semibold">₹96</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/20 pb-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-[13.5px]">Chali</span>
              </label>
              <span className="text-[13.5px] font-semibold">₹108</span>
            </div>
          </div>

          <div className="mt-8 bg-white/20 p-4 rounded-lg flex justify-between items-center backdrop-blur">
            <div>
              <p className="text-xs text-blue-200">12 din ka total</p>
              <p className="text-xs text-blue-100">Delivery + Return included</p>
            </div>
            <h2 className="text-[26px] font-extrabold">₹5,920</h2>
          </div>
        </div>

      </div>
    </section>
  );
}