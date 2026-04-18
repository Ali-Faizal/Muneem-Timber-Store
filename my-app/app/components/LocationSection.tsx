"use client";
import { MapPin } from "lucide-react";

const infoCards = [
  {
    title: "Address",
    icon: "📍",
    content: [
      "Muneem Timber Store",
      "Main Bazaar, Hardoi",
      "Uttar Pradesh — 241001",
    ],
  },
  {
    title: "Working Hours",
    icon: "🕐",
    content: [
      "Monday – Saturday",
      "8:00 AM – 8:00 PM",
      "🟢 Open Now",
    ],
  },
  {
    title: "Contact",
    icon: "📞",
    content: [
      "+91 9580716752",
      "muneem.timber@gmail.com",
    ],
  },
  {
    title: "Delivery Area",
    icon: "🚚",
    content: [
      "Hardoi + 30km radius",
      "Free delivery above ₹2000",
    ],
  },
];

export default function LocationSection() {
  return (
    <section id="location" className="bg-gradient-to-br from-blue-50 to-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* TOP TEXT */}
        <div className="mb-12">
          <p className="text-[11px] font-medium text-blue-600 tracking-wide">LOCATION</p>

          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-gray-900 mt-3">
            Hardoi, UP Mein Milein
          </h2>

          <p className="text-base leading-[1.7] text-gray-700 mt-4">
            Google Maps par dekho ya seedha aa jao — 24/7 service ready!
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

          {/* LEFT MAP */}
          <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-blue-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.589166547181!2d79.5651969!3d25.9411111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDU2IjM5LjEiTiA3OcKwMzMnNTMuOSJF!5e0!3m2!1sen!2sin"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* RIGHT CARDS */}
          <div className="flex flex-col gap-4">
            {infoCards.map((card, i) => (
              <div
                key={i}
                className="bg-white px-5 py-[18px] rounded-[14px] shadow-md border border-blue-100 hover:shadow-lg transition"
              >
                <h3 className="text-[11px] font-medium text-blue-700 mb-2.5 tracking-wide uppercase">
                  {card.icon} {card.title}
                </h3>

                {card.content.map((line, index) => (
                  <p key={index} className="text-sm text-gray-700 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}