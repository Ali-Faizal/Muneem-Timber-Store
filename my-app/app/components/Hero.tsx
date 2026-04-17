"use client";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    const handleMove = (e: MouseEvent)) => {
      const grid = document.getElementById("grid");
      const x = e.clientX;
      const y = e.clientY;

      grid.style.backgroundPosition = `${x * 0.05}px ${y * 0.05}px`;
      grid.style.opacity = "0.9";
    };

    const handleLeave = () => {
      const grid = document.getElementById("grid");
      grid.style.opacity = "0.2";
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-blue-700 text-white overflow-hidden">

      {/* GRID BACKGROUND */}
      <div
        id="grid"
        className="absolute inset-0 opacity-20 transition-all duration-300"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>
          <p className="bg-white/20 inline-block px-3 py-1 rounded-full text-sm mb-4">
            Hardoi, UP — Ab Online
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Timber Kiraya <br />
            <span className="text-blue-200">Ghar Baithke</span> Karein
          </h1>

          <p className="mt-4 text-blue-100 max-w-lg">
            Chali, Balli, Patra, Teen — photo dekho, rate samjho, bill banao.
            Saath mein ghar banwane ki poori team bhi milegi.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">
            <button className="bg-orange-500 px-5 py-3 rounded-lg font-semibold">
              📞 Abhi Call Karein
            </button>
            <button className="bg-green-500 px-5 py-3 rounded-lg font-semibold">
              💬 WhatsApp Karein
            </button>
          </div>

          {/* STATS */}
          <div className="flex gap-10 mt-10">
            <div>
              <h2 className="text-2xl font-bold">500+</h2>
              <p className="text-sm text-blue-200">Happy Customers</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">8+</h2>
              <p className="text-sm text-blue-200">Kiraya Items</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">15yr</h2>
              <p className="text-sm text-blue-200">Experience</p>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
          <h3 className="text-lg font-semibold mb-4">
            Live Kiraya Calculator
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-white/20 border-b-2 pb-4">
              <div className="flex items-center gap-[4px]">
                <input type="checkbox" className="w-4 h-4" />
                <span>Balli (50 pcs)</span>
              </div>
              <span>₹5/din</span>
            </div>

                <div className="flex justify-between border-white/20 border-b-2 pb-4">
              <div className="flex items-center gap-[4px]">
                <input type="checkbox" className="w-4 h-4" />
                <span>Patra (20 pcs)</span>
              </div>
              <span>₹8/din</span>
            </div>
                <div className="flex justify-between border-white/20 border-b-2 pb-4">
              <div className="flex items-center gap-[4px]">
                <input type="checkbox" className="w-4 h-4" />
                <span>Chali</span>
              </div>
              <span>₹9/din</span>
            </div>
          </div>

          <div className="mt-6 bg-white/20 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-xs">12 din ka kul kiraya</p>
              <p className="text-xs text-blue-200">
                Lana + Lejana included
              </p>
            </div>
            <h2 className="text-xl font-bold">₹5,920</h2>
          </div>
        </div>

      </div>
    </section>
  );
}