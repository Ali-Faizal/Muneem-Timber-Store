"use client";
import { Phone, MessageCircle } from "lucide-react";

export default function CallToAction() {
  const ctaData = {
    phone: "+919580716752",
    whatsapp: "919580716752"
  };

  return (
    <div className="bg-blue-700 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* LEFT TEXT */}
        <div className="text-center lg:text-left">
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold">
            Ek Call Mein Sab Kuch Ready!
          </h2>

          <p className="text-base leading-[1.7] text-blue-100 mt-3">
            Kiraya, mistri, plumber, electrician — sab ek jagah se milega. Aaj hi sampark karein!
          </p>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <a
            href={`tel:${ctaData.phone}`}
            className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-[13px] rounded-[10px] text-[15px] font-bold text-center flex items-center justify-center gap-3 transition"
          >
            <Phone size={18} />
            Call Now
          </a>

          <a 
            href={`https://wa.me/${ctaData.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-[13px] rounded-[10px] text-[15px] font-bold text-center flex items-center justify-center gap-3 transition"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}